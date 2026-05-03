# LazyTopper Canonical Continuity Prototype — Reference Control

This prototype is the **canonical continuity reference** for LazyTopper CBSE Class 10 desktop graduation. It exists to lock the source hierarchy across future GPT sessions, Browser Agent QA, and implementation agents.

It is **not a free redesign**. It is a controlled reference prototype.

## Canonical hierarchy

1. **Level 1** — public landing, login gate, desktop shell, sidebar rhythm, cockpit home, light theme, no dark/light toggle.
2. **Level 2** — decision layer: scope → choose mode/action → route to the right learning surface.
3. **Level 3** — execution behaviour: scope → mode → execution → answer/check/solution → learning state → next action.
4. **Level 3 improvements** — additive only. Profile-save trial, AI fallback solutions, worksheet attempt/check loop, clearer login gates, no technical student-facing language, Me/Mistake Intelligence from saved checked evidence only.

## What Level 1 defines
- Public `/` landing (does NOT redirect to `/app`).
- Reason-aware `/app/login` gate.
- Desktop shell, sidebar rhythm, cockpit home (`/app`).
- Light theme only — navy primary, green accent, dark navy sidebar, pale blue/neutral surfaces.
- Fraunces display headings, Inter body. White cards, subtle borders, gentle shadows.

## What Level 2 defines
- Practice decision page with: BackToParent, ContextBar, ScopeBuilder, primary cards (Quick Practice, Worksheet, Predicted/HPQs, Full Mock), more options (Timed Drill, Chapter Test, Practice Paper), Paper Blueprint, Predicted Questions tabs, sample preview, right rail (Mistake Intelligence + quick links).
- Worksheet decision/build page with: BackToParent, ContextBar, ScopeBuilder, mistake-focus mini-section toggle, worksheet preview, Sections A–E, format chips, Save worksheet, Upload your answers, Mistake Intelligence right rail, tip panel.

## What Level 3 defines
- Quick Practice run: one question at a time, counter, marks/section/difficulty/format/subtopic, local working textarea, Mark as attempted, Show solution, Next, Exit, local-only execution state panel, no-mastery copy, fallback to Practice engine.
- Stored Solution Demo: board-style stored solution card, question context, step-by-step, final answer, brief explanation, next action.
- Learning Signal Demo (internal): attempted, solution viewed, next action clicked, local-only, not mastery, not saved progress. The term "Learning Signal" lives ONLY here — never on student-facing pages.

## What improvements add (additive only)
1. 7-day trial profile-save model (signed-in saves; signed-out previews locally).
2. Clear, plain student-friendly login gates.
3. No technical student-facing signal language (use: This practice run, Saved to your profile, Not saved yet, Your activity, Your mistakes, What to practise next).
4. AI fallback solution generation when stored solution missing (Step 1/2/3, Final answer, Common mistake, Examiner tip).
5. Worksheet Level 3 loop: Generate → Ready → Attempt → Check → Examiner result → Mistake feedback → Practise similar / Me Progress.
6. Tutor/examiner quality wording, stepwise marking guidance for 3m/5m, common mistakes, examiner tips, clear separation Attempted / Checked / Mistake logged.
7. Mistake Intelligence and Me/Progress use saved checked evidence ONLY. Signed-out users never see personalised top mistake / weakest subtopic / marks at risk / progress trend. Signed-in demo data must be labelled "Prototype sample based on saved checked answers".

## What must not be used as a reference
- The earlier revised `lazy-smart-loop-lvl3` simplified prototype is **not canonical**. Treat it only as a feature idea sketch.
- Do not introduce SaaS/wellness dashboard styles.
- Do not add a dark/light toggle.

## Browser Agent audit rule
Audit in this order, against named routes:
1. Level 2 structure — `/app/practice`, `/app/worksheets`.
2. Level 3 behaviour — `/app/practice/run`, `/app/practice/solution-demo`, `/app/learning-signal-demo`.
3. Improvement rules — `/app/worksheets/ready`, `/app/worksheets/attempt`, `/app/check`, `/app/check/result`, `/app/me`, `/app/login`.

Never instruct an agent to "compare vaguely to Level 3 Lovable". Always specify the route and the checklist item.

## Production implementation rule
Do not compare a future production PR against this prototype unless `/app/reference-control` is included in the QA prompt.

## Level 2 context rule (mandatory)

Level 2 context must be interactive. Subject, scope, and topic cannot be static labels. Browser Agent must verify Maths vs Science switching, query-param handling, and downstream context carry-forward before passing this prototype.

- Subjects: Maths, Science.
- Streams: Maths → Standard; Science → Physics / Chemistry / Biology / All Science.
- Scope: Single topic, Multi-topic, Full subject.
- Maths sample topics: Trigonometry, Quadratic Equations, Arithmetic Progressions, Circles, Surface Areas and Volumes.
- Science sample topics: Light — Reflection and Refraction, Electricity, Acids/Bases/Salts, Life Processes, Magnetic Effects of Electric Current.
- Routes must read query params: `?subject`, `?stream`, `?scope`, `?topic`, `?topics`, `?source`.
- Supported URL examples:
  - `/app/practice?subject=Maths&scope=topic&topic=trigonometry`
  - `/app/practice?subject=Science&scope=topic&topic=light-reflection-and-refraction`
  - `/app/practice?subject=Maths&scope=multi-topic&topics=trigonometry,quadratic-equations`
  - `/app/practice?subject=Science&scope=full-subject`
  - `/app/worksheets?subject=Science&scope=topic&topic=electricity`
  - `/app/check?source=worksheet&subject=Maths&topic=trigonometry`
- All downstream links from Practice / Worksheets / WorksheetReady / WorksheetAttempt / Check / CheckResult / Me must preserve context in query params.
- Quick Practice, Worksheet preview, sample HPQ, stored solution, stepwise marking, mistake feedback, and Me/Progress recommendations must change to match the active subject and topic.

**Browser Agent decision rule:** HOLD if subject/scope/topic selection is missing, static, or not propagated downstream.
