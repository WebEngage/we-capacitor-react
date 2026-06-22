# WebEngage Capacitor 7 React Sample App

A sample Ionic React app built with Capacitor 7, designed to demonstrate WebEngage SDK integration points.

## Tech Stack

- **Capacitor**: 7.x
- **Ionic React**: 8.x
- **React**: 18.x
- **Vite**: 5.x
- **TypeScript**: 5.x

## Getting Started

### Prerequisites

- Node.js 20+
- npm 9+
- Android Studio (for Android builds)
- Xcode (for iOS builds)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Sync native projects

```bash
npx cap sync
```

### Open native IDEs

```bash
npx cap open android
npx cap open ios
```

## Project Structure

```
src/
├── App.tsx                    # Main app component with routing
├── main.tsx                   # Entry point
├── components/
│   ├── MessageListItem.tsx    # Reusable list item with action handlers
│   └── MessageListItem.css
├── data/
│   └── listItem.ts           # Data models and static data
├── pages/
│   ├── Home.tsx              # Main page with analytics, events, opt-in UI
│   └── Home.css
└── theme/
    └── variables.css          # Ionic theme variables
```

## WebEngage Integration

This app is pre-structured for WebEngage SDK integration. All interaction points are marked with `// TODO: Integrate WebEngage` comments. The UI provides:

- User analytics (login, logout, set attributes)
- Event tracking (screen names, custom events)
- GAID tracking
- User opt-in toggles (push, sms, email, in-app, whatsapp, viber)
