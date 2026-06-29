---
inclusion: auto
---

# Known Issues & Resolutions

## 1. react-router v5 + @types/react 18.3+ Type Incompatibility

**Error:** `TS2786: 'Route' cannot be used as a JSX component. Property 'refs' is missing...`

**Root Cause:** `@types/react@18.3+` (and TypeScript 5.x) tightened the JSX element class constraint requiring a `refs` property on class components. `react-router-dom` v5 uses class-based `Route` and `Redirect` components whose type definitions don't satisfy this.

**Resolution:**
- Removed `@types/react-router` and `@types/react-router-dom` packages
- Created custom type declarations at `src/types/react-router.d.ts` that declare `Route`, `Redirect`, etc. as functional components (which don't need `refs`)
- Using `react-app-rewired` instead of `react-scripts` directly (to allow future webpack config overrides)

**DO NOT:**
- Reinstall `@types/react-router` or `@types/react-router-dom` — they will re-introduce the error
- Downgrade `@types/react` below 18.3 — `@ionic/react` v8 requires 18.3+
- Upgrade to `react-router` v6 without also upgrading `@ionic/react-router` (they're tightly coupled)

## 2. we-cap-android-fcm AGP 8+ Namespace Error

**Error:** `Namespace not specified. Specify a namespace in the module's build file`

**Root Cause:** Project uses AGP 8.13+ which requires `namespace` in all `build.gradle` files. The `we-cap-android-fcm` plugin was written for AGP 7.x.

**Resolution:** Using `patch-package` with a patch at `patches/we-cap-android-fcm+1.0.0.patch` that:
- Adds `namespace 'com.webengage.androidfcm'` to `android/build.gradle`
- Removes deprecated `package` attribute from `AndroidManifest.xml`

The patch auto-applies via the `postinstall` script.

## 3. iOS CordovaPluginsStatic.podspec Missing

**Error:** `No podspec found for CordovaPluginsStatic`

**Root Cause:** `npx cap sync ios` doesn't always generate `CordovaPluginsStatic.podspec` for plugins with `use-frameworks="true"` (like `cordova-plugin-webengage`).

**Resolution:** Manually created `ios/capacitor-cordova-ios-plugins/CordovaPluginsStatic.podspec`. If lost, recreate it with:
- Pod name: `CordovaPluginsStatic`
- Source files: `sources/CordovaPluginWebengage/**/*.{swift,h,m,c,cc,mm,cpp}`
- Dependency: `WebEngage`
- `s.static_framework = true`

After creating, run `pod install` from `ios/App/`.
