export interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: {
    id: string
    email: string
    name: string
  }
  token?: string
}

export interface AuthError {
  field?: string
  message: string
}