// pages/api/profiles.ts
import fs from 'fs';
import path from 'path';

export default function handler(req: any, res: any) {
  const peopleDirectory = path.join(process.cwd(), 'people'); // Adjust path if needed
  const profiles: any[] = [];

  try {
    // Read the directory where the user profiles are stored
    const directories = fs.readdirSync(peopleDirectory);

    directories.forEach((dir) => {
      // Read the profile.json file for each person
      const profilePath = path.join(peopleDirectory, dir, 'profile.json');
      if (fs.existsSync(profilePath)) {
        const profile = JSON.parse(fs.readFileSync(profilePath, 'utf-8'));
        profiles.push(profile);
      }
    });

    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch profiles' });
  }
}