export type ErrorType =
  | "bad_request"
  | "unauthorized"
  | "rate_limit"
  | "not_found"
  | "upgrade_required"

export type ApiError = Readonly<{
  error: ErrorType
  details?: unknown
}>

function getStatusCodeByKind(type: ErrorType) {
  switch (type) {
    case "bad_request":
      return 400
    case "unauthorized":
      return 401
    case "not_found":
      return 404
    case "rate_limit":
      return 429
    case "upgrade_required":
    default:
      return 500
  }
}

export function ErrorResponse(e: ApiError) {
  return Response.json(
    { code: e.error, cause: e.details },
    { status: getStatusCodeByKind(e.error) }
  )
}
