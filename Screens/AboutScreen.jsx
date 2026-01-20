import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  //SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  Globe,
  Shield,
  Info,
  FileText,
  Coffee,
  Heart
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

// --- THEME COLORS (Matching HomeScreen) ---
const THEME = {
  cosmicDeep: ['#121024', '#2A1832', '#151525'],
  accentCyan: '#00E5FF',
  textWhite: '#FFFFFF',
  textGray: '#A0A0B0',
  cardBg: 'rgba(255, 255, 255, 0.08)',
  kofiGold: '#FFB238', // Special color for Support/Ko-fi
};

// --- LINKS CONFIGURATION ---
const MENU_ITEMS = [
  {
    label: 'Visit Website',
    url: 'https://recoveryandrenewal.org',
    icon: Globe,
    description: 'Our main home on the web.'
  },
  {
    label: 'Our Story',
    url: 'https://recoveryandrenewal.org/about.html',
    icon: Info,
    description: 'Learn about our mission and journey.'
  },
  {
    label: 'Privacy Policy',
    url: 'https://recoveryandrenewal.org/privacy.html',
    icon: Shield,
    description: 'How we protect your data and trust.'
  },
  {
    label: 'Credits',
    url: 'https://recoveryandrenewal.org/credits.html',
    icon: FileText,
    description: 'Attributions for tools and assets used.'
  },
  {
    label: 'Special Thanks',
    url: 'https://recoveryandrenewal.org/community.html',
    icon: Heart,
    description: 'To the community that makes this possible.'
  },
  {
    label: 'Support Us',
    url: 'https://ko-fi.com/recoveryandrenewal',
    icon: Coffee,
    description: 'Buy us a coffee on Ko-fi.',
    isSpecial: true // Flag to style this differently
  },
];

export default function AboutScreen({ navigation }) {

  const handleOpenLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log(`Don't know how to open this URL: ${url}`);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />


      <LinearGradient
        colors={THEME.cosmicDeep}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safeArea}>


        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeft size={28} color={THEME.textWhite} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>


          <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.introContainer}>
            <View style={styles.iconCircle}>
              <Heart size={40} color={THEME.accentCyan} fill={THEME.accentCyan} fillOpacity={0.2} />
            </View>
            <Text style={styles.appName}>Recovery & Renewal</Text>
            <Text style={styles.versionText}>Version 1.0.3</Text>
            <Text style={styles.introText}>
              A companion for your journey of healing, faith, and sobriety.
              Designed to help you reflect, recover, and renew every single day.
            </Text>
          </Animated.View>


          <View style={styles.linksContainer}>
            {MENU_ITEMS.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Animated.View
                  key={index}
                  entering={FadeInDown.delay(200 + (index * 50)).duration(500)}
                >
                  <TouchableOpacity
                    style={[
                      styles.linkCard,
                      item.isSpecial && styles.specialCardBorder
                    ]}
                    onPress={() => handleOpenLink(item.url)}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.iconBox,
                      item.isSpecial && { backgroundColor: 'rgba(255, 178, 56, 0.15)' }
                    ]}>
                      <IconComponent
                        size={22}
                        color={item.isSpecial ? THEME.kofiGold : THEME.accentCyan}
                      />
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={[
                        styles.linkLabel,
                        item.isSpecial && { color: THEME.kofiGold }
                      ]}>
                        {item.label}
                      </Text>
                      <Text style={styles.linkDesc}>{item.description}</Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>


          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © {new Date().getFullYear()} Recovery & Renewal.
            </Text>
            <Text style={styles.footerText}>All rights reserved.</Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1B',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: THEME.textWhite,
  },
  backButton: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  introContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)',
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: THEME.textWhite,
    marginBottom: 4,
  },
  versionText: {
    fontSize: 14,
    color: THEME.textGray,
    marginBottom: 16,
  },
  introText: {
    textAlign: 'center',
    color: '#CCCCCC',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: '90%',
  },
  linksContainer: {
    gap: 16,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  specialCardBorder: {
    borderColor: 'rgba(255, 178, 56, 0.3)', // Gold border for support
    backgroundColor: 'rgba(255, 178, 56, 0.05)',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  linkLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: THEME.textWhite,
    marginBottom: 4,
  },
  linkDesc: {
    fontSize: 13,
    color: THEME.textGray,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    opacity: 0.5,
  },
  footerText: {
    color: THEME.textGray,
    fontSize: 12,
  },
});