import CredentialsProvider  from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import Moralis from "moralis"

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "MoralisAuth",
            credentials: {
                message: {
                    label: 'Message',
                    type: 'text',
                    placeholder: '0x0',
                },
                signature: {
                    label: 'Signature',
                    type: 'text',
                    placeholder: '0x0',
                },
            },

            async authorize(credentials) {
                try {
                    const {message, signature} = credentials;
                    if (!Moralis.Core.isStarted) {
                        await Moralis.start({apiKey: process.env.MORALIS_API_KEY});
                    }
                    const { address, profileId } = (
                        await Moralis.Auth.verify({message, signature, network: 'evm'})
                    ).raw;

                    const user = {address, profileId, signature}
                    return user

                } catch (error) {
                    console.log(error);
                    return null;
                }
            },

        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.user = user;
          }
          return token;
        },
        async session({ session, token }) {
          session.user = token.user;
          return session;
        },
      },
});