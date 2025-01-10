import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ProfileDetails() {
  const router = useRouter();
  const { id } = router.query; // Extract the profile ID from the route
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Fetch the profile data based on the ID
      fetch(`/api/profiles/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setProfile(data)
        })
        .catch((error) => console.error('Error fetching profile details:', error));
    }
  }, [id]);

  if (!profile) {
    return <p>Loading...</p>;
  }

  console.log(profile)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
          <p className="text-gray-700 mt-4">
            <strong>Email:</strong> {profile.email}
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Contact:</strong> {profile?.contact?.phone || 'N/A'}
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Address:</strong> {profile?.contact?.address || 'N/A'}
          </p>
          {/* <p className="text-gray-700 mt-2">
            <strong>CV:</strong>{' '}
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View CV
            </a>
          </p> */}
          {/* Add more details as necessary */}
        </motion.div>
      </div>
    </div>
  );
}