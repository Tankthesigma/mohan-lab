"use client";

import { initPlasmicLoader } from "@plasmicapp/loader-react";

export const PLASMIC_PROJECT_ID = "byHs8UKRtN1RiNbwjGWMPS";

const PLASMIC_PUBLIC_TOKEN = process.env.NEXT_PUBLIC_PLASMIC_API_TOKEN;

if (!PLASMIC_PUBLIC_TOKEN) {
  throw new Error("NEXT_PUBLIC_PLASMIC_API_TOKEN is required for Plasmic editing and previews.");
}

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: PLASMIC_PROJECT_ID,
      token: PLASMIC_PUBLIC_TOKEN,
    },
  ],
  preview: process.env.NODE_ENV !== "production",
});
