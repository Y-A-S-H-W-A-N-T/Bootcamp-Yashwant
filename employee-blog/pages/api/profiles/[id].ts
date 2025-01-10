import fs from 'fs';
import path from 'path';

export default function handler(req: any, res: any) {
  const { id } = req.query; // Extract the email from the query parameters

  if (!id) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const peopleDir = path.join(process.cwd(), 'people');

  // Check if the directory exists
  if (!fs.existsSync(peopleDir)) {
    return res.status(404).json({ error: 'No profiles directory found' });
  }

  // Read all files in the `people` directory
  const files = fs.readdirSync(peopleDir);

  // Iterate through each profile to find the matching email
  for (const file of files) {
    const profilePath = path.join(peopleDir, file, 'profile.json');
    if (fs.existsSync(profilePath)) {
      const profile = JSON.parse(fs.readFileSync(profilePath, 'utf-8'));
      if (profile.email === id) {
        return res.status(200).json(profile);
      }
    }
  }

  // If no matching email is found, return an error
  res.status(404).json({ error: 'Profile not found for the provided email' });
}