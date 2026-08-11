"use client";

import { PlasmicComponent } from "@plasmicapp/loader-react";
import { usePathname } from "next/navigation";
import { ClientPlasmicRootProvider } from "../../../plasmic-init-client";

export default function PlasmicPreviewPage() {
  const pathname = usePathname();
  const pagePath = pathname.replace(/^\/plasmic-preview/, "") || "/";
  return (
    <ClientPlasmicRootProvider>
      <PlasmicComponent
        component={pagePath}
        componentProps={{ className: "plasmic-managed-page" }}
      />
    </ClientPlasmicRootProvider>
  );
}
