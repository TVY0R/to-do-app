"use client";

import React from "react";

export default function ErrorTest() {
  const throwError = () => {
    throw new Error("Test error triggered!");
  };

  return <button onClick={throwError}>Trigger Error</button>;
}
