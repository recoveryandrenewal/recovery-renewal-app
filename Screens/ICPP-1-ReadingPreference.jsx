// Screens/ICPP-1-ReadingPreference.jsx
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
import { Cross, Sparkles } from 'lucide-react-native';

// ============================================
// THEME - Match HomeScreen & ICPP-2
// ============================================
const THEME = {
  cosmicDeep: ['#121024', '#2A1832', '#151525'],
  gradientChristian: ['#06B6D4', '#3B82F6'], // Cyan/Blue for Christian
  gradientSpiritual: ['#8B5CF6', '#EC4899'], // Purple/Pink for Spiritual
  accentCyan: '#00E5FF',
  textWhite: '#FFFFFF',
  textGray: '#A0A0B0',
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
const ICPP1ReadingPreference = ({ navigation }) => {
  // CHANGED: From single value to array for checkbox behavior
  const [selectedPreferences, setSelectedPreferences] = useState([]); // ['christian', 'spiritual'] or ['christian'] or ['spiritual']

  // Animation refs for card entrance
  const christianOpacity = useRef(new Animated.Value(0)).current;
  const christianTranslate = useRef(new Animated.Value(30)).current;
  const spiritualOpacity = useRef(new Animated.Value(0)).current;
  const spiritualTranslate = useRef(new Animated.Value(30)).current;

  // Press animation refs
  const christianScale = useRef(new Animated.Value(1)).current;
  const spiritualScale = useRef(new Animated.Value(1)).current;

  // ============================================
  // LOAD EXISTING PREFERENCE (if returning)
  // ============================================
  useEffect(() => {
    const loadPreference = async () => {
      try {
        const pref = await AsyncStorage.getItem('readingPreference');
        // CHANGED: Handle 'both', 'christian', or 'spiritual'
        if (pref === 'both') {
          setSelectedPreferences(['christian', 'spiritual']);
        } else if (pref === 'christian' || pref === 'spiritual') {
          setSelectedPreferences([pref]);
        }
      } catch (e) {
        console.error('Error loading reading preference:', e);
      }
    };
    loadPreference();

    // Staggered card entrance animations
    Animated.stagger(150, [
      Animated.parallel([
        Animated.timing(christianOpacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(christianTranslate, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(spiritualOpacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(spiritualTranslate, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  // ============================================
  // CHECKBOX HANDLERS - Toggle on/off
  // ============================================
  const handleSelectChristian = useCallback(() => {
    // Tap animation
    Animated.sequence([
      Animated.timing(christianScale, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(christianScale, {
        toValue: 1.02,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(christianScale, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();

    // CHANGED: Toggle instead of replace
    setSelectedPreferences((prev) => {
      if (prev.includes('christian')) {
        return prev.filter((p) => p !== 'christian'); // Remove if already selected
      } else {
        return [...prev, 'christian']; // Add if not selected
      }
    });
  }, []);

  const handleSelectSpiritual = useCallback(() => {
    // Tap animation
    Animated.sequence([
      Animated.timing(spiritualScale, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(spiritualScale, {
        toValue: 1.02,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(spiritualScale, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();

    // CHANGED: Toggle instead of replace
    setSelectedPreferences((prev) => {
      if (prev.includes('spiritual')) {
        return prev.filter((p) => p !== 'spiritual');
      } else {
        return [...prev, 'spiritual'];
      }
    });
  }, []);

  // ============================================
  // CONTINUE HANDLER
  // ============================================
  const handleContinue = async () => {
    // CHANGED: Check array length instead of null
    if (selectedPreferences.length === 0) {
      console.warn('Please select at least one reading preference.');
      return;
    }

    // CHANGED: Save 'both' if both selected
    let valueToSave = 'christian'; // default
    if (selectedPreferences.length === 2) {
      valueToSave = 'both';
    } else {
      valueToSave = selectedPreferences[0]; // 'christian' or 'spiritual'
    }

    try {
      await AsyncStorage.setItem('readingPreference', valueToSave);
      navigation.navigate('ICPP-2');
    } catch (e) {
      console.error('Error saving reading preference:', e);
    }
  };

  return (
    <View style={styles.container}>
      <BreathingBackground />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>

          <View style={styles.header}>
            <Text style={styles.title}>What kind of readings would you like?</Text>
            <Text style={styles.subtitle}>Choose your spiritual foundation</Text>
          </View>


          <Animated.View
            style={{
              opacity: christianOpacity,
              transform: [
                { translateY: christianTranslate },
                { scale: christianScale },
              ],
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleSelectChristian}
              style={styles.cardTouchable}
            >
              <LinearGradient
                colors={THEME.gradientChristian}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.card,
                  // CHANGED: Check array includes instead of ===
                  selectedPreferences.includes('christian') && styles.cardSelected,
                ]}
              >

                <View style={styles.cardIconContainer}>
                  <Cross size={28} color={THEME.textWhite} />
                </View>


                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Christian Readings</Text>
                  <Text style={styles.cardDescription}>
                    Spurgeon devotionals with Scripture and Christian reflection
                  </Text>
                </View>


                <View style={styles.radioOuter}>

                  {selectedPreferences.includes('christian') && (
                    <View style={styles.radioDot} />
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>


          <Animated.View
            style={{
              opacity: spiritualOpacity,
              transform: [
                { translateY: spiritualTranslate },
                { scale: spiritualScale },
              ],
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleSelectSpiritual}
              style={styles.cardTouchable}
            >
              <LinearGradient
                colors={THEME.gradientSpiritual}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.card,
                  // CHANGED: Check array includes
                  selectedPreferences.includes('spiritual') && styles.cardSelected,
                ]}
              >
                {/* Icon */}
                <View style={styles.cardIconContainer}>
                  <Sparkles size={28} color={THEME.textWhite} />
                </View>


                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Spiritual Readings</Text>
                  <Text style={styles.cardDescription}>
                    Buddhist, Stoic, and Taoist wisdom for contemplation
                  </Text>
                </View>


                <View style={styles.radioOuter}>

                  {selectedPreferences.includes('spiritual') && (
                    <View style={styles.radioDot} />
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>


          <Text style={styles.helperText}>
            Can change spiritual preferences in Settings
          </Text>
        </View>


        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.continueButton,
              // CHANGED: Check array length
              selectedPreferences.length === 0 && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={selectedPreferences.length === 0}
          >
            <LinearGradient
              colors={
                // CHANGED: Check array length
                selectedPreferences.length > 0
                  ? ['#EC4899', '#8B5CF6']
                  : ['#4B5563', '#374151']
              }
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

export default ICPP1ReadingPreference;

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

  // Checkbox indicator (works like radio but allows both)
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  radioDot: {
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
  continueButtonDisabled: {
    shadowColor: '#374151',
    shadowOpacity: 0.3,
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
