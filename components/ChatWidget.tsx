"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { welcomeAnswer, type ChatAnswer } from "@/lib/assistant";

type RoleMsg =
  | { id: string; role: "user"; content: string }
  | { id: string; role: "assistant"; answer: ChatAnswer };

type Thread = {
  id: string;
  title: string;
  updatedAt: number;
  messages: RoleMsg[];
};

const STORAGE_KEY = "bloom-chat-threads-v1";
const ACTIVE_KEY = "bloom-chat-active-v1";

const nav = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "Company" },
  { href: "/gallery", label: "Photos" },
  { href: "/enquire", label: "Quote" },
];

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function freshThread(): Thread {
  return {
    id: uid(),
    title: "New chat",
    updatedAt: Date.now(),
    messages: [{ id: uid(), role: "assistant", answer: welcomeAnswer }],
  };
}

const BOOT_THREAD: Thread = {
  id: "boot",
  title: "New chat",
  updatedAt: 0,
  messages: [{ id: "welcome", role: "assistant", answer: welcomeAnswer }],
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [threads, setThreads] = useState<Thread[]>([BOOT_THREAD]);
  const [activeId, setActiveId] = useState("boot");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const saved = raw ? (JSON.parse(raw) as Thread[]) : [];
      const lastId = localStorage.getItem(ACTIVE_KEY);
      if (saved.length) {
        setThreads(saved);
        setActiveId(saved.some((t) => t.id === lastId) ? (lastId as string) : saved[0].id);
      } else {
        const t = freshThread();
        setThreads([t]);
        setActiveId(t.id);
      }
    } catch {
      const t = freshThread();
      setThreads([t]);
      setActiveId(t.id);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !threads.length) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(threads.slice(0, 30)));
    if (activeId) localStorage.setItem(ACTIVE_KEY, activeId);
  }, [threads, activeId, ready]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = useMemo(
    () => threads.find((t) => t.id === activeId) ?? threads[0] ?? BOOT_THREAD,
    [threads, activeId],
  );

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [active.messages, open, busy]);

  function patchActive(updater: (t: Thread) => Thread) {
    setThreads((all) => all.map((t) => (t.id === activeId ? updater(t) : t)));
  }

  function newChat() {
    const t = freshThread();
    setThreads((all) => [t, ...all]);
    setActiveId(t.id);
    setHistoryOpen(false);
    setInput("");
  }

  function closePanel() {
    setOpen(false);
    setHistoryOpen(false);
  }

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const userMsg: RoleMsg = { id: uid(), role: "user", content: q };
    const title = active.title === "New chat" ? q.slice(0, 36) : active.title;
    patchActive((t) => ({
      ...t,
      title,
      updatedAt: Date.now(),
      messages: [...t.messages, userMsg],
    }));
    setInput("");
    setBusy(true);
    try {
      const history = [...active.messages, userMsg]
        .filter((m) => m.role === "user")
        .slice(-6)
        .map((m) => ({ role: "user" as const, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...history, { role: "user", content: q }],
        }),
      });
      const data = (await res.json()) as { answer?: ChatAnswer };
      const answer = data.answer ?? {
        title: "Try again",
        bullets: ["Could not reach the assistant.", "Use WhatsApp or the quote form."],
        links: [
          { label: "Quote", href: "/enquire" },
          { label: "WhatsApp", href: "https://wa.me/918884568019" },
        ],
        followUps: [],
      };
      patchActive((t) => ({
        ...t,
        updatedAt: Date.now(),
        messages: [...t.messages, { id: uid(), role: "assistant", answer }],
      }));
    } catch {
      patchActive((t) => ({
        ...t,
        messages: [
          ...t.messages,
          {
            id: uid(),
            role: "assistant",
            answer: {
              title: "Offline",
              bullets: ["Network error.", "Call +91 88845 68019."],
              links: [{ label: "Quote form", href: "/enquire" }],
              followUps: [],
            },
          },
        ],
      }));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] flex flex-col items-end justify-end p-3 sm:p-4">
      {open ? (
        <div className="pointer-events-auto mb-0 flex h-[100dvh] w-full max-w-none flex-col overflow-hidden border border-forest/15 bg-white shadow-2xl sm:mb-3 sm:h-[min(36rem,78vh)] sm:max-w-[26rem] sm:rounded-2xl max-sm:fixed max-sm:inset-0 max-sm:h-[100dvh] max-sm:rounded-none">
          {historyOpen ? (
            <div className="absolute inset-0 z-10 flex flex-col bg-white">
              <div className="flex items-center justify-between border-b border-forest/10 px-3 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
                <p className="text-sm font-medium">Chat history</p>
                <button
                  type="button"
                  className="grid h-11 min-w-11 place-items-center text-sm text-muted"
                  onClick={() => setHistoryOpen(false)}
                >
                  Back
                </button>
              </div>
              <ul className="flex-1 overflow-y-auto p-2">
                {threads.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveId(t.id);
                        setHistoryOpen(false);
                      }}
                      className={`mb-1 w-full rounded-xl px-3 py-3 text-left text-sm ${
                        t.id === activeId ? "bg-lime/30" : "hover:bg-cream"
                      }`}
                    >
                      <span className="block truncate font-medium text-ink">
                        {t.title}
                      </span>
                      <span className="text-xs text-muted">
                        {t.updatedAt ? new Date(t.updatedAt).toLocaleString() : "Current"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="flex items-center gap-2 border-b border-forest/10 px-2 py-2 pt-[max(0.5rem,env(safe-area-inset-top))]">
            <Image
              src="/brand/mark.png"
              alt=""
              width={28}
              height={34}
              className="h-8 w-auto"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-tight">Ask Bloom</p>
              <p className="truncate text-[11px] text-muted">{active.title}</p>
            </div>
            <IconBtn label="New chat" onClick={newChat}>
              +
            </IconBtn>
            <IconBtn label="History" onClick={() => setHistoryOpen(true)}>
              ☰
            </IconBtn>
            <IconBtn label="Close chat" onClick={closePanel}>
              ×
            </IconBtn>
          </div>

          <div className="flex gap-1 overflow-x-auto border-b border-forest/10 px-2 py-1.5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closePanel}
                className="shrink-0 rounded-full bg-cream px-3 py-2 text-[12px] text-forest"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-cream/70 p-3">
            {active.messages.map((m) =>
              m.role === "user" ? (
                <div
                  key={m.id}
                  className="ml-8 rounded-2xl bg-leaf px-3 py-2 text-sm text-white sm:ml-10"
                >
                  {m.content}
                </div>
              ) : (
                <AnswerCard key={m.id} answer={m.answer} onAsk={send} />
              ),
            )}
            {busy ? <p className="text-xs text-muted">Summarising…</p> : null}
            <div ref={endRef} />
          </div>

          <form
            className="flex gap-2 border-t border-forest/10 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask in a few words…"
              enterKeyHint="send"
              className="min-h-11 min-w-0 flex-1 rounded-full border border-forest/20 px-4 text-base sm:text-sm"
            />
            <button
              type="submit"
              disabled={busy}
              className="btn btn-primary min-h-11 shrink-0 px-4"
            >
              Send
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`pointer-events-auto flex items-center gap-2 rounded-full bg-white py-2.5 pr-4 pl-2 text-sm font-medium shadow-lg ring-1 ring-forest/10 ${open ? "hidden sm:flex" : "flex"}`}
        aria-expanded={open}
        aria-label="Open Ask Bloom"
      >
        <Image
          src="/brand/mark.png"
          alt=""
          width={32}
          height={40}
          className="h-8 w-auto"
        />
        Ask Bloom
      </button>
    </div>
  );
}

function IconBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid h-11 w-11 place-items-center text-xl leading-none text-forest hover:bg-cream"
    >
      {children}
    </button>
  );
}

function AnswerCard({
  answer,
  onAsk,
}: {
  answer: ChatAnswer;
  onAsk: (q: string) => void;
}) {
  return (
    <div className="mr-2 rounded-2xl bg-white p-3 text-sm shadow-sm sm:mr-4">
      <p className="font-medium text-forest">{answer.title}</p>
      <ul className="mt-2 space-y-1 text-[13px] leading-snug text-ink">
        {answer.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {answer.cta ? <p className="mt-2 text-xs text-muted">{answer.cta}</p> : null}
      {answer.links.length ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {answer.links.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              className="rounded-full bg-cream px-3 py-1.5 text-[12px] text-leaf"
            >
              {l.label}
            </Link>
          ))}
        </div>
      ) : null}
      {answer.followUps.length ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {answer.followUps.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => onAsk(q)}
              className="rounded-full border border-forest/15 px-3 py-1.5 text-left text-[12px] text-muted"
            >
              {q}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
