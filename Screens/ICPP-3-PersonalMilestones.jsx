// Screens/ICPP-3-PersonalMilestones.jsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, Easing } from 'react-native';
import { User, Calendar, Type } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// ============================================
// THEME - Match HomeScreen & ICPP-1/2
// ============================================
const THEME = {
  cosmicDeep: ['#121024', '#2A1832', '#151525'],
  gradientCard: ['#3E1E45', '#454E9E'],
  accentCyan: '#00E5FF',
  textWhite: '#FFFFFF',
  textGray: '#A0A0B0',
};

// ============================================
// MILESTONE OPTIONS
// ============================================
const MILESTONE_OPTIONS = [
  { label: 'Sobriety Date', value: 'sober' },
  { label: 'New Beginning', value: 'since my new beginning' },
  { label: 'Spiritual Awakening', value: 'since my spiritual awakening' },
  { label: 'Day I Found Hope', value: 'since I found hope' },
  { label: 'Living in Christ', value: 'Living in Christ' },
  { label: 'Days Without', value: 'without', needsCustomText: true },
];

// ============================================
// BREATHING BACKGROUND
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
const ICPP3PersonalMilestones = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [customText, setCustomText] = useState('');
  const [milestoneDate, setMilestoneDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const nameCardOpacity = useRef(new Animated.Value(0)).current;
  const nameCardTranslate = useRef(new Animated.Value(30)).current;
  const milestoneCardOpacity = useRef(new Animated.Value(0)).current;
  const milestoneCardTranslate = useRef(new Animated.Value(30)).current;
  const dateCardOpacity = useRef(new Animated.Value(0)).current;
  const dateCardTranslate = useRef(new Animated.Value(30)).current;
  const customCardOpacity = useRef(new Animated.Value(0)).current;
  const customCardTranslate = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    const loadData = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const dateString = await AsyncStorage.getItem('milestoneStartDate');
        const label = await AsyncStorage.getItem('milestoneLabel');

        if (name) setUserName(name);
        if (dateString) setMilestoneDate(new Date(dateString));

        if (label) {
          const found = MILESTONE_OPTIONS.find(opt => label.includes(opt.value));
          if (found) {
            setSelectedMilestone(found);
            if (found.needsCustomText) {
              const customPart = label.replace('Days Without ', '').replace('without ', '');
              setCustomText(customPart);
            }
          }
        }
      } catch (e) {
        console.error('Error loading ICPP-3 data:', e);
      }
    };
    loadData();

    Animated.stagger(120, [
      Animated.parallel([
        Animated.timing(nameCardOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(nameCardTranslate, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(milestoneCardOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(milestoneCardTranslate, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(dateCardOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(dateCardTranslate, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(customCardOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(customCardTranslate, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleMilestoneSelect = (option) => {
    setSelectedMilestone(option);
    if (!option || !option.needsCustomText) {
      setCustomText('');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setMilestoneDate(selectedDate);
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('milestoneStartDate', '');
      await AsyncStorage.setItem('milestoneLabel', '');
      // FIXED: Mark setup as complete with correct key
      await AsyncStorage.setItem('onboardingComplete', 'true');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (e) {
      console.error('Error skipping ICPP-3:', e);
    }
  };

  const handleContinue = async () => {
    try {
      let finalLabel = '';
      let finalDate = '';

      if (selectedMilestone) {
        finalDate = milestoneDate.toISOString();
        if (selectedMilestone.needsCustomText && customText.trim()) {
          finalLabel = `Days Without ${customText.trim()}`;
        } else if (!selectedMilestone.needsCustomText) {
          finalLabel = selectedMilestone.value;
        }
      }

      await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('milestoneStartDate', finalDate);
      await AsyncStorage.setItem('milestoneLabel', finalLabel);

      // FIXED: Lock in setup status with correct key
      await AsyncStorage.setItem('onboardingComplete', 'true');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (e) {
      console.error('Error saving ICPP-3 data:', e);
    }
  };

  return (
    <View style={styles.container}>
      <BreathingBackground />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.header}>
            <Text style={styles.title}>Personalize your journey</Text>
            <Text style={styles.subtitle}>
              All fields are optional — you can update these anytime in Settings
            </Text>
          </View>


          <Animated.View
            style={{
              opacity: nameCardOpacity,
              transform: [{ translateY: nameCardTranslate }],
            }}
          >
            <LinearGradient
              colors={THEME.gradientCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <View style={styles.cardIconContainer}>
                <User size={24} color={THEME.accentCyan} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>Name (optional)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="How would you like to be greeted?"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={userName}
                  onChangeText={(text) => setUserName(text.slice(0, 12))}
                  maxLength={12}
                />
              </View>
            </LinearGradient>
          </Animated.View>


          <Animated.View
            style={{
              opacity: milestoneCardOpacity,
              transform: [{ translateY: milestoneCardTranslate }],
            }}
          >
            <LinearGradient
              colors={THEME.gradientCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <View style={styles.cardIconContainer}>
                <Calendar size={24} color={THEME.accentCyan} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>Track a milestone? (optional)</Text>
                <Text style={styles.cardHint}>
                  Sobriety date, spiritual awakening, or any meaningful start
                </Text>

                <View style={styles.milestoneOptions}>

                  <TouchableOpacity
                    style={[
                      styles.milestoneChip,
                      !selectedMilestone && styles.milestoneChipSelected,
                    ]}
                    onPress={() => handleMilestoneSelect(null)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.milestoneChipText,
                        !selectedMilestone && styles.milestoneChipTextSelected,
                      ]}
                    >
                      None
                    </Text>
                  </TouchableOpacity>

                  {MILESTONE_OPTIONS.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.milestoneChip,
                        selectedMilestone?.value === option.value && styles.milestoneChipSelected,
                      ]}
                      onPress={() => handleMilestoneSelect(option)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.milestoneChipText,
                          selectedMilestone?.value === option.value && styles.milestoneChipTextSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </LinearGradient>
          </Animated.View>


          {selectedMilestone?.needsCustomText && (
            <Animated.View
              style={{
                opacity: customCardOpacity,
                transform: [{ translateY: customCardTranslate }],
              }}
            >
              <LinearGradient
                colors={THEME.gradientCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
              >
                <View style={styles.cardIconContainer}>
                  <Type size={24} color={THEME.accentCyan} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardLabel}>Days Without...</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g., Social Media, Smoking, Self-Harm"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={customText}
                    onChangeText={(text) => setCustomText(text.slice(0, 30))}
                    maxLength={30}
                  />
                </View>
              </LinearGradient>
            </Animated.View>
          )}

          {/* DATE PICKER CARD */}
          {selectedMilestone && (
            <Animated.View
              style={{
                opacity: dateCardOpacity,
                transform: [{ translateY: dateCardTranslate }],
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowDatePicker(true)}
              >
                <LinearGradient
                  colors={THEME.gradientCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.card}
                >
                  <View style={styles.cardIconContainer}>
                    <Calendar size={24} color={THEME.accentCyan} />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardLabel}>Milestone Date</Text>
                    <Text style={styles.dateText}>
                      {milestoneDate.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </Text>
                    <Text style={styles.dateHint}>Tap to change date</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={milestoneDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}


          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.skipButton}
              onPress={handleSkip}
            >
              <Text style={styles.skipText}>SKIP</Text>
            </TouchableOpacity>

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
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ICPP3PersonalMilestones;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1B',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 60 : 20,
    paddingBottom: Platform.OS === 'android' ? 40 : 50,
  },

  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: THEME.textWhite,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.3,
    lineHeight: 30,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 13,
    color: THEME.textGray,
    textAlign: 'center',
    opacity: 0.85,
    paddingHorizontal: 16,
  },

  card: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 14,
    color: THEME.accentCyan,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  cardHint: {
    fontSize: 12,
    color: THEME.textGray,
    marginBottom: 12,
    lineHeight: 16,
  },

  textInput: {
    fontSize: 16,
    color: THEME.textWhite,
    borderBottomWidth: 1,
    borderBottomColor: THEME.accentCyan,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  milestoneOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  milestoneChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 8,
    marginBottom: 8,
  },
  milestoneChipSelected: {
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
    borderColor: THEME.accentCyan,
  },
  milestoneChipText: {
    fontSize: 13,
    color: THEME.textWhite,
    fontWeight: '500',
  },
  milestoneChipTextSelected: {
    color: THEME.accentCyan,
    fontWeight: '700',
  },

  dateText: {
    fontSize: 16,
    color: THEME.textWhite,
    fontWeight: '600',
    marginBottom: 4,
  },
  dateHint: {
    fontSize: 11,
    color: THEME.textGray,
    opacity: 0.7,
  },

  footer: {
    paddingTop: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    gap: 12,
  },
  skipButton: {
    flex: 1,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  skipText: {
    color: THEME.textWhite,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  continueButton: {
    flex: 2,
    borderRadius: 28,
    overflow: 'hidden',
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
