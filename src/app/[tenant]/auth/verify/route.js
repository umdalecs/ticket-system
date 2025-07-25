import { getSupabaseCookiesUtilClient } from "@/supabase-utils/cookiesUtilClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { hashed_token } = searchParams.get("hashed_token");

  const supabase = getSupabaseCookiesUtilClient();

  const { error } = supabase.auth.verifyOtp({
    type: "magiclink",
    token_hash: hashed_token,
  });

  if (error) {
    return NextResponse.redirect(
      new URL("/error?type=invalid_magiclink", request.url)
    );
  }
  if (searchParams.get("type") === "recovery") {
    return NextResponse.redirect(
      new URL("/tickets/change-password", request.url)
    );
  }
  return NextResponse.redirect(new URL("/tickets", request.url));
}
