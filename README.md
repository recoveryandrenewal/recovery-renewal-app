# Recovery & Renewal - Source Code

> **Privacy-first recovery companion app. Zero data collection. 100% transparent.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.30-000020.svg)](https://expo.dev/)
[![Open Source](https://img.shields.io/badge/Open%20Source-100%25-success)](https://github.com/recoveryandrenewal/recovery-renewal-app)
[![Privacy First](https://img.shields.io/badge/Privacy-First-blueviolet)](https://recoveryandrenewal.org/privacy.html)

---

## 📊 By The Numbers

### 🎨 **App Scale**
- **21 Screens** - Fully coded and integrated
- **10.7 MB** - Content library (all offline)
- **1,571+ Readings** - Daily spiritual content
- **31,103 Verses** - Complete King James Bible
- **0 Bytes** - Data collected from users

### 📚 **Research Documentation**
- **200 KB** - Total research documentation
- **92 Citations** - Academic sources consulted
- **57 KB** - React Native architecture research
- **30 KB** - Public domain content verification
- **23 KB** - Sobriety calculator research
- **100%** - Copyright compliance verified

### 🔐 **Privacy Metrics**
- **0** - Tracking SDKs
- **0** - Analytics libraries
- **0** - Data transmission endpoints
- **0** - User accounts required
- **0** - Advertisements
- **100%** - Auditable code

---

## 🔍 Why This Repository Exists

**Most recovery apps say they're private. We prove it.**

This repository exists for three reasons:

1. **🔐 Transparency** - Verify our zero data collection promise
2. **✅ Auditing** - See exactly what the app does (and doesn't do)
3. **📖 Open Source** - MIT License means truly free

### ⚠️ Important Note

**This repository is for viewing and auditing only.**

If you want to **use the app**, download it from:
- **Google Play Store**: [Coming Q1 2026]
- **Apple App Store**: [Coming Q1 2026]
- **Pioneer Team**: [Active Testing - Dec 25, 2025]

Building from source requires a React Native development environment, which is complex. We provide pre-built binaries for easy installation.

---

## 🛡️ Privacy Promise

**This code proves we collect NOTHING.**

✅ No analytics SDKs  
✅ No tracking libraries  
✅ No data transmission code  
✅ No user accounts or authentication  
✅ Only local storage (`@react-native-async-storage/async-storage`)  
✅ No cloud sync or backups  
✅ No crash reporting  
✅ No telemetry of any kind  

Don't take our word for it - **audit the code yourself.**

---

## 📂 Repository Contents

### 📱 **Application Code**
```
recovery-renewal-app/
├── App.tsx                    # Navigation & app entry point
├── package.json               # Dependencies (verify: no tracking!)
├── Screens/                   # All 21 screen components
│   ├── Splash-Screen.jsx      # Animated cosmic splash
│   ├── Duaa-Screen.jsx        # Privacy promise
│   ├── HomeScreen.jsx         # Main dashboard
│   ├── ICPP-*.jsx             # 6 onboarding steps
│   ├── SpurgeonReadingScreen.jsx
│   ├── BuddhistReadingScreen.jsx
│   ├── TaoistReadingScreen.jsx
│   ├── StoicReadingScreen.jsx
│   ├── WisdomReadingScreen.jsx
│   ├── ReflectionReadingScreen.jsx
│   ├── BibleScreen.jsx        # 31,103 verses
│   ├── PrayersScreen.jsx
│   ├── StepWorkScreen.jsx
│   ├── ResourcesScreen.jsx
│   └── SettingsScreen.jsx
├── components/
│   └── RecoveryCarousel.jsx   # Home screen cards
└── assets/                    # Cosmic theme resources
```

### 📚 **Content Library** ([See JSON Files](https://github.com/recoveryandrenewal/recovery-renewal-app/tree/main/assets))
```
assets/
├── spurgeon-devotionals.json  # 732 readings (1866)
├── buddhist-wisdom.json       # 365 readings
├── taoist-wisdom.json         # 81 chapters (Tao Te Ching)
├── stoic-wisdom.json          # 365 readings (Meditations)
├── recovery-wisdom.json       # 365 12-step slogans
├── recovery-dharma.json       # 365 mindfulness practices
├── bible-kjv.json             # 31,103 verses (1611)
└── prayers.json               # Serenity, Lord's Prayer, etc.
```

**Total Content**: 10.7 MB of spiritual wisdom, all offline, all copyright-verified.

### 📖 **Research Documentation** ([View Research Folder](https://github.com/recoveryandrenewal/recovery-renewal-app/tree/main/research))
```
research/
├── react-native-architecture.md  # 57 KB, 92 academic citations
├── public-domain-content.md      # 30 KB, copyright verification
├── sobriety-calculator.md        # 23 KB, milestone tracking research
├── user-experience.md            # 15 KB, UX best practices
├── library-sources.md            # 30 KB, content attribution
├── content-roadmap.md            # 12 KB, feature planning
├── resources-screen-summary.md   # 12 KB, crisis resources
└── quick-access-links.md         # 11 KB, resource compilation
```

**Total Research**: 200 KB proving every design decision.

---

## 🌟 App Features

### 📖 Daily Readings
- **Morning & Evening** - C.H. Spurgeon devotionals (1866, public domain)
- **Buddhist Wisdom** - Daily Dhammapada reflections
- **Taoist Philosophy** - Tao Te Ching passages  
- **Stoic Meditations** - Marcus Aurelius & Epictetus
- **Recovery Wisdom** - 12-step program slogans
- **Mindfulness Practice** - Recovery Dharma teachings
- **Scripture** - Complete King James Bible (1611, public domain)

### 🛠️ Recovery Tools
- **Prayer Library** - Serenity Prayer, Lord's Prayer, and more
- **Step Work** - 12-step program worksheets
- **Sobriety Counter** - Optional, private milestone tracking (6 different milestones supported)
- **Crisis Resources** - 988 Lifeline, SAMHSA, AA/NA finders
- **Bible Reader** - Searchable, bookmarkable KJV

### 🎨 Design Philosophy
- **TRIPP-inspired cosmic UI** - Purple/pink/cyan gradients
- **Breathing animations** - Calming, meditative experience
- **Dark mode optimized** - Easy on the eyes, battery-friendly
- **Offline-first** - Works without internet
- **Zero distractions** - No ads, no notifications, no tracking

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
- ❌ No advertising networks
- ❌ No social media SDKs

**Every dependency has been researched and documented.** See [research/react-native-architecture.md](research/react-native-architecture.md) for full analysis.

---

## 📊 Content Verification

### Public Domain Sources (Legally Verified)
- **C.H. Spurgeon** - *Morning and Evening* (1866) - US public domain
- **Lao Tzu** - *Tao Te Ching* (ancient) - US public domain
- **Marcus Aurelius** - *Meditations* (ancient) - US public domain  
- **Epictetus** - *Enchiridion* (ancient) - US public domain
- **King James Bible** (1611) - US public domain
- **Buddhist Scripture** - *Dhammapada* (ancient) - US public domain

### Modern Content (Original/Licensed)
- **12-Step Wisdom** - Slogans and phrases (public domain, AA tradition)
- **Recovery Dharma** - Mindfulness practices (Creative Commons)
- **Original Prayers** - Curated from public sources

**See full copyright documentation**: [research/public-domain-content.md](research/public-domain-content.md)

---

## 🔬 Research-Backed Development

Unlike most apps that "move fast and break things," we researched first:

### Architecture Research (57 KB)
- Performance optimization strategies
- Offline-first data architecture  
- React Native best practices
- Navigation patterns
- State management approaches
- **92 academic and technical sources cited**

### Content Research (30 KB)
- Copyright verification for every reading
- Public domain confirmation
- Source attribution
- Legal clearance documentation

### UX Research (15 KB)
- Recovery app user needs
- Spiritual reading preferences
- Crisis resource accessibility
- Accessibility best practices

**Full documentation**: [View Research Folder](https://github.com/recoveryandrenewal/recovery-renewal-app/tree/main/research)

---

## 📸 Screenshots

See the app in action: [recoveryandrenewal.org/gallery.html](https://recoveryandrenewal.org/gallery.html)

**Featured Screens**:
- Cosmic splash screen with breathing animation
- Personalized home dashboard
- Milestone setup with 6 tracking options
- Daily devotionals (Spurgeon, Buddhist, Taoist, Stoic)
- Complete Bible reader
- Crisis resources with one-tap calling
- Customizable settings (toggle traditions on/off)

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
- ⚠️ Copyright issues

**Please open an issue or contact**: [recoveryandrenewal@protonmail.com](mailto:recoveryandrenewal@protonmail.com)

---

## 🙏 Acknowledgments

**Content Sources** (all verified public domain or properly licensed):
- C.H. Spurgeon - *Morning and Evening* (1866)
- Lao Tzu - *Tao Te Ching* (ancient)
- Marcus Aurelius - *Meditations* (ancient)
- Epictetus - *Enchiridion* (ancient)  
- King James Bible (1611)
- Buddhist scripture - *Dhammapada* (ancient)
- Recovery Dharma - *Book of Recovery* (CC BY-SA 4.0)

**Inspiration**:
- TRIPP - Visual design inspiration (cosmic aesthetic)
- Recovery Dharma - Mindfulness practices
- 12-step programs - AA, NA, GA traditions
- SMART Recovery - Science-based approaches

**Built in**: Lewiston, Maine, USA by a veteran in recovery

See full acknowledgments at [recoveryandrenewal.org/credits.html](https://recoveryandrenewal.org/credits.html)

---

## 🔗 Links

- **Website**: [recoveryandrenewal.org](https://recoveryandrenewal.org)
- **Gallery**: [recoveryandrenewal.org/gallery.html](https://recoveryandrenewal.org/gallery.html)
- **Privacy Policy**: [recoveryandrenewal.org/privacy.html](https://recoveryandrenewal.org/privacy.html)
- **About the Developer**: [recoveryandrenewal.org/about.html](https://recoveryandrenewal.org/about.html)
- **Facebook**: [Recovery & Renewal Community](https://www.facebook.com/profile.php?id=61585437281661)
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
- ✅ **Research-backed** - Every decision documented
- ✅ **Copyright-compliant** - All content legally verified

**No exceptions. No compromises. No monetization of suffering.**

---

## 📱 Download the App

**Coming Soon:**
- Google Play Store (Q1 2026)
- Apple App Store (Q1 2026)

**Pioneer Team Launch**: December 25, 2025 (20 testers)  
[Join Pioneer Team](https://recoveryandrenewal.org/pioneerteam.html)

---

## 📊 Project Status

**Version**: 1.0.2  
**Status**: Beta Testing (Pioneer Team)  
**Launch Target**: Q1 2026  
**Launch Date**: December 25, 2025 (Soft Launch)

### Completed ✅
- ✅ 21 core screens
- ✅ 10.7 MB content library
- ✅ 1,571+ daily readings
- ✅ Complete KJV Bible (31,103 verses)
- ✅ Prayer library
- ✅ Step work materials
- ✅ 6 milestone tracking options
- ✅ ICPP onboarding flow (6 steps)
- ✅ Crisis resources screen
- ✅ Settings & customization
- ✅ 200 KB research documentation
- ✅ Copyright verification complete
- ✅ Privacy audit passed

### In Progress 🚧
- 🚧 Pioneer Team testing (6+ active testers)
- 🚧 Google Play Store submission prep
- 🚧 iOS version development

### Planned 📋
- 📋 Journal feature
- 📋 Meeting finder integration
- 📋 Additional devotional content
- 📋 Audio readings
- 📋 Accessibility improvements

---

## 🛡️ Security

Found a security issue? **Please report responsibly**:

📧 [recoveryandrenewal@protonmail.com](mailto:recoveryandrenewal@protonmail.com)

---

## ⚠️ Data Collection Statement

### What We Collect:
**NOTHING.**

### What We Store Locally (On YOUR Device Only):
- Your reading preferences (Christian/Spiritual/Random)
- Your recovery material selections (Spurgeon/Buddhist/Taoist/Stoic)
- Your milestone date (if you choose to set one)
- Your name (if you choose to provide one)
- App settings and preferences
- Bible bookmarks (if you create any)

### What Leaves Your Device:
**NOTHING.**

No cloud sync. No backups. No telemetry. No crash reports. No analytics. No API calls. No server connections.  
Everything stays on **your device**, under **your control**.

**When you uninstall the app, all data is deleted. We have no copies. We have no servers.**

---

## 🏆 What Makes This Different

### Most Recovery Apps:
- "We value your privacy" (but collect analytics)
- "Free with ads" (monetizing your struggle)
- "Premium features available" (paywalling help)
- "Trust us" (closed source)

### Recovery & Renewal:
- **We prove privacy** (open source code)
- **Completely free** (MIT license)
- **No premium tiers** (all features included)
- **No advertisements** (nothing to sell)
- **Research-backed** (200 KB documentation)
- **Copyright-compliant** (every source verified)
- **Built by someone in recovery** (not a corporation)

---

## 📈 Metrics That Matter

### What We Track:
**NOTHING.**

### What We Care About:
- ✅ Zero data breaches (impossible - we collect nothing)
- ✅ Zero privacy violations (impossible - no data leaves device)
- ✅ Zero crashes (local-only = stable)
- ✅ 100% offline functionality
- ✅ 100% open source
- ✅ 100% free forever

**We measure success by what we DON'T do.**

---

**Built with ❤️ by someone in recovery, for others on the path.**

*"One day at a time."*

---

## 🌟 Star This Repository

If you appreciate:
- 🔐 Real privacy (not marketing)
- 📖 Open source transparency
- 🆓 Truly free software
- 📚 Research-backed development
- ❤️ Recovery resources

**Give this repo a star!** It helps others discover privacy-first recovery tools.

---

*Last Updated: December 25, 2025 - Christmas Day Launch* 🎄