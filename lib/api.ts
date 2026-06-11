/**
 * lib/api.ts — API 客户端
 * 统一调用 FastAPI 后端
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

async function request<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${path}`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new ApiError(res.status, data.detail || data.error || 'Request failed')
  }
  return data as T
}

// ─── Enquiries ───────────────────────────────
export const enquiriesApi = {
  create: (data: {
    first_name: string
    last_name?: string
    company: string
    email: string
    phone?: string
    country?: string
    product_category?: string
    quantity_range?: string
    target_delivery?: string
    message?: string
  }) => request<{ success: boolean; id: string; message: string }>(
    '/api/enquiries/',
    { method: 'POST', body: JSON.stringify(data) }
  ),
}

// ─── Sample Orders ───────────────────────────
export const samplesApi = {
  create: (data: any) => request<{ success: boolean; id: string; order_no: string }>(
    '/api/samples/',
    { method: 'POST', body: JSON.stringify(data) }
  ),
  get: (orderNo: string) => request(`/api/samples/${orderNo}`),
}

// ─── Tracking ────────────────────────────────
export const trackingApi = {
  track: (orderNo: string) => request<{
    success: boolean
    order: any
    order_type: string
    events: any[]
  }>(`/api/tracking/${orderNo}`),
}

// ─── Products ────────────────────────────────
export const productsApi = {
  list: (params: { category?: string } = {}) => {
    const qs = new URLSearchParams(params as any).toString()
    return request<{ success: boolean; data: any[] }>(`/api/products/?${qs}`)
  },
  get: (sku: string) => request(`/api/products/${sku}`),
}

export { ApiError }
