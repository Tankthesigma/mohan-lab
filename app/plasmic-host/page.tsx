"use client";

import { PlasmicCanvasHost } from "@plasmicapp/loader-react";
import "../../plasmic-init-client";

export default function PlasmicHostPage() {
  return <div data-plasmic-app-host><PlasmicCanvasHost /></div>;
}
