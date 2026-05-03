import { NavLink, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { usePrototypeAuth } from "@/prototype/auth";
import {
  Home, Target, FileText, CheckSquare, User, BookOpen,
  Sparkles, ShieldCheck, FlaskConical
} from "lucide-react";

const nav = [
  { to: "/app", label: "Cockpit", icon: Home, end: true },
  { to: "/app/practice", label: "Practice", icon: Target },
  { to: "/app/worksheets", label: "Worksheets", icon: FileText },
  { to: "/app/check", label: "Check & Improve", icon: CheckSquare },
  { to: "/app/me", label: "Me / Progress", icon: User },
];

const demoNav = [
  { to: "/app/practice/solution-demo", label: "Solution Demo", icon: BookOpen },
  { to: "/app/learning-signal-demo", label: "Learning Signal Demo", icon: FlaskConical },
  { to: "/app/reference-control", label: "Reference Control", icon: ShieldCheck },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const { mode, setMode } = usePrototypeAuth();
  const loc = useLocation();
  return (
    <div className="min-h-screen flex bg-surface-pale">
      <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="px-5 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-display font-bold">L</div>
            <div>
              <div className="font-display text-lg leading-none">LazyTopper</div>
              <div className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60 mt-1">CBSE Class 10</div>
            </div>
          </div>
        </div>
        <nav className="px-3 py-4 space-y-0.5 flex-1">
          <div className="px-2 mb-2 text-[10px] uppercase tracking-widest text-sidebar-foreground/50">Study</div>
          {nav.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50 text-sidebar-foreground/85"}`}>
              <n.icon className="w-4 h-4" />{n.label}
            </NavLink>
          ))}
          <div className="px-2 mt-6 mb-2 text-[10px] uppercase tracking-widest text-sidebar-foreground/50">Prototype refs</div>
          {demoNav.map(n => (
            <NavLink key={n.to} to={n.to}
              className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50 text-sidebar-foreground/70"}`}>
              <n.icon className="w-4 h-4" />{n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border space-y-2">
          <div className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50">Prototype mode</div>
          <div className="flex rounded-md overflow-hidden border border-sidebar-border text-xs">
            <button onClick={() => setMode("signed-out")} className={`flex-1 py-1.5 ${mode === "signed-out" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70"}`}>Signed-out</button>
            <button onClick={() => setMode("signed-in")} className={`flex-1 py-1.5 ${mode === "signed-in" ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/70"}`}>Signed-in (trial)</button>
          </div>
          <div className="text-[10px] text-sidebar-foreground/50 leading-snug">
            Prototype toggle. No backend. Demo data labelled as sample.
          </div>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <div className="border-b border-border bg-card/60 backdrop-blur px-8 py-3 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Canonical Continuity Prototype</span>
            <span className="mx-2">·</span>
            <span>Route: <code className="text-foreground">{loc.pathname}</code></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="lt-pill-accent"><Sparkles className="w-3 h-3" />7-day trial</span>
            <span className={`lt-chip ${mode === "signed-in" ? "border-accent/30 text-accent" : ""}`}>{mode === "signed-in" ? "Signed-in" : "Not signed in"}</span>
          </div>
        </div>
        <div className="px-8 py-8 max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export function PageHeader({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div className="mb-6">
      {kicker && <div className="lt-section-title mb-2">{kicker}</div>}
      <h1 className="text-3xl font-display font-semibold text-foreground">{title}</h1>
      {sub && <p className="text-muted-foreground mt-1.5">{sub}</p>}
    </div>
  );
}

export function BackToParent({ to, label }: { to: string; label: string }) {
  return (
    <NavLink to={to} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4">
      ← {label}
    </NavLink>
  );
}

export function ContextBar({ items }: { items: { k: string; v: string }[] }) {
  return (
    <div className="lt-card px-4 py-3 mb-5 flex flex-wrap gap-x-6 gap-y-2 text-xs">
      {items.map(i => (
        <div key={i.k}><span className="text-muted-foreground">{i.k}:</span> <span className="font-semibold text-foreground">{i.v}</span></div>
      ))}
    </div>
  );
}
