import { apiRequest } from '../../../lib/api/client'
import type {
  HealthResponse,
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  RegisterPayload,
  RegisterResponse,
  RequestVerificationCodePayload,
  RequestVerificationCodeResponse,
  VerifyCodePayload,
  VerifyCodeResponse,
} from '../types'

const TEXT_PLAIN_JSON = 'text/plain'

export function getHealth() {
  return apiRequest<HealthResponse>('/api/health/', {
    method: 'GET',
  })
}

export function login(payload: LoginPayload) {
  return apiRequest<LoginResponse>('/api/auth/login/', {
    method: 'POST',
    json: payload,
  })
}

export function logout() {
  return apiRequest<LogoutResponse>('/api/auth/logout/', {
    method: 'POST',
  })
}

export function requestVerificationCode(payload: RequestVerificationCodePayload) {
  return apiRequest<RequestVerificationCodeResponse>('/api/auth/request-code/', {
    method: 'POST',
    json: payload,
    contentType: TEXT_PLAIN_JSON,
  })
}

export function verifyVerificationCode(payload: VerifyCodePayload) {
  return apiRequest<VerifyCodeResponse>('/api/auth/verify-code/', {
    method: 'POST',
    json: payload,
    contentType: TEXT_PLAIN_JSON,
  })
}

export function registerAccount(payload: RegisterPayload) {
  return apiRequest<RegisterResponse>('/api/auth/register/', {
    method: 'POST',
    json: payload,
    contentType: TEXT_PLAIN_JSON,
  })
}