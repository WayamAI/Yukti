"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

/**
 * The application frame: the fixed icon rail beside a flexible main area,
 * filling the viewport exactly once. The document itself never scrolls —
 * `<main>` owns the only scroll region, so the rail and its borders stay put.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = React.useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-page">
      {navOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
          className="fixed inset-0 z-40 bg-scrim lg:hidden"
        />
      ) : null}

      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar onMenu={() => setNavOpen(true)} />

        <main className="scrollbar-thin min-w-0 flex-1 overflow-y-auto bg-page p-4 sm:p-5">
          {children}
        </main>
      </div>
    </div>
  );
}