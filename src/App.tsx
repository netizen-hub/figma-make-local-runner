import React from "react";
import { useAppState } from "./hooks/useAppState";
import { DashboardView } from "./components/views/DashboardView";
import { SupportView } from "./components/views/SupportView";
import { ProjectView } from "./components/views/ProjectView";

export default function App() {
  const { state, handlers } = useAppState();

  switch (state.currentView) {
    case "dashboard":
      return <DashboardView state={state} handlers={handlers} />;
    case "support":
      return <SupportView state={state} handlers={handlers} />;
    case "project":
      return <ProjectView state={state} handlers={handlers} />;
    default:
      return <DashboardView state={state} handlers={handlers} />;
  }
}