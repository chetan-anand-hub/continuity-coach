import { AppLayout, PageHeader } from "@/prototype/AppLayout";
import { Link } from "react-router-dom";

const Section = ({title, children}:{title:string; children:React.ReactNode}) => (
  <div className="lt-card p-5">
    <h2 className="font-display text-xl mb-3">{title}</h2>
    <div className="text-sm space-y-2 text-foreground/90">{children}</div>
  </div>
);

export default function ReferenceControl() {
  return (
    <AppLayout>
      <PageHeader
        kicker="Internal · Canonical Continuity Prototype"
        title="Reference Control"
        sub="This page locks the source hierarchy. Browser Agents and implementation agents must read this before comparing anything."
      />
      <div className="lt-pill-accent mb-5">This prototype is the canonical continuity reference</div>

      <div className="grid lg:grid-cols-2 gap-4 max-w-5xl">
        <Section title="Canonical hierarchy">
          <ol className="list-decimal list-inside space-y-1">
            <li><strong>Level 1</strong> — public landing, login gate, desktop shell, sidebar rhythm, cockpit home, light theme, no dark/light toggle.</li>
            <li><strong>Level 2</strong> — decision layer: scope → choose mode/action → route to learning surface.</li>
            <li><strong>Level 3</strong> — execution: scope → mode → execution → answer/check/solution → learning state → next action.</li>
            <li><strong>Improvements</strong> — additive only.</li>
          </ol>
        </Section>

        <Section title="What Level 1 defines">
          <ul className="list-disc list-inside space-y-1">
            <li><Link to="/" className="underline">/</Link> public landing — never redirects to /app</li>
            <li><Link to="/app/login" className="underline">/app/login</Link> reason-aware gate</li>
            <li><Link to="/app" className="underline">/app</Link> cockpit, sidebar rhythm</li>
            <li>Navy primary, green accent, dark navy sidebar, pale blue/neutral surfaces</li>
            <li>Fraunces display, Inter body. White cards, subtle borders, gentle shadows</li>
            <li>Light theme only. No dark/light toggle.</li>
          </ul>
        </Section>

        <Section title="What Level 2 defines">
          <ul className="list-disc list-inside space-y-1">
            <li><Link to="/app/practice" className="underline">/app/practice</Link>: BackToParent, ContextBar, ScopeBuilder, primary cards (Quick Practice, Worksheet, Predicted/HPQs, Full Mock), more options (Timed Drill, Chapter Test, Practice Paper), Paper Blueprint, Predicted Questions tabs (Topic HPQs, Selected topics, Full subject), sample preview, right rail (Mistake Intelligence + quick links).</li>
            <li><Link to="/app/worksheets" className="underline">/app/worksheets</Link>: BackToParent, ContextBar, ScopeBuilder, mistake-focus toggle, worksheet preview, Sections A–E, format chips, Save worksheet, Upload your answers, Mistake Intelligence right rail, tip panel.</li>
          </ul>
        </Section>

        <Section title="What Level 3 defines">
          <ul className="list-disc list-inside space-y-1">
            <li><Link to="/app/practice/run" className="underline">/app/practice/run</Link>: one question at a time, counter, marks/section/difficulty/format/subtopic, local working textarea, Mark attempted, Show solution, Next, Exit, local-only state panel, no-mastery copy, fallback to Practice engine.</li>
            <li><Link to="/app/practice/solution-demo" className="underline">/app/practice/solution-demo</Link>: stored solution card with question context, Step 1/2/3, final answer, brief explanation, next action.</li>
            <li><Link to="/app/learning-signal-demo" className="underline">/app/learning-signal-demo</Link>: attempted, solution viewed, next action clicked, local-only, not mastery, not saved progress. Term "Learning Signal" lives ONLY here.</li>
          </ul>
        </Section>

        <Section title="What improvements add (additive only)">
          <ol className="list-decimal list-inside space-y-1">
            <li>7-day trial profile-save model.</li>
            <li>Clear, plain student-friendly login gates.</li>
            <li>No technical student-facing signal language. Use: This practice run, Saved to your profile, Not saved yet, Your activity, Your mistakes, What to practise next.</li>
            <li>AI fallback solution generation (Step 1/2/3, Final answer, Common mistake, Examiner tip).</li>
            <li>Worksheet Level 3 loop: Generate → <Link to="/app/worksheets/ready" className="underline">Ready</Link> → <Link to="/app/worksheets/attempt" className="underline">Attempt</Link> → <Link to="/app/check" className="underline">Check</Link> → <Link to="/app/check/result" className="underline">Examiner result</Link> → Mistake feedback → Practise similar / Me Progress.</li>
            <li>Tutor/examiner quality wording. Stepwise marking for 3m/5m. Common mistakes and examiner tips. Clearly separate Attempted, Checked, Mistake logged.</li>
            <li>Mistake Intelligence and Me / Progress use saved checked evidence ONLY. Signed-out users never see personalised mistake/weakness/risk/trend. Signed-in demo data labelled "Prototype sample based on saved checked answers".</li>
          </ol>
        </Section>

        <Section title="What must not be used as a reference">
          <ul className="list-disc list-inside space-y-1">
            <li>The earlier revised <code>lazy-smart-loop-lvl3</code> simplified prototype is <strong>not canonical</strong>. Treat only as feature idea sketch.</li>
            <li>No SaaS/wellness dashboard styles.</li>
            <li>No dark/light toggle.</li>
          </ul>
        </Section>

        <Section title="Browser Agent audit rule">
          <p>Audit in this order, against named routes:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Level 2 structure — <code>/app/practice</code>, <code>/app/worksheets</code>.</li>
            <li>Level 3 behaviour — <code>/app/practice/run</code>, <code>/app/practice/solution-demo</code>, <code>/app/learning-signal-demo</code>.</li>
            <li>Improvement rules — <code>/app/worksheets/ready</code>, <code>/app/worksheets/attempt</code>, <code>/app/check</code>, <code>/app/check/result</code>, <code>/app/me</code>, <code>/app/login</code>.</li>
          </ol>
          <p>Never instruct an agent to "compare vaguely to Level 3 Lovable". Always specify the route and the checklist item.</p>
        </Section>

        <Section title="Production implementation rule">
          <p>Do not compare a future production PR against this prototype unless <code>/app/reference-control</code> is included in the QA prompt.</p>
        </Section>
      </div>

      <div className="mt-6 text-xs text-muted-foreground max-w-5xl">
        Repository note: identical rules are stored at <code>PROTOTYPE_REFERENCE_CONTROL.md</code> in the project root.
      </div>
    </AppLayout>
  );
}
