import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppLayout, PageHeader, BackToParent } from "@/prototype/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const QUESTIONS = [
  { q: "Find the roots of 2x² − 7x + 3 = 0 by factorisation.", marks: 3, section: "C", diff: "Medium", format: "SA", subtopic: "Factorisation" },
  { q: "If one root of x² + px + 12 = 0 is 4, find p and the other root.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Roots" },
  { q: "Determine the nature of the roots of 3x² − 5x + 2 = 0.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Discriminant" },
];

export default function PracticeRun() {
  const [i, setI] = useState(0);
  const [working, setWorking] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [showSol, setShowSol] = useState(false);
  const nav = useNavigate();
  const total = QUESTIONS.length;
  const cur = QUESTIONS[i];

  const next = () => { setI((i+1)%total); setWorking(""); setAttempted(false); setShowSol(false); };

  return (
    <AppLayout>
      <BackToParent to="/app/practice" label="Back to Practice" />
      <PageHeader kicker="Level 3 · Quick Practice execution" title="Quick Practice run" sub="One question at a time. Local working only — this practice run does not save to your profile." />

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <div>
          <div className="lt-card p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">Question {i+1} of {total}</span>
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
              <Textarea rows={6} value={working} onChange={e=>setWorking(e.target.value)} placeholder="Write your steps here..." className="mt-1.5"/>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              <Button variant={attempted?"default":"outline"} onClick={()=>setAttempted(true)}>{attempted?"✓ Marked attempted":"Mark as attempted"}</Button>
              <Button variant="outline" onClick={()=>setShowSol(s=>!s)}>{showSol?"Hide solution":"Show solution"}</Button>
              <Button onClick={next} className="bg-accent hover:bg-accent/90 text-accent-foreground">Next question →</Button>
              <Button variant="ghost" onClick={()=>nav("/app/practice")}>Exit run</Button>
            </div>

            {showSol && (
              <div className="mt-5 border border-border rounded-md p-4 bg-surface">
                <div className="text-xs text-muted-foreground mb-2">Stored solution</div>
                <p className="text-sm">2x² − 7x + 3 = 0 → 2x² − 6x − x + 3 = 0 → 2x(x − 3) − 1(x − 3) = 0 → (2x − 1)(x − 3) = 0. <strong>Roots: x = 1/2, x = 3</strong>.</p>
                <Link to="/app/practice/solution-demo" className="text-xs underline mt-2 inline-block">Open full Stored Solution Demo →</Link>
              </div>
            )}
          </div>

          <div className="lt-card p-4 mt-4 text-xs">
            <div className="font-semibold mb-1">Fallback to full Practice engine</div>
            <p className="text-muted-foreground">If you want a different scope, return to <Link to="/app/practice" className="underline">Practice</Link> to rebuild scope and choose another mode.</p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="lt-card p-4 text-xs">
            <div className="font-semibold mb-2 text-sm">This practice run</div>
            <ul className="space-y-1 text-muted-foreground">
              <li>Attempted: <span className="font-semibold text-foreground">{attempted?"yes":"no"}</span></li>
              <li>Solution viewed: <span className="font-semibold text-foreground">{showSol?"yes":"no"}</span></li>
              <li>Question: <span className="font-semibold text-foreground">{i+1}/{total}</span></li>
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
