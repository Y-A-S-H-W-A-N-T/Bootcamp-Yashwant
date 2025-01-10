import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import fs from "fs";
import path from "path";

const ALLOWED_DOMAINS = process.env.ALLOWED_DOMAINS?.split(",") || [];
const ALLOWED_EMAILS = process.env.ALLOWED_EMAILS?.split(",") || [];

const createUserFolder = async (userEmail: string, userName: string) => {
  const userFolderPath = path.join(process.cwd(), 'people', userName.toLowerCase());

  // Check if the folder already exists
  if (!fs.existsSync(userFolderPath)) {
    // Create the user folder
    fs.mkdirSync(userFolderPath, { recursive: true });

    // Create profile.json with some default information
    const profileData = {
      name: userName,
      email: userEmail,
      contact: {
        phone: '',
        address: '',
      },
      cv: 'cv.pdf', // You can put a default CV URL or keep it empty
      photo: 'photo.jpg', // Placeholder for the photo
    };
    fs.writeFileSync(path.join(userFolderPath, 'profile.json'), JSON.stringify(profileData, null, 2));

    // Create the blog folder (empty for now)
    const blogFolderPath = path.join(userFolderPath, 'blog');
    fs.mkdirSync(blogFolderPath);
  }
};

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID || '',
      clientSecret: process.env.CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      const domain = profile.email.split("@")[1];
      const isAllowedDomain = ALLOWED_DOMAINS.includes(domain);
      const isAllowedEmail = ALLOWED_EMAILS.includes(profile.email);

      // Check if the user's domain or email is allowed
      if (isAllowedDomain || isAllowedEmail) {
        // Create the user folder if it doesn't exist
        await createUserFolder(profile.email, profile.name);
        return true;
      }

      return false; // Reject login if not allowed
    },
    async session({ session, token }: any) {
      session.user.id = token.sub;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.accessToken = account.access_token;
        token.sub = profile.id;
        token.email = profile.email;
        token.name = profile.name;
      }
      return token;
    },
  },
  pages: {
    error: "/auth/error",
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);