import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "../../lib/rateLimit";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  // ── レートリミット: 1IP あたり 10回/分 ──────────────────
  const ip = (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
  const allowed = await checkRateLimit(ip, "analyze", 10, 60);
  if (!allowed) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。1分後に再試行してください。" },
      { status: 429 },
    );
  }

  try {
    const { text, type } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "テキストが必要です" },
        { status: 400 }
      );
    }

    let systemPrompt = "";
    
    if (type === "analyze") {
      systemPrompt = `あなたは闇バイト・詐欺リクルートの専門分析AIです。
ユーザーから渡されたSNSのDMや求人テキストを分析し、以下のJSON形式でのみ回答してください。
{
  "score": 0〜100の整数,
  "verdict": "安全" | "要注意" | "危険" | "極めて危険",
  "reasons": ["理由1", "理由2", "理由3"],
  "keywords": ["検知した危険キーワード"],
  "advice": "具体的なアドバイス2〜3文",
  "should_report": true | false
}
JSONのみ。前置き・コードブロック記号不要。`;
    } else if (type === "sos") {
      systemPrompt = `あなたは元警察官の法律アドバイザーです。
以下の情報をもとに、警察・法テラスに提出できる「事情説明テキスト」を生成してください。
・冒頭は「ご相談申し上げます」から始める
・時系列で客観的事実のみを記述
・感情的表現は排除
・400〜600字程度
・末尾は「以上の件につき、早急にご相談させていただきたく、何卒よろしくお願い申し上げます。」で締める`;
    } else if (type === "report") {
      systemPrompt = `あなたはインターネット・ホットラインセンター（IHC）への通報文作成専門AIです。
以下のJSONのみで回答してください：
{
  "is_illegal": true | false,
  "category": "犯罪実行者募集情報（闇バイト）" | "詐欺" | "その他",
  "ihc_report_text": "IHCに提出できる通報文（300字以内）",
  "police_report_text": "警察庁オンライン窓口への通報文（200字以内）",
  "evidence_checklist": ["確認事項1", "確認事項2"],
  "urgency": "高" | "中" | "低"
}
JSONのみ。前置き・コードブロック記号不要。`;
    }

    // 529 (Overloaded) に対して指数バックオフでリトライ
    const MAX_RETRIES = 3;
    let responseText = "";
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const message = await client.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          messages: [{ role: "user", content: text }],
          system: systemPrompt,
        });
        responseText =
          message.content[0].type === "text" ? message.content[0].text : "";
        break; // 成功したらループを抜ける
      } catch (err: unknown) {
        const status = (err as { status?: number })?.status;
        if (status === 529 && attempt < MAX_RETRIES - 1) {
          const delay = 2000 * (attempt + 1); // 2s → 4s → (6s)
          console.warn(`Anthropic 529 Overloaded, retry ${attempt + 1}/${MAX_RETRIES - 1} in ${delay}ms`);
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }
        throw err; // リトライ上限 or 529以外のエラーは再スロー
      }
    }

    if (type === "analyze" || type === "report") {
      const cleaned = responseText.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      return NextResponse.json(parsed);
    }

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error("API Error:", error);
    const status = (error as { status?: number })?.status;
    if (status === 529) {
      return NextResponse.json(
        { error: "AIが一時的に混み合っています。しばらく待ってから再度お試しください。" },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "AI処理中にエラーが発生しました" },
      { status: 500 }
    );
  }
}