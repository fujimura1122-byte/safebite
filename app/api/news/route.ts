import { NextResponse } from "next/server";

export const revalidate = 3600;

type NewsItem = { title: string; link: string; pubDate: string; source: string };

export async function GET() {
  try {
    const query = encodeURIComponent("闇バイト 逮捕");
    const rssUrl =
      "https://news.google.com/rss/search?q=" + query + "&hl=ja&gl=JP&ceid=JP:ja";
    const res = await fetch(rssUrl, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("fetch failed");
    const xml = await res.text();

    const items: NewsItem[] = [];
    const blocks = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

    for (const block of blocks.slice(0, 6)) {
      const title =
        block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] ??
        block.match(/<title>([\s\S]*?)<\/title>/)?.[1] ??
        "";
      const link =
        block.match(/<link>([\s\S]*?)<\/link>/)?.[1] ??
        block.match(/<guid[^>]*>([\s\S]*?)<\/guid>/)?.[1] ??
        "";
      const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? "";
      const source =
        block.match(/<source[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/source>/)?.[1] ??
        block.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] ??
        "";

      if (title.trim()) items.push({ title: title.trim(), link: link.trim(), pubDate, source: source.trim() });
    }

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
