export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const bytes = Number(url.searchParams.get("bytes") || "200000");
  const size = Math.min(bytes, 2000000);
  const buf = new Uint8Array(size);
  // Fill with random to avoid compression
  for (let i = 0; i < size; i += 1024) buf[i] = Math.floor(Math.random() * 256);
  return new Response(buf, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
      "Content-Length": String(size),
      "Access-Control-Allow-Origin": "*",
    },
  });
}
