# Weather Forecast App

A modern, responsive weather forecast application built with Next.js, TypeScript, and Tailwind CSS. This app provides real-time weather data and forecasts with a beautiful, animated UI featuring a dark/light theme toggle.

## ✨ Features

- 🌡️ **Real-time Weather Data**: Current conditions and temperature
- 🔮 **5-Day Forecast**: Plan ahead with accurate predictions
- 🌗 **Dark/Light Mode**: Easy on the eyes, day and night
- 📱 **Fully Responsive**: Works perfectly on all devices (mobile, tablet, desktop)
- 💾 **Local Storage**: Remembers your preferences and default city
- 🎨 **Beautiful UI**: Smooth animations and glassmorphism design
- 🔍 **City Search**: Look up weather anywhere in the world
- 🎭 **Custom Error Handling**: User-friendly error messages

## 🚀 Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first styling
- **Motion/React**: Smooth animations
- **Lucide Icons**: Beautiful weather icons
- **Next-Themes**: Dark/light mode toggle
- **OpenWeatherMap API**: Reliable weather data

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-forecast-app.git
   ```

2. Install dependencies:
   ```bash
   cd weather-forecast-app
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Responsive Design

The app is designed to work perfectly across all device sizes:

- **Mobile**: Cards stack vertically for easy scrolling
- **Tablet**: Grid layout with centered cards
- **Desktop**: Horizontal row of cards for maximum visibility

## 🔧 Usage

1. **Search for a City**: Enter any city name in the search bar
2. **Toggle Dark Mode**: Click the sun/moon icon in the settings drawer
3. **View Forecast**: See current conditions and 5-day forecast
4. **Change Settings**: Access the drawer by clicking the settings icon

## 📝 Code Structure

- **`app/`**: Next.js app router pages and API routes
- **`components/shared/`**: Weather-specific components
- **`components/ui/`**: Reusable UI components
- **`lib/`**: Utility functions and helpers
- **`public/`**: Static assets and icons

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for the weather data API
- [Next.js](https://nextjs.org/) for the incredible React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
