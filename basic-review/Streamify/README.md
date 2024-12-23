# ( Streamify-React ) Spotify Reseach Data

Spotify Research data based on its users and their liking towards each song and genre.
  ****
## Table of Contents

- [Project Overview](#project-overview)
- [Deployment](#deployment)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Walk Through](#walk-through)
- [Documentation](#documentation)
- [Project Startup](#project-startup)
 ****

## Project Overview

A Static Web Application made using vanilla JavaScript, HTML, CSS and Vite. Focused on Spotify data, each song has numerous information about it. You can filter out songs using song name, artist, genre, popularity. A download button which download the filtered datsongs. Click on the play button to listen to that particular music.
  ****
## Deployment
- **Hosted Link**: [Streamify](https://spotify-research-seven.vercel.app/)
 ****

## Features

- **Search Songs**
- **Filter Songs**
- **Download filtered songs in zip file**
- **Briefing of each song**
- **Review each song on basis of their information provided such as popularity**

  ****

## Technologies Used

- **Frontend**:
  - **React**: Frontend framework
  - **Vite**: A frontend tool that is used for building fast and optimized web applications.
  - **CSS**: Styling the page.
  - **HTML**: Skeleton of the site
  - **Tailwindcss**: For quick styles
  - **JavaScript**: vanilla js for the functionalities
- **Deployment**:
  - **Vercel**: For Hosting the Website.
  - **Netlify**: For Hosting the Website.
  ****

  ## Walk Through
    ****

    1. Based on user's playist choice according to spotify data.
    2. Search for the desired song using artist and song name.
    3. Apply filter for better search result
    4. Click on Download to get the filtered songs as a zip file.
    5. Play button to listen to that music.
     ****

  ## Documentation

  **File Structure :**
```plaintext
├── Streamify
│    |──src
│       |──filters
|           |─artistFilter.js - filters artists
|           |─songFilter.js - filters song name
|           |─popularityFilter.js - filters based on song popularity
|           |─genreFilter.js - filters based on genre
│       |──components
|           |─button.jsx
|           |─input.jsx
|           |─loader.jsx
|           |─select.jsx
│       |──App.jsx
```

  ## Project Startup
  - `npm install`
  - `npm run dev`