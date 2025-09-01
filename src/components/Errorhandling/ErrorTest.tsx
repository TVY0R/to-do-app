import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import ErrorTest from "./ErrorTest";

export default function App() {
  return (
    <ErrorBoundary>
      <ErrorTest />
    </ErrorBoundary>
  );
}
