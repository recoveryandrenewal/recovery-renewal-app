# Recovery & Renewal - Mobile App

> **A free, privacy-first recovery companion app. Zero data collection. No tracking. 100% open source.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.30-000020.svg)](https://expo.dev/)

## 🌟 Mission

Recovery & Renewal exists to provide a **completely free** and **privacy-first** recovery companion app. Built by someone in recovery, for others walking the same path.

### Core Principles
- ✅ **Zero data collection** - Your journey stays on your device
- ✅ **No tracking** - No analytics, no telemetry, nothing
- ✅ **100% Free** - No ads, no subscriptions, no premium features
- ✅ **Open Source** - Complete transparency, community-driven
- ✅ **Offline-capable** - Works without internet connection

## 📱 Features

### Daily Readings
- **Morning & Evening Devotions** - Spurgeon's classic devotionals
- **Buddhist Wisdom** - Daily mindfulness practices
- **Taoist Reflections** - Tao Te Ching passages
- **Stoic Philosophy** - Marcus Aurelius meditations
- **Recovery Dharma** - Mindfulness-based recovery practices
- **Wisdom Literature** - Proverbs and ancient wisdom

### Tools
- **Bible Reader** - KJV Bible with search
- **Prayer Collection** - Serenity Prayer, Lord's Prayer, and more
- **Step Work** - 12-step program materials
- **Resource Library** - Helpful recovery materials

### Experience
- **TRIPP-inspired cosmic UI** - Purple/pink/cyan gradient theme
- **Breathing animations** - Calming, meditative interface
- **Dark mode optimized** - Easy on the eyes
- **Minimal & focused** - No distractions

## 🛠️ Tech Stack

- **Framework**: React Native 0.81.5
- **Platform**: Expo ~54.0.30
- **Navigation**: React Navigation 7.x
- **Animations**: Reanimated 4.1.1
- **Icons**: Lucide React Native
- **Storage**: AsyncStorage (local only)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Studio

### Setup

```bash
# Clone the repository
git clone https://github.com/recoveryandrenewal/recovery-renewal-app.git
cd recovery-renewal-app

# Install dependencies
npm install

# Start Expo development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 📂 Project Structure

```
recovery-renewal-app/
├── App.tsx                 # Main app entry point
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── Screens/               # All screen components
│   ├── Splash-Screen.jsx
│   ├── Duaa-Screen.jsx
│   ├── HomeScreen.jsx
│   ├── SpurgeonReadingScreen.jsx
│   ├── BuddhistReadingScreen.jsx
│   ├── TaoistReadingScreen.jsx
│   ├── StoicReadingScreen.jsx
│   ├── WisdomReadingScreen.jsx
│   ├── ReflectionReadingScreen.jsx
│   ├── BibleScreen.jsx
│   ├── PrayersScreen.jsx
│   ├── StepWorkScreen.jsx
│   ├── LibraryScreen.jsx
│   ├── ResourcesScreen.jsx
│   ├── SettingsScreen.jsx
│   └── AboutScreen.jsx
├── assets/                # JSON data files, images
│   ├── m_e.json          # Spurgeon devotionals
│   ├── buddhist_daily.json
│   ├── tao_te_ching.json
│   ├── meditations_daily.json
│   ├── reflection_daily.json
│   ├── wisdom_daily.json
│   └── icon.png
└── README.md
```

## 🎨 Design Philosophy

**TRIPP-Inspired Aesthetics**: The UI draws inspiration from the TRIPP meditation app's cosmic visual language:
- Deep space gradients (#121024, #2A1832, #151525)
- Vibrant accents (Cyan #00E5FF, Pink #EC4899, Purple #9D4EDD)
- Breathing animations for calm, meditative experience
- Floating particles for depth
- Glassmorphism effects

## 🤝 Contributing

This is a labor of love, and contributions are welcome!

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution
- 🐛 Bug fixes
- ✨ New reading content (must be public domain or properly licensed)
- 🎨 UI/UX improvements
- 📱 Platform-specific optimizations
- 🌐 Translations (coming soon)
- 📖 Documentation improvements

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

**What this means**: You can use, copy, modify, and distribute this code freely. The only requirement is to include the original copyright and license notice.

## 🙏 Acknowledgments

**Built with gratitude for:**
- **Unity Bible Church** (Lewiston, ME) - Spiritual foundation
- **Pastor Bill Walker & Michael Hansen** - Guidance and support
- **TRIPP** - Design inspiration
- **Recovery Dharma** - Mindfulness practices
- **C.H. Spurgeon** - Morning & Evening devotions (public domain)
- **Lao Tzu** - Tao Te Ching (public domain)
- **Marcus Aurelius** - Meditations (public domain)
- **King James Bible** - Scripture (public domain)

See [community.html](https://recoveryandrenewal.org/community.html) for full acknowledgments.

## 🔗 Links

- **Website**: [recoveryandrenewal.org](https://recoveryandrenewal.org)
- **GitHub**: [github.com/recoveryandrenewal](https://github.com/recoveryandrenewal)
- **Support**: [ko-fi.com/recoveryandrenewal](https://ko-fi.com/recoveryandrenewal)

## 💬 Philosophy

> "Heal the sick, cleanse the lepers, raise the dead, cast out devils: freely ye have received, freely give."  
> — Matthew 10:8 (KJV)

This app will **always** be:
- Free (no cost)
- Ad-free
- Tracking-free
- Open source
- Privacy-first

No exceptions. No compromises.

## 📱 Status

**Current Version**: 1.0.1  
**Status**: Beta testing (Pioneer Team launch December 25, 2025)

### Roadmap
- ✅ Core reading screens
- ✅ Bible integration
- ✅ Prayer collection
- ✅ Step work materials
- 🔄 Google Play release (Q1 2026)
- 🔄 Apple App Store release (Q1 2026)
- 📋 Journal feature (planned)
- 📋 Meeting finder (planned)
- 📋 Offline sync improvements (planned)

## ⚠️ Privacy Commitment

**This app collects ZERO data. Period.**

- No analytics
- No crash reporting
- No usage tracking
- No personal information
- No cloud sync
- No account creation

Everything stays on your device. Your recovery journey is yours alone.

## 🛡️ Security

Found a security issue? Please email: [recoveryandrenewal@protonmail.com](mailto:recoveryandrenewal@protonmail.com)

---

**Built with ❤️ by someone in recovery, for others on the path.**

*"One day at a time."*