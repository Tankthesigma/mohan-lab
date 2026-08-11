/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  IMAGES?: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

function withSecurityHeaders(response: Response, pathname = "/") {
  const isPlasmicEditorRoute =
    pathname === "/plasmic-host" || pathname.startsWith("/plasmic-preview");
  const headers = new Headers(response.headers);
  headers.set(
    "Content-Security-Policy",
    isPlasmicEditorRoute
      ? "frame-ancestors 'self' https://studio.plasmic.app https://*.plasmic.app"
      : [
          "default-src 'self'",
          "base-uri 'self'",
          "connect-src 'self' ws: wss:",
          "font-src 'self' data:",
          "form-action 'self'",
          "frame-ancestors 'self'",
          "frame-src 'self' https://drive.google.com",
          "img-src 'self' data: blob:",
          "media-src 'self' blob:",
          "object-src 'none'",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "worker-src 'self' blob:",
        ].join("; "),
  );
  headers.set("Permissions-Policy", "camera=(), geolocation=(), microphone=()");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Content-Type-Options", "nosniff");
  if (isPlasmicEditorRoute) {
    headers.delete("X-Frame-Options");
  } else {
    headers.set("X-Frame-Options", "SAMEORIGIN");
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const imageBinding = env.IMAGES;
      if (!imageBinding) {
        const sourcePath = url.searchParams.get("url");
        if (!sourcePath?.startsWith("/") || sourcePath.startsWith("//")) {
          return new Response("Invalid image URL", { status: 400 });
        }
        return withSecurityHeaders(await env.ASSETS.fetch(new Request(new URL(sourcePath, request.url))), url.pathname);
      }
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return withSecurityHeaders(await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await imageBinding.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths), url.pathname);
    }

    return withSecurityHeaders(await handler.fetch(request, env, ctx), url.pathname);
  },
};

export default worker;
