import { NextResponse } from 'next/server'
import Cookies from 'js-cookie';

export function middleware(request) {
    //   if (request.nextUrl.pathname.startsWith('/about')) {
    //     return NextResponse.rewrite(new URL('/about-2', request.url))
    //   }

    // const userToken = request.cookies.get('language');

    // console.log("cookie middle", userToken);

    if (request.nextUrl.pathname.startsWith('/about')) {
        return NextResponse.rewrite(new URL('/help', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.rewrite(new URL('/dashboard/user', request.url))
    }

}