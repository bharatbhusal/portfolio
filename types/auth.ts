export interface JwtPayload {
  username: string;
  iat: number;
  exp: number;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
  loading: boolean;
}

export interface AuthUser {
  username: string;
}
