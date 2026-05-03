import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Mode = "signed-in" | "signed-out";
type LoginReason = "start-trial" | "save-worksheet" | "grade-answer" | "open-progress" | null;

interface PrototypeAuthCtx {
  mode: Mode;
  setMode: (m: Mode) => void;
  loginReason: LoginReason;
  setLoginReason: (r: LoginReason) => void;
}

const Ctx = createContext<PrototypeAuthCtx | null>(null);

export function PrototypeAuthProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(() => (localStorage.getItem("lt-mode") as Mode) || "signed-out");
  const [loginReason, setLoginReason] = useState<LoginReason>(null);
  useEffect(() => { localStorage.setItem("lt-mode", mode); }, [mode]);
  return (
    <Ctx.Provider value={{ mode, setMode: setModeState, loginReason, setLoginReason }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePrototypeAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePrototypeAuth missing provider");
  return v;
}
