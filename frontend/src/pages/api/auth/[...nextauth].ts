import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Replace this with your own logic to validate credentials
        const { username, password } = credentials || {};
        if (username === "admin" && password === "password123") {
          // Return an object that matches the User type
          return { id: "1", name: "Admin User", email: "admin@example.com" };
        }
        return null; // Return null if authentication fails
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
