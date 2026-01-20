// Screens/ICPP-2-RecoveryMaterial.jsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
 // SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, Easing } from 'react-native';
import { Sparkles, Heart } from 'lucide-react-native';

// ============================================
// THEME - Match HomeScreen
// ============================================
const THEME = {
  cosmicDeep: ['#121024', '#2A1832', '#151525'],
  gradientWisdom: ['#8B5CF6', '#EC4899'], // Purple/Pink for Recovery Wisdom
  gradientMeditation: ['#06B6D4', '#3B82F6'], // Cyan/Blue for Recovery Meditations
  accentCyan: '#00E5FF',
  textWhite: '#FFFFFF',
  textGray: '#A0A0B0',
  cardBg: 'rgba(30, 30, 50, 0.6)',
};

// ============================================
// BREATHING BACKGROUND - Same as HomeScreen
// ============================================
const BreathingBackground = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 12500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 12500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
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
          colors={['#1A0B2E', '#16213E', '#0F3460']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const ICPP2RecoveryMaterial = ({ navigation }) => {
  const [readingPreference, setReadingPreference] = useState('christian');
  const [selectedWisdom, setSelectedWisdom] = useState(false);
  const [selectedMeditation, setSelectedMeditation] = useState(false);

  // Animation refs for card entrance
  const wisdomOpacity = useRef(new Animated.Value(0)).current;
  const wisdomTranslate = useRef(new Animated.Value(30)).current;
  const meditationOpacity = useRef(new Animated.Value(0)).current;
  const meditationTranslate = useRef(new Animated.Value(30)).current;

  // Press animation refs
  const wisdomScale = useRef(new Animated.Value(1)).current;
  const meditationScale = useRef(new Animated.Value(1)).current;

  // ============================================
  // LOAD ICPP-1 PREFERENCE
  // ============================================
  useEffect(() => {
    const loadPreference = async () => {
      try {
        const pref = await AsyncStorage.getItem('readingPreference');
        if (pref) {
          setReadingPreference(pref); // christian, spiritual, or random
        }
      } catch (e) {
        console.error('Error loading reading preference:', e);
      }
    };

    const loadRecoveryConfig = async () => {
      try {
        const configJson = await AsyncStorage.getItem('recoveryMaterialConfig');
        if (!configJson) return;

        const config = JSON.parse(configJson);
        const types = config.recoveryType || [];

        setSelectedWisdom(types.includes('wisdom'));
        setSelectedMeditation(types.includes('meditation'));
      } catch (e) {
        console.error('Error loading recoveryMaterialConfig:', e);
      }
    };

    loadPreference();
    loadRecoveryConfig();

    // Staggered card entrance animations
    Animated.stagger(150, [
      Animated.parallel([
        Animated.timing(wisdomOpacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(wisdomTranslate, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(meditationOpacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(meditationTranslate, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  // ============================================
  // DYNAMIC TITLE BASED ON ICPP-1
  // ============================================
  const getTitle = () => {
    if (readingPreference === 'christian') {
      return 'Add recovery content to your Christian readings?';
    } else if (readingPreference === 'spiritual') {
      return 'Add recovery content to your Spiritual readings?';
    } else {
      return 'Add recovery content to your daily readings?';
    }
  };

  // ============================================
  // TOGGLE HANDLERS WITH ANIMATION
  // ============================================
  const handleToggleWisdom = useCallback(() => {
    // Tap animation
    Animated.sequence([
      Animated.timing(wisdomScale, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(wisdomScale, {
        toValue: 1.02,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(wisdomScale, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedWisdom((prev) => !prev);
  }, []);

  const handleToggleMeditation = useCallback(() => {
    // Tap animation
    Animated.sequence([
      Animated.timing(meditationScale, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(meditationScale, {
        toValue: 1.02,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(meditationScale, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedMeditation((prev) => !prev);
  }, []);

  // ============================================
  // CONTINUE HANDLER
  // ============================================
  const handleContinue = async () => {
    const recoveryOptions = [];
    if (selectedWisdom) recoveryOptions.push('wisdom');
    if (selectedMeditation) recoveryOptions.push('meditation');

    const payload = {
      recoveryType: recoveryOptions,
    };

    try {
      await AsyncStorage.setItem('recoveryMaterialConfig', JSON.stringify(payload));
      navigation.navigate('ICPP-3');
    } catch (e) {
      console.error('Error saving ICPP-2 config:', e);
    }
  };

  return (
    <View style={styles.container}>
      <BreathingBackground />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>


          <View style={styles.header}>
            <Text style={styles.title}>{getTitle()}</Text>
            <Text style={styles.subtitle}>
              Optional — Select one, both, or skip to continue
            </Text>
          </View>


          <Animated.View
            style={{
              opacity: wisdomOpacity,
              transform: [
                { translateY: wisdomTranslate },
                { scale: wisdomScale },
              ],
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleToggleWisdom}
              style={styles.cardTouchable}
            >
              <LinearGradient
                colors={THEME.gradientWisdom}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.card,
                  selectedWisdom && styles.cardSelected,
                ]}
              >

                <View style={styles.cardIconContainer}>
                  <Sparkles size={28} color={THEME.textWhite} />
                </View>


                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Recovery Wisdom</Text>
                  <Text style={styles.cardDescription}>
                    Short daily slogans and reflections for quick inspiration
                  </Text>
                </View>


                {selectedWisdom && (
                  <View style={styles.selectedIndicator}>
                    <View style={styles.selectedDot} />
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>


          <Animated.View
            style={{
              opacity: meditationOpacity,
              transform: [
                { translateY: meditationTranslate },
                { scale: meditationScale },
              ],
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleToggleMeditation}
              style={styles.cardTouchable}
            >
              <LinearGradient
                colors={THEME.gradientMeditation}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.card,
                  selectedMeditation && styles.cardSelected,
                ]}
              >

                <View style={styles.cardIconContainer}>
                  <Heart size={28} color={THEME.textWhite} />
                </View>

                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Recovery Meditations</Text>
                  <Text style={styles.cardDescription}>
                    Deeper mindfulness teachings and contemplative practices
                  </Text>
                </View>


                {selectedMeditation && (
                  <View style={styles.selectedIndicator}>
                    <View style={styles.selectedDot} />
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>


          <Text style={styles.helperText}>
            You can change these anytime in Settings
          </Text>
        </View>


        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <LinearGradient
              colors={['#EC4899', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.continueGradient}
            >
              <Text style={styles.continueText}>CONTINUE</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ICPP2RecoveryMaterial;

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1B',
  },
  safeArea: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 60 : 20,

  },

  // ============================================
  // HEADER
  // ============================================
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: THEME.textWhite,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.3,
    lineHeight: 30,
    paddingHorizontal: 8,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    color: THEME.textGray,
    textAlign: 'center',
    opacity: 0.9,
  },

  // ============================================
  // CARDS - Apple-inspired elegant buttons
  // ============================================
  cardTouchable: {
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    minHeight: 100,
    // Subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cardSelected: {
    // Glowing cyan border when selected
    borderWidth: 2,
    borderColor: THEME.accentCyan,
    shadowColor: THEME.accentCyan,
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },

  // Icon container
  cardIconContainer: {
    marginRight: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Text container
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    color: THEME.textWhite,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  cardDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 18,
    fontWeight: '400',
  },

  // Selection indicator (right side dot)
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  selectedDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: THEME.accentCyan,
  },

  // ============================================
  // HELPER TEXT
  // ============================================
  helperText: {
    marginTop: 16,
    fontSize: 12,
    color: THEME.textGray,
    textAlign: 'center',
    opacity: 0.7,
  },

  // ============================================
  // FOOTER - Continue Button
  // ============================================
  footer: {
    position: 'absolute',
    bottom: 100,
    left: 24,
    right: 24,
  },
  continueButton: {
    borderRadius: 28,
    overflow: 'hidden',
    // Shadow for floating effect
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  continueGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    color: THEME.textWhite,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});
