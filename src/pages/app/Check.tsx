import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppLayout, PageHeader, BackToParent } from "@/prototype/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePrototypeAuth } from "@/prototype/auth";

export default function Check() {
  const [q, setQ] = useState("Find the roots of 2x² − 7x + 3 = 0 by factorisation.");
  const [a, setA] = useState("");
  const [hasStored, setHasStored] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const { mode } = usePrototypeAuth();
  const nav = useNavigate();

  const generate = () => {
    setGenerating(true);
    setTimeout(()=>{ setGenerating(false); setGenerated(true); }, 1200);
  };

  return (
    <AppLayout>
      <BackToParent to="/app" label="Back to Cockpit" />
      <PageHeader kicker="Check & Improve" title="Check an answer" sub="Examiner-style checking with stepwise marking, common mistakes and tips." />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="lt-card p-5">
          <label className="text-xs text-muted-foreground">Question</label>
          <Textarea rows={3} value={q} onChange={e=>setQ(e.target.value)} className="mt-1.5"/>
          <label className="text-xs text-muted-foreground mt-4 block">Your answer</label>
          <Textarea rows={6} value={a} onChange={e=>setA(e.target.value)} placeholder="Paste or type your answer..." className="mt-1.5"/>
          <div className="flex flex-wrap gap-2 mt-4">
            {mode === "signed-in"
              ? <Link to="/app/check/result"><Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Check answer →</Button></Link>
              : <Link to="/app/login?reason=grade-answer"><Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Sign in to check answer</Button></Link>}
            <Button variant="outline" onClick={()=>setHasStored(s=>!s)}>{hasStored?"Simulate: solution missing":"Simulate: solution found"}</Button>
          </div>
          {mode === "signed-out" && (
            <p className="text-xs text-muted-foreground mt-3">Checked answers save to your profile so Mistake Intelligence has real evidence.</p>
          )}
        </div>

        <div className="lt-card p-5">
          <div className="lt-section-title mb-3">Reference solution</div>
          {hasStored ? (
            <div className="text-sm">
              <div className="text-xs text-accent font-semibold uppercase tracking-wider mb-2">Stored solution</div>
              <p>2x² − 6x − x + 3 = 0 → 2x(x − 3) − 1(x − 3) = 0 → (2x − 1)(x − 3) = 0. <strong>Roots: x = 1/2, x = 3.</strong></p>
            </div>
          ) : !generated ? (
            <div>
              <p className="text-sm text-muted-foreground">Solution not found in the question bank.</p>
              <Button onClick={generate} disabled={generating} className="mt-3">{generating?"Generating board-style solution…":"Generate board-style solution"}</Button>
            </div>
          ) : (
            <div className="text-sm space-y-2">
              <div className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">AI fallback · Board-style</div>
              <div><strong>Step 1:</strong> Split middle term: 2x² − 6x − x + 3 = 0</div>
              <div><strong>Step 2:</strong> Group: 2x(x − 3) − 1(x − 3) = 0</div>
              <div><strong>Step 3:</strong> Factor: (2x − 1)(x − 3) = 0</div>
              <div><strong>Final answer:</strong> x = 1/2, x = 3</div>
              <div className="pt-2 border-t border-border"><strong>Common mistake:</strong> sign error when splitting the middle term.</div>
              <div><strong>Examiner tip:</strong> always verify roots by substitution for full marks.</div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
