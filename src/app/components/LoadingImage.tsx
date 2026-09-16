"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type LoadingImageProps = ImageProps & {
  frameClassName?: string;
};

export function LoadingImage({
  alt,
  className,
  frameClassName,
  height,
  onError,
  onLoad,
  width,
  ...props
}: LoadingImageProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  const aspectRatio = typeof width === "number" && typeof height === "number"
    ? `${width} / ${height}`
    : undefined;

  return (
    <span
      aria-busy={state === "loading"}
      className={["loading-image", `is-${state}`, frameClassName].filter(Boolean).join(" ")}
      data-image-state={state}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        {...props}
        alt={alt}
        className={className}
        data-loading-image=""
        height={height}
        onError={(event) => {
          setState("error");
          onError?.(event);
        }}
        onLoad={(event) => {
          setState("loaded");
          onLoad?.(event);
        }}
        width={width}
      />
      {state === "error" && (
        <span aria-hidden="true" className="image-error-label">Image unavailable</span>
      )}
    </span>
  );
}
