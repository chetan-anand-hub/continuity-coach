import { Scope, STREAMS, Subject, TOPICS, useStudyContext } from "@/prototype/context";

export function ScopeBuilder({ allowMulti = true }: { allowMulti?: boolean }) {
  const { ctx, setCtx } = useStudyContext();
  const subjectTopics = TOPICS[ctx.subject];

  return (
    <div className="lt-card p-5 mb-6">
      <div className="lt-section-title mb-3">Scope</div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
        <Selector label="Subject">
          <select
            value={ctx.subject}
            onChange={e => setCtx({ subject: e.target.value as Subject })}
            className="w-full bg-transparent font-medium outline-none"
          >
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
          </select>
        </Selector>

        <Selector label="Stream">
          <select
            value={ctx.stream}
            onChange={e => setCtx({ stream: e.target.value as any })}
            className="w-full bg-transparent font-medium outline-none"
          >
            {STREAMS[ctx.subject].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Selector>

        <Selector label="Scope">
          <select
            value={ctx.scope}
            onChange={e => setCtx({ scope: e.target.value as Scope })}
            className="w-full bg-transparent font-medium outline-none"
          >
            <option value="topic">Single topic</option>
            {allowMulti && <option value="multi-topic">Multi-topic</option>}
            <option value="full-subject">Full subject</option>
          </select>
        </Selector>

        <Selector label={ctx.scope === "topic" ? "Topic" : ctx.scope === "multi-topic" ? "Topics" : "Topic"}>
          {ctx.scope === "topic" && (
            <select
              value={ctx.topic ?? subjectTopics[0].slug}
              onChange={e => setCtx({ topic: e.target.value, selectedTopics: [e.target.value] })}
              className="w-full bg-transparent font-medium outline-none"
            >
              {subjectTopics.map(t => <option key={t.slug} value={t.slug}>{t.label}</option>)}
            </select>
          )}
          {ctx.scope === "multi-topic" && (
            <span className="text-xs text-muted-foreground">{ctx.selectedTopics.length} selected</span>
          )}
          {ctx.scope === "full-subject" && (
            <span className="text-xs text-muted-foreground">All topics ({ctx.subject})</span>
          )}
        </Selector>
      </div>

      {ctx.scope === "multi-topic" && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {subjectTopics.map(t => {
            const on = ctx.selectedTopics.includes(t.slug);
            return (
              <button
                key={t.slug}
                onClick={() => {
                  const next = on
                    ? ctx.selectedTopics.filter(s => s !== t.slug)
                    : [...ctx.selectedTopics, t.slug];
                  setCtx({ selectedTopics: next.length ? next : [t.slug] });
                }}
                className={`lt-chip cursor-pointer ${on ? "border-accent/50 text-accent bg-accent/5" : ""}`}
              >
                {on ? "✓ " : ""}{t.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Selector({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-border rounded-md px-3 py-2 bg-surface">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}
