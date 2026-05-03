import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout, PageHeader, BackToParent } from "@/prototype/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const QS = [
  { s:"B", m:2, q:"State the nature of roots of x² + 4x + 4 = 0." },
  { s:"C", m:3, q:"Find the roots of 2x² − 7x + 3 = 0 by factorisation." },
  { s:"D", m:5, q:"A train travels 360 km at uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less. Find the speed." },
];

export default function WorksheetAttempt() {
  const [answers, setAnswers] = useState<string[]>(QS.map(()=>""));
  return (
    <AppLayout>
      <BackToParent to="/app/worksheets/ready" label="Back to worksheet" />
      <PageHeader kicker="Level 3 improvement · Attempt" title="Attempt on screen" sub="Write your answers below. Use Check an answer to get examiner-style feedback." />

      <div className="space-y-4 max-w-3xl">
        {QS.map((q,i)=>(
          <div key={i} className="lt-card p-5">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Q{i+1} · Section {q.s}</span><span>{q.m} marks</span>
            </div>
            <p className="font-display text-lg mb-3">{q.q}</p>
            <Textarea rows={4} value={answers[i]} onChange={e=>{const a=[...answers]; a[i]=e.target.value; setAnswers(a);}} placeholder="Write your answer here..."/>
            <div className="flex gap-2 mt-3">
              <Link to="/app/check"><Button size="sm" variant="outline">Check this answer</Button></Link>
              <Button size="sm" variant="ghost">Mark attempted</Button>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
