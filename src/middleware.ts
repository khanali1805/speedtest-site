import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl
  // netcheck.site -> Pakistan + Global dono, lekin /pk/ Pakistan ke liye
  // speedcheck.online -> Global
  if (hostname.includes('netcheck.site') && url.pathname === '/') {
    // netcheck.site ka homepage Pakistan+Global mix hoga, rewrite nahi
    return NextResponse.next()
  }
  return NextResponse.next()
}
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] }
