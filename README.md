# SHORE_sih_25039

# 🌊 SHORE

**Smart Hazard Observation & Reporting Environment**

---

## 📌 Overview

**SHORE** is a multilingual mobile + web platform designed to empower **citizens, coastal communities, and disaster managers** in monitoring and responding to ocean-related hazards.

By combining **citizen hazard reports**, **social media analytics**, and **geospatial intelligence**, SHORE provides **real-time situational awareness** to authorities and communities along India's vulnerable coastlines.

> **SHORE is India's first integrated citizen + social media ocean hazard intelligence platform, bridging ground-level observations with real-time analytics for disaster resilience.**

---

## ✨ Key Features

* **📍 Citizen Hazard Reporting**
  * Submit geotagged reports with text, photos, and videos.
  * Works offline → syncs automatically when connectivity is restored.

* **👥 Role-Based Access**
  * Citizens: report and view local alerts.
  * Officials: verify reports, filter by urgency, and take action.
  * Analysts: study patterns, validate hazard models, and support INCOIS.

* **🗺️ Dynamic Dashboard + Interactive Map**
  * Visualize live reports, social media mentions, and model data.
  * Hotspot clustering & color-coded urgency indicators.
  * Real-time ocean disaster tracking: Tsunamis, floods, storm surges

* **🤖 Social Media Analytics (NLP-powered)**
  * Scrapes and analyzes Twitter, YouTube, and public FB posts.
  * Classifies hazard-related content, extracts keywords, and detects sentiment.

* **🔥 Real-Time Updates**
  * WebSocket/Socket.IO integration → instant alerts and dashboard refresh.

* **🌐 Multilingual Support**
  * Accessible to citizens in multiple Indian coastal languages.

---

## 🛠️ Tech Stack

* **Frontend (Web):** Next.js + React + TypeScript + Tailwind CSS
* **Interactive Maps:** Leaflet + React-Leaflet
* **Mobile:** React Native + Expo
* **Backend API:** FastAPI (Python)
* **Real-Time Updates:** Socket.IO / WebSockets
* **NLP & Analytics:** SpaCy + Scikit-learn
* **Scraping:** Selenium + BeautifulSoup
* **Database:** PostgreSQL + PostGIS
* **Caching:** Redis
* **Media Storage:** Amazon S3 / MinIO

---

## 🚀 Getting Started

### 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** or **pnpm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, Edge)

### 🏁 Quick Start

#### 1. Download the Project
```bash
# Option A: Clone the repository
git clone https://github.com/appleorange3/SHORE_sih_25039.git
cd SHORE_sih_25039

# Option B: Download ZIP file
# Extract the ZIP file and navigate to the project folder
```

#### 2. Install Dependencies
```bash
# Using npm (recommended)
npm install

# OR using pnpm (if you prefer)
pnpm install
```

#### 3. Install Required Map Library
The project uses Leaflet for interactive maps. Install the specific version:
```bash
npm install leaflet@1.9.4 react-leaflet@4.2.1 @types/leaflet@1.9.8
```

#### 4. Start the Development Server
```bash
npm run dev
# OR
pnpm dev
```

#### 5. Open in Browser
Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🛠️ Troubleshooting

### Common Issues & Solutions

#### ❌ "Cannot find module 'react-leaflet'" Error
```bash
# Solution: Install the correct version
npm install leaflet@1.9.4 react-leaflet@4.2.1 @types/leaflet@1.9.8 --save
```

#### ❌ "ERESOLVE unable to resolve dependency tree"
```bash
# Solution: Use legacy peer deps
npm install --legacy-peer-deps
```

#### ❌ TypeScript errors with Leaflet
```bash
# Solution: Ensure you have the types installed
npm install @types/leaflet --save-dev
```

#### ❌ Port 3000 already in use
```bash
# Solution: Use a different port
npm run dev -- -p 3001
```

#### ❌ Map not loading/blank screen
- Check your internet connection (maps require online access)
- Clear browser cache and reload
- Check browser console for errors (F12 → Console)

### If the project won't start:
1. **Delete node_modules and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node.js version**:
   ```bash
   node --version  # Should be 18.0+
   ```

3. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

---

## 📁 Project Structure

```
SHORE_sih_25039/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── dashboard/         # Dashboard pages
├── components/            # React components
│   ├── interactive-map.tsx # Main map component
│   └── ...               # Other UI components
├── styles/               # CSS stylesheets
├── public/              # Static assets
├── package.json         # Dependencies
└── tsconfig.json       # TypeScript config
```

---

## 🌊 Current Demo Features

- **Real-time Ocean Disaster Tracking**: Tsunamis, floods, storm surges
- **Interactive Map**: Click markers for detailed disaster information
- **Severity Filtering**: Filter disasters by risk level (Medium/High/Critical)
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Live Statistics**: Real-time affected population and alert counts

---

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Adding New Features

1. **New Components**: Add to `components/` folder
2. **New Pages**: Add to `app/` directory (Next.js 13+ App Router)
3. **Styling**: Uses Tailwind CSS utility classes

---

## 🗺️ Map Configuration

The interactive map uses:
- **Leaflet 4.2.1** for map functionality
- **Satellite imagery** from Esri ArcGIS
- **Custom markers** for disaster locations
- **Real-time data simulation** for demonstration

### Customizing Disaster Data

Edit the disaster data in `components/interactive-map.tsx`:
```typescript
const oceanDisasters = [
  {
    id: 1,
    lat: 11.9416,
    lng: 79.8083,
    location: "Your Location",
    type: "Disaster Type",
    severity: "high", // medium, high, critical
    // ... other properties
  }
];
```

---

## 🌐 Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ⚠️ Internet Explorer: Not supported

---

## 📱 Mobile Support

The platform is fully responsive and works on:
- 📱 Mobile phones (iOS/Android)
- 📟 Tablets (iPad/Android tablets)  
- 💻 Desktop computers
- 🖥️ Large displays

---

## 🚀 Impact

* Faster ground-truthed situational awareness during ocean hazards.
* Citizens become active contributors to disaster management.
* Disaster managers gain unified visibility across **official models + citizen data + social media signals**.
* Strengthened coastal resilience with reduced loss of life and quicker response.

---

## 💡 Quick Start Summary
```bash
1. Download/clone the project
2. npm install
3. npm install leaflet@1.9.4 react-leaflet@4.2.1 @types/leaflet@1.9.8
4. npm run dev
5. Open http://localhost:3000
```

**🎉 You're all set! The SHORE platform should now be running locally.**

---

## 🔑 Environment Variables

Create a `.env.local` file for any API keys (if needed in future):
```bash
# Example (not required for current version)
NEXT_PUBLIC_MAP_API_KEY=your_api_key_here
```

---

## 📄 License

This project is for educational and emergency management purposes.

---

**For questions or support, please check the troubleshooting section above or create an issue in the repository.**git 