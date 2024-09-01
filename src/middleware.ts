import { NextResponse, NextRequest } from 'next/server';
import Cookie from 'js-cookie';


const protectedPages = ['/'];

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get('auth_token')
    const url = request.nextUrl.pathname
    if (protectedPages.includes(request.nextUrl.pathname)) {
        if (!authToken) {
            return NextResponse.redirect(new URL(`/login?redirect=${url}`, request.url));
        }
        return NextResponse.next();
    }
}