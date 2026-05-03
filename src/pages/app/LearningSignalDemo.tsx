import { AppLayout, PageHeader, BackToParent } from "@/prototype/AppLayout";

export default function LearningSignalDemo() {
  return (
    <AppLayout>
      <BackToParent to="/app" label="Back to Cockpit" />
      <PageHeader
        kicker="Internal · Locked Level 3 baseline"
        title="Learning Signal Demo"
        sub="This route preserves the locked Level 3 concept. The term 'Learning Signal' lives only here. Student-facing pages must not use it."
      />

      <div className="grid lg:grid-cols-2 gap-4 max-w-4xl">
        <div className="lt-card p-5">
          <div className="lt-section-title mb-3">Learning Signal — captured</div>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><span className="text-accent">●</span> attempted: <span className="font-semibold ml-auto">true</span></li>
            <li className="flex gap-2"><span className="text-accent">●</span> solution viewed: <span className="font-semibold ml-auto">true</span></li>
            <li className="flex gap-2"><span className="text-accent">●</span> next action clicked: <span className="font-semibold ml-auto">next_question</span></li>
          </ul>
        </div>
        <div className="lt-card p-5 bg-surface">
          <div className="lt-section-title mb-3">Strict properties</div>
          <ul className="space-y-2 text-sm">
            <li>✓ local-only</li>
            <li>✗ not mastery</li>
            <li>✗ not saved progress</li>
          </ul>
          <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground leading-snug">
            Saved profile signal is produced only after Check & Improve writes a checked answer.
          </div>
        </div>
      </div>

      <div className="mt-6 lt-card p-4 text-xs text-muted-foreground max-w-4xl">
        <strong className="text-foreground">QA note:</strong> Browser Agent must verify that <code>/app/practice/run</code> never displays the words
        “learning signal”, “event”, “contract”, “persistence”, “durable”, or “internal”. Those terms are reserved for this demo route.
      </div>
    </AppLayout>
  );
}
