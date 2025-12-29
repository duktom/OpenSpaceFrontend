<div style="display: flex; flex-direction: column; align-items: center;">
  <img src="./assets/images/icon.png" alt="Logo" width="150" height="150" />
  <h1>OpenSpace</h1>

![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white)
![Expo Router](https://img.shields.io/badge/Expo_Router-black?style=flat-square&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)

![Reanimated](https://img.shields.io/badge/Reanimated-242526?style=flat-square&logo=react&logoColor=white)
![Paper](https://img.shields.io/badge/React_Native_Paper-6200EE?style=flat-square&logo=react&logoColor=white)

![React Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=react-query&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3068B7?style=flat-square&logo=zod&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

![Detox](https://img.shields.io/badge/Detox-593689?style=flat-square&logo=wix&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white)

</div>

---

## 📋 Prerequisites

<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
  <img src="https://img.shields.io/badge/Android-3DDC84?style=flat-square&logo=android&logoColor=white" alt="Android" />
  <span><a href="https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=expo-go">Env Setup</a> (Win/Mac/Linux)</span>
</div>
<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
  <img src="https://img.shields.io/badge/iOS-000000?style=flat-square&logo=apple&logoColor=white" alt="iOS" />
  <span><a href="https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated&mode=expo-go">Env Setup</a> (Mac only)</span>
</div>
<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
  <span><a href="https://nodejs.org/en/download">Runtime</a></span>
</div>
<div style="display: flex; align-items: center; gap: 10px;">
  <img src="https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white" alt="pnpm" />
  <span><strong>Package Manager:</strong> <code>npm i -g pnpm</code></span>
</div>

---

## 🚀 Getting Started

### 1. Installation

```bash
# Install pnpm if missing
npm i -g pnpm

# Install dependencies
pnpm i

# Run prebuild
pnpm prebuild
```

### 2. Run Application

```bash
# Start Android Emulator
pnpm android

# Start iOS Simulator
pnpm ios
```
**Controls** (Press in terminal)

- `a`: Open Android

- `i`: Open iOS

- `r`: Reload

- **Scan QR**: Run on physical device

---

## 🧪 End-to-End Testing

### Build Binaries

```bash
# Android
pnpm build:detox-android

# iOS
pnpm build:detox-ios
```

### Run Tests

```bash
# Android
pnpm test:detox-android

# iOS
pnpm test:detox-ios
```

## 📦 Build & Release

```bash
# Android Preview
pnpm build:android-preview

# iOS Preview
pnpm build:ios-preview
```
