import { Link } from "react-router-dom";
import { AppLayout, PageHeader, BackToParent, ContextBar } from "@/prototype/AppLayout";
import { ScopeBuilder } from "@/prototype/ScopeBuilder";
import { usePrototypeAuth } from "@/prototype/auth";
import { useStudyContext, contextDescription, getSample } from "@/prototype/context";
import { Target, FileText, Brain, Trophy, Timer, BookOpen, ClipboardList } from "lucide-react";

const more = [
  { icon: Timer, t: "Timed Drill" },
  { icon: ClipboardList, t: "Chapter Test" },
  { icon: FileText, t: "Practice Paper" },
];

export default function Practice() {
  const { mode } = usePrototypeAuth();
  const { ctx, link } = useStudyContext();
  const sample = getSample(ctx);
  const ctxDesc = contextDescription(ctx);

  const primary = [
    { to: link("/app/practice/run", { mode: "quick" }), icon: Target, t: "Quick Practice", d: "One question at a time. Local working." },
    { to: link("/app/worksheets"), icon: FileText, t: "Worksheet", d: "Board-style Sections A–E." },
    { to: link("/app/practice/solution-demo"), icon: BookOpen, t: "Predicted / HPQs", d: "Topic HPQs, selected topics, full subject." },
    { to: link("/app/practice/run", { mode: "mock" }), icon: Trophy, t: "Full Mock", d: "Timed full-paper attempt." },
  ];

  return (
    <AppLayout>
      <BackToParent to="/app" label="Back to Cockpit" />
      <PageHeader kicker="Level 2 · Practice decision" title="Practice" sub="Pick what to do for your selected scope." />
      <ContextBar items={[
        { k: "Subject", v: ctx.subject },
        { k: "Stream", v: ctx.stream },
        { k: "Scope", v: ctx.scope === "topic" ? "Single topic" : ctx.scope === "multi-topic" ? "Multi-topic" : "Full subject" },
        { k: ctx.scope === "full-subject" ? "Coverage" : "Topic", v: ctxDesc || "—" },
        { k: "Mode", v: mode === "signed-in" ? "Signed-in (saves)" : "Signed-out (preview only)" },
      ]} />
      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div>
          <ScopeBuilder />

          <div className="lt-section-title mb-3">Choose what to do</div>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {primary.map(p => (
              <Link key={p.t} to={p.to} className="lt-card p-4 hover:shadow-md">
                <div className="flex items-center gap-2 text-primary"><p.icon className="w-5 h-5" /><span className="font-display text-lg text-foreground">{p.t}</span></div>
                <p className="text-sm text-muted-foreground mt-1">{p.d}</p>
              </Link>
            ))}
          </div>

          <div className="lt-section-title mb-3">More practice options</div>
          <div className="flex flex-wrap gap-2 mb-6">
            {more.map(m => <button key={m.t} className="lt-card px-3 py-2 text-sm flex items-center gap-2 hover:shadow-sm"><m.icon className="w-4 h-4 text-muted-foreground" />{m.t}</button>)}
          </div>

          <div className="lt-card p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="font-display text-lg">Paper Blueprint</div>
              <span className="lt-chip">CBSE 2025 pattern</span>
            </div>
            <div className="grid grid-cols-5 gap-2 text-xs">
              {[
                ["A", "MCQ", "20×1"], ["B", "VSA", "5×2"], ["C", "SA", "6×3"], ["D", "LA", "4×5"], ["E", "Case", "3×4"]
              ].map(([s, t, m]) => (
                <div key={s} className="border border-border rounded-md px-2 py-2 bg-surface">
                  <div className="font-semibold">Section {s}</div>
                  <div className="text-muted-foreground">{t}</div>
                  <div className="text-muted-foreground">{m}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lt-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="font-display text-lg">Predicted Questions</div>
              <span className="lt-pill-accent">HPQs</span>
            </div>
            <div className="flex gap-2 mb-4 border-b border-border">
              {["Topic HPQs", "Selected topics", "Full subject"].map((t, i) => (
                <button key={t} className={`px-3 py-2 text-sm ${i === 0 ? "border-b-2 border-primary text-primary font-semibold" : "text-muted-foreground"}`}>{t}</button>
              ))}
            </div>
            <div className="border border-border rounded-md p-4 bg-surface">
              <div className="text-xs text-muted-foreground mb-1">Sample preview · {ctxDesc || ctx.subject}</div>
              <p className="font-display text-base">{sample.hpq}</p>
              <div className="flex gap-1.5 mt-3">
                <span className="lt-chip">{sample.marks} marks</span>
                <span className="lt-chip">Section {sample.section}</span>
                <span className="lt-chip">Predicted</span>
                <span className="lt-chip">{ctx.subject}</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="lt-card p-4">
            <div className="flex items-center gap-2 mb-2"><Brain className="w-4 h-4 text-primary" /><span className="font-semibold">Mistake Intelligence</span></div>
            {mode === "signed-in"
              ? <>
                <div className="text-[10px] uppercase tracking-wider text-accent mb-1">Prototype sample</div>
                <p className="text-xs text-muted-foreground">Based on saved checked answers in <span className="font-semibold text-foreground">{ctxDesc || ctx.subject}</span>.</p>
              </>
              : <p className="text-xs text-muted-foreground">Sign in to see your mistakes. Mistake Intelligence is built only from saved checked answers.</p>}
          </div>
          <div className="lt-card p-4 text-sm">
            <div className="font-semibold mb-2">Quick links</div>
            <ul className="space-y-1.5 text-muted-foreground">
              <li><Link to={link("/app/worksheets")} className="hover:text-foreground">→ Worksheet</Link></li>
              <li><Link to={link("/app/check", { source: "practice" })} className="hover:text-foreground">→ Check answer</Link></li>
              <li><Link to={link("/app/me")} className="hover:text-foreground">→ Me / Progress</Link></li>
            </ul>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
