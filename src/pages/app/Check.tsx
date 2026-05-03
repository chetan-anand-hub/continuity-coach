import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppLayout, PageHeader, BackToParent } from "@/prototype/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePrototypeAuth } from "@/prototype/auth";
import { useStudyContext, contextDescription, getSample } from "@/prototype/context";

export default function Check() {
  const { ctx, link } = useStudyContext();
  const sample = getSample(ctx);
  const ctxDesc = contextDescription(ctx);
  const defaultQ = sample.worksheetQuestions[1]?.q ?? sample.hpq;

  const [q, setQ] = useState(defaultQ);
  const [a, setA] = useState("");
  const [hasStored, setHasStored] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const { mode } = usePrototypeAuth();
  const nav = useNavigate();

  const generate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1200);
  };

  return (
    <AppLayout>
      <BackToParent to={link("/app")} label="Back to Cockpit" />
      <PageHeader
        kicker={`Check & Improve${ctx.source ? ` · from ${ctx.source}` : ""}`}
        title={`Check an answer${ctxDesc ? ` · ${ctxDesc}` : ""}`}
        sub="Examiner-style checking with stepwise marking, common mistakes and tips."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="lt-card p-5">
          <div className="text-xs text-muted-foreground mb-2">{ctx.subject}{ctxDesc ? ` · ${ctxDesc}` : ""}{ctx.source ? ` · source: ${ctx.source}` : ""}</div>
          <label className="text-xs text-muted-foreground">Question</label>
          <Textarea rows={3} value={q} onChange={e => setQ(e.target.value)} className="mt-1.5" />
          <label className="text-xs text-muted-foreground mt-4 block">Your answer</label>
          <Textarea rows={6} value={a} onChange={e => setA(e.target.value)} placeholder="Paste or type your answer..." className="mt-1.5" />
          <div className="flex flex-wrap gap-2 mt-4">
            {mode === "signed-in"
              ? <Link to={link("/app/check/result")}><Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Check answer →</Button></Link>
              : <Link to="/app/login?reason=grade-answer"><Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Sign in to check answer</Button></Link>}
            <Button variant="outline" onClick={() => setHasStored(s => !s)}>{hasStored ? "Simulate: solution missing" : "Simulate: solution found"}</Button>
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
              <p>{sample.storedSolution}</p>
            </div>
          ) : !generated ? (
            <div>
              <p className="text-sm text-muted-foreground">Solution not found in the question bank.</p>
              <Button onClick={generate} disabled={generating} className="mt-3">{generating ? "Generating board-style solution…" : "Generate board-style solution"}</Button>
            </div>
          ) : (
            <div className="text-sm space-y-2">
              <div className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">AI fallback · Board-style</div>
              {sample.stepwise.map(([s], i) => (
                <div key={i}><strong>Step {i + 1}:</strong> {s}</div>
              ))}
              <div className="pt-2 border-t border-border"><strong>Common mistake:</strong> {sample.mistakeFeedback}</div>
              <div><strong>Examiner tip:</strong> always close the answer to match the asked quantity.</div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
