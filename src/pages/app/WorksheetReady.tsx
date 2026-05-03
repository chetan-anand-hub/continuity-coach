import { Link } from "react-router-dom";
import { AppLayout, PageHeader, BackToParent } from "@/prototype/AppLayout";
import { Button } from "@/components/ui/button";
import { usePrototypeAuth } from "@/prototype/auth";

export default function WorksheetReady() {
  const { mode } = usePrototypeAuth();
  return (
    <AppLayout>
      <BackToParent to="/app/worksheets" label="Back to Worksheets" />
      <PageHeader kicker="Level 3 improvement · Worksheet loop" title="Your worksheet is ready" sub="Mathematics · Quadratic Equations · 30 marks · Sections A–E" />

      <div className="lt-card p-6 max-w-3xl">
        <div className="grid sm:grid-cols-3 gap-3 text-sm mb-5">
          <Stat k="Questions" v="13" /><Stat k="Total marks" v="30" /><Stat k="Estimated time" v="50 min" />
        </div>
        <div className={`p-3 rounded-md border ${mode==="signed-in" ? "border-accent/30 bg-accent/5" : "border-border bg-surface"} text-xs mb-5`}>
          {mode==="signed-in"
            ? "Saved to your profile. You can come back to this worksheet later."
            : "Not saved yet. Sign in to save this worksheet to your profile."}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/app/worksheets/attempt"><Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Attempt on screen →</Button></Link>
          <Button variant="outline">Download PDF</Button>
          <Link to="/app/check"><Button variant="ghost">Check an answer</Button></Link>
        </div>
      </div>
    </AppLayout>
  );
}
function Stat({k,v}:{k:string;v:string}) {
  return <div className="border border-border rounded-md p-3 bg-surface">
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
    <div className="font-display text-xl">{v}</div>
  </div>;
}
