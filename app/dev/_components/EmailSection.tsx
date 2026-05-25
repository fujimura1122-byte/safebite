"use client";

import { useState, useEffect, useCallback } from "react";

// ── 型定義 ──────────────────────────────────────────────────────────────────

interface InboundEmail {
  id:         string;
  direction:  "inbound";
  from:       string;
  to:         string;
  subject:    string;
  textBody:   string;
  htmlBody?:  string;
  receivedAt: string;
  read:       boolean;
}

interface OutboundEmail {
  id:        string;
  direction: "outbound";
  to:        string;
  subject:   string;
  textBody:  string;
  sentAt:    string;
}

type Tab = "受信" | "送信済";

// ── ユーティリティ ──────────────────────────────────────────────────────────

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("ja-JP", {
      month: "2-digit", day: "2-digit",
      hour:  "2-digit", minute: "2-digit",
    });
  } catch { return iso; }
}

// ── メール詳細 ───────────────────────────────────────────────────────────────

function EmailDetail({
  email,
  onReply,
  onClose,
  onDelete,
}: {
  email:    InboundEmail | OutboundEmail;
  onReply:  (to: string, subject: string) => void;
  onClose:  () => void;
  onDelete: (id: string) => void;
}) {
  const isInbound = email.direction === "inbound";
  const date      = isInbound ? (email as InboundEmail).receivedAt : (email as OutboundEmail).sentAt;
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-3">
      {/* ヘッダー */}
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 flex-1 min-w-0">
          <div className="text-sm font-bold text-slate-100 leading-snug">{email.subject}</div>
          <div className="text-xs text-slate-400">
            {isInbound
              ? `From: ${(email as InboundEmail).from}`
              : `To: ${(email as OutboundEmail).to}`}
          </div>
          <div className="text-xs text-slate-600">{fmtDate(date)}</div>
        </div>
        <button onClick={onClose} className="text-slate-600 hover:text-slate-300 text-lg leading-none flex-shrink-0">✕</button>
      </div>

      {/* 本文 */}
      <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-mono max-h-64 overflow-y-auto border border-slate-700">
        {email.textBody || "(本文なし)"}
      </div>

      {/* アクションボタン */}
      <div className="flex items-center gap-2 flex-wrap">
        {isInbound && (
          <button
            onClick={() => onReply(
              (email as InboundEmail).from,
              email.subject.startsWith("Re:") ? email.subject : `Re: ${email.subject}`
            )}
            className="text-xs font-bold px-4 py-2 rounded-lg bg-blue-900/60 text-blue-300 border border-blue-700 hover:bg-blue-800 transition-colors"
          >
            ↩ 返信する
          </button>
        )}

        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="text-xs px-3 py-2 rounded-lg text-red-400 border border-red-900 hover:bg-red-950 transition-colors ml-auto"
          >
            🗑 削除
          </button>
        ) : (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-red-400">本当に削除しますか？</span>
            <button
              onClick={() => onDelete(email.id)}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-700 text-white hover:bg-red-600 transition-colors"
            >
              削除する
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="text-xs px-3 py-1.5 rounded-lg text-slate-400 border border-slate-700 hover:border-slate-500 transition-colors"
            >
              キャンセル
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── 新規作成・返信フォーム ───────────────────────────────────────────────────

function ComposeForm({
  initialTo,
  initialSubject,
  onSent,
  onClose,
}: {
  initialTo?:      string;
  initialSubject?: string;
  onSent:          () => void;
  onClose:         () => void;
}) {
  const [to,       setTo]       = useState(initialTo      ?? "");
  const [subject,  setSubject]  = useState(initialSubject ?? "");
  const [textBody, setTextBody] = useState("");
  const [sending,  setSending]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  async function handleSend() {
    if (!to.trim() || !subject.trim() || !textBody.trim()) return;
    setSending(true); setError(null);
    try {
      const res = await fetch("/api/email/send", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ to, subject, textBody }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "送信失敗");
      onSent();
    } catch (e) {
      setError(e instanceof Error ? e.message : "送信エラー");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-slate-900 border border-blue-800 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">
          ✉ {initialTo ? "返信" : "新規作成"}
        </span>
        <button onClick={onClose} className="text-slate-600 hover:text-slate-300 text-lg">✕</button>
      </div>

      <div className="text-xs text-slate-500 mb-1">From: contact@saferbite.org</div>

      {[
        { label: "To",   value: to,      setter: setTo,      placeholder: "宛先メールアドレス" },
        { label: "件名", value: subject, setter: setSubject, placeholder: "件名" },
      ].map(({ label, value, setter, placeholder }) => (
        <div key={label} className="flex items-center gap-2">
          <label className="text-xs text-slate-500 w-8 flex-shrink-0">{label}</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setter(e.target.value)}
            placeholder={placeholder}
            className="flex-1 text-xs bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-600"
          />
        </div>
      ))}

      <textarea
        value={textBody}
        onChange={(e) => setTextBody(e.target.value)}
        placeholder="本文を入力..."
        rows={6}
        className="w-full text-xs bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-600 resize-none leading-relaxed"
      />

      {error && (
        <div className="text-xs text-red-300 bg-red-950 border border-red-800 rounded-lg px-3 py-2">{error}</div>
      )}

      <button
        onClick={handleSend}
        disabled={sending || !to.trim() || !subject.trim() || !textBody.trim()}
        className="text-xs font-bold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white transition-colors"
      >
        {sending ? "送信中..." : "送信する →"}
      </button>
    </div>
  );
}

// ── EmailSection (メイン) ────────────────────────────────────────────────────

export default function EmailSection() {
  const [tab,      setTab]      = useState<Tab>("受信");
  const [inbox,    setInbox]    = useState<InboundEmail[]>([]);
  const [sent,     setSent]     = useState<OutboundEmail[]>([]);
  const [selected, setSelected] = useState<InboundEmail | OutboundEmail | null>(null);
  const [compose,  setCompose]  = useState<{ to: string; subject: string } | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchEmails = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res  = await fetch("/api/email/inbox");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setInbox(data.inbox ?? []);
      setSent(data.sent  ?? []);
      setLastRefresh(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : "取得失敗");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEmails(); }, [fetchEmails]);

  const handleSelect = useCallback(async (email: InboundEmail | OutboundEmail) => {
    setSelected(email);
    setCompose(null);
    if (email.direction === "inbound" && !(email as InboundEmail).read) {
      await fetch("/api/email/inbox", {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ id: email.id }),
      });
      setInbox((prev) => prev.map((e) => e.id === email.id ? { ...e, read: true } : e));
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await fetch("/api/email/inbox", {
        method:  "DELETE",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ id }),
      });
      setSelected(null);
      setInbox((prev) => prev.filter((e) => e.id !== id));
      setSent((prev)  => prev.filter((e) => e.id !== id));
    } catch {
      // silent — list already refetches on next refresh
    }
  }, []);

  const unread  = inbox.filter((e) => !e.read).length;
  const current = tab === "受信" ? inbox : sent;

  return (
    <section>
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          ✉ Email — contact@saferbite.org
        </h2>
        <div className="flex items-center gap-2">
          {lastRefresh && (
            <span className="text-xs text-slate-600">
              {lastRefresh.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })} 更新
            </span>
          )}
          <button
            onClick={() => { setCompose({ to: "", subject: "" }); setSelected(null); }}
            className="text-xs font-bold px-3 py-1 rounded-lg bg-blue-900/60 text-blue-300 border border-blue-700 hover:bg-blue-800 transition-colors"
          >
            ＋ 新規作成
          </button>
          <button
            onClick={fetchEmails}
            disabled={loading}
            className="text-xs text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-500 px-3 py-1 rounded-lg transition-colors disabled:opacity-40"
          >
            {loading ? "読込中…" : "↻ 更新"}
          </button>
        </div>
      </div>

      {/* 統計バー */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "受信",   value: inbox.length, dot: "bg-blue-400"  },
          { label: "未読",   value: unread,        dot: "bg-red-400"   },
          { label: "送信済", value: sent.length,   dot: "bg-green-400" },
        ].map(({ label, value, dot }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              <span className="text-xs text-slate-500">{label}</span>
            </div>
            <div className="text-xl font-black text-slate-200">{value}</div>
          </div>
        ))}
      </div>

      {/* 作成・返信フォーム */}
      {compose && (
        <div className="mb-4">
          <ComposeForm
            initialTo={compose.to}
            initialSubject={compose.subject}
            onSent={() => { setCompose(null); fetchEmails(); }}
            onClose={() => setCompose(null)}
          />
        </div>
      )}

      {/* 選択中メール詳細 */}
      {selected && (
        <div className="mb-4">
          <EmailDetail
            email={selected}
            onReply={(to, subject) => { setCompose({ to, subject }); setSelected(null); }}
            onClose={() => setSelected(null)}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* タブ */}
      <div className="flex gap-2 mb-3">
        {(["受信", "送信済"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setSelected(null); }}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
              tab === t
                ? "bg-slate-100 text-slate-900 border-transparent"
                : "bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500"
            }`}
          >
            {t}
            <span className="ml-1.5 text-slate-500">
              {t === "受信" ? inbox.length : sent.length}
            </span>
            {t === "受信" && unread > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-black">
                {unread}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* エラー */}
      {error && (
        <div className="bg-red-950 border border-red-800 rounded-xl p-4 text-xs text-red-300 mb-4">
          ⚠️ {error}
        </div>
      )}

      {/* メール一覧 */}
      {loading ? (
        <div className="text-xs text-slate-600 text-center py-12 animate-pulse">読み込み中…</div>
      ) : current.length === 0 ? (
        <div className="text-xs text-slate-600 text-center py-12 border border-slate-800 rounded-xl">
          {tab === "受信" ? "📭 受信メールはありません" : "送信済みメールはありません"}
        </div>
      ) : (
        <div className="space-y-1">
          {current.map((email) => {
            const isInbound = email.direction === "inbound";
            const date      = isInbound
              ? (email as InboundEmail).receivedAt
              : (email as OutboundEmail).sentAt;
            const preview   = isInbound ? (email as InboundEmail).from : `To: ${(email as OutboundEmail).to}`;
            const unreadMark = isInbound && !(email as InboundEmail).read;
            const isSelected = selected?.id === email.id;

            return (
              <button
                key={email.id}
                onClick={() => handleSelect(email)}
                className={`w-full text-left rounded-xl px-4 py-3 transition-all border ${
                  isSelected
                    ? "bg-blue-950 border-blue-700"
                    : unreadMark
                    ? "bg-slate-900 border-slate-700 hover:border-slate-500"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-600 opacity-70"
                }`}
              >
                <div className="flex items-center gap-2">
                  {unreadMark && <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />}
                  <span className={`text-xs flex-1 truncate ${unreadMark ? "font-bold text-slate-200" : "text-slate-400"}`}>
                    {email.subject}
                  </span>
                  <span className="text-xs text-slate-600 flex-shrink-0">{fmtDate(date)}</span>
                </div>
                <div className="text-xs text-slate-500 truncate mt-0.5 ml-4">{preview}</div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
