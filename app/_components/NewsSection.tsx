// 非同期サーバーコンポーネント — クライアント JS 不要
// ニュースをサーバーサイドで取得してSSRする（1時間キャッシュ）

type NewsItem = { title: string; link: string; pubDate: string; source: string };

async function fetchNews(): Promise<NewsItem[]> {
  try {
    const query  = encodeURIComponent("闇バイト 逮捕");
    const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=ja&gl=JP&ceid=JP:ja`;
    const res    = await fetch(rssUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml    = await res.text();

    const items: NewsItem[] = [];
    const blocks = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
    for (const block of blocks.slice(0, 6)) {
      const title =
        block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] ??
        block.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "";
      const link =
        block.match(/<link>([\s\S]*?)<\/link>/)?.[1] ??
        block.match(/<guid[^>]*>([\s\S]*?)<\/guid>/)?.[1] ?? "";
      const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? "";
      const source  =
        block.match(/<source[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/source>/)?.[1] ??
        block.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] ?? "";
      if (title.trim()) {
        items.push({ title: title.trim(), link: link.trim(), pubDate, source: source.trim() });
      }
    }
    return items;
  } catch {
    return [];
  }
}

function formatDate(str: string) {
  try {
    return new Date(str).toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" });
  } catch { return ""; }
}

export default async function NewsSection() {
  const items = await fetchNews();
  if (items.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase bg-slate-100 text-slate-600">
            最近の逮捕事例
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
            闇バイト関連ニュース
          </h2>
          <p className="text-slate-500 text-sm">実際の逮捕事例を知ることが最大の抑止力です</p>
        </div>

        <div className="flex flex-col gap-2">
          {items.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-xl p-4 flex gap-4 items-start transition-all group"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-slate-100 group-hover:bg-red-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-red-500 font-black text-xs transition-all">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-800 group-hover:text-slate-900 leading-snug mb-1 line-clamp-2">
                  {item.title}
                </div>
                <div className="flex gap-3 text-xs text-slate-400">
                  {item.source && <span>{item.source}</span>}
                  {item.pubDate && <span>{formatDate(item.pubDate)}</span>}
                </div>
              </div>
              <span className="text-slate-200 group-hover:text-slate-400 text-xs flex-shrink-0 self-center transition-all">
                →
              </span>
            </a>
          ))}
        </div>

        <p className="text-xs text-slate-400 text-center mt-4">
          ※ Google ニュースから自動取得しています
        </p>
      </div>
    </section>
  );
}
