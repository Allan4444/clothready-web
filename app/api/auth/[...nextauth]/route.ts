import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? 'dev-secret-change-in-production',
  pages: { signIn: '/' },
  callbacks: {
    async session({ session }) { return session },
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = NextAuth(authOptions) as any
export { handler as GET, handler as POST }
