import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "../../lib/rateLimit";

export async function POST(req: NextRequest) {
  // レートリミット: 1IP あたり 20回/分
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const allowed = await checkRateLimit(ip, "fetch-tweet", 20, 60);
  if (!allowed) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。少し待ってから再試行してください。" },
      { status: 429 }
    );
  }

  try {
    const { url } = await req.json();

    if (!url || !url.match(/^https?:\/\/(twitter\.com|x\.com)\/.+\/status\//)) {
      return NextResponse.json(
        { error: "X/Twitter の投稿URLを入力してください（例: https://x.com/xxx/status/...）" },
        { status: 400 }
      );
    }

    const oembedRes = await fetch(
      `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&omit_script=true&lang=ja`,
      { cache: "no-store" }
    );

    if (!oembedRes.ok) {
      return NextResponse.json(
        { error: "投稿を取得できませんでした（非公開・削除済みの可能性があります）" },
        { status: 404 }
      );
    }

    const data = await oembedRes.json();

    // blockquote内の<p>からテキストを抽出
    const pMatch = (data.html as string).match(/<p[^>]*>([\s\S]*?)<\/p>/);
    const rawHtml = pMatch ? pMatch[1] : "";
    const text = rawHtml
      .replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g, "$2 ($1)")
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .trim();

    return NextResponse.json({
      text,
      author: data.author_name as string,
      canonicalUrl: data.url as string,
    });
  } catch {
    return NextResponse.json({ error: "取得中にエラーが発生しました" }, { status: 500 });
  }
}
