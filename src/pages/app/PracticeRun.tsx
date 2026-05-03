import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppLayout, PageHeader, BackToParent } from "@/prototype/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useStudyContext, contextDescription, getSample } from "@/prototype/context";

export default function PracticeRun() {
  const { ctx, link } = useStudyContext();
  const sample = getSample(ctx);
  const QUESTIONS = sample.practiceQuestions;
  const [i, setI] = useState(0);
  const [working, setWorking] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [showSol, setShowSol] = useState(false);
  const nav = useNavigate();
  const total = QUESTIONS.length;
  const cur = QUESTIONS[i];
  const ctxDesc = contextDescription(ctx);

  const next = () => { setI((i + 1) % total); setWorking(""); setAttempted(false); setShowSol(false); };

  return (
    <AppLayout>
      <BackToParent to={link("/app/practice")} label="Back to Practice" />
      <PageHeader
        kicker={`Level 3 · Quick Practice execution · ${ctx.subject}`}
        title={`Quick Practice: ${ctxDesc || ctx.subject}`}
        sub="One question at a time. Local working only — this practice run does not save to your profile."
      />

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <div>
          <div className="lt-card p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">Question {i + 1} of {total} · {ctx.subject}</span>
              <div className="flex gap-1.5">
                <span className="lt-chip">{cur.marks} marks</span>
                <span className="lt-chip">Section {cur.section}</span>
                <span className="lt-chip">{cur.diff}</span>
                <span className="lt-chip">{cur.format}</span>
                <span className="lt-chip">{cur.subtopic}</span>
              </div>
            </div>
            <p className="font-display text-2xl leading-snug">{cur.q}</p>

            <div className="mt-5">
              <label className="text-xs text-muted-foreground">Your working (local only)</label>
              <Textarea rows={6} value={working} onChange={e => setWorking(e.target.value)} placeholder="Write your steps here..." className="mt-1.5" />
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              <Button variant={attempted ? "default" : "outline"} onClick={() => setAttempted(true)}>{attempted ? "✓ Marked attempted" : "Mark as attempted"}</Button>
              <Button variant="outline" onClick={() => setShowSol(s => !s)}>{showSol ? "Hide solution" : "Show solution"}</Button>
              <Button onClick={next} className="bg-accent hover:bg-accent/90 text-accent-foreground">Next question →</Button>
              <Link to={link("/app/check", { source: "practice" })}><Button variant="outline">Check this answer</Button></Link>
              <Button variant="ghost" onClick={() => nav(link("/app/practice"))}>Exit run</Button>
            </div>

            {showSol && (
              <div className="mt-5 border border-border rounded-md p-4 bg-surface">
                <div className="text-xs text-muted-foreground mb-2">Stored solution</div>
                <p className="text-sm">{sample.storedSolution}</p>
                <Link to={link("/app/practice/solution-demo")} className="text-xs underline mt-2 inline-block">Open full Stored Solution Demo →</Link>
              </div>
            )}
          </div>

          <div className="lt-card p-4 mt-4 text-xs">
            <div className="font-semibold mb-1">Fallback to full Practice engine</div>
            <p className="text-muted-foreground">If you want a different scope, return to <Link to={link("/app/practice")} className="underline">Practice</Link> to rebuild scope and choose another mode.</p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="lt-card p-4 text-xs">
            <div className="font-semibold mb-2 text-sm">This practice run</div>
            <ul className="space-y-1 text-muted-foreground">
              <li>Subject: <span className="font-semibold text-foreground">{ctx.subject}</span></li>
              <li>Topic: <span className="font-semibold text-foreground">{ctxDesc || "—"}</span></li>
              <li>Attempted: <span className="font-semibold text-foreground">{attempted ? "yes" : "no"}</span></li>
              <li>Solution viewed: <span className="font-semibold text-foreground">{showSol ? "yes" : "no"}</span></li>
              <li>Question: <span className="font-semibold text-foreground">{i + 1}/{total}</span></li>
            </ul>
            <div className="mt-3 pt-3 border-t border-border text-[11px] leading-snug text-muted-foreground">
              Local-only. Not mastery. Not saved progress. Saved profile updates only after Check & Improve.
            </div>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
