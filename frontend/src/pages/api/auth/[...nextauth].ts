import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const authHeader = `Basic ${Buffer.from(
            `${process.env.NEXT_USERNAME}:${process.env.NEXT_PASSWORD}`
          ).toString('base64')}`;

          const response = await fetch(
            'http://nginx/api/validate-credentials/',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader
              },
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password
              })
            }
          );

          const user = await response.json();

          if (response.ok && user) {
            // Return user object if authentication is successful
            return {
              id: user.id,
              name: user.username,
              email: user.email
            };
          }

          return null;
        } catch (error) {
          console.error('Error in authorize function:', error); // Debugging
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user details to the token if available
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token details to the session
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});
