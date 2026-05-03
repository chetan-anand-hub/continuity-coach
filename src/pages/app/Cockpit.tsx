import { Link } from "react-router-dom";
import { AppLayout, PageHeader } from "@/prototype/AppLayout";
import { usePrototypeAuth } from "@/prototype/auth";
import { Target, FileText, CheckSquare, User, ArrowRight } from "lucide-react";

const tiles = [
  { to: "/app/practice", icon: Target, t: "Practice", d: "Quick Practice, Worksheet, Predicted/HPQs, Full Mock." },
  { to: "/app/worksheets", icon: FileText, t: "Worksheets", d: "Board-style Sections A–E. Save, attempt, check." },
  { to: "/app/check", icon: CheckSquare, t: "Check & Improve", d: "Examiner-style checking with stepwise marking." },
  { to: "/app/me", icon: User, t: "Me / Progress", d: "Your activity, your mistakes, what to practise next." },
];

export default function Cockpit() {
  const { mode } = usePrototypeAuth();
  return (
    <AppLayout>
      <PageHeader kicker="Cockpit · CBSE Class 10" title="Welcome back" sub="Pick a surface to start. Everything is built around how the board marks your answers." />

      <div className={`lt-card p-4 mb-6 border-l-4 ${mode === "signed-in" ? "border-l-accent" : "border-l-primary"}`}>
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Trial status</div>
        <div className="text-sm">
          {mode === "signed-in"
            ? <>Signed in (7-day trial). Your attempts, worksheets, checked answers and mistakes <span className="font-semibold text-accent">save to your profile</span>.</>
            : <>Not signed in. You can preview and generate things locally — but profile progress and Mistake Intelligence will not update. <Link to="/app/login?reason=start-trial" className="underline font-semibold">Start trial</Link></>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {tiles.map(t => (
          <Link key={t.to} to={t.to} className="lt-card p-5 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center"><t.icon className="w-5 h-5"/></div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors"/>
            </div>
            <div className="font-display text-xl mt-3">{t.t}</div>
            <p className="text-sm text-muted-foreground mt-1">{t.d}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-xs text-muted-foreground">
        This prototype is the canonical continuity reference. See <Link to="/app/reference-control" className="underline">/app/reference-control</Link>.
      </div>
    </AppLayout>
  );
}
