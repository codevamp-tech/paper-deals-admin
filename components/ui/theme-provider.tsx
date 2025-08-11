"use client";

import React, { useEffect, useLayoutEffect } from "react";

const isClient = typeof window !== "undefined";
const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect;

// Baaki imports...

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useIsomorphicLayoutEffect(() => {
    // koi DOM related kaam, jaise theme set karna
  }, []);

  return <>{children}</>;
}
