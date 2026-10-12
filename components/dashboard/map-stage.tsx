import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Placeholder for the live fleet map.
 *
 * The `data-map-root` element is an empty, positioned, full-bleed container —
 * hand it to Mapbox/MapLibre as the mount node and delete `<MapPlaceholder />`.
 * Overlays passed as `children` are stacked above it and stay untouched.
 */
export function MapStage({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-label="Fleet map"
      className={cn(
        "surface-card relative isolate overflow-hidden rounded-lg",
        "h-[20rem] sm:h-[22rem] xl:h-[24rem]",
        className
      )}
    >
      <div data-map-root className="absolute inset-0">
        <MapPlaceholder />
      </div>

      {/* Edge vignette keeps the map reading as a recessed surface. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_30%,rgba(0,0,0,0.6)_100%)]"
      />

      {children}
    </section>
  );
}

function MapPlaceholder() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-raised"
    >
      {/* Graticule */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:88px_88px]" />

      {/* Cartography artwork, not UI chrome: these alphas are the drawing
          itself and are replaced wholesale by real map tiles, so they are
          deliberately not design tokens. */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="rgba(255,255,255,0.045)" strokeWidth="14" strokeLinecap="round">
          <path d="M-40 430 C 220 400, 320 250, 560 232 S 960 190, 1240 120" />
          <path d="M120 620 C 200 460, 420 420, 640 430 S 1000 470, 1240 380" />
        </g>
        <g stroke="rgba(255,255,255,0.032)" strokeWidth="6" strokeLinecap="round">
          <path d="M-40 200 C 180 190, 300 120, 520 96 S 900 60, 1240 -10" />
          <path d="M320 -20 C 360 160, 300 300, 420 620" />
          <path d="M880 -20 C 840 200, 920 380, 860 620" />
        </g>
        <g stroke="rgba(255,255,255,0.022)" strokeWidth="3">
          <path d="M-40 320 H 1240" />
          <path d="M620 -20 V 620" />
        </g>
        {/* Water body */}
        <path
          d="M900 620 C 940 500, 1120 470, 1240 500 L 1240 620 Z"
          fill="rgba(255,255,255,0.022)"
        />
      </svg>

      {/* Asset clusters */}
      <div className="absolute inset-0">
        <AssetPin className="top-[38%] left-[46%]" tone="critical" pulse />
        <AssetPin className="top-[56%] left-[62%]" tone="warning" />
        <AssetPin className="top-[27%] left-[71%]" tone="neutral" />
        <AssetPin className="top-[66%] left-[33%]" tone="neutral" />
        <AssetPin className="top-[46%] left-[81%]" tone="neutral" />
      </div>
    </div>
  );
}

function AssetPin({
  className,
  tone,
  pulse,
}: {
  className?: string;
  tone: "critical" | "warning" | "neutral";
  pulse?: boolean;
}) {
  const color =
    tone === "critical"
      ? "bg-error-icon"
      : tone === "warning"
        ? "bg-warning-icon"
        : "bg-neutral-icon";

  return (
    <span className={cn("absolute", className)}>
      {pulse && (
        <span
          className={cn(
            "absolute -inset-2 animate-ping rounded-full opacity-25",
            color
          )}
        />
      )}
      <span
        className={cn(
          "relative block size-2 rounded-full ring-4 ring-page",
          color
        )}
      />
    </span>
  );
}
