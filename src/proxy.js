import { NextResponse } from "next/server";
import getOrCreateDB from "./models/server/dbSetup.js";
import getOrCreateStorage from "./models/server/storage.collection.js";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  await Promise.all([getOrCreateDB(), getOrCreateStorage()]);
  // keep on working forward and move on to next middleware/proxy hence next instead of redirecting
  return NextResponse.next();
}

// when the url matches the matcher, the proxy will not run on that page
export const config = {
  /* match all request path except for the ones that starts with 
    - api
    -_next/static
    -_next/image
    -favicon.com
    */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
