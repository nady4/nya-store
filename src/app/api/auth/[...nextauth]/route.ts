import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extending types for NextAuth session and JWT
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    username?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      username?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    username?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const res = await fetch("http://localhost:3000/api/auth/signin", {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          return null; // If the response is not okay, return null
        }

        const user = await res.json();

        if (user.error) {
          return null; // If there's an error in the response, return null
        }

        return user; // Return the user object with necessary fields (id, email, etc.)
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/logout",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Check if it's the initial sign-in and attach user data to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the JWT data to the session object
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          username: token.username,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Using JWT strategy for stateless sessions
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for signing JWT
  debug: process.env.NODE_ENV === "development", // Enable debug in development
};

// Export handler for API routes
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
