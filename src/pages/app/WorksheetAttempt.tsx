import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout, PageHeader, BackToParent } from "@/prototype/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useStudyContext, contextDescription, getSample } from "@/prototype/context";

export default function WorksheetAttempt() {
  const { ctx, link } = useStudyContext();
  const sample = getSample(ctx);
  const QS = sample.worksheetQuestions;
  const [answers, setAnswers] = useState<string[]>(QS.map(() => ""));
  const ctxDesc = contextDescription(ctx);

  return (
    <AppLayout>
      <BackToParent to={link("/app/worksheets/ready")} label="Back to worksheet" />
      <PageHeader
        kicker={`Level 3 improvement · Attempt · ${ctx.subject}`}
        title={`Attempt: ${ctxDesc || ctx.subject}`}
        sub="Write your answers below. Use Check an answer to get examiner-style feedback."
      />

      <div className="space-y-4 max-w-3xl">
        {QS.map((q, i) => (
          <div key={i} className="lt-card p-5">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Q{i + 1} · Section {q.s} · {ctx.subject}</span><span>{q.m} marks</span>
            </div>
            <p className="font-display text-lg mb-3">{q.q}</p>
            <Textarea rows={4} value={answers[i]} onChange={e => { const a = [...answers]; a[i] = e.target.value; setAnswers(a); }} placeholder="Write your answer here..." />
            <div className="flex gap-2 mt-3">
              <Link to={link("/app/check", { source: "worksheet", q: String(i + 1) })}><Button size="sm" variant="outline">Check this answer</Button></Link>
              <Button size="sm" variant="ghost">Mark attempted</Button>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
