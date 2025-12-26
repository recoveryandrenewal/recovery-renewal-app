# Recovery & Renewal - Source Code

> **Privacy-first recovery companion app. Zero data collection. 100% transparent.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.30-000020.svg)](https://expo.dev/)

---

## 🔍 Why This Repository Exists

This repository contains the **source code** for Recovery & Renewal. It exists for three reasons:

1. **🔐 Transparency** - Verify our zero data collection promise
2. **✅ Auditing** - See exactly what the app does (and doesn't do)
3. **📖 Open Source** - MIT License means truly free

### ⚠️ Important Note

**This repository is for viewing and auditing only.**

If you want to **use the app**, download it from:
- **Google Play Store**: [Coming Q1 2026]
- **Apple App Store**: [Coming Q1 2026]

Building from source requires a React Native development environment, which is complex. We provide pre-built binaries for easy installation.

---

## 🛡️ Privacy Promise

**This code proves we collect NOTHING.**

✅ No analytics SDKs  
✅ No tracking libraries  
✅ No data transmission code  
✅ No user accounts or authentication  
✅ Only local storage (`@react-native-async-storage/async-storage`)  

Don't take our word for it - **audit the code yourself.**

---

## 📂 What's In This Repository

### Core Files
- **`App.tsx`** - Navigation structure and app entry point
- **`package.json`** - Dependencies (verify: no tracking/analytics packages)
- **`Screens/`** - All UI components and screen logic

### Key Screens
- `Splash-Screen.jsx` - Animated splash with privacy message
- `Duaa-Screen.jsx` - "Do You Accept Anyone?" privacy promise
- `HomeScreen.jsx` - Main dashboard with daily readings
- `ICPP-*.jsx` - Initial configuration (reading preferences, milestones)
- Reading screens: Spurgeon, Buddhist, Taoist, Stoic, Wisdom, Reflection
- Tools: Bible, Prayers, Step Work, Resources, Settings

### What's NOT Included
- Build configurations (Gradle, XCode projects)
- Compiled binaries (APK/IPA files)
- Content asset files (devotionals, prayers - these are embedded in the app)
- Development environment setup

This is intentional - the repo is for **auditing code**, not building the app.

---

## 🌟 App Features

### Daily Readings
- **Morning & Evening** - C.H. Spurgeon devotionals (public domain)
- **Buddhist Wisdom** - Daily Dhammapada reflections
- **Taoist Philosophy** - Tao Te Ching passages
- **Stoic Meditations** - Marcus Aurelius wisdom
- **Recovery Reflections** - Original 12-step content
- **Scripture** - King James Bible (public domain)

### Recovery Tools
- **Prayer Library** - Serenity Prayer, Lord's Prayer, and more
- **Step Work** - 12-step program materials
- **Sobriety Counter** - Optional, private milestone tracking
- **Resource Links** - Crisis hotlines, meeting finders

### Design Philosophy
- **TRIPP-inspired cosmic UI** - Purple/pink/cyan gradients
- **Breathing animations** - Calming, meditative experience
- **Dark mode optimized** - Easy on the eyes, battery-friendly
- **Offline-first** - Works without internet

---

## 🛠️ Tech Stack

### Framework
- **React Native** 0.81.5
- **Expo** ~54.0.30
- **React Navigation** 7.x Stack Navigator

### Key Dependencies
```json
{
  "@react-native-async-storage/async-storage": "2.2.0",
  "@react-native-community/datetimepicker": "8.4.4",
  "expo-linear-gradient": "~15.0.8",
  "react-native-reanimated": "~4.1.1",
  "lucide-react-native": "^0.562.0"
}
```

**Notice what's missing?**
- ❌ No Firebase Analytics
- ❌ No Google Analytics
- ❌ No Segment
- ❌ No Amplitude
- ❌ No Mixpanel
- ❌ No tracking SDKs of any kind

---

## 📜 License

**MIT License** - see [LICENSE](LICENSE) file.

### What This Means
- ✅ Use the code freely
- ✅ Modify it however you want
- ✅ Distribute your changes
- ✅ Use in commercial projects
- ⚠️ Must include original copyright notice
- ⚠️ No warranty provided

---

## 🤝 Contributing

This project is **view-only** for transparency purposes. However, if you spot:
- 🐛 Security vulnerabilities
- 🔍 Code that could compromise privacy
- 📝 Documentation improvements

**Please open an issue or contact**: [recoveryandrenewal@protonmail.com](mailto:recoveryandrenewal@protonmail.com)

---

## 🙏 Acknowledgments

**Content Sources** (all public domain or properly licensed):
- C.H. Spurgeon - *Morning and Evening* (1866)
- Lao Tzu - *Tao Te Ching* (ancient)
- Marcus Aurelius - *Meditations* (ancient)
- King James Bible (1611)
- Buddhist scripture - *Dhammapada* (ancient)

**Inspiration**:
- TRIPP - Visual design inspiration
- Recovery Dharma - Mindfulness practices
- 12-step programs - AA, NA, GA traditions

**Built in**: Lewiston, Maine, USA

See full acknowledgments at [recoveryandrenewal.org/credits.html](https://recoveryandrenewal.org/credits.html)

---

## 🔗 Links

- **Website**: [recoveryandrenewal.org](https://recoveryandrenewal.org)
- **Privacy Policy**: [recoveryandrenewal.org/privacy.html](https://recoveryandrenewal.org/privacy.html)
- **Support the Project**: [ko-fi.com/recoveryandrenewal](https://ko-fi.com/recoveryandrenewal)

---

## 💬 Philosophy

> *"Heal the sick, cleanse the lepers, raise the dead, cast out devils: freely ye have received, freely give."*  
> — Matthew 10:8 (KJV)

### This App Will ALWAYS Be:
- ✅ **Free** - No cost, ever
- ✅ **Ad-free** - No advertisements
- ✅ **Tracking-free** - Zero data collection
- ✅ **Open source** - MIT License
- ✅ **Privacy-first** - Everything stays on your device

**No exceptions. No compromises.**

---

## 📱 Download the App

**Coming Soon:**
- Google Play Store (Q1 2026)
- Apple App Store (Q1 2026)

**Pioneer Team Launch**: December 25, 2025 (20 testers)

---

## 📊 Project Status

**Version**: 1.0.1  
**Status**: Beta Testing  
**Launch Target**: Q1 2026  

### Completed ✅
- Core reading screens
- Bible integration (KJV)
- Prayer library
- Step work materials
- Sobriety counter
- ICPP onboarding flow
- Resources screen
- Settings & preferences

### Planned 📋
- Journal feature
- Meeting finder integration
- Additional devotional content
- iOS version

---

## 🛡️ Security

Found a security issue? **Please report responsibly**:

📧 [recoveryandrenewal@protonmail.com](mailto:recoveryandrenewal@protonmail.com)

---

## ⚠️ Data Collection Statement

### What We Collect:
**NOTHING.**

### What We Store Locally:
- Your reading preferences (Christian/Spiritual/Random)
- Your recovery material selections (AA/NA/Devotional/etc.)
- Your milestone date (if you choose to set one)
- Your name (if you choose to provide one)
- App settings and preferences

### What Leaves Your Device:
**NOTHING.**

No cloud sync. No backups. No telemetry. No crash reports. No analytics.  
Everything stays on **your device**, under **your control**.

**When you uninstall the app, all data is deleted. We have no copies.**

---

**Built with ❤️ by someone in recovery, for others on the path.**

*"One day at a time."*