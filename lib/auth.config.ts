import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Edge-compatible auth config — no Node.js-only imports (bcryptjs, db).
// The actual credential verification lives in lib/auth.ts via the authorize callback.
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    // Placeholder provider — the full authorize logic is in lib/auth.ts.
    // Middleware only needs the provider list to recognise sessions, not to authorize.
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isLoginPage = nextUrl.pathname === "/admin/login";
      const isAuthenticated = !!auth?.user;

      if (isAdminRoute && !isLoginPage && !isAuthenticated) {
        return false; // redirect to signIn page
      }

      if (isLoginPage && isAuthenticated) {
        return Response.redirect(new URL("/admin/solutions", nextUrl));
      }

      return true;
    },
  },
};
