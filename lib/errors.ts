export enum ErrorCode {
  // Auth
  AUTH_REQUIRED = "AUTH_REQUIRED",
  AUTH_INVALID_CREDENTIALS = "AUTH_INVALID_CREDENTIALS",
  AUTH_TOKEN_EXPIRED = "AUTH_TOKEN_EXPIRED",

  // Validation
  VALIDATION_ERROR = "VALIDATION_ERROR",
  MISSING_REQUIRED_FIELD = "MISSING_REQUIRED_FIELD",

  // Not found
  NOT_FOUND = "NOT_FOUND",
  PERSONAL_INFO_NOT_FOUND = "PERSONAL_INFO_NOT_FOUND",
  RESUME_NOT_FOUND = "RESUME_NOT_FOUND",
  IMAGE_NOT_FOUND = "IMAGE_NOT_FOUND",
  EDUCATION_NOT_FOUND = "EDUCATION_NOT_FOUND",
  CAREER_NOT_FOUND = "CAREER_NOT_FOUND",

  // Server
  INTERNAL_ERROR = "INTERNAL_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
  GITHUB_API_ERROR = "GITHUB_API_ERROR",
  GROQ_API_ERROR = "GROQ_API_ERROR",

  // Rate limiting
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
}

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.AUTH_REQUIRED]: "Authentication required",
  [ErrorCode.AUTH_INVALID_CREDENTIALS]: "Invalid username or password",
  [ErrorCode.AUTH_TOKEN_EXPIRED]: "Session expired, please login again",
  [ErrorCode.VALIDATION_ERROR]: "Validation failed",
  [ErrorCode.MISSING_REQUIRED_FIELD]: "Required field is missing",
  [ErrorCode.NOT_FOUND]: "Resource not found",
  [ErrorCode.PERSONAL_INFO_NOT_FOUND]: "Personal information not found",
  [ErrorCode.RESUME_NOT_FOUND]: "Resume not found",
  [ErrorCode.IMAGE_NOT_FOUND]: "No profile image found",
  [ErrorCode.EDUCATION_NOT_FOUND]: "Education entry not found",
  [ErrorCode.CAREER_NOT_FOUND]: "Career entry not found",
  [ErrorCode.INTERNAL_ERROR]: "Internal server error",
  [ErrorCode.DATABASE_ERROR]: "Database operation failed",
  [ErrorCode.GITHUB_API_ERROR]: "GitHub API request failed",
  [ErrorCode.GROQ_API_ERROR]: "Resume generation failed",
  [ErrorCode.RATE_LIMIT_EXCEEDED]: "Too many requests, please try again later",
};

export function getErrorMessage(code: ErrorCode, customMessage?: string): string {
  return customMessage || ERROR_MESSAGES[code];
}
