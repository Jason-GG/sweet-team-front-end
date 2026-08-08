// const DEFAULT_API_BASE_URL = 'http://139.159.186.80:8000'
const DEFAULT_API_BASE_URL = 'http://localhost:8000'
const LOGIN_HASH_ROUTE = '#/login'

// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL
export const API_BASE_URL = DEFAULT_API_BASE_URL
type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  json?: unknown
  contentType?: string
}

export class ApiError extends Error {
  status: number
  data: unknown

  constructor(message: string, status: number, data: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

function buildUrl(path: string) {
  return new URL(path, API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`).toString()
}

async function parseResponse(response: Response) {
  if (response.status === 204) {
    return null
  }

  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  const text = await response.text()
  return text ? text : null
}

function getErrorMessage(data: unknown, fallback: string) {
  if (typeof data === 'string' && data.trim()) {
    return data
  }

  if (data && typeof data === 'object') {
    const candidate = data as Record<string, unknown>

    for (const key of ['message', 'detail', 'error', 'non_field_errors']) {
      const value = candidate[key]

      if (typeof value === 'string' && value.trim()) {
        return value
      }

      if (Array.isArray(value) && value.length > 0) {
        const firstValue = value[0]

        if (typeof firstValue === 'string' && firstValue.trim()) {
          return firstValue
        }
      }
    }
  }

  return fallback
}

function redirectToLoginOnUnauthorized() {
  if (typeof window === 'undefined') {
    return
  }

  if (window.location.hash !== LOGIN_HASH_ROUTE) {
    window.location.hash = LOGIN_HASH_ROUTE
  }
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}) {
  const { json, headers, contentType = 'application/json', credentials = 'include', ...rest } = options
  const requestHeaders = new Headers(headers)

  if (json !== undefined && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', contentType)
  }

  const response = await fetch(buildUrl(path), {
    ...rest,
    credentials,
    headers: requestHeaders,
    body: json === undefined ? undefined : JSON.stringify(json),
  })

  const data = await parseResponse(response)

  if (!response.ok) {
    if (response.status === 401) {
      redirectToLoginOnUnauthorized()
    }

    throw new ApiError(getErrorMessage(data, `Request failed with status ${response.status}.`), response.status, data)
  }

  return data as T
}