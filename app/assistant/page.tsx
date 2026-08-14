import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Bloom",
};

export default function AssistantPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-soil">Assistant</p>
      <h1 className="mt-2 font-serif text-4xl text-forest">Ask Bloom</h1>
      <p className="mt-4 text-muted">
        Open the tree button at the bottom-right. Answers are short bullets,
        with links and follow-up chips. Use <strong>+</strong> for a new chat,{" "}
        <strong>☰</strong> for history, and <strong>×</strong> to close.
      </p>
    </div>
  );
}
