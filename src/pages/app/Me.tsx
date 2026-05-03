import { Link } from "react-router-dom";
import { AppLayout, PageHeader } from "@/prototype/AppLayout";
import { usePrototypeAuth } from "@/prototype/auth";
import { useStudyContext, contextDescription, getSample } from "@/prototype/context";

export default function Me() {
  const { mode } = usePrototypeAuth();
  const { ctx, link } = useStudyContext();
  const ctxDesc = contextDescription(ctx);
  const hasContext = !!(ctx.topic || ctx.selectedTopics.length || ctx.scope === "full-subject");
  const sample = getSample(ctx);

  if (mode === "signed-out") {
    return (
      <AppLayout>
        <PageHeader kicker="Me / Progress" title="Sign in to open your progress" sub="Me / Progress and Mistake Intelligence are built only from your saved checked answers." />
        <div className="lt-card p-6 max-w-xl">
          <p className="text-sm text-muted-foreground">No personalised top mistake, weakest subtopic, marks at risk, or progress trend will appear until you sign in and check answers.</p>
          <Link to="/app/login?reason=open-progress" className="inline-block mt-4 px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-semibold">Sign in</Link>
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <PageHeader kicker="Me / Progress" title="Your activity" sub="Built only from your saved checked answers." />
      <div className="lt-pill-accent mb-4">Prototype sample based on saved checked answers</div>

      <div className="grid sm:grid-cols-3 gap-3 max-w-3xl mb-6">
        {[
          ["Attempted", "12", "this week"],
          ["Checked", "7", "examiner-style"],
          ["Mistakes logged", "3", "actionable"],
        ].map(([k, v, s]) => (
          <div key={k} className="lt-card p-4">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
            <div className="font-display text-2xl">{v}</div>
            <div className="text-xs text-muted-foreground">{s}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 max-w-3xl">
        <div className="lt-card p-5">
          <div className="font-display text-lg mb-2">Your mistakes</div>
          <div className="text-xs text-muted-foreground mb-2">
            {hasContext
              ? <>Filtered to current context: <span className="font-semibold text-foreground">{ctx.subject} · {ctxDesc || "Full subject"}</span></>
              : <>Generic sample · no context selected</>}
          </div>
          <ul className="text-sm space-y-2">
            <li className="border border-border rounded-md p-3 bg-surface">
              <strong>{sample.mistakeFeedback.split(".")[0]}.</strong>
              <div className="text-xs text-muted-foreground">{ctxDesc || ctx.subject} · 2 occurrences</div>
            </li>
          </ul>
        </div>
        <div className="lt-card p-5">
          <div className="font-display text-lg mb-2">What to practise next</div>
          <div className="text-xs text-muted-foreground mb-2">
            {hasContext
              ? <>Recommendation aligned to <span className="font-semibold text-foreground">{ctxDesc || ctx.subject}</span></>
              : <>Generic recommendation · no context selected</>}
          </div>
          <ul className="text-sm space-y-2">
            <li className="border border-border rounded-md p-3 bg-surface flex justify-between items-center">
              {sample.practiseNext}
              <Link to={link("/app/practice/run", { mode: "quick" })} className="text-accent text-xs font-semibold">Practise →</Link>
            </li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
