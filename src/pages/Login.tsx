import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePrototypeAuth } from "@/prototype/auth";

const REASONS: Record<string, { title: string; why: string; cta: string }> = {
  "start-trial": {
    title: "Start your 7-day free trial",
    why: "Sign in to save your attempts, worksheets, checked answers and mistakes — so LazyTopper can guide what to practise next.",
    cta: "Start trial",
  },
  "save-worksheet": {
    title: "Sign in to save this worksheet",
    why: "Your worksheet will be saved to your profile so you can attempt it later and we can track your mistakes.",
    cta: "Sign in & save worksheet",
  },
  "grade-answer": {
    title: "Sign in to check this answer",
    why: "Checked answers are saved to your profile so Mistake Intelligence and Me / Progress reflect real evidence.",
    cta: "Sign in & check answer",
  },
  "open-progress": {
    title: "Sign in to open your progress",
    why: "Me / Progress and Mistake Intelligence are built only from your saved checked answers.",
    cta: "Sign in",
  },
};

export default function Login() {
  const [params] = useSearchParams();
  const reason = (params.get("reason") as keyof typeof REASONS) || "start-trial";
  const r = REASONS[reason] || REASONS["start-trial"];
  const { setMode } = usePrototypeAuth();
  const nav = useNavigate();

  const signIn = () => { setMode("signed-in"); nav("/app"); };
  const continueWithoutSaving = () => { setMode("signed-out"); nav("/app"); };

  return (
    <div className="min-h-screen bg-surface-pale flex items-center justify-center p-6">
      <div className="w-full max-w-md lt-card p-7 bg-card">
        <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Back to home</Link>
        <div className="mt-3 lt-pill-accent">{reason.replace("-", " ")}</div>
        <h1 className="text-2xl font-display font-semibold mt-3">{r.title}</h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{r.why}</p>

        <div className="mt-6 space-y-3">
          <div>
            <Label htmlFor="e" className="text-xs">Email</Label>
            <Input id="e" placeholder="you@school.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="p" className="text-xs">Password</Label>
            <Input id="p" type="password" placeholder="••••••••" className="mt-1" />
          </div>
        </div>

        <Button onClick={signIn} className="w-full mt-5 bg-accent hover:bg-accent/90 text-accent-foreground">{r.cta}</Button>

        <div className="mt-4 pt-4 border-t border-border">
          <button onClick={continueWithoutSaving} className="text-xs text-muted-foreground hover:text-foreground underline">
            Continue without saving
          </button>
          <p className="text-[11px] text-muted-foreground mt-1.5 leading-snug">
            You can still preview and generate things locally. Your profile progress and Mistake Intelligence will not update until you sign in.
          </p>
        </div>

        <div className="mt-5 text-[10px] text-muted-foreground/70 border-t border-border pt-3">
          Prototype: this gate is reason-aware. Variants: <code>start-trial</code>, <code>save-worksheet</code>, <code>grade-answer</code>, <code>open-progress</code>.
        </div>
      </div>
    </div>
  );
}
