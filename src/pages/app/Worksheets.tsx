import { Link } from "react-router-dom";
import { AppLayout, PageHeader, BackToParent, ContextBar } from "@/prototype/AppLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { usePrototypeAuth } from "@/prototype/auth";
import { Brain, Lightbulb } from "lucide-react";

const sections = [
  { s: "A", t: "MCQ", n: 4, m: 1 },
  { s: "B", t: "VSA", n: 3, m: 2 },
  { s: "C", t: "SA", n: 3, m: 3 },
  { s: "D", t: "LA", n: 2, m: 5 },
  { s: "E", t: "Case-based", n: 1, m: 4 },
];

export default function Worksheets() {
  const [mistakeFocus, setMistakeFocus] = useState(false);
  const { mode, setLoginReason } = usePrototypeAuth();

  return (
    <AppLayout>
      <BackToParent to="/app" label="Back to Cockpit" />
      <PageHeader kicker="Level 2 · Worksheet decision" title="Worksheets" sub="Build a board-style worksheet for your scope." />
      <ContextBar items={[
        {k:"Subject",v:"Mathematics"},{k:"Topic",v:"Quadratic Equations"},{k:"Total marks",v:"30"},{k:"Mode",v:mode==="signed-in"?"Signed-in (saves)":"Signed-out (preview only)"}
      ]}/>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div>
          <div className="lt-card p-5 mb-5">
            <div className="lt-section-title mb-3">Scope</div>
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              <div className="border border-border rounded-md px-3 py-2 bg-surface"><div className="text-[10px] uppercase text-muted-foreground">Subject</div><div className="font-medium">Mathematics</div></div>
              <div className="border border-border rounded-md px-3 py-2 bg-surface"><div className="text-[10px] uppercase text-muted-foreground">Topic</div><div className="font-medium">Quadratic Equations</div></div>
              <div className="border border-border rounded-md px-3 py-2 bg-surface"><div className="text-[10px] uppercase text-muted-foreground">Difficulty mix</div><div className="font-medium">Balanced</div></div>
            </div>
          </div>

          <div className="lt-card p-5 mb-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-lg">Mistake-focus mini-section</div>
                <p className="text-xs text-muted-foreground mt-0.5">Add a small section built from your saved checked mistakes.</p>
              </div>
              <Switch checked={mistakeFocus} onCheckedChange={setMistakeFocus}/>
            </div>
            {mistakeFocus && mode === "signed-out" && (
              <div className="mt-3 text-xs text-muted-foreground border-t border-border pt-3">
                Sign in to use mistake-focus. It needs your saved checked answers. <Link to="/app/login?reason=save-worksheet" className="underline">Sign in</Link>
              </div>
            )}
          </div>

          <div className="lt-card p-5 mb-5">
            <div className="flex items-center justify-between mb-3">
              <div className="font-display text-lg">Worksheet preview</div>
              <div className="flex gap-1.5">
                {["PDF","On-screen","Printable"].map(c=><span key={c} className="lt-chip">{c}</span>)}
              </div>
            </div>
            <div className="space-y-2">
              {sections.map(sec=>(
                <div key={sec.s} className="border border-border rounded-md px-3 py-2 flex items-center justify-between bg-surface">
                  <div className="text-sm"><span className="font-semibold">Section {sec.s}</span> · {sec.t}</div>
                  <div className="text-xs text-muted-foreground">{sec.n} questions × {sec.m}m = {sec.n*sec.m}m</div>
                </div>
              ))}
              {mistakeFocus && (
                <div className="border border-accent/40 bg-accent/5 rounded-md px-3 py-2 flex items-center justify-between">
                  <div className="text-sm"><span className="font-semibold text-accent">Mistake-focus</span> · From your checked mistakes</div>
                  <div className="text-xs text-muted-foreground">3 questions</div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link to="/app/worksheets/ready"><Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Generate worksheet →</Button></Link>
            {mode === "signed-in"
              ? <Button variant="outline">Save worksheet</Button>
              : <Link to="/app/login?reason=save-worksheet" onClick={()=>setLoginReason("save-worksheet")}><Button variant="outline">Save worksheet</Button></Link>}
            <Link to="/app/check"><Button variant="ghost">Upload your answers</Button></Link>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="lt-card p-4">
            <div className="flex items-center gap-2 mb-2"><Brain className="w-4 h-4 text-primary"/><span className="font-semibold">Mistake Intelligence</span></div>
            {mode === "signed-in"
              ? <><div className="text-[10px] uppercase tracking-wider text-accent mb-1">Prototype sample</div>
                  <p className="text-xs text-muted-foreground">Top recurring mistake: <span className="font-semibold text-foreground">forgetting to verify roots</span> (3 saved checks).</p></>
              : <p className="text-xs text-muted-foreground">Sign in so mistake-focus can use your saved checked answers.</p>}
          </div>
          <div className="lt-card p-4 text-xs">
            <div className="flex items-center gap-2 mb-2"><Lightbulb className="w-4 h-4 text-accent"/><span className="font-semibold text-sm">Tip</span></div>
            <p className="text-muted-foreground">The mistake-focus mini-section adds a small targeted block built from answers you have already checked. It won't appear unless you have saved checked evidence.</p>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
