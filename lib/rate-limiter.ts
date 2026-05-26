import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

export const ratelimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(12, "7 d"),
  analytics: true,
  prefix: "upstash-ratelimit:unauth",
})

export function getClientIdentifier(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")
  const realIp = req.headers.get("x-real-ip")
  const cfConnectingIp = req.headers.get("cf-connecting-ip")
  const ip =
    forwarded?.split(",")[0]?.trim() || realIp?.trim() || cfConnectingIp?.trim()

  return ip ? `ip:${ip}` : "ip:unknown"
}
