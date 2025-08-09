## 📱 PWA Features

The Weather Forecast App is a Progressive Web App (PWA) with the following capabilities:

### Installation
- **Add to Home Screen**: Install the app on your device from the browser
- **App Icon**: Custom app icon appears on your device home screen
- **Standalone Mode**: Opens in standalone mode without browser UI

### Offline Functionality
- **Works Offline**: Access previously loaded content without internet
- **Offline Indicator**: Shows when you're offline with option to retry
- **Cached Data**: Weather data for previously searched cities is available offline
- **Service Worker**: Background service worker manages caching and offline access

### Performance
- **Fast Loading**: Cached resources load instantly on repeat visits
- **Reduced Data Usage**: Uses cached resources when possible
- **Background Updates**: Service worker updates cache in background

### How to Install
1. Open the app in a supported browser (Chrome, Edge, Safari, etc.)
2. On desktop: Click the install icon in the address bar
3. On mobile: Select "Add to Home Screen" from the browser menu
4. The app will appear on your home screen or app drawer

### Testing Offline Mode
1. Install the PWA on your device
2. Use it normally while online to cache weather data
3. Turn off your internet connection or enable airplane mode
4. Open the app - you should still be able to access it and see previously cached data
