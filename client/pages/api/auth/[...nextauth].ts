import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PostUserDataType } from '../../../@types/user';
import { getFriendCode } from '../../../modules/getFriendCode';
import { signin } from '../../../services/user';

type ClientType = {
  clientId: string;
  clientSecret: string;
};

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as ClientType),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(params) {
      const profile = params.profile;
      if (profile === undefined) {
        return Promise.resolve(false);
      }
      const friendCode = getFriendCode();
      const data: PostUserDataType = {
        name: profile.name!,
        displayName: profile.name!,
        mail: profile.email!,
        image: params.user.image!,
        friendCode: friendCode
      }
      const userData = await signin(data);
      //TODO: imageが違う場合の処理も記述
      if(userData === null || userData === undefined) {
        return Promise.resolve(false);
      }
      return Promise.resolve(true);
    },
  }
};

export default NextAuth(authOptions);
