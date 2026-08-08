export type ApiMessageResponse = {
  message?: string
  detail?: string
}

export type HealthResponse = {
  status?: string
  message?: string
  detail?: string
}

export type RequestVerificationCodePayload = {
  email: string
}

export type VerifyCodePayload = {
  email: string
  code: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  email: string
  username: string
  password: string
  confirm_password: string
  first_name: string
  last_name: string
  display_name: string
  location: string
  profile_focus: string
  receive_updates: boolean
  nickname: string
  age_group: string
  language: string
  avatar_color: string
  self_introduction: string
}

export type RequestVerificationCodeResponse = ApiMessageResponse

export type VerifyCodeResponse = ApiMessageResponse

export type LoginResponse = ApiMessageResponse & {
  user?: unknown
}

export type LogoutResponse = ApiMessageResponse

export type RegisterResponse = ApiMessageResponse & {
  user?: unknown
}