import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';

export function middleware(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie');
  console.log('Cookie Header:', cookieHeader); // Log the cookie header
  
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  console.log('Parsed Cookies:', cookies); // Log parsed cookies
  
  const Login = cookies.Login;
  console.log('Login Cookie:', Login); // Log specific cookie value

  if (req.nextUrl.pathname === '/Allusers' && Login !== 'true') {
    return NextResponse.redirect(new URL('/Login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Allusers'],
};
