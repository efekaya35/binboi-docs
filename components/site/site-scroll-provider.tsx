"use client";

/**
 * Scopes a restrained smooth-scroll treatment to marketing pages without affecting docs.
 */
import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const MARKETING_ROUTES = ["/", "/pricing", "/changelog", "/support", "/blog", "/terms"];

function isMarketingRoute(pathname: string) {
  return MARKETING_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(`${route}/`),
  );
}

// Wheel events can report pixels, lines, or pages depending on the device/browser.
function normalizeWheelDelta(event: WheelEvent) {
  if (event.deltaMode === 1) {
    return event.deltaY * 16;
  }

  if (event.deltaMode === 2) {
    return event.deltaY * window.innerHeight;
  }

  return event.deltaY;
}

/**
 * Uses a lightweight RAF loop so marketing pages scroll a touch slower without
 * changing dashboard or docs behavior.
 */
export function SiteScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isEnabled = isMarketingRoute(pathname);

  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;

    if (!isEnabled || prefersReducedMotion || isTouchDevice) {
      delete root.dataset.siteScroll;
      return;
    }

    root.dataset.siteScroll = "on";

    let frameId = 0;
    let current = window.scrollY;
    let target = current;

    const getMaxScroll = () =>
      Math.max(
        0,
        (document.scrollingElement?.scrollHeight ?? document.documentElement.scrollHeight) -
          window.innerHeight,
      );

    const step = () => {
      current += (target - current) * 0.085;

      if (Math.abs(target - current) < 0.4) {
        current = target;
        window.scrollTo({ top: current, behavior: "auto" });
        frameId = 0;
        return;
      }

      window.scrollTo({ top: current, behavior: "auto" });
      frameId = window.requestAnimationFrame(step);
    };

    const start = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      const isMostlyHorizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);

      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        isMostlyHorizontal
      ) {
        return;
      }

      const targetElement = event.target as HTMLElement | null;
      const allowNativeScroll = targetElement?.closest(
        "input, textarea, select, [contenteditable='true'], [data-native-scroll='true']",
      );

      if (allowNativeScroll) {
        return;
      }

      event.preventDefault();
      target = Math.max(
        0,
        Math.min(getMaxScroll(), target + normalizeWheelDelta(event) * 0.92),
      );
      start();
    };

    const syncToNativeScroll = () => {
      if (frameId !== 0) {
        return;
      }

      current = window.scrollY;
      target = current;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", syncToNativeScroll, { passive: true });

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", syncToNativeScroll);
      delete root.dataset.siteScroll;
    };
  }, [isEnabled]);

  return <>{children}</>;
}
