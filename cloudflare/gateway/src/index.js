const unauthorized = () =>
  new Response("Private Mohan Lab preview", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Mohan Lab", charset="UTF-8"',
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });

const constantTimeEqual = (left, right) => {
  const encoder = new TextEncoder();
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  const length = Math.max(leftBytes.length, rightBytes.length);
  let difference = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < length; index += 1) {
    difference |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }

  return difference === 0;
};

export default {
  async fetch(request, env) {
    const expectedAuthorization = `Basic ${btoa(
      `${env.ACCESS_USERNAME}:${env.ACCESS_PASSWORD}`,
    )}`;
    const receivedAuthorization = request.headers.get("Authorization") ?? "";

    if (!constantTimeEqual(receivedAuthorization, expectedAuthorization)) {
      return unauthorized();
    }

    const incomingUrl = new URL(request.url);
    const headers = new Headers(request.headers);
    headers.delete("Authorization");
    headers.delete("Host");
    headers.set("Cache-Control", "no-cache");
    headers.set("Pragma", "no-cache");

    const upstreamRequest = new Request(
      new URL(incomingUrl.pathname + incomingUrl.search, "https://mohan-lab.internal"),
      request,
    );
    const response = await env.UPSTREAM.fetch(
      new Request(upstreamRequest, { headers, redirect: "manual" }),
    );
    const responseHeaders = new Headers(response.headers);
    responseHeaders.set("Cache-Control", "private, no-store");
    responseHeaders.set("X-Robots-Tag", "noindex, nofollow, noarchive");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  },
};
