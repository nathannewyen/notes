import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Rate limiting map - stores IP addresses and request counts */
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

/* Rate limit configuration */
const RATE_LIMIT_WINDOW = 60 * 1000; /* 1 minute */
const MAX_REQUESTS_PER_WINDOW = 100; /* max requests per minute */

/* Check if request should be rate limited */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  /* Reset if window has passed */
  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  /* Increment count */
  record.count++;

  /* Check if over limit */
  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  return false;
}

/* List of known malicious bot user agents */
const blockedBots = [
  "semrush",
  "ahrefsbot",
  "mj12bot",
  "dotbot",
  "blexbot",
  "seznambot",
];

/* Check if request is from a blocked bot */
function isBlockedBot(userAgent: string): boolean {
  const lowerUA = userAgent.toLowerCase();
  return blockedBots.some((bot) => lowerUA.includes(bot));
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  /* Get client IP */
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  /* Check rate limit */
  if (isRateLimited(ip)) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  /* Check for blocked bots */
  const userAgent = request.headers.get("user-agent") ?? "";
  if (isBlockedBot(userAgent)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return response;
}

/* Apply middleware to all routes except static files */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
