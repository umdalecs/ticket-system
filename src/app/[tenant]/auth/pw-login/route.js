import { getSupabaseCookiesUtilClient } from "@/supabase-utils/cookiesUtilClient";
import { buildUrl } from "@/utils/url-helpers";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const { tenant } = await params;
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const tenantUrl = (url) => buildUrl(url, tenant, request);

  const supabase = getSupabaseCookiesUtilClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const userData = data?.user;
  if (error || !userData) {
    return NextResponse.redirect(tenantUrl("/error?type=login-failed"), {
      status: 302,
    });
  }

  return NextResponse.redirect(tenantUrl("/tickets"), {
    status: 302,
  });
}
