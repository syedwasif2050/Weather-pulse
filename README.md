# 🌦️ Glassmorphic Weather Application

A premium, modern **React Weather Application** engineered with a sleek, translucent **Glassmorphic UI** interface. This application connects directly to the **OpenWeatherMap API** to fetch and render real-time global atmospheric conditions, wind metrics, humidity, and temperature states dynamically.

## ✨ Features & Architecture

* **Glassmorphic Aesthetic UI:** Engineered using modern CSS techniques including `backdrop-filter: blur()`, linear-gradient backdrops, and subtle border shadows for a premium physical feel.
* **Dynamic Weather API Integration:** Integrates seamlessly with the OpenWeatherMap REST API to retrieve hourly conditions, temperature outputs, and atmospheric details.
* **Active Validation & Error States:** Features robust client-side loading visual cues and handles API error responses gracefully (e.g., "City not found!").
* **Dynamic Image Generation:** Automatically syncs dynamic weather icons from the API's asset system based on the target city's current weather state.

## 🛠️ Tech Stack

* **Library:** React (Functional Components & Hooks like `useState`, `useEffect`).
* **Styling:** Custom CSS3 with Flexbox alignment and Glassmorphism specifications.
* **API Engine:** OpenWeatherMap API.

## 🚀 How to Run Locally

1. Clone or download this project workspace.
2. Ensure you have Node.js installed in your environment.
3. Install dependencies:
   ```bash
   npm install
