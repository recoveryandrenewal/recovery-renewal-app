// Screens/HomeScreen.jsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
 // SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Home, Book, LifeBuoy, Settings, Heart } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import DevotionalCarousel from './DevotionalCarousel';
import RecoveryCarousel from './RecoveryCarousel';

// --- DYNAMIC STATE STRUCTURE ---
const INITIAL_SETTINGS = {
  userName: '',
  spiritualPath: 'christian',
  showCounter: false,
  milestoneDate: null,
  milestoneLabel: 'sober',
  enable12Step: false,
};

// --- THEME COLORS ---
const THEME = {
  cosmicDeep: ['#121024', '#2A1832', '#151525'],
  cosmicSoft: ['#3E1E45', '#454E9E'],
  accentCyan: '#00E5FF',
  textWhite: '#FFFFFF',
  textGray: '#A0A0B0',
};

// --- DATA LOADING HOOK ---
const useLoadSettings = () => {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  const loadPreferences = useCallback(async () => {
    try {
      // --- ICPP-1: READING PREFERENCE ---
      const readingPref = await AsyncStorage.getItem('readingPreference');
      let newSpiritualPath = INITIAL_SETTINGS.spiritualPath;
      if (readingPref) {
        if (readingPref === 'christian' || readingPref === 'both') {
          newSpiritualPath = 'christian';
        } else if (readingPref === 'spiritual') {
          newSpiritualPath = 'spiritual';
        } else if (readingPref === 'random') {
          newSpiritualPath = 'christian';
        }
      }

      // --- ICPP-2: 12-STEP VISIBILITY ---
      const recoveryConfigJson = await AsyncStorage.getItem('recoveryMaterialConfig');
      let newEnable12Step = INITIAL_SETTINGS.enable12Step;
      if (recoveryConfigJson) {
        const config = JSON.parse(recoveryConfigJson);
        if (config.recoveryType && config.recoveryType.length > 0) {
          const hasNonDevotional = config.recoveryType.some(type => type !== 'devotional');
          newEnable12Step = hasNonDevotional;
        }
      }

      // --- ICPP-3: NAME AND COUNTER + SETTINGS OVERRIDE ---
      const name = await AsyncStorage.getItem('userName');
      const dateString = await AsyncStorage.getItem('milestoneStartDate');
      const label = await AsyncStorage.getItem('milestoneLabel');
      const counterFlag = await AsyncStorage.getItem('showMilestoneCounter'); // 'true' | 'false' | null

      let newName = name || INITIAL_SETTINGS.userName;
      let newMilestoneDate = INITIAL_SETTINGS.milestoneDate;
      let newMilestoneLabel = label || INITIAL_SETTINGS.milestoneLabel;
      let newShowCounter = INITIAL_SETTINGS.showCounter;

      // If there is a saved date, only show counter when flag is not explicitly 'false'
      if (dateString) {
        newMilestoneDate = dateString;
        newShowCounter = counterFlag !== 'false';
      } else {
        newShowCounter = false;
      }

      if (newName === null) {
        newName = '';
      }

      setSettings(prev => ({
        ...prev,
        userName: newName,
        spiritualPath: newSpiritualPath,
        enable12Step: newEnable12Step,
        showCounter: newShowCounter,
        milestoneDate: newMilestoneDate,
        milestoneLabel: newMilestoneLabel,
      }));
    } catch (e) {
      console.error('Error loading ICPP preferences:', e);
      setSettings(INITIAL_SETTINGS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  return { settings, isLoading, loadPreferences };
};

// --- COMPONENTS ---
const BreathingBackground = () => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.6, { duration: 12500, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <>
      <LinearGradient
        colors={THEME.cosmicDeep}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
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

const GreetingBlock = ({ userName }) => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const displayName = userName ? `, ${userName}` : '';

  return (
    <View style={styles.greetingContainer}>
      <Text style={styles.greetingText}>{greeting}{displayName}</Text>
    </View>
  );
};

const CounterBlock = ({ showCounter, milestoneDate, milestoneLabel }) => {
  if (!showCounter || !milestoneDate) return null;

  const calculateTime = () => {
    const now = new Date();
    const start = new Date(milestoneDate);
    if (isNaN(start.getTime()) || start.getTime() > now.getTime()) {
      return null;
    }

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.ceil(Math.abs(now - start) / (1000 * 60 * 60 * 24));
    return { totalDays, years, months, days, startDate: start };
  };

  const calculated = calculateTime();
  if (!calculated) return null;

  const { totalDays, years, months, days, startDate } = calculated;
  const durationParts = [];
  if (years > 0) durationParts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (months > 0) durationParts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
  if (days > 0 || durationParts.length === 0) durationParts.push(`${days} ${days === 1 ? 'day' : 'days'}`);

  // --- FIX: Smart display text to avoid redundant "days" ---
  const getDisplayText = () => {
    const labelLower = milestoneLabel.toLowerCase();

    // If label already contains "days without", don't add day/days prefix
    if (labelLower.includes('days without')) {
      return `${totalDays} ${milestoneLabel}`;
    }

    // Otherwise, show: "X day(s) [label]"
    return `${totalDays} ${totalDays === 1 ? 'day' : 'days'} ${milestoneLabel}`;
  };

  return (
    <View style={styles.counterContainer}>
      <Text style={styles.counterPrimary}>
        {getDisplayText()}
      </Text>
      <View style={styles.counterUnderline} />
      <Text style={styles.counterSecondary}>
        {durationParts.join(', ')} — since {startDate.toLocaleDateString()}
      </Text>
    </View>
  );
};

const BottomNavBar = ({ navigation }) => {
  const NavItem = ({ icon: Icon, label, active, onPress }) => {
    return (
      <TouchableOpacity style={styles.navItem} onPress={onPress}>
        <Icon size={24} color={active ? THEME.accentCyan : '#8b9dc3'} />
        <Text style={[styles.navLabel, { color: active ? THEME.accentCyan : '#8b9dc3' }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.navBarContainer}>
      <View style={styles.navBarBackground} />
      <View style={styles.navBarItems}>
        <NavItem icon={Home} label="Home" active={true} onPress={() => navigation.navigate('Home')} />
        <NavItem icon={Book} label="Library" active={false} onPress={() => navigation.navigate('Library')} />
        <NavItem icon={LifeBuoy} label="Resources" active={false} onPress={() => navigation.navigate('Resources')} />
        <NavItem icon={Heart} label="About" active={false} onPress={() => navigation.navigate('About')} />
        <NavItem icon={Settings} label="Settings" active={false} onPress={() => navigation.navigate('Settings')} />
      </View>
    </View>
  );
};

// --- MAIN SCREEN ---
export default function HomeScreen({ navigation }) {
  const { settings, isLoading, loadPreferences } = useLoadSettings();

  useFocusEffect(
    useCallback(() => {
      loadPreferences();
    }, [loadPreferences])
  );

  if (isLoading) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <BreathingBackground />
          <SafeAreaView style={styles.safeArea}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: THEME.textWhite, fontSize: 18 }}>
                Loading your preferences...
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <BreathingBackground />
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <GreetingBlock userName={settings.userName} />

            <CounterBlock
              showCounter={settings.showCounter}
              milestoneDate={settings.milestoneDate}
              milestoneLabel={settings.milestoneLabel}
            />

            <DevotionalCarousel navigation={navigation} />

            <RecoveryCarousel />

            <View style={{ height: 100 }} />
          </ScrollView>
          <BottomNavBar navigation={navigation} />
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
}

// --- STYLES ---
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
    paddingBottom: 20,
  },
  greetingContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: '500',
    color: THEME.textWhite,
    letterSpacing: 0.5,
  },
  counterContainer: {
    paddingHorizontal: 24,
    marginBottom: 30,
    alignItems: 'center',
  },
  counterPrimary: {
    fontSize: 28,
    fontWeight: '300',
    color: THEME.textWhite,
    textAlign: 'center',
  },
  counterUnderline: {
    width: 40,
    height: 2,
    backgroundColor: THEME.accentCyan,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 1,
  },
  counterSecondary: {
    fontSize: 14,
    color: THEME.textGray,
    fontWeight: '400',
    textAlign: 'center',
  },
  navBarContainer: {
    position: 'absolute',
    bottom: 60,
    left: 16,
    right: 16,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  navBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 20, 35, 0.95)',
  },
  navBarItems: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  navLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
});
