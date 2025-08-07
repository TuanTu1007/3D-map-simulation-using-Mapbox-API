# 🗺️ 3D Map Simulation Using Mapbox API

This project is a **3D urban simulation website** that leverages **Mapbox API**, **ReactJS**, and **Supabase** to display interactive 3D city maps, intended to support urban planning, tourism, and location exploration.

> 🚀 Built as a final course project for the **3D Geographic Information Systems** class at the University of Information Technology – VNU-HCM.

## 📌 Features

- 🔍 **Map interaction**: pan, zoom, rotate, fullscreen, compass
- 🌇 **2D/3D & Day/Night toggle**
- 🏢 **3D buildings & terrain display**
- 🗺️ **Layer switching**: streets, terrain, satellite, traffic
- 📍 **User location & tracking**
- 📌 **Place search & directions** (walking, biking, driving)
- 🏧 **Nearby ATM discovery** (with APIFY data)
- 👤 **User management**: Sign up, login, profile update, password reset

## 🛠️ Tech Stack

| Area         | Tools/Technologies                            |
|--------------|-----------------------------------------------|
| Front-end    | ReactJS, Tailwind CSS, Mapbox GL JS           |
| Back-end     | Supabase (Auth + PostgreSQL)                  |
| GIS Data     | Mapbox API, OpenStreetMap, GeoJSON, CSV       |
| Tools        | QGIS (data preparation), Visual Studio Code   |

## 🗂️ Project Structure

```
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.js
├── .env
└── README.md
```

## 🧠 System Architecture

- **Frontend**: React + Mapbox GL JS for interactive 3D map rendering
- **Backend**: Supabase for user authentication & spatial data
- **Data**: Integrated from Mapbox, OpenStreetMap, APIFY (ATM data)

## 🗃️ Database Design (Supabase)

- `user_profiles`: Stores user details
- `geodata_3d`: Contains building geometry, coordinates, and height
- `user_geodata_interactions`: Tracks user interactions with map data
- `places_atms`: Contains ATM location and metadata
- `auth`: Stores authentication states and login sessions

## 📸 UI Screenshots

| Page               | Description                                      |
|--------------------|--------------------------------------------------|
| Homepage           | Intro + navigation to map and about/contact     |
| Map Page           | Full-featured interactive 3D map                |
| About Us / Contact | Info about team and feedback form               |
| Auth Screens       | Sign up / Login / Forgot Password               |
| Profile Management | View and update user data                       |

## ⚙️ How to Run Locally

1. Clone the repo:

   ```bash
   git clone https://github.com/TuanTu1007/3D-map-simulation-using-Mapbox-API.git
   cd 3D-map-simulation-using-Mapbox-API
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add your `.env` file:

   ```env
   REACT_APP_MAPBOX_TOKEN=your_mapbox_token
   ```

4. Run the app:

   ```bash
   npm start
   ```

## 📈 Future Improvements

- Optimize 3D model rendering with LOD techniques
- Mobile-friendly UI
- Extend beyond Vietnam to global cities
- Add tourism-related AR/VR features

## 👥 Authors

- Trịnh Tuấn Tú – [21522747]
- Nguyễn Mạnh Tuấn – [21522755]

Supervised by **ThS. Nguyễn Gia Tuấn Anh**

## 📄 License

This project is for educational purposes only and is not licensed for commercial use.
