// Screens/WisdomScreen.jsx
// "The journey of a thousand miles begins with one step." - Lao Tzu

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
//  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Compass,
  Mountain,
  Flame,
} from 'lucide-react-native';

// THEME - Crimson Red (passion, strength, vitality)
const THEME = {
  cosmicDeep: ['#121024', '#2A1832', '#151525'],
  cosmicSoft: ['#1A0B2E', '#16213E', '#0F3460'],
  accentRed: '#7C3AED',
  accentRedLight: 'A855F7',
  accentCrimson: '#6D28D9',
  textWhite: '#FFFFFF',
  textSoft: '#E0E0F0',
  textGray: '#A0A0B0',
  cardBg: 'rgba(255, 255, 255, 0.05)',
  cardBorder: 'rgba(220, 38, 38, 0.3)',
};

// BREATHING BACKGROUND
const BreathingBackground = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 15000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 15000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  return (
    <>
      <LinearGradient
        colors={THEME.cosmicDeep}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
        <LinearGradient
          colors={THEME.cosmicSoft}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </>
  );
};

// WISDOM TRADITIONS CONFIG
const TRADITIONS = [
  {
    id: 'dhammapada',
    name: 'Dhammapada',
    subtitle: 'Buddhist Wisdom',
    description: 'Ancient Buddhist verses from the Dhammapada (F. Max Müller translation)',
    icon: 'compass',
    gradient: ['#7C3AED', '#A855F7'],
    screenName: 'BuddhistReading',
  },
  {
    id: 'marcus',
    name: 'Marcus Aurelius',
    subtitle: 'Stoic Meditations',
    description: 'Meditations by the philosopher-emperor Marcus Aurelius',
    icon: 'mountain',
    gradient: ['#6D28D9', '#7C3AED'],
    screenName: 'StoicReading',
  },
  {
    id: 'tao',
    name: 'Tao Te Ching',
    subtitle: 'Taoist Philosophy',
    description: "Wisdom from Lao Tzu's Tao Te Ching (James Legge translation)",
    icon: 'flame',
    gradient: ['#4C1D95', '#6D28D9'],
    screenName: 'TaoistReading',
  },
];

// ICON MAPPER
const getIcon = (iconName) => {
  const iconMap = {
    compass: Compass,
    mountain: Mountain,
    flame: Flame,
  };
  return iconMap[iconName] || BookOpen;
};

// MAIN COMPONENT
const WisdomScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle tradition selection
  const handleTraditionSelect = (tradition) => {
    // Navigate to existing reading screens
    if (tradition.screenName) {
      navigation.navigate(tradition.screenName);
    }
  };

  return (
    <View style={styles.container}>
      <BreathingBackground />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <ChevronLeft size={28} color={THEME.accentRed} />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Lightbulb size={40} color={THEME.accentRed} strokeWidth={2} />
              <Text style={styles.title}>Wisdom</Text>
              <Text style={styles.subtitle}>Spiritual Philosophy & Daily Readings</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Lightbulb size={20} color={THEME.textGray} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search traditions..."
              placeholderTextColor={THEME.textGray}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Intro Text */}
          <View style={styles.introBox}>
            <Text style={styles.introText}>
              Explore timeless wisdom from Buddhist, Stoic, and Taoist traditions. Each reading offers
              guidance for daily living, inner peace, and personal growth.
            </Text>
          </View>

          {/* Traditions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>BROWSE BY TRADITION</Text>
            {TRADITIONS.map((tradition) => {
              const Icon = getIcon(tradition.icon);
              return (
                <TouchableOpacity
                  key={tradition.id}
                  style={styles.traditionCard}
                  onPress={() => handleTraditionSelect(tradition)}
                >
                  <LinearGradient
                    colors={tradition.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.traditionGradient}
                  >
                    <View style={styles.traditionHeader}>
                      <View style={styles.traditionIconContainer}>
                        <Icon size={32} color={THEME.textWhite} strokeWidth={2} />
                      </View>
                      <View style={styles.traditionHeaderText}>
                        <Text style={styles.traditionName}>{tradition.name}</Text>
                        <Text style={styles.traditionSubtitle}>{tradition.subtitle}</Text>
                      </View>
                      <ChevronRight size={24} color="rgba(255, 255, 255, 0.8)" />
                    </View>
                  </LinearGradient>
                  <View style={styles.traditionBody}>
                    <Text style={styles.traditionDescription}>{tradition.description}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Additional Wisdom Sources Info */}
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>📚 About These Traditions</Text>

            <View style={styles.infoCard}>
              <Text style={styles.infoCardTitle}>Dhammapada (Buddhist)</Text>
              <Text style={styles.infoCardText}>
                A collection of sayings of the Buddha in verse form, compiled around 100 BCE.
                The F. Max Müller translation (1900) is public domain.
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoCardTitle}>Marcus Aurelius (Stoic)</Text>
              <Text style={styles.infoCardText}>
                Personal writings of the Roman Emperor Marcus Aurelius, written 170-180 CE.
                The George Long translation is public domain.
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoCardTitle}>Tao Te Ching (Taoist)</Text>
              <Text style={styles.infoCardText}>
                Ancient Chinese text attributed to Lao Tzu (~4th century BCE). The James Legge
                translation (1891) is public domain.
              </Text>
            </View>
          </View>

          {/* Attribution */}
          <View style={styles.attributionBox}>
            <Text style={styles.attributionText}>
              All texts are public domain translations (pre-1923). Sources: Project Gutenberg.
            </Text>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default WisdomScreen;

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1B',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? 60 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  // HEADER
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: THEME.textWhite,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 12,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: THEME.accentRed,
    opacity: 0.9,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 8,
    zIndex: 10,
  },

  // SEARCH BAR
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.cardBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: THEME.textWhite,
    fontWeight: '400',
  },

  // INTRO BOX
  introBox: {
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: THEME.accentRed,
  },
  introText: {
    fontSize: 14,
    color: THEME.textSoft,
    lineHeight: 22,
    textAlign: 'center',
  },

  // SECTION
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 13,
    color: THEME.accentRed,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 16,
  },

  // TRADITION CARDS
  traditionCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.cardBorder,
  },
  traditionGradient: {
    padding: 20,
  },
  traditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  traditionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  traditionHeaderText: {
    flex: 1,
  },
  traditionName: {
    fontSize: 22,
    color: THEME.textWhite,
    fontWeight: '700',
    marginBottom: 4,
  },
  traditionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  traditionBody: {
    padding: 20,
    paddingTop: 16,
  },
  traditionDescription: {
    fontSize: 14,
    color: THEME.textSoft,
    lineHeight: 20,
  },

  // INFO SECTION
  infoSection: {
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    color: THEME.accentRedLight,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
  },
  infoCardTitle: {
    fontSize: 15,
    color: THEME.accentRedLight,
    fontWeight: '700',
    marginBottom: 8,
  },
  infoCardText: {
    fontSize: 13,
    color: THEME.textGray,
    lineHeight: 20,
  },

  // ATTRIBUTION
  attributionBox: {
    backgroundColor: THEME.cardBg,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
    marginTop: 16,
    alignItems: 'center',
  },
  attributionText: {
    fontSize: 12,
    color: THEME.textGray,
    textAlign: 'center',
  },
});
