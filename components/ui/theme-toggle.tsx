"use client";

import * as React from "react";
import { AppIcon } from "@/components/ui/app-icon";

export type Theme = "light" | "dark";

const STORAGE_KEY = "yukti-theme";

/**
 * The theme lives on `<html data-theme>`, stamped before first paint by the
 * script in `app/layout.tsx`. That attribute — not React state — is the source
 * of truth, so the control can never disagree with what is on screen. This
 * store just lets React subscribe to it.
 */
const listeners = new Set<() => void>();

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function writeTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  listeners.forEach((notify) => notify());
}

function hasExplicitChoice() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark";
  } catch {
    return false; // storage unavailable — treat as "follow the system"
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const media = window.matchMedia("(prefers-color-scheme: light)");
  // Track the system only while the user has not chosen for themselves.
  const onSystem = () => {
    if (hasExplicitChoice()) return;
    writeTheme(media.matches ? "light" : "dark");
  };
  media.addEventListener("change", onSystem);
  return () => {
    listeners.delete(onChange);
    media.removeEventListener("change", onSystem);
  };
}

/**
 * Shared theme state for every toggle (top bar, sidebar). All instances read
 * the same `<html data-theme>`, so flipping one updates the others.
 */
export function useTheme() {
  const theme = React.useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);

  const toggle = React.useCallback(() => {
    const next: Theme = readTheme() === "light" ? "dark" : "light";
    writeTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — the choice just does not persist */
    }
  }, []);

  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
  return { theme, toggle, label };
}

export function ThemeToggle() {
  const { theme, toggle, label } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex size-8 items-center justify-center rounded-full bg-action text-icon-tertiary outline-none transition-colors duration-[180ms] hover:bg-raised hover:text-icon-secondary focus-visible:ring-2 focus-visible:ring-ring"
    >
      <AppIcon name={theme === "light" ? "moon" : "sun"} size="md" aria-hidden />
    </button>
  );
}
