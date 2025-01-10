'use client'

import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Building2, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session }: any = useSession();
  const [profiles, setProfiles] = useState<any[]>([]);
  const router = useRouter()

  useEffect(() => {
    if (session) {
      fetch('/api/profiles')
        .then((response) => response.json())
        .then((data) => setProfiles(data))
        .catch((error) => console.error('Error fetching profiles:', error));
    }
  }, [session]);

  const ShowProfile = (id: any)=>{
    router.push(`profiles/${id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {session && (
                <motion.p 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl font-semibold text-gray-800"
                >
                  Welcome, {session.user.name}!
                </motion.p>
              )}
            </div>
            <div className="flex items-center">
              {session && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-red-600"
                  onClick={() => signOut()}
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign out
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!session ? (
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-gray-900 mb-8"
            >
              Welcome to Our Platform
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-8 py-3 rounded-md text-lg font-semibold transition duration-300 ease-in-out hover:bg-blue-600"
              onClick={() => signIn('google')}
            >
              Sign in with Google
            </motion.button>
          </div>
        ) : (
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900 mb-8 text-center"
            >
              Company Profiles
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map((profile: any, index) => (
                <motion.div
                  key={index}
                  onClick={()=>ShowProfile(profile.email)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Building2 className="w-6 h-6 text-indigo-500 mr-2" />
                      <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Mail className="w-5 h-5 text-gray-500 mr-2" />
                      <p>{profile.email}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}