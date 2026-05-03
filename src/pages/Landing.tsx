import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, FileText, Zap, CheckSquare, Brain, User, ShieldCheck } from "lucide-react";

const features = [
  { icon: Brain, t: "Predicted Questions / HPQs", d: "Topic-wise, selected topics, full subject — modelled on CBSE board patterns." },
  { icon: FileText, t: "Worksheets with Sections A–E", d: "Board-style worksheets you can attempt on screen and check answer-by-answer." },
  { icon: Zap, t: "Quick Practice", d: "One question at a time, with marks, format and difficulty — focused execution." },
  { icon: CheckSquare, t: "Check & Improve", d: "Examiner-style checking with stepwise marking, common mistakes and tips." },
  { icon: Target, t: "Mistake Intelligence", d: "Built only from your saved checked answers — no fake mastery scores." },
  { icon: User, t: "Me / Progress", d: "Your activity, your mistakes, what to practise next — saved to your profile." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/70 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">L</div>
            <div className="font-display text-xl">LazyTopper</div>
          </Link>
          <nav className="flex items-center gap-3">
            <Link to="/app/reference-control" className="text-xs text-muted-foreground hover:text-foreground hidden sm:flex items-center gap-1"><ShieldCheck className="w-3 h-3"/>Reference Control</Link>
            <Link to="/app/login?reason=open-progress"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link to="/app/login?reason=start-trial"><Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">Start 7-day free trial</Button></Link>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="lt-pill-accent mb-5">For CBSE Class 10 · Desktop study cockpit</span>
            <h1 className="text-5xl lg:text-6xl font-display font-semibold leading-[1.05] text-foreground mt-4">
              Practise the way the<br/>board actually marks.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl leading-relaxed">
              LazyTopper is a calm CBSE Class 10 study cockpit: predicted questions, board-style worksheets,
              Quick Practice, Check & Improve, and Mistake Intelligence — all built around how examiners read your answers.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link to="/app/login?reason=start-trial">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Start 7-day free trial <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/app">
                <Button size="lg" variant="outline">Explore cockpit</Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-4">No fake personal data. The trial saves your attempts, mistakes and progress to your profile.</p>
          </div>

          <div className="lt-card p-5 bg-gradient-to-br from-card to-surface">
            <div className="text-xs text-muted-foreground mb-3">Sample · Quick Practice preview</div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Question 3 of 10</span>
                <span>Maths · Quadratic Equations</span>
              </div>
              <div className="flex gap-1.5 mb-3">
                <span className="lt-chip">3 marks</span>
                <span className="lt-chip">Section C</span>
                <span className="lt-chip">Medium</span>
              </div>
              <p className="font-display text-lg leading-snug">Find the roots of the quadratic equation 2x² − 7x + 3 = 0 by factorisation.</p>
              <div className="mt-4 pt-4 border-t border-border flex justify-between text-xs text-muted-foreground">
                <span>Local working only</span>
                <span className="text-accent font-semibold">Show solution →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-3xl font-display font-semibold mb-2">What's inside the cockpit</h2>
        <p className="text-muted-foreground mb-10">Built for CBSE Class 10. Light theme. No clutter.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(f => (
            <div key={f.t} className="lt-card p-5">
              <div className="w-9 h-9 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5" />
              </div>
              <div className="font-semibold mb-1">{f.t}</div>
              <p className="text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        Canonical Continuity Prototype · Light theme only · Reference: <Link to="/app/reference-control" className="underline">/app/reference-control</Link>
      </footer>
    </div>
  );
}
