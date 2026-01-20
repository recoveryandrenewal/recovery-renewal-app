// Screens/SettingsScreen.jsx

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
  Platform,
  Alert,
  Animated,
  Easing
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import {
  BookOpen,
  Heart,
  Calendar,
  Clock,
  ShieldCheck,
  Trash2,
  RotateCcw,
  Info,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react-native';

// ============================================
// THEME - Match HomeScreen & Reading Screens
// ============================================
const THEME = {
  cosmicDeep: ['#121024', '#2A1832', '#151525'],
  cosmicSoft: ['#3E1E45', '#454E9E'],
  accentCyan: '#00E5FF',
  textWhite: '#FFFFFF',
  textSoft: '#C0C0D0',
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
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 12500,
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
        style={StyleSheet.absoluteFillObject}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { opacity },
        ]}
      >
        <LinearGradient
          colors={THEME.cosmicSoft}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>
    </>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const SettingsScreen = ({ navigation }) => {
  // Reading Preferences
  const [christianEnabled, setChristianEnabled] = useState(false);
  const [spiritualEnabled, setSpiritualEnabled] = useState(false);

  // Christian Detail
  const [spurgeonEnabled, setSpurgeonEnabled] = useState(true);
  const [simpsonEnabled, setSimpsonEnabled] = useState(true);

  // Spiritual Detail
  const [buddhistEnabled, setBuddhistEnabled] = useState(true);
  const [taoistEnabled, setTaoistEnabled] = useState(true);
  const [stoicEnabled, setStoicEnabled] = useState(true);

  // Spurgeon Mode
  const [spurgeonMode, setSpurgeonMode] = useState('auto');

  // Recovery Content
  const [wisdomEnabled, setWisdomEnabled] = useState(false);
  const [meditationEnabled, setMeditationEnabled] = useState(false);

  // Milestone Controls
  const [showCounter, setShowCounter] = useState(true);

  // ============================================
  // LOAD SETTINGS ON MOUNT
  // ============================================
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Load reading preferences
      const readingPref = await AsyncStorage.getItem('readingPreference');
      if (readingPref === 'christian' || readingPref === 'both') {
        setChristianEnabled(true);
      }
      if (readingPref === 'spiritual' || readingPref === 'both') {
        setSpiritualEnabled(true);
      }

      // Load Christian detail config
      const christianDetail = await AsyncStorage.getItem('christianDetailConfig');
      if (christianDetail) {
        const detail = JSON.parse(christianDetail);
        setSpurgeonEnabled(detail.spurgeon !== false);
        setSimpsonEnabled(detail.simpson !== false);
      }

      // Load spiritual detail config
      const spiritualDetail = await AsyncStorage.getItem('spiritualDetailConfig');
      if (spiritualDetail) {
        const detail = JSON.parse(spiritualDetail);
        setBuddhistEnabled(detail.buddhist !== false);
        setTaoistEnabled(detail.taoist !== false);
        setStoicEnabled(detail.stoic !== false);
      }

      // Load Spurgeon mode
      const spurgeon = await AsyncStorage.getItem('spurgeonMode');
      if (spurgeon) setSpurgeonMode(spurgeon);

      // Load recovery material config
      const recoveryConfig = await AsyncStorage.getItem('recoveryMaterialConfig');
      if (recoveryConfig) {
        const config = JSON.parse(recoveryConfig);
        setWisdomEnabled(config.recoveryType?.includes('wisdom') || false);
        setMeditationEnabled(config.recoveryType?.includes('meditation') || false);
      }

      // Load milestone visibility
      const counterVisible = await AsyncStorage.getItem('showMilestoneCounter');
      setShowCounter(counterVisible !== 'false');
    } catch (e) {
      console.error('Error loading settings:', e);
    }
  };

  // ============================================
  // SAVE HANDLERS
  // ============================================
  const saveReadingPreference = async (christian, spiritual) => {
    try {
      let pref = '';
      if (christian && spiritual) pref = 'both';
      else if (christian) pref = 'christian';
      else if (spiritual) pref = 'spiritual';
      else pref = '';

      await AsyncStorage.setItem('readingPreference', pref);
      console.log('Reading preference saved:', pref);
    } catch (e) {
      console.error('Error saving reading preference:', e);
    }
  };

  const saveChristianDetail = async (spurgeon, simpson) => {
    try {
      const detail = {
        spurgeon,
        simpson,
      };
      await AsyncStorage.setItem('christianDetailConfig', JSON.stringify(detail));
      console.log('Christian detail saved:', detail);
    } catch (e) {
      console.error('Error saving Christian detail:', e);
    }
  };

  const saveSpiritualDetail = async (buddhist, taoist, stoic) => {
    try {
      const detail = {
        buddhist,
        taoist,
        stoic,
      };
      await AsyncStorage.setItem('spiritualDetailConfig', JSON.stringify(detail));
      console.log('Spiritual detail saved:', detail);
    } catch (e) {
      console.error('Error saving spiritual detail:', e);
    }
  };

  const saveSpurgeonMode = async (mode) => {
    try {
      await AsyncStorage.setItem('spurgeonMode', mode);
      console.log('Spurgeon mode saved:', mode);
    } catch (e) {
      console.error('Error saving Spurgeon mode:', e);
    }
  };

  const saveRecoveryConfig = async (wisdom, meditation) => {
    try {
      const recoveryType = [];
      if (wisdom) recoveryType.push('wisdom');
      if (meditation) recoveryType.push('meditation');
      const config = { recoveryType };
      await AsyncStorage.setItem('recoveryMaterialConfig', JSON.stringify(config));
      console.log('Recovery config saved:', config);
    } catch (e) {
      console.error('Error saving recovery config:', e);
    }
  };

  const saveCounterVisibility = async (visible) => {
    try {
      await AsyncStorage.setItem('showMilestoneCounter', visible ? 'true' : 'false');
      console.log('Counter visibility saved:', visible);
    } catch (e) {
      console.error('Error saving counter visibility:', e);
    }
  };

  // ============================================
  // TOGGLE HANDLERS
  // ============================================
  const handleChristianToggle = (value) => {
    if (!value && !spiritualEnabled) {
      setChristianEnabled(false);
      setSpiritualEnabled(true);
      saveReadingPreference(false, true);
      return;
    }
    setChristianEnabled(value);
    saveReadingPreference(value, spiritualEnabled);
  };

  const handleSpiritualToggle = (value) => {
    if (!value && !christianEnabled) {
      setSpiritualEnabled(false);
      setChristianEnabled(true);
      saveReadingPreference(true, false);
      return;
    }
    setSpiritualEnabled(value);
    saveReadingPreference(christianEnabled, value);
  };

  const handleSpurgeonToggle = (value) => {
    setSpurgeonEnabled(value);
    saveChristianDetail(value, simpsonEnabled);
  };

  const handleSimpsonToggle = (value) => {
    setSimpsonEnabled(value);
    saveChristianDetail(spurgeonEnabled, value);
  };

  const handleBuddhistToggle = (value) => {
    setBuddhistEnabled(value);
    saveSpiritualDetail(value, taoistEnabled, stoicEnabled);
  };

  const handleTaoistToggle = (value) => {
    setTaoistEnabled(value);
    saveSpiritualDetail(buddhistEnabled, value, stoicEnabled);
  };

  const handleStoicToggle = (value) => {
    setStoicEnabled(value);
    saveSpiritualDetail(buddhistEnabled, taoistEnabled, value);
  };

  const handleSpurgeonModeChange = (mode) => {
    setSpurgeonMode(mode);
    saveSpurgeonMode(mode);
  };

  const handleWisdomToggle = (value) => {
    setWisdomEnabled(value);
    saveRecoveryConfig(value, meditationEnabled);
  };

  const handleMeditationToggle = (value) => {
    setMeditationEnabled(value);
    saveRecoveryConfig(wisdomEnabled, value);
  };

  const handleCounterToggle = (value) => {
    setShowCounter(value);
    saveCounterVisibility(value);
  };

  // ============================================
  // ACTION HANDLERS
  // ============================================
  const handleEditMilestone = () => {
    navigation.navigate('ICPP-3');
  };

  const handleRerunOnboarding = () => {
    Alert.alert(
      'Restart Setup',
      'This will restart the setup process. Your data will be preserved. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('onboardingComplete');
              navigation.reset({
                index: 0,
                routes: [{ name: 'DUAA' }],
              });
            } catch (e) {
              console.error('Error clearing onboarding flag:', e);
            }
          },
        },
      ]
    );
  };

  // ============================================
  // NEW DELETION HANDLERS
  // ============================================

  // 1. Delete All Step Work Entries
  const handleDeleteAllStepWork = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stepWorkKeys = keys.filter(key => key.startsWith('stepwork_'));

      if (stepWorkKeys.length === 0) {
        Alert.alert('No Step Work Entries', 'You don\'t have any step work entries to delete.');
        return;
      }

      Alert.alert(
        'Delete All Step Work Entries?',
        `This will permanently delete ${stepWorkKeys.length} step work ${stepWorkKeys.length === 1 ? 'entry' : 'entries'}. This cannot be undone.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete All',
            style: 'destructive',
            onPress: async () => {
              try {
                await AsyncStorage.multiRemove(stepWorkKeys);
                Alert.alert('Success', 'All step work entries have been deleted.');
              } catch (error) {
                console.error('Error deleting step work entries:', error);
                Alert.alert('Error', 'Failed to delete step work entries.');
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error fetching step work keys:', error);
      Alert.alert('Error', 'Failed to fetch step work entries.');
    }
  };

  // 2. Delete All Journal Entries
  const handleDeleteAllJournals = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const journalKeys = keys.filter(key => key.startsWith('journal_entry_'));

      if (journalKeys.length === 0) {
        Alert.alert('No Journal Entries', 'You don\'t have any journal entries to delete.');
        return;
      }

      Alert.alert(
        'Delete All Journal Entries?',
        `This will permanently delete ${journalKeys.length} journal ${journalKeys.length === 1 ? 'entry' : 'entries'}. This cannot be undone.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete All',
            style: 'destructive',
            onPress: async () => {
              try {
                await AsyncStorage.multiRemove(journalKeys);
                Alert.alert('Success', 'All journal entries have been deleted.');
              } catch (error) {
                console.error('Error deleting journal entries:', error);
                Alert.alert('Error', 'Failed to delete journal entries.');
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error fetching journal keys:', error);
      Alert.alert('Error', 'Failed to fetch journal entries.');
    }
  };

  // 3. Reset App Preferences (Keep journals and step work)
  const handleResetPreferences = async () => {
    Alert.alert(
      'Reset App Preferences?',
      'This will reset all settings, reading preferences, and milestone data. Your journal and step work entries will be kept safe.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset Preferences',
          style: 'destructive',
          onPress: async () => {
            try {
              const keys = await AsyncStorage.getAllKeys();

              // Keep journal and step work entries
              const keysToDelete = keys.filter(key =>
                !key.startsWith('journal_entry_') &&
                !key.startsWith('stepwork_')
              );

              await AsyncStorage.multiRemove(keysToDelete);

              Alert.alert(
                'Preferences Reset',
                'App preferences have been reset. Restarting setup...',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'DUAA' }],
                      });
                    },
                  },
                ]
              );
            } catch (error) {
              console.error('Error resetting preferences:', error);
              Alert.alert('Error', 'Failed to reset preferences.');
            }
          },
        },
      ]
    );
  };

  // 4. Factory Reset (Nuclear Option)
  const handleFactoryReset = () => {
    Alert.alert(
      'Factory Reset',
      'This will delete EVERYTHING:\n\n• All journal entries\n• All step work entries\n• Sobriety milestones\n• App settings\n\nThis cannot be undone. Are you absolutely sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Erase Everything',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Splash' }],
              });
            } catch (e) {
              console.error('Error clearing all data:', e);
              Alert.alert('Error', 'Failed to reset app.');
            }
          },
        },
      ]
    );
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <BreathingBackground />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeft color={THEME.accentCyan} size={28} />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Changes save automatically</Text>
          </View>

          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ========================================== */}
          {/* READING & RECOVERY */}
          {/* ========================================== */}
          <Text style={styles.sectionTitle}>Reading & Recovery</Text>

          {/* Christian Readings Toggle */}
          <LinearGradient
            colors={['rgba(62, 30, 69, 0.4)', 'rgba(69, 78, 158, 0.3)']}
            style={[styles.settingRow, { marginBottom: 16 }]}
          >
            <View style={styles.iconContainer}>
              <BookOpen color={THEME.accentCyan} size={20} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Christian Readings</Text>
              <Text style={styles.settingHint}>Spurgeon, Simpson, & more</Text>
            </View>
            <Switch
              value={christianEnabled}
              onValueChange={handleChristianToggle}
              trackColor={{ false: '#444', true: THEME.accentCyan }}
              thumbColor="#FFF"
            />
          </LinearGradient>

          {/* Christian Detail Toggles */}
          {christianEnabled && (
            <View style={styles.nestedSection}>
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => handleSpurgeonToggle(!spurgeonEnabled)}
              >
                <View style={styles.checkbox}>
                  <View
                    style={[
                      styles.checkboxBox,
                      spurgeonEnabled && styles.checkboxBoxChecked,
                    ]}
                  >
                    {spurgeonEnabled && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>Spurgeon's Devotional</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => handleSimpsonToggle(!simpsonEnabled)}
              >
                <View style={styles.checkbox}>
                  <View
                    style={[
                      styles.checkboxBox,
                      simpsonEnabled && styles.checkboxBoxChecked,
                    ]}
                  >
                    {simpsonEnabled && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>Simpson's Devotional</Text>
                </View>
              </TouchableOpacity>

              {/* Spurgeon Schedule - Only shows when Spurgeon is checked */}
              {spurgeonEnabled && (
                <View style={styles.spurgeonScheduleSection}>
                  <Text style={styles.nestedLabel}>Spurgeon Schedule</Text>
                  <View style={styles.radioGroup}>
                    <TouchableOpacity
                      style={styles.radioOption}
                      onPress={() => handleSpurgeonModeChange('auto')}
                    >
                      <View
                        style={[
                          styles.radioCircle,
                          spurgeonMode === 'auto' && styles.radioCircleSelected,
                        ]}
                      >
                        {spurgeonMode === 'auto' && <View style={styles.radioInner} />}
                      </View>
                      <Text style={styles.radioText}>Auto (time-based)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.radioOption}
                      onPress={() => handleSpurgeonModeChange('morning')}
                    >
                      <View
                        style={[
                          styles.radioCircle,
                          spurgeonMode === 'morning' && styles.radioCircleSelected,
                        ]}
                      >
                        {spurgeonMode === 'morning' && <View style={styles.radioInner} />}
                      </View>
                      <Text style={styles.radioText}>Always Morning</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.radioOption}
                      onPress={() => handleSpurgeonModeChange('evening')}
                    >
                      <View
                        style={[
                          styles.radioCircle,
                          spurgeonMode === 'evening' && styles.radioCircleSelected,
                        ]}
                      >
                        {spurgeonMode === 'evening' && <View style={styles.radioInner} />}
                      </View>
                      <Text style={styles.radioText}>Always Evening</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Spiritual Readings Toggle */}
          <LinearGradient
            colors={['rgba(62, 30, 69, 0.4)', 'rgba(69, 78, 158, 0.3)']}
            style={[styles.settingRow, { marginBottom: 16 }]}
          >
            <View style={styles.iconContainer}>
              <BookOpen color={THEME.accentCyan} size={20} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Spiritual Readings</Text>
              <Text style={styles.settingHint}>Buddhist, Taoist, Stoic</Text>
            </View>
            <Switch
              value={spiritualEnabled}
              onValueChange={handleSpiritualToggle}
              trackColor={{ false: '#444', true: THEME.accentCyan }}
              thumbColor="#FFF"
            />
          </LinearGradient>

          {/* Spiritual Detail Toggles */}
          {spiritualEnabled && (
            <View style={styles.nestedSection}>
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => handleBuddhistToggle(!buddhistEnabled)}
              >
                <View style={styles.checkbox}>
                  <View
                    style={[
                      styles.checkboxBox,
                      buddhistEnabled && styles.checkboxBoxChecked,
                    ]}
                  >
                    {buddhistEnabled && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>Buddhism</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => handleTaoistToggle(!taoistEnabled)}
              >
                <View style={styles.checkbox}>
                  <View
                    style={[
                      styles.checkboxBox,
                      taoistEnabled && styles.checkboxBoxChecked,
                    ]}
                  >
                    {taoistEnabled && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>Taoism</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => handleStoicToggle(!stoicEnabled)}
              >
                <View style={styles.checkbox}>
                  <View
                    style={[
                      styles.checkboxBox,
                      stoicEnabled && styles.checkboxBoxChecked,
                    ]}
                  >
                    {stoicEnabled && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>Stoic</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Daily Wisdom Toggle */}
          <LinearGradient
            colors={['rgba(62, 30, 69, 0.4)', 'rgba(69, 78, 158, 0.3)']}
            style={[styles.settingRow, { marginBottom: 16 }]}
          >
            <View style={styles.iconContainer}>
              <Heart color={THEME.accentCyan} size={20} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Daily Wisdom</Text>
              <Text style={styles.settingHint}>12-Step slogans</Text>
            </View>
            <Switch
              value={wisdomEnabled}
              onValueChange={handleWisdomToggle}
              trackColor={{ false: '#444', true: THEME.accentCyan }}
              thumbColor="#FFF"
            />
          </LinearGradient>

          {/* Mindfulness Practice Toggle */}
          <LinearGradient
            colors={['rgba(62, 30, 69, 0.4)', 'rgba(69, 78, 158, 0.3)']}
            style={[styles.settingRow, { marginBottom: 32 }]}
          >
            <View style={styles.iconContainer}>
              <Heart color={THEME.accentCyan} size={20} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Mindfulness Practice</Text>
              <Text style={styles.settingHint}>Recovery Dharma</Text>
            </View>
            <Switch
              value={meditationEnabled}
              onValueChange={handleMeditationToggle}
              trackColor={{ false: '#444', true: THEME.accentCyan }}
              thumbColor="#FFF"
            />
          </LinearGradient>

          {/* ========================================== */}
          {/* MILESTONE & COUNTER */}
          {/* ========================================== */}
          <Text style={styles.sectionTitle}>Milestone & Counter</Text>

          {/* Show Counter Toggle */}
          <LinearGradient
            colors={['rgba(62, 30, 69, 0.4)', 'rgba(69, 78, 158, 0.3)']}
            style={[styles.settingRow, { marginBottom: 16 }]}
          >
            <View style={styles.iconContainer}>
              <Calendar color={THEME.accentCyan} size={20} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Show Counter on Home</Text>
              <Text style={styles.settingHint}>Toggle milestone visibility</Text>
            </View>
            <Switch
              value={showCounter}
              onValueChange={handleCounterToggle}
              trackColor={{ false: '#444', true: THEME.accentCyan }}
              thumbColor="#FFF"
            />
          </LinearGradient>

          {/* Edit Milestone Button */}
          <TouchableOpacity onPress={handleEditMilestone}>
            <LinearGradient
              colors={['rgba(62, 30, 69, 0.4)', 'rgba(69, 78, 158, 0.3)']}
              style={[styles.settingRow, { marginBottom: 32 }]}
            >
              <View style={styles.iconContainer}>
                <Clock color={THEME.accentCyan} size={20} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Edit Name & Milestone</Text>
                <Text style={styles.settingHint}>Update your info</Text>
              </View>
              <ChevronRight color={THEME.textGray} size={20} />
            </LinearGradient>
          </TouchableOpacity>

          {/* ========================================== */}
          {/* DATA MANAGEMENT - NEW SECTION */}
          {/* ========================================== */}
          <Text style={styles.sectionTitle}>Data Management</Text>

          {/* 1. Delete All Step Work Entries */}
          <TouchableOpacity onPress={handleDeleteAllStepWork}>
            <LinearGradient
              colors={['rgba(62, 30, 69, 0.4)', 'rgba(69, 78, 158, 0.3)']}
              style={[styles.settingRow, { marginBottom: 12 }]}
            >
              <View style={styles.iconContainer}>
                <Trash2 color={THEME.accentCyan} size={20} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Delete All Step Work Entries</Text>
                <Text style={styles.settingHint}>Remove all step work data</Text>
              </View>
              <ChevronRight color={THEME.textGray} size={20} />
            </LinearGradient>
          </TouchableOpacity>

          {/* 2. Delete All Journal Entries */}
          <TouchableOpacity onPress={handleDeleteAllJournals}>
            <LinearGradient
              colors={['rgba(62, 30, 69, 0.4)', 'rgba(69, 78, 158, 0.3)']}
              style={[styles.settingRow, { marginBottom: 12 }]}
            >
              <View style={styles.iconContainer}>
                <Trash2 color={THEME.accentCyan} size={20} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Delete All Journal Entries</Text>
                <Text style={styles.settingHint}>Remove all journal data</Text>
              </View>
              <ChevronRight color={THEME.textGray} size={20} />
            </LinearGradient>
          </TouchableOpacity>

          {/* 3. Reset App Preferences */}
          <TouchableOpacity onPress={handleResetPreferences}>
            <LinearGradient
              colors={['rgba(62, 30, 69, 0.4)', 'rgba(69, 78, 158, 0.3)']}
              style={[styles.settingRow, { marginBottom: 12 }]}
            >
              <View style={styles.iconContainer}>
                <RotateCcw color={THEME.accentCyan} size={20} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Reset App Preferences</Text>
                <Text style={styles.settingHint}>Keep journals & step work intact</Text>
              </View>
              <ChevronRight color={THEME.textGray} size={20} />
            </LinearGradient>
          </TouchableOpacity>

          {/* 4. Factory Reset - RED DESTRUCTIVE BOX */}
          <TouchableOpacity onPress={handleFactoryReset}>
            <LinearGradient
              colors={['rgba(120, 30, 30, 0.5)', 'rgba(80, 20, 20, 0.4)']}
              style={[styles.settingRow, { marginBottom: 32 }]}
            >
              <View style={styles.iconContainer}>
                <Trash2 color="#FF6B6B" size={20} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingLabel, { color: '#FF6B6B' }]}>
                  Factory Reset
                </Text>
                <Text style={styles.settingHint}>Delete everything permanently</Text>
              </View>
              <ChevronRight color="#FF6B6B" size={20} />
            </LinearGradient>
          </TouchableOpacity>

          {/* ========================================== */}
          {/* DATA & PRIVACY */}
          {/* ========================================== */}
          <Text style={styles.sectionTitle}>Privacy & Support</Text>

          {/* Privacy Info Block */}
          <View style={styles.privacyBlock}>
            <ShieldCheck color={THEME.accentCyan} size={24} />
            <Text style={styles.privacyText}>
              No accounts. No servers. No tracking.{'\n\n'}
              All data is stored locally on this device.
            </Text>
          </View>

          {/* Re-run Setup Button */}
          <TouchableOpacity onPress={handleRerunOnboarding}>
            <LinearGradient
              colors={['rgba(62, 30, 69, 0.4)', 'rgba(69, 78, 158, 0.3)']}
              style={[styles.settingRow, { marginTop: 16, marginBottom: 32 }]}
            >
              <View style={styles.iconContainer}>
                <RotateCcw color={THEME.accentCyan} size={20} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Re-run Setup</Text>
                <Text style={styles.settingHint}>Restart onboarding flow</Text>
              </View>
              <ChevronRight color={THEME.textGray} size={20} />
            </LinearGradient>
          </TouchableOpacity>

          {/* ========================================== */}
          {/* ABOUT */}
          {/* ========================================== */}
          <Text style={styles.sectionTitle}>About</Text>

          {/* App Info Block */}
          <View style={styles.appInfoBlock}>
            <Info color={THEME.textGray} size={20} />
            <Text style={styles.appInfoText}>
              Recovery & Renewal v1.0.3{'\n'}
              January 2026{'\n\n'}
              Free, open-source, and privacy-first.{'\n'}
              One day at a time.
            </Text>
          </View>

          {/* Bottom padding */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SettingsScreen;

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  // --- HEADER STYLES ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: THEME.textWhite,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: THEME.textGray,
    opacity: 0.8,
  },

  // SECTION TITLES
  sectionTitle: {
    fontSize: 16,
    color: THEME.accentCyan,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },

  // SETTING ROW
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    color: THEME.textWhite,
    fontWeight: '600',
  },
  settingHint: {
    fontSize: 12,
    color: THEME.textGray,
    marginTop: 2,
  },

  // NESTED SECTIONS
  nestedSection: {
    marginLeft: 48,
    marginTop: 12,
    marginBottom: 16,
  },
  nestedLabel: {
    fontSize: 13,
    color: THEME.textSoft,
    fontWeight: '600',
    marginBottom: 8,
  },

  // SPURGEON SCHEDULE SECTION
  spurgeonScheduleSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 229, 255, 0.15)',
  },

  // RADIO BUTTONS
  radioGroup: {
    marginTop: 4,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: THEME.textGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioCircleSelected: {
    borderColor: THEME.accentCyan,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME.accentCyan,
  },
  radioText: {
    fontSize: 13,
    color: THEME.textSoft,
  },

  // CHECKBOXES
  checkboxRow: {
    marginBottom: 8,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: THEME.textGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxBoxChecked: {
    backgroundColor: THEME.accentCyan,
    borderColor: THEME.accentCyan,
  },
  checkmark: {
    color: THEME.textWhite,
    fontSize: 14,
    fontWeight: '700',
  },
  checkboxLabel: {
    fontSize: 13,
    color: THEME.textSoft,
  },

  // PRIVACY BLOCK
  privacyBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
  },
  privacyText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
    color: THEME.textSoft,
    lineHeight: 18,
  },

  // APP INFO BLOCK
  appInfoBlock: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  appInfoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 12,
    color: THEME.textGray,
    lineHeight: 18,
  },
});
