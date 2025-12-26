// Screens/WisdomReadingScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ChevronLeft, Calendar } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // <--- IMPORT ADDED

// Import JSON data
import wisdomData from '../assets/wisdom_daily.json';

const THEME = {
  cosmicDeep: ['#121024', '#2A1832', '#151525'],
  cosmicSoft: ['#3E1E45', '#454E9E'],
  accentPrimary: '#84CC16',   // Electric Lime
  accentSecondary: '#10B981', // Green
  textWhite: '#FFFFFF',
  textSoft: '#C0C0D0',
  textGray: '#A0A0B0',
};

// ============================================
// BREATHING BACKGROUND
// ============================================
const BreathingBackground = () => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.6, {
        duration: 12500,
        easing: Easing.inOut(Easing.quad),
      }),
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
          colors={THEME.cosmicSoft}
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
export default function WisdomReadingScreen({ route, navigation }) {
  const { month, day } = route.params || {};

  const [currentMonth, setCurrentMonth] = useState(month || new Date().getMonth() + 1);
  const [currentDay, setCurrentDay] = useState(day || new Date().getDate());
  const [reading, setReading] = useState(null);

  // --- NEW STATE FOR DATE PICKER ---
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadReading();
  }, [currentMonth, currentDay]);

  const loadReading = () => {
    const foundReading = wisdomData.find(
      (item) => item.month === currentMonth && item.day === currentDay
    );

    if (foundReading) {
      setReading(foundReading);
    } else {
      setReading({
        month: currentMonth,
        day: currentDay,
        title: "Reading Not Available",
        body: "No reading found for this date.",
        category: "recovery",
      });
    }
  };

  // ============================================
  // DATE NAVIGATION
  // ============================================
  const goToPrevious = () => {
    let newDay = currentDay - 1;
    let newMonth = currentMonth;

    if (newDay < 1) {
      newMonth = currentMonth - 1;
      if (newMonth < 1) newMonth = 12;
      newDay = new Date(new Date().getFullYear(), newMonth, 0).getDate();
    }

    setCurrentDay(newDay);
    setCurrentMonth(newMonth);
  };

  const goToNext = () => {
    let newDay = currentDay + 1;
    let newMonth = currentMonth;
    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, newMonth, 0).getDate();

    if (newDay > daysInMonth) {
      newMonth = currentMonth + 1;
      if (newMonth > 12) newMonth = 1;
      newDay = 1;
    }

    setCurrentDay(newDay);
    setCurrentMonth(newMonth);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth() + 1);
    setCurrentDay(today.getDate());
  };

  // --- NEW FUNCTION: HANDLE DATE SELECTION ---
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setCurrentMonth(selectedDate.getMonth() + 1);
      setCurrentDay(selectedDate.getDate());
    }
  };

  // ============================================
  // FORMAT DATE
  // ============================================
  const getMonthName = (monthNum) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNum - 1];
  };

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  if (!reading) {
    return (
      <View style={styles.container}>
        <BreathingBackground />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading wisdom...</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BreathingBackground />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <SafeAreaView style={styles.safeArea}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft size={24} color={THEME.textWhite} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerDate}>
              {getMonthName(currentMonth)} {currentDay}{getOrdinalSuffix(currentDay)}
            </Text>
            <Text style={styles.headerSubtitle}>DAILY WISDOM</Text>
          </View>


          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.todayButton}>
            <Calendar size={20} color={THEME.accentPrimary} />
          </TouchableOpacity>
        </View>


        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={[`${THEME.accentPrimary}15`, `${THEME.accentSecondary}08`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={[styles.title, { color: THEME.accentPrimary }]}>
              {reading.title}
            </Text>

            <View style={[styles.divider, { backgroundColor: THEME.accentPrimary }]} />

            <Text style={styles.body}>{reading.body}</Text>

            <Text style={styles.source}>— 12-Step Wisdom</Text>
          </LinearGradient>
        </ScrollView>


        <View style={styles.footer}>
          <LinearGradient
            colors={['#3E1E45', '#454E9E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.footerGradient}
          >
            <TouchableOpacity onPress={goToPrevious} style={styles.navButton}>
              <ChevronLeft size={20} color={THEME.textWhite} />
              <Text style={styles.navText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={goToNext} style={styles.navButton}>
              <Text style={styles.navText}>Next</Text>
              <ChevronLeft
                size={20}
                color={THEME.textWhite}
                style={{ transform: [{ rotate: '180deg' }] }}
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>


        {showDatePicker && (
          <DateTimePicker
            value={new Date(new Date().getFullYear(), currentMonth - 1, currentDay)}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={null}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: THEME.textWhite,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 50 : 10,
    paddingBottom: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerDate: {
    fontSize: 20,
    fontWeight: '600',
    color: THEME.textWhite,
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.accentPrimary,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  todayButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  // SCROLLABLE CONTENT
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: `${THEME.accentPrimary}30`,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  divider: {
    width: 60,
    height: 3,
    borderRadius: 2,
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    lineHeight: 26,
    color: THEME.textSoft,
    fontWeight: '400',
  },
  source: {
    fontSize: 13,
    fontStyle: 'italic',
    color: THEME.textGray,
    marginTop: 20,
  },

  // FOOTER
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  footerGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navText: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME.textWhite,
  },
});
