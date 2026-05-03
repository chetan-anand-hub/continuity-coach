import { AppLayout, PageHeader, BackToParent } from "@/prototype/AppLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SolutionDemo() {
  return (
    <AppLayout>
      <BackToParent to="/app/practice/run" label="Back to Quick Practice" />
      <PageHeader kicker="Level 3 · Stored Solution Demo" title="Stored solution" sub="Board-style stored solution card." />

      <div className="lt-card p-6 max-w-3xl">
        <div className="text-xs text-muted-foreground mb-2">Question context · Mathematics · Quadratic Equations · 3 marks · Section C</div>
        <p className="font-display text-xl">Find the roots of 2x² − 7x + 3 = 0 by factorisation.</p>

        <div className="mt-5 space-y-3">
          {[
            ["Step 1","Split the middle term: −7x = −6x − x.","2x² − 6x − x + 3 = 0"],
            ["Step 2","Group and factor:","2x(x − 3) − 1(x − 3) = 0"],
            ["Step 3","Common factor (x − 3):","(2x − 1)(x − 3) = 0"],
          ].map(([h,d,e])=>(
            <div key={h} className="border-l-2 border-accent pl-4">
              <div className="text-xs uppercase tracking-wider text-accent font-semibold">{h}</div>
              <div className="text-sm">{d}</div>
              <div className="font-mono text-sm mt-0.5">{e}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-3 bg-surface border border-border rounded-md">
          <div className="text-xs text-muted-foreground">Final answer</div>
          <div className="font-display text-lg">x = 1/2  or  x = 3</div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Brief explanation:</span> Splitting the middle term works when the product of coefficients factorises cleanly. Always verify roots by substitution for full marks.
        </div>

        <div className="mt-5 flex gap-2 flex-wrap">
          <Link to="/app/practice/run"><Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Next question →</Button></Link>
          <Link to="/app/practice"><Button variant="outline">Back to Practice</Button></Link>
        </div>
      </div>
    </AppLayout>
  );
}
