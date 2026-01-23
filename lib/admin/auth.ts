// Simple authentication for admin
// In production, use proper authentication like NextAuth.js

export interface AdminUser {
  username: string
  password: string
}

// Default admin credentials (change these!)
const ADMIN_CREDENTIALS: AdminUser = {
  username: 'drwcorp',
  password: 'drwcorp123',
}

export function validateAdmin(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('admin_authenticated') === 'true'
}

export function setAuthenticated(value: boolean): void {
  if (typeof window === 'undefined') return
  if (value) {
    localStorage.setItem('admin_authenticated', 'true')
  } else {
    localStorage.removeItem('admin_authenticated')
  }
}

export function logout(): void {
  setAuthenticated(false)
  if (typeof window !== 'undefined') {
    window.location.href = '/admin/login'
  }
}
