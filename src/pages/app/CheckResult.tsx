import { Link } from "react-router-dom";
import { AppLayout, PageHeader, BackToParent } from "@/prototype/AppLayout";
import { Button } from "@/components/ui/button";

export default function CheckResult() {
  return (
    <AppLayout>
      <BackToParent to="/app/check" label="Back to Check" />
      <PageHeader kicker="Check & Improve · Examiner-style result" title="Examiner result" sub="Stepwise marking guidance, common mistakes, and what to practise next." />

      <div className="grid lg:grid-cols-[1fr_280px] gap-6 max-w-5xl">
        <div className="space-y-4">
          <div className="lt-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-2xl">2 / 3 marks</div>
                <div className="text-xs text-muted-foreground mt-1">Quadratic Equations · Section C · Stepwise</div>
              </div>
              <span className="lt-pill-accent">Checked & saved</span>
            </div>
          </div>

          <div className="lt-card p-5">
            <div className="lt-section-title mb-3">Stepwise marking</div>
            <div className="space-y-2 text-sm">
              {[
                ["Splitting the middle term","✓","1/1"],
                ["Grouping & common factor","✓","1/1"],
                ["Final roots stated and verified","✗","0/1"],
              ].map(([s,m,score])=>(
                <div key={s} className="flex items-center justify-between border border-border rounded-md px-3 py-2 bg-surface">
                  <div>{s}</div>
                  <div className="flex items-center gap-3"><span className={m==="✓"?"text-accent":"text-destructive"}>{m}</span><span className="font-semibold">{score}</span></div>
                </div>
              ))}
            </div>
          </div>

          <div className="lt-card p-5">
            <div className="lt-section-title mb-3">Mistake feedback</div>
            <p className="text-sm">You stated the factors but did not verify the roots by substitution. CBSE markers expect a final verification step on 3-mark factorisation problems. Logged as: <span className="font-semibold">root verification omitted</span>.</p>
          </div>

          <div className="flex gap-2">
            <Link to="/app/practice/run"><Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Practise similar →</Button></Link>
            <Link to="/app/me"><Button variant="outline">Open Me / Progress</Button></Link>
          </div>
        </div>

        <aside className="space-y-3">
          <div className="lt-card p-4 text-xs">
            <div className="font-semibold mb-2 text-sm">Status</div>
            <ul className="space-y-1.5">
              <li>Attempted <span className="float-right text-accent">✓</span></li>
              <li>Checked <span className="float-right text-accent">✓</span></li>
              <li>Mistake logged <span className="float-right text-accent">✓</span></li>
            </ul>
            <div className="mt-3 pt-3 border-t border-border text-muted-foreground">Saved to your profile.</div>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
