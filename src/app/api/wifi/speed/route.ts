import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const size = 2_000_000;
  const buffer = new Uint8Array(size);
  if (globalThis.crypto?.getRandomValues) {
    for (let offset = 0; offset < buffer.length; offset += 65_536) {
      globalThis.crypto.getRandomValues(buffer.subarray(offset, Math.min(offset + 65_536, buffer.length)));
    }
  }

  return new NextResponse(buffer, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Content-Type": "application/octet-stream",
      "Content-Length": String(size),
    },
  });
}
