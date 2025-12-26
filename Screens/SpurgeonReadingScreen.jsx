// Screens/SpurgeonReadingScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
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
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // <--- IMPORT ADDED
import spurgeonData from '../assets/m_e.json';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const THEME = {
  cosmicDeep: ['#121024', '#2A1832', '#151525'],
  cosmicSoft: ['#3E1E45', '#454E9E'],
  accentCyan: '#00E5FF',
  accentPurple: '#9D4EDD',
  textWhite: '#FFFFFF',
  textGray: '#A0A0B0',
  textSoft: '#C0C0D0',
};

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
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={THEME.cosmicSoft}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </>
  );
};

export default function SpurgeonReadingScreen({ route, navigation }) {
  const today = new Date();
  const initialMonth = route?.params?.month || today.getMonth() + 1;
  const initialDay = route?.params?.day || today.getDate();

  // TIME LOGIC: 5 PM (17:00) to 2 AM = Evening ('pm')
  const hour = today.getHours();
  const initialTime = route?.params?.time || ((hour >= 17 || hour < 2) ? 'pm' : 'am');

  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentDay, setCurrentDay] = useState(initialDay);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [devotional, setDevotional] = useState(null);

  // --- NEW STATE FOR DATE PICKER ---
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadDevotional(currentMonth, currentDay, currentTime);
  }, [currentMonth, currentDay, currentTime]);

  const loadDevotional = (month, day, time) => {
    const entry = spurgeonData.find(
      (item) => item.month === month && item.day === day && item.time === time
    );

    if (entry) {
      const cleanedBody = entry.body
        .replace(/\r\n/g, '\n')
        .replace(/\n\s+/g, '\n\n')
        .trim();

      setDevotional({
        ...entry,
        body: cleanedBody,
      });
    } else {
      setDevotional(null);
    }
  };

  const goToPrevious = () => {
    if (currentTime === 'pm') {
      setCurrentTime('am');
    } else {
      setCurrentTime('pm');
      let newDay = currentDay - 1;
      let newMonth = currentMonth;

      if (newDay < 1) {
        newMonth = currentMonth - 1;
        if (newMonth < 1) {
          newMonth = 12;
        }
        newDay = new Date(today.getFullYear(), newMonth, 0).getDate();
      }

      setCurrentDay(newDay);
      setCurrentMonth(newMonth);
    }
  };

  const goToNext = () => {
    if (currentTime === 'am') {
      setCurrentTime('pm');
    } else {
      setCurrentTime('am');
      let newDay = currentDay + 1;
      let newMonth = currentMonth;

      const daysInMonth = new Date(today.getFullYear(), currentMonth, 0).getDate();

      if (newDay > daysInMonth) {
        newDay = 1;
        newMonth = currentMonth + 1;
        if (newMonth > 12) {
          newMonth = 1;
        }
      }

      setCurrentDay(newDay);
      setCurrentMonth(newMonth);
    }
  };

  // --- NEW FUNCTION: HANDLE DATE SELECTION ---
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setCurrentMonth(selectedDate.getMonth() + 1);
      setCurrentDay(selectedDate.getDate());
      // We keep the currentTime (am/pm) as is, just changing the date
    }
  };

  const getMonthName = (month) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1];
  };

  const formatDate = () => {
    return `${getMonthName(currentMonth)} ${currentDay}`;
  };

  const getTimeLabel = () => {
    return currentTime === 'am' ? 'Daytime' : 'Evening';
  };

  if (!devotional) {
    return (
      <View style={styles.container}>
        <BreathingBackground />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContent}>
            <Text style={styles.errorText}>Loading devotional...</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <BreathingBackground />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerButton}
          >
            <ChevronLeft size={28} color={THEME.textWhite} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerDate}>{formatDate()}</Text>
            <Text style={styles.headerTime}>{getTimeLabel()} Reading</Text>
          </View>


          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.headerButton}
          >
            <Calendar size={24} color={THEME.accentCyan} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <LinearGradient
            colors={['rgba(62, 30, 69, 0.6)', 'rgba(69, 78, 158, 0.4)']}
            style={styles.contentCard}
          >
            <View style={styles.verseContainer}>
              <Text style={styles.verseText}>{devotional.keyverse}</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.bodyText}>{devotional.body}</Text>
          </LinearGradient>
        </ScrollView>

        <View style={styles.navFooter}>
          <LinearGradient
            colors={['#3E1E45', '#454E9E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.navFooterBackground}
          >
            <TouchableOpacity onPress={goToPrevious} style={styles.navButton}>
              <ChevronLeft size={20} color={THEME.textWhite} />
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>

            <View style={styles.navDivider} />

            <TouchableOpacity onPress={goToNext} style={styles.navButton}>
              <Text style={styles.navButtonText}>Next</Text>
              <ChevronRight size={20} color={THEME.textWhite} />
            </TouchableOpacity>
          </LinearGradient>
        </View>


        {showDatePicker && (
          <DateTimePicker
            value={new Date(new Date().getFullYear(), currentMonth - 1, currentDay)}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={null} // Allows picking future dates if desired, or set to new Date() to restrict
          />
        )}

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
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 50 : 10,
    paddingBottom: 16,
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerDate: {
    fontSize: 20,
    fontWeight: '600',
    color: THEME.textWhite,
    marginBottom: 2,
  },
  headerTime: {
    fontSize: 13,
    fontWeight: '500',
    color: THEME.accentCyan,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
  contentCard: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  verseContainer: {
    marginBottom: 20,
  },
  verseText: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
    color: THEME.accentCyan,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: THEME.accentCyan,
    opacity: 0.3,
    marginBottom: 20,
    borderRadius: 1,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 26,
    color: THEME.textSoft,
    fontWeight: '400',
  },
  navFooter: {
    position: 'absolute',
    bottom: 50,
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
  navFooterBackground: {
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
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME.textWhite,
  },
  navDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: THEME.textGray,
  },
});
