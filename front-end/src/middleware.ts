import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')

  if (token) {
    if (request.nextUrl.pathname === '/sign-in') {
      return NextResponse.redirect(new URL('/todo-list', request.url))
    }
  } else {
    if (request.nextUrl.pathname === '/todo-list') {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/sign-in', '/todo-list'],
}
