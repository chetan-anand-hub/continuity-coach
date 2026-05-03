import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PrototypeAuthProvider } from "@/prototype/auth";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Cockpit from "./pages/app/Cockpit";
import Practice from "./pages/app/Practice";
import PracticeRun from "./pages/app/PracticeRun";
import SolutionDemo from "./pages/app/SolutionDemo";
import LearningSignalDemo from "./pages/app/LearningSignalDemo";
import Worksheets from "./pages/app/Worksheets";
import WorksheetReady from "./pages/app/WorksheetReady";
import WorksheetAttempt from "./pages/app/WorksheetAttempt";
import Check from "./pages/app/Check";
import CheckResult from "./pages/app/CheckResult";
import Me from "./pages/app/Me";
import ReferenceControl from "./pages/app/ReferenceControl";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PrototypeAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app/login" element={<Login />} />
            <Route path="/app" element={<Cockpit />} />
            <Route path="/app/practice" element={<Practice />} />
            <Route path="/app/practice/run" element={<PracticeRun />} />
            <Route path="/app/practice/solution-demo" element={<SolutionDemo />} />
            <Route path="/app/learning-signal-demo" element={<LearningSignalDemo />} />
            <Route path="/app/worksheets" element={<Worksheets />} />
            <Route path="/app/worksheets/ready" element={<WorksheetReady />} />
            <Route path="/app/worksheets/attempt" element={<WorksheetAttempt />} />
            <Route path="/app/check" element={<Check />} />
            <Route path="/app/check/result" element={<CheckResult />} />
            <Route path="/app/me" element={<Me />} />
            <Route path="/app/reference-control" element={<ReferenceControl />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PrototypeAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
