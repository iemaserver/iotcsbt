"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import LoadingScreen from "./LoadingScreen";

const MAX_WAIT_MS = 5000;

function waitForFonts(): Promise<void> {
  if (typeof document === "undefined" || !("fonts" in document)) {
    return Promise.resolve();
  }

  return (document as Document & { fonts: FontFaceSet }).fonts.ready
    .then(() => undefined)
    .catch(() => undefined);
}

function extractBackgroundUrls(): string[] {
  if (typeof window === "undefined") return [];

  const urls = new Set<string>();
  const elements = document.querySelectorAll<HTMLElement>("*");
  const pattern = /url\((['"]?)(.*?)\1\)/g;

  elements.forEach((el) => {
    const backgroundImage = window.getComputedStyle(el).backgroundImage;
    if (!backgroundImage || backgroundImage === "none") return;

    pattern.lastIndex = 0;
    let match = pattern.exec(backgroundImage);
    while (match) {
      const candidate = (match[2] ?? "").trim();
      if (candidate && !candidate.startsWith("data:")) {
        urls.add(candidate);
      }
      match = pattern.exec(backgroundImage);
    }
  });

  return [...urls];
}

function preloadUrl(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();

    const finish = () => resolve();
    img.onload = finish;
    img.onerror = finish;
    img.src = url;

    if (img.complete) {
      resolve();
    }
  });
}

function waitForImages(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const domImages = Array.from(document.querySelectorAll<HTMLImageElement>("img"));
  const discoveredUrls = new Set<string>();

  const elementPromises = domImages.map(
    (img) =>
      new Promise<void>((resolve) => {
        const current = (img.currentSrc || img.src || "").trim();
        if (current && !current.startsWith("data:")) {
          discoveredUrls.add(current);
        }

        if (img.complete) {
          resolve();
          return;
        }

        const done = () => {
          img.removeEventListener("load", done);
          img.removeEventListener("error", done);
          resolve();
        };

        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }),
  );

  extractBackgroundUrls().forEach((url) => discoveredUrls.add(url));

  const preloadPromises = [...discoveredUrls].map((url) => preloadUrl(url));

  return Promise.allSettled([...elementPromises, ...preloadPromises]).then(
    () => undefined,
  );
}

export default function AssetReadyGate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(false);

    const fallback = window.setTimeout(() => {
      if (!cancelled) setIsReady(true);
    }, MAX_WAIT_MS);

    const checkAssets = async () => {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });

      await Promise.allSettled([waitForFonts(), waitForImages()]);

      if (!cancelled) {
        setIsReady(true);
      }
      window.clearTimeout(fallback);
    };

    void checkAssets();

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, [pathname]);

  return (
    <>
      {children}
      {!isReady ? <LoadingScreen fixed /> : null}
    </>
  );
}