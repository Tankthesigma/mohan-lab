"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealGroups: Array<[string, string]> = [
  [".mission-grid > *", "rise"],
  [".section-heading", "rise"],
  [".focus-card", "rise"],
  [".showcase-card", "rise"],
  [".people-feature-grid > *", "rise"],
  [".news-card", "rise"],
  [".news-ledger-masthead-grid > *", "rise"],
  [".news-ledger-heading > *", "rise"],
  [".news-lead-story > *", "rise"],
  [".news-ledger-row", "rise"],
  [".intro-grid > *", "rise"],
  [".research-card", "card"],
  [".member-card-modern", "rise"],
  [".opportunity-card", "rise"],
  [".application-grid > *", "rise"],
  [".article-grid > *", "rise"],
  [".publication-section-heading", "rise"],
  [".research-resources .resource-heading > *", "rise"],
  [".internship-section-heading > *", "rise"],
  [".program-step-grid > *", "rise"],
  [".past-intern-grid > *", "rise"],
  [".directory-group > *", "rise"],
  [".contact-panel > *", "rise"],
];

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets: HTMLElement[] = [];
    revealGroups.forEach(([selector, effect]) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.dataset.reveal = effect;
        element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 45}ms`);
        targets.push(element);
      });
    });

    const nativeImages = Array.from(
      document.querySelectorAll<HTMLImageElement>("main img:not([data-loading-image])"),
    );
    const nativeImageCleanups: Array<() => void> = [];
    nativeImages.forEach((image) => {
      image.classList.add("native-image-loading");
      image.decoding = "async";
      if (!image.hasAttribute("loading")) image.loading = "lazy";

      const markLoaded = () => {
        image.classList.remove("is-image-error");
        image.classList.add("is-image-loaded");
      };
      const markError = () => {
        image.classList.remove("is-image-loaded");
        image.classList.add("is-image-error");
      };

      if (image.complete) {
        if (image.naturalWidth > 0) markLoaded();
        else markError();
      } else {
        image.addEventListener("load", markLoaded, { once: true });
        image.addEventListener("error", markError, { once: true });
        nativeImageCleanups.push(() => {
          image.removeEventListener("load", markLoaded);
          image.removeEventListener("error", markError);
        });
      }
    });
    const cleanupNativeImages = () => {
      nativeImageCleanups.forEach((cleanup) => cleanup());
      nativeImages.forEach((image) => {
        image.classList.remove("native-image-loading", "is-image-loaded", "is-image-error");
      });
    };

    root.classList.add("motion-ready");
    if (reducedMotion) {
      root.classList.add("site-loaded", "motion-reduced");
      targets.forEach((element) => element.classList.add("is-visible"));
      return () => {
        cleanupNativeImages();
        root.classList.remove("motion-ready", "site-loaded", "motion-reduced");
      };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.classList.add("is-visible");
        observer?.unobserve(element);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });

    targets.forEach((element) => observer?.observe(element));

    let scrollFrame = 0;
    const revealPassedTargets = () => {
      scrollFrame = 0;
      targets.forEach((element) => {
        if (element.classList.contains("is-visible")) return;
        if (element.getBoundingClientRect().top >= window.innerHeight * 0.96) return;
        element.classList.add("is-visible");
        observer?.unobserve(element);
      });
    };
    const queuePassedTargetCheck = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(revealPassedTargets);
    };
    window.addEventListener("scroll", queuePassedTargetCheck, { passive: true });

    let readyFrame = 0;
    const loadFrame = requestAnimationFrame(() => {
      readyFrame = requestAnimationFrame(() => root.classList.add("site-loaded"));
    });
    revealPassedTargets();

    return () => {
      cleanupNativeImages();
      observer?.disconnect();
      cancelAnimationFrame(loadFrame);
      cancelAnimationFrame(readyFrame);
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", queuePassedTargetCheck);
      root.classList.remove("motion-ready", "site-loaded");
      targets.forEach((element) => {
        element.classList.remove("is-visible");
        delete element.dataset.reveal;
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true" />;
}
