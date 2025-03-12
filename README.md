# React Native Chat App

A modern and feature-rich chat application built with React Native, supporting both iOS and Android platforms.

## 🚀 Features

- Real-time messaging
- User authentication
- Navigation using React Navigation
- State management with Redux Toolkit
- Persistent storage with MMKV
- Beautiful UI with vector icons
- Toast notifications
- TypeScript support
- Safe area handling

## 📱 Screenshots

[Add your app screenshots here]

## 🛠️ Technologies

- React Native 0.78.0
- TypeScript
- Redux Toolkit for state management
- React Navigation 7
- Axios for API calls
- React Native MMKV for storage
- React Native Vector Icons
- React Native Reanimated
- Moment.js for date handling

## 🏗️ Project Structure

```
src/
├── ApiCalls/      # API integration and services
├── Assets/        # Static assets (images, fonts, etc.)
├── Components/    # Reusable UI components
├── Hooks/         # Custom React hooks
├── Interfaces/    # TypeScript interfaces and types
├── Navigation/    # Navigation configuration
├── Network/       # Network related utilities
├── Screens/       # Application screens/pages
├── Store/         # Redux store configuration
└── Utils/         # Utility functions and helpers
```

## ⚙️ Prerequisites

- Node.js >= 18
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js >= 18
- Yarn package manager
- React Native CLI (`npm install -g react-native-cli`)
- Xcode (for iOS development, Mac only)
- Android Studio (for Android development)
- JDK 11 or newer
- CocoaPods (for iOS dependencies)
- A physical device or emulator/simulator

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AviGhorecha2208/RN-ChatApp.git
   cd RN-ChatApp
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Environment Setup**

   #### For iOS Development (Mac only):
   ```bash
   # Install CocoaPods if you haven't already
   sudo gem install cocoapods
   
   # Install iOS dependencies
   cd ios
   pod install
   cd ..
   ```

   #### For Android Development:
   - Open Android Studio
   - Open the `android` folder as a project
   - Let Gradle sync and build the project
   - Create/Setup your Android emulator if you haven't already
  
### Running the App

1. **Start Metro Bundler**
   ```bash
   yarn start
   ```
   This will start the Metro bundler in a new terminal window.

2. **Run on iOS (Mac only)**
   ```bash
   # Run on iOS simulator
   yarn ios
   
   # Run on specific iOS device
   yarn ios --device "Your Device Name"
   ```

3. **Run on Android**
   ```bash
   # Make sure you have an Android emulator running or a device connected
   yarn android
   ```

### Troubleshooting

If you encounter any issues:

1. **Clean Build**
   ```bash
   # For iOS
   cd ios
   pod deintegrate
   pod install
   cd ..
   
   # For Android
   cd android
   ./gradlew clean
   cd ..
   ```

2. **Reset Cache**
   ```bash
   yarn start --reset-cache
   ```

3. **Common Issues**
   - Make sure your Node.js version is compatible
   - Ensure all environment variables are properly set
   - For iOS, make sure CocoaPods is properly installed
   - For Android, ensure ANDROID_HOME is set in your environment

For more detailed troubleshooting, please refer to the [React Native documentation](https://reactnative.dev/docs/troubleshooting).

## 📝 Available Scripts

- `yarn start`