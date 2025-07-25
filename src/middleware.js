import { getSupabaseReqResClient } from "@/supabase-utils/reqResClient";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const res = NextResponse.next();

  const { supabase, response } = getSupabaseReqResClient({ request });
  const session = await supabase.auth.getSession();

  const requestedPath = request.nextUrl.pathname;
  const [tenant, ...restOfPath] = requestedPath.substr(1).split("/");
  if (!/[a-z0-9-_]+/.test(tenant)) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }
  const applicationPath = "/" + restOfPath.join("/");

  const sessionUser = session.data?.session?.user;

  if (applicationPath.startsWith("/tickets") && !sessionUser) {
    return NextResponse.redirect(new URL(`/${tenant}/`, request.url));
  } else if (applicationPath === "/" && sessionUser) {
    return NextResponse.redirect(new URL(`/${tenant}/tickets`, request.url));
  }

  return response.value;
}

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};
