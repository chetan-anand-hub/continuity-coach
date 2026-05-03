import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export type Subject = "Maths" | "Science";
export type Scope = "topic" | "multi-topic" | "full-subject";
export type Stream =
  | "Standard"
  | "Physics"
  | "Chemistry"
  | "Biology"
  | "All Science";

export interface TopicDef {
  slug: string;
  label: string;
  stream?: Stream;
}

export const TOPICS: Record<Subject, TopicDef[]> = {
  Maths: [
    { slug: "trigonometry", label: "Trigonometry", stream: "Standard" },
    { slug: "quadratic-equations", label: "Quadratic Equations", stream: "Standard" },
    { slug: "arithmetic-progressions", label: "Arithmetic Progressions", stream: "Standard" },
    { slug: "circles", label: "Circles", stream: "Standard" },
    { slug: "surface-areas-and-volumes", label: "Surface Areas and Volumes", stream: "Standard" },
  ],
  Science: [
    { slug: "light-reflection-and-refraction", label: "Light — Reflection and Refraction", stream: "Physics" },
    { slug: "electricity", label: "Electricity", stream: "Physics" },
    { slug: "magnetic-effects-of-electric-current", label: "Magnetic Effects of Electric Current", stream: "Physics" },
    { slug: "acids-bases-and-salts", label: "Acids, Bases and Salts", stream: "Chemistry" },
    { slug: "life-processes", label: "Life Processes", stream: "Biology" },
  ],
};

export const STREAMS: Record<Subject, Stream[]> = {
  Maths: ["Standard"],
  Science: ["Physics", "Chemistry", "Biology", "All Science"],
};

export interface StudyContext {
  subject: Subject;
  stream: Stream;
  scope: Scope;
  topic: string | null;          // slug
  selectedTopics: string[];      // slugs (multi-topic)
  source: string | null;         // e.g. worksheet, practice
}

export const DEFAULT_CONTEXT: StudyContext = {
  subject: "Maths",
  stream: "Standard",
  scope: "topic",
  topic: "trigonometry",
  selectedTopics: ["trigonometry"],
  source: null,
};

function normalizeSubject(v?: string | null): Subject {
  if (v && v.toLowerCase().startsWith("sci")) return "Science";
  return "Maths";
}
function normalizeScope(v?: string | null): Scope {
  if (v === "multi-topic" || v === "multi") return "multi-topic";
  if (v === "full-subject" || v === "full") return "full-subject";
  return "topic";
}
function normalizeStream(subject: Subject, v?: string | null): Stream {
  const allowed = STREAMS[subject];
  if (v && (allowed as string[]).includes(v)) return v as Stream;
  return allowed[0];
}

export function topicLabel(subject: Subject, slug: string | null): string {
  if (!slug) return "";
  const t = TOPICS[subject].find(x => x.slug === slug);
  return t?.label ?? slug;
}

export function readContextFromParams(params: URLSearchParams): StudyContext {
  const subject = normalizeSubject(params.get("subject"));
  const scope = normalizeScope(params.get("scope"));
  const stream = normalizeStream(subject, params.get("stream"));
  const subjectTopics = TOPICS[subject].map(t => t.slug);

  let topic = params.get("topic");
  if (topic && !subjectTopics.includes(topic)) topic = null;

  const topicsRaw = params.get("topics");
  let selectedTopics: string[] = [];
  if (topicsRaw) {
    selectedTopics = topicsRaw.split(",").map(s => s.trim()).filter(s => subjectTopics.includes(s));
  }

  if (scope === "topic") {
    if (!topic) topic = subjectTopics[0];
    selectedTopics = [topic];
  } else if (scope === "multi-topic") {
    if (selectedTopics.length === 0) selectedTopics = subjectTopics.slice(0, 2);
    topic = null;
  } else {
    topic = null;
    selectedTopics = [];
  }

  return {
    subject,
    stream,
    scope,
    topic,
    selectedTopics,
    source: params.get("source"),
  };
}

export function contextToParams(ctx: Partial<StudyContext>, extra: Record<string, string> = {}): string {
  const sp = new URLSearchParams();
  if (ctx.subject) sp.set("subject", ctx.subject);
  if (ctx.stream && ctx.subject && ctx.stream !== STREAMS[ctx.subject][0]) sp.set("stream", ctx.stream);
  if (ctx.scope) sp.set("scope", ctx.scope);
  if (ctx.scope === "topic" && ctx.topic) sp.set("topic", ctx.topic);
  if (ctx.scope === "multi-topic" && ctx.selectedTopics?.length) sp.set("topics", ctx.selectedTopics.join(","));
  if (ctx.source) sp.set("source", ctx.source);
  for (const [k, v] of Object.entries(extra)) sp.set(k, v);
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export function buildLink(path: string, ctx: Partial<StudyContext>, extra: Record<string, string> = {}): string {
  return `${path}${contextToParams(ctx, extra)}`;
}

export function useStudyContext(): {
  ctx: StudyContext;
  setCtx: (patch: Partial<StudyContext>) => void;
  link: (path: string, extra?: Record<string, string>) => string;
} {
  const [params, setParams] = useSearchParams();
  const ctx = useMemo(() => readContextFromParams(params), [params]);

  const setCtx = (patch: Partial<StudyContext>) => {
    const next: StudyContext = { ...ctx, ...patch };
    // If subject changed, reset stream/topics if incompatible
    if (patch.subject && patch.subject !== ctx.subject) {
      next.stream = STREAMS[patch.subject][0];
      const subjectTopics = TOPICS[patch.subject].map(t => t.slug);
      if (next.topic && !subjectTopics.includes(next.topic)) next.topic = subjectTopics[0];
      next.selectedTopics = next.selectedTopics.filter(s => subjectTopics.includes(s));
      if (next.scope === "topic" && !next.topic) next.topic = subjectTopics[0];
      if (next.scope === "multi-topic" && next.selectedTopics.length === 0) {
        next.selectedTopics = subjectTopics.slice(0, 2);
      }
    }
    if (patch.scope) {
      const subjectTopics = TOPICS[next.subject].map(t => t.slug);
      if (patch.scope === "topic" && !next.topic) next.topic = subjectTopics[0];
      if (patch.scope === "multi-topic" && next.selectedTopics.length === 0) {
        next.selectedTopics = next.topic ? [next.topic] : subjectTopics.slice(0, 2);
      }
      if (patch.scope === "full-subject") {
        next.topic = null;
        next.selectedTopics = [];
      }
    }
    const sp = new URLSearchParams(contextToParams(next).replace(/^\?/, ""));
    // preserve source if not patched
    if (next.source) sp.set("source", next.source);
    setParams(sp, { replace: true });
  };

  const link = (path: string, extra: Record<string, string> = {}) => buildLink(path, ctx, extra);

  return { ctx, setCtx, link };
}

// ---------- Sample question/HPQ data per topic ----------

export interface Sample {
  hpq: string;
  marks: number;
  section: "A" | "B" | "C" | "D" | "E";
  format: string;
  subtopic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  practiceQuestions: { q: string; marks: number; section: string; diff: string; format: string; subtopic: string }[];
  worksheetQuestions: { s: string; m: number; q: string }[];
  storedSolution: string;
  stepwise: [string, "✓" | "✗", string][];
  mistakeFeedback: string;
  practiseNext: string;
  marksLine: string; // result header line e.g. "Trigonometry · Section C · Stepwise"
}

export const SAMPLES: Record<string, Sample> = {
  trigonometry: {
    hpq: "Prove that (sin θ + cosec θ)² + (cos θ + sec θ)² = 7 + tan² θ + cot² θ.",
    marks: 3, section: "C", format: "SA", subtopic: "Identities", difficulty: "Medium",
    practiceQuestions: [
      { q: "If sin θ = 3/5, find the value of cos θ and tan θ.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Ratios" },
      { q: "Prove that (1 + tan² θ)/(1 + cot² θ) = tan² θ.", marks: 3, section: "C", diff: "Medium", format: "SA", subtopic: "Identities" },
      { q: "From a point on the ground, the angle of elevation of the top of a 30 m tower is 60°. Find the distance from the tower.", marks: 3, section: "C", diff: "Medium", format: "SA", subtopic: "Heights & Distances" },
    ],
    worksheetQuestions: [
      { s: "B", m: 2, q: "Evaluate sin 30° cos 60° + cos 30° sin 60°." },
      { s: "C", m: 3, q: "Prove that (1 − cos θ)/(1 + cos θ) = (cosec θ − cot θ)²." },
      { s: "D", m: 5, q: "The angles of elevation of the top of a tower from two points distant a and b from its base and on the same side are complementary. Prove that the height of the tower is √(ab)." },
    ],
    storedSolution: "(1 − cos θ)/(1 + cos θ) = ((1 − cos θ)²)/((1 + cos θ)(1 − cos θ)) = (1 − cos θ)²/sin² θ = ((1 − cos θ)/sin θ)² = (cosec θ − cot θ)².",
    stepwise: [
      ["Multiply numerator and denominator by (1 − cos θ)", "✓", "1/1"],
      ["Use 1 − cos² θ = sin² θ", "✓", "1/1"],
      ["Express as (cosec θ − cot θ)² and conclude", "✗", "0/1"],
    ],
    mistakeFeedback: "You did not write the final identity in the (cosec θ − cot θ)² form. Examiners deduct the final step mark when the proof does not close to the asked RHS.",
    practiseNext: "Practise 5 trigonometry identity questions",
    marksLine: "Trigonometry · Section C · Stepwise",
  },
  "quadratic-equations": {
    hpq: "If the roots of the equation (b−c)x² + (c−a)x + (a−b) = 0 are equal, prove that 2b = a + c.",
    marks: 3, section: "C", format: "SA", subtopic: "Discriminant", difficulty: "Medium",
    practiceQuestions: [
      { q: "Find the roots of 2x² − 7x + 3 = 0 by factorisation.", marks: 3, section: "C", diff: "Medium", format: "SA", subtopic: "Factorisation" },
      { q: "If one root of x² + px + 12 = 0 is 4, find p and the other root.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Roots" },
      { q: "Determine the nature of the roots of 3x² − 5x + 2 = 0.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Discriminant" },
    ],
    worksheetQuestions: [
      { s: "B", m: 2, q: "State the nature of roots of x² + 4x + 4 = 0." },
      { s: "C", m: 3, q: "Find the roots of 2x² − 7x + 3 = 0 by factorisation." },
      { s: "D", m: 5, q: "A train travels 360 km at uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less. Find the speed." },
    ],
    storedSolution: "2x² − 6x − x + 3 = 0 → 2x(x − 3) − 1(x − 3) = 0 → (2x − 1)(x − 3) = 0. Roots: x = 1/2, x = 3.",
    stepwise: [
      ["Splitting the middle term", "✓", "1/1"],
      ["Grouping & common factor", "✓", "1/1"],
      ["Final roots stated and verified", "✗", "0/1"],
    ],
    mistakeFeedback: "You stated the factors but did not verify the roots by substitution. CBSE markers expect a final verification on 3-mark factorisation problems.",
    practiseNext: "Practise 3-mark factorisation with verification",
    marksLine: "Quadratic Equations · Section C · Stepwise",
  },
  "arithmetic-progressions": {
    hpq: "The sum of first n terms of an AP is given by Sₙ = 3n² + 5n. Find its 25th term.",
    marks: 3, section: "C", format: "SA", subtopic: "nth term", difficulty: "Medium",
    practiceQuestions: [
      { q: "Find the 11th term of the AP: 2, 7, 12, …", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "nth term" },
      { q: "How many two-digit numbers are divisible by 3?", marks: 3, section: "C", diff: "Medium", format: "SA", subtopic: "Counting AP terms" },
      { q: "Find the sum of first 50 even natural numbers.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Sum" },
    ],
    worksheetQuestions: [
      { s: "B", m: 2, q: "Find the common difference of the AP: 1/3, 5/3, 9/3, …" },
      { s: "C", m: 3, q: "Find the sum of first 22 terms of the AP: 8, 3, −2, …" },
      { s: "D", m: 5, q: "If the sum of first 7 terms of an AP is 49 and that of first 17 terms is 289, find the sum of first n terms." },
    ],
    storedSolution: "aₙ = Sₙ − Sₙ₋₁ = (3n² + 5n) − (3(n−1)² + 5(n−1)) = 6n + 2. So a₂₅ = 152.",
    stepwise: [
      ["Use aₙ = Sₙ − Sₙ₋₁", "✓", "1/1"],
      ["Simplify to 6n + 2", "✓", "1/1"],
      ["Substitute n = 25 and state final answer", "✗", "0/1"],
    ],
    mistakeFeedback: "You derived the general term but did not finish the substitution. Always state the final numeric answer for full marks.",
    practiseNext: "Practise AP sum and nth term questions",
    marksLine: "Arithmetic Progressions · Section C · Stepwise",
  },
  circles: {
    hpq: "Prove that the lengths of tangents drawn from an external point to a circle are equal.",
    marks: 3, section: "C", format: "SA", subtopic: "Tangents", difficulty: "Medium",
    practiceQuestions: [
      { q: "From a point P, 13 cm away from the centre of a circle of radius 5 cm, find the length of the tangent.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Tangent length" },
      { q: "Two tangents PA and PB are drawn from external point P to a circle. Prove ∠APB + ∠AOB = 180°.", marks: 3, section: "C", diff: "Medium", format: "SA", subtopic: "Tangent angles" },
      { q: "A quadrilateral ABCD is drawn to circumscribe a circle. Prove AB + CD = AD + BC.", marks: 3, section: "C", diff: "Medium", format: "SA", subtopic: "Tangent properties" },
    ],
    worksheetQuestions: [
      { s: "B", m: 2, q: "Define the tangent to a circle at a point." },
      { s: "C", m: 3, q: "Prove that the tangent at any point of a circle is perpendicular to the radius through the point of contact." },
      { s: "D", m: 5, q: "Two concentric circles have radii 5 cm and 3 cm. Find the length of the chord of the larger circle that touches the smaller circle." },
    ],
    storedSolution: "OP common, OA = OB (radii), ∠OAP = ∠OBP = 90°. By RHS, ΔOAP ≅ ΔOBP, hence PA = PB.",
    stepwise: [
      ["Identify radii and right angles", "✓", "1/1"],
      ["Apply RHS congruence", "✓", "1/1"],
      ["Conclude PA = PB by CPCT", "✗", "0/1"],
    ],
    mistakeFeedback: "You proved congruence but did not state the CPCT conclusion. Examiners require the final equal-tangent statement explicitly.",
    practiseNext: "Practise tangent–radius proofs with CPCT",
    marksLine: "Circles · Section C · Stepwise",
  },
  "surface-areas-and-volumes": {
    hpq: "A solid is in the shape of a cone mounted on a hemisphere of same radius 7 cm. The total height is 21 cm. Find the volume of the solid.",
    marks: 3, section: "C", format: "SA", subtopic: "Combined solids", difficulty: "Medium",
    practiceQuestions: [
      { q: "Find the volume of a cone of radius 7 cm and height 24 cm.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Cone volume" },
      { q: "A hemispherical bowl has internal radius 9 cm. Find the volume of water it can hold.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Hemisphere" },
      { q: "A cylindrical pencil sharpened at one edge is the combination of a cylinder and a cone. Find total surface area for r = 3.5 mm, cylinder length = 8 mm, cone height = 5 mm.", marks: 3, section: "C", diff: "Medium", format: "SA", subtopic: "Combined surface area" },
    ],
    worksheetQuestions: [
      { s: "B", m: 2, q: "Find the curved surface area of a hemisphere of radius 7 cm." },
      { s: "C", m: 3, q: "A cone of height 24 cm and base radius 7 cm is melted and recast into a sphere. Find the radius of the sphere." },
      { s: "D", m: 5, q: "A vessel is in the form of a hemisphere mounted by a hollow cylinder. The diameter of the hemisphere is 14 cm and total height is 13 cm. Find inner surface area." },
    ],
    storedSolution: "Cone height = 21 − 7 = 14 cm. Volume = (1/3)π(7)²(14) + (2/3)π(7)³ = 718.67 + 718.67 ≈ 1437.33 cm³.",
    stepwise: [
      ["Find cone height from total height", "✓", "1/1"],
      ["Compute cone and hemisphere volumes", "✓", "1/1"],
      ["Add and state final answer with units", "✗", "0/1"],
    ],
    mistakeFeedback: "You computed the parts but did not state the combined volume with units. Always include cm³ for the final mark.",
    practiseNext: "Practise combined-solid volume problems",
    marksLine: "Surface Areas and Volumes · Section C · Stepwise",
  },
  "light-reflection-and-refraction": {
    hpq: "An object is placed 20 cm in front of a concave mirror of focal length 15 cm. Find the position, nature and magnification of the image.",
    marks: 3, section: "C", format: "SA", subtopic: "Mirror formula", difficulty: "Medium",
    practiceQuestions: [
      { q: "State the laws of refraction of light.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Refraction laws" },
      { q: "An object is placed at 30 cm from a convex lens of focal length 20 cm. Find the image distance using the lens formula.", marks: 3, section: "C", diff: "Medium", format: "SA", subtopic: "Lens formula" },
      { q: "Draw a ray diagram for an object placed beyond C in a concave mirror.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Ray diagrams" },
    ],
    worksheetQuestions: [
      { s: "B", m: 2, q: "Define refractive index of a medium." },
      { s: "C", m: 3, q: "An object is placed at 25 cm in front of a convex lens of focal length 10 cm. Find the image distance and magnification." },
      { s: "D", m: 5, q: "Derive the mirror formula for a concave mirror using ray diagram and similar triangles." },
    ],
    storedSolution: "Using 1/v − 1/u = 1/f with u = −20, f = −15 → 1/v = 1/(-15) − 1/(-20) = −1/60. So v = −60 cm. m = −v/u = −3. Image is real, inverted, magnified.",
    stepwise: [
      ["Apply mirror formula with sign convention", "✓", "1/1"],
      ["Solve for v correctly", "✓", "1/1"],
      ["State nature (real, inverted, magnified) and magnification", "✗", "0/1"],
    ],
    mistakeFeedback: "You found v but did not state the nature of the image and magnification. CBSE expects all three: position, nature, magnification.",
    practiseNext: "Revise ray diagrams and lens/mirror formula numericals",
    marksLine: "Light — Reflection and Refraction · Section C · Stepwise",
  },
  electricity: {
    hpq: "Two resistors of 4 Ω and 6 Ω are connected in parallel across a 12 V battery. Find the current drawn from the battery and the power dissipated.",
    marks: 3, section: "C", format: "SA", subtopic: "Ohm's law & power", difficulty: "Medium",
    practiceQuestions: [
      { q: "State Ohm's law and write its mathematical form.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Ohm's law" },
      { q: "Three resistors of 2 Ω, 3 Ω and 6 Ω are connected in parallel. Find the equivalent resistance.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Parallel" },
      { q: "An electric bulb is rated 220 V and 100 W. Calculate the resistance of its filament.", marks: 3, section: "C", diff: "Medium", format: "SA", subtopic: "Power" },
    ],
    worksheetQuestions: [
      { s: "B", m: 2, q: "Define electric power and write its SI unit." },
      { s: "C", m: 3, q: "Calculate the heat produced in a 5 Ω resistor when 2 A current flows for 30 s." },
      { s: "D", m: 5, q: "Derive the expression for equivalent resistance of three resistors connected in series and in parallel." },
    ],
    storedSolution: "1/R = 1/4 + 1/6 = 5/12, R = 2.4 Ω. I = V/R = 12/2.4 = 5 A. P = VI = 60 W.",
    stepwise: [
      ["Compute equivalent parallel resistance", "✓", "1/1"],
      ["Apply Ohm's law for current", "✓", "1/1"],
      ["Compute and state power with units", "✗", "0/1"],
    ],
    mistakeFeedback: "You computed current but missed stating the power with units. Always close numerical questions with the asked quantity and unit.",
    practiseNext: "Practise Ohm's law and power numericals",
    marksLine: "Electricity · Section C · Stepwise",
  },
  "magnetic-effects-of-electric-current": {
    hpq: "Describe an activity to show that a current-carrying conductor experiences a force in a magnetic field. State the rule used to find the direction of the force.",
    marks: 3, section: "C", format: "SA", subtopic: "Force on conductor", difficulty: "Medium",
    practiceQuestions: [
      { q: "State Fleming's left-hand rule.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Rules" },
      { q: "Draw the magnetic field pattern around a straight current-carrying conductor.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Field patterns" },
      { q: "Explain the working of an electric motor with a labelled diagram.", marks: 3, section: "C", diff: "Medium", format: "SA", subtopic: "Motor" },
    ],
    worksheetQuestions: [
      { s: "B", m: 2, q: "Define magnetic field and state its SI unit." },
      { s: "C", m: 3, q: "State and explain the right-hand thumb rule with a diagram." },
      { s: "D", m: 5, q: "Explain the principle, construction and working of an AC generator with a labelled diagram." },
    ],
    storedSolution: "A current-carrying rod placed perpendicular to a magnetic field experiences a force F = BIL. Direction is given by Fleming's left-hand rule.",
    stepwise: [
      ["Describe activity setup", "✓", "1/1"],
      ["State force expression / observation", "✓", "1/1"],
      ["State and apply Fleming's left-hand rule", "✗", "0/1"],
    ],
    mistakeFeedback: "You described the activity but did not name and apply Fleming's left-hand rule. The rule must be named for full marks.",
    practiseNext: "Practise rules and motor/generator diagram questions",
    marksLine: "Magnetic Effects of Electric Current · Section C · Stepwise",
  },
  "acids-bases-and-salts": {
    hpq: "Explain why aqueous solutions of acids conduct electricity while dry HCl gas does not.",
    marks: 3, section: "C", format: "SA", subtopic: "Ionisation", difficulty: "Medium",
    practiceQuestions: [
      { q: "Define a strong acid with one example.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Acids" },
      { q: "What happens when zinc reacts with dilute sulphuric acid? Write the equation.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Reactions" },
      { q: "Explain the preparation and uses of bleaching powder.", marks: 3, section: "C", diff: "Medium", format: "SA", subtopic: "Salts" },
    ],
    worksheetQuestions: [
      { s: "B", m: 2, q: "Define pH. What is the pH range of acids?" },
      { s: "C", m: 3, q: "Write balanced equations for reactions of dilute HCl with (i) NaOH (ii) Na₂CO₃ (iii) Zn." },
      { s: "D", m: 5, q: "Explain the manufacture, properties and uses of washing soda and baking soda." },
    ],
    storedSolution: "Dry HCl has no free H⁺ ions. In water, HCl ionises to H⁺ and Cl⁻; these mobile ions carry charge, so the solution conducts.",
    stepwise: [
      ["State that conduction needs free ions", "✓", "1/1"],
      ["Explain ionisation of HCl in water", "✓", "1/1"],
      ["Conclude with comparison to dry HCl", "✗", "0/1"],
    ],
    mistakeFeedback: "You explained ionisation but did not close the comparison with dry HCl. The conclusion line is needed for full marks.",
    practiseNext: "Practise acid–base ionisation and reaction-equation questions",
    marksLine: "Acids, Bases and Salts · Section C · Stepwise",
  },
  "life-processes": {
    hpq: "Describe the process of double circulation in human beings. Why is it necessary?",
    marks: 3, section: "C", format: "SA", subtopic: "Transportation", difficulty: "Medium",
    practiceQuestions: [
      { q: "Define nutrition. Name two modes of nutrition.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Nutrition" },
      { q: "Write the balanced equation of photosynthesis.", marks: 2, section: "B", diff: "Easy", format: "VSA", subtopic: "Photosynthesis" },
      { q: "Explain the structure and function of nephron with a diagram.", marks: 3, section: "C", diff: "Medium", format: "SA", subtopic: "Excretion" },
    ],
    worksheetQuestions: [
      { s: "B", m: 2, q: "Why is small intestine longer in herbivores than carnivores?" },
      { s: "C", m: 3, q: "Describe the mechanism of breathing in humans." },
      { s: "D", m: 5, q: "Draw a labelled diagram of human heart and explain the path of blood through it." },
    ],
    storedSolution: "Blood passes through the heart twice in one cycle: once as deoxygenated blood (right side → lungs) and once as oxygenated blood (left side → body). This separation keeps oxygenated and deoxygenated blood from mixing and ensures efficient supply of oxygen.",
    stepwise: [
      ["Define double circulation", "✓", "1/1"],
      ["Describe the two circuits", "✓", "1/1"],
      ["State why it is necessary", "✗", "0/1"],
    ],
    mistakeFeedback: "You described both circuits but did not state the necessity (efficient oxygen supply, no mixing). The 'why' part is required for full marks.",
    practiseNext: "Revise circulation diagrams and 'why' explanation questions",
    marksLine: "Life Processes · Section C · Stepwise",
  },
};

export function getSample(ctx: StudyContext): Sample {
  const slug = ctx.topic ?? ctx.selectedTopics[0] ?? TOPICS[ctx.subject][0].slug;
  return SAMPLES[slug] ?? SAMPLES[TOPICS[ctx.subject][0].slug];
}

export function contextDescription(ctx: StudyContext): string {
  if (ctx.scope === "full-subject") return `Full subject · ${ctx.subject}`;
  if (ctx.scope === "multi-topic") {
    const labels = ctx.selectedTopics.map(s => topicLabel(ctx.subject, s));
    return `Multi-topic · ${labels.join(", ")}`;
  }
  return topicLabel(ctx.subject, ctx.topic);
}
