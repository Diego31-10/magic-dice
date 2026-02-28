# Magic Dice

A cross-platform mobile app to test and learn device accelerometer and rendering 3D models made in Blender on three.js

## Overview

Magic Dice is a React Native mobile application built with Expo. It uses the device's accelerometer to detect shake gestures and triggers a 3D dice roll animation rendered with Three.js. The app also includes a Burger Builder mini-game that lets users stack ingredients and calculate a running total price. Both features demonstrate sensor integration, 3D rendering on mobile, and component-based UI architecture.

## Tech Stack

- **Framework**: React Native 0.81 / Expo 54
- **Language**: TypeScript
- **Routing**: Expo Router (file-based)
- **3D Rendering**: Three.js, @react-three/fiber, @react-three/drei, expo-gl
- **Sensors**: expo-sensors (accelerometer)
- **Audio / Haptics**: expo-audio, expo-haptics
- **State Management**: React Context API
- **Linting**: ESLint (eslint-config-expo)

## Features

- **Shake-to-roll**: Detects device shake through the accelerometer and generates a random number between 1 and 6 with a configurable cooldown to prevent duplicate triggers.
- **3D dice rendering**: Renders a GLTF dice model in real time using WebGL via @react-three/fiber, with a rolling animation on each shake event.
- **Burger Builder**: An interactive ingredient-stacking UI that lets users add or remove toppings (meat, cheese, lettuce) and displays a live price total.
- **Cross-platform**: Runs on Android, iOS, and Web from a single codebase.

## Installation

**Prerequisites**: Node.js 18+, npm, and the Expo CLI.

```bash
git clone https://github.com/Diego31-10/magic-dice.git
cd magic-dice
npm install
```

## Usage

Start the development server:

```bash
npx expo start
```

Then choose a target platform:

| Command | Platform |
|---|---|
| `npm run android` | Android emulator or device |
| `npm run ios` | iOS simulator or device |
| `npm run web` | Browser |

Once the app is running, navigate to **Start Game** on the home screen and shake your device to roll the dice. Open **Burger Builder** to stack ingredients and view the running price total.

## Project Status

MVP — core features are complete and functional. Future work may include multiplayer support, additional dice types, and persistent score history.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

Diego — [GitHub](https://github.com/Diego31-10)
