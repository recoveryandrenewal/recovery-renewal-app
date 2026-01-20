// Screens/JournalScreen.jsx
// My Journal - Free-form daily journaling with privacy

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  TextInput,
  Animated,
  Easing,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Plus,
  ChevronLeft,
  Calendar,
  Save,
  Share2,
  X,
  Trash2,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

// THEME - Purple/Pink cosmic (matches main app)
const THEME = {
  cosmicDeep: ['#121024', '#2A1832', '#151525'],
  cosmicSoft: ['#1A0B2E', '#16213E', '#0F3460'],
  accentPurple: '#A855F7',
  accentPink: '#EC4899',
  accentCyan: '#00E5FF',
  textWhite: '#FFFFFF',
  textSoft: '#E0E0F0',
  textGray: '#A0A0B0',
  cardBg: 'rgba(255, 255, 255, 0.05)',
  cardBorder: 'rgba(168, 85, 247, 0.3)',
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
  }, [opacity]);

  return (
    <>
      <LinearGradient
        colors={THEME.cosmicDeep}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: '#A855F7', opacity: opacity },
        ]}
      />
    </>
  );
};

// UTILITY: Format date for display
const formatDateDisplay = (date) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// UTILITY: Format time for display
const formatTimeDisplay = (date) => {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

// UTILITY: Parse local date from YYYY-MM-DD string (timezone-safe)
const parseLocalDate = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // Month is 0-indexed
};

// UTILITY: Format date to YYYY-MM-DD (local timezone)
const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// UTILITY: Format timestamp for storage key
const formatTimestampKey = (date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}-${minutes}-${seconds}`;
};

// MAIN COMPONENT
const JournalScreen = ({ navigation }) => {
  const [entries, setEntries] = useState([]);
  const [focusModalVisible, setFocusModalVisible] = useState(false);
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentStorageKey, setCurrentStorageKey] = useState('');
  const [isNewEntry, setIsNewEntry] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Load all entries on mount
  useEffect(() => {
    loadAllEntries();
  }, []);

  const loadAllEntries = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const journalKeys = keys.filter((key) => key.startsWith('journal_entry_'));
      const items = await AsyncStorage.multiGet(journalKeys);

      const parsedEntries = items
        .map(([key, value]) => {
          // Key format: journal_entry_YYYY-MM-DD_HH-MM-SS
          const parts = key.replace('journal_entry_', '').split('_');
          if (parts.length !== 2) return null;

          const dateStr = parts[0]; // YYYY-MM-DD
          const timeStr = parts[1]; // HH-MM-SS

          const date = parseLocalDate(dateStr);
          const [hour, min, sec] = timeStr.split('-').map(Number);
          date.setHours(hour, min, sec, 0);

          return {
            key,
            date,
            dateStr,
            timeStr,
            text: value || '',
          };
        })
        .filter(Boolean)
        .sort((a, b) => b.date - a.date); // Newest first

      setEntries(parsedEntries);
    } catch (error) {
      console.error('Error loading journal entries:', error);
    }
  };

  // Open FAB: Create NEW entry
  const handleCreateNew = () => {
    setIsNewEntry(true);
    setCurrentDate(new Date());
    setCurrentEntry('');
    setCurrentStorageKey('');
    setFocusModalVisible(true);
  };

  // Open existing entry card
  const handleOpenEntry = (entry) => {
    setIsNewEntry(false);
    setCurrentDate(entry.date);
    setCurrentEntry(entry.text);
    setCurrentStorageKey(entry.key);
    setFocusModalVisible(true);
  };

  // Save entry with proper date change handling
  const handleSave = async () => {
    if (!currentEntry.trim()) {
      Alert.alert('Empty Entry', 'Please write something before saving.');
      return;
    }

    setIsSaving(true);

    try {
      let finalKey = '';
      const dateKey = formatDateKey(currentDate);
      const timeKey = formatTimestampKey(new Date()); // Use current time for timestamp

      if (isNewEntry) {
        // NEW ENTRY: Generate fresh key
        finalKey = `journal_entry_${dateKey}_${timeKey}`;
      } else {
        // EDITING EXISTING ENTRY
        const originalDateKey = currentStorageKey.replace('journal_entry_', '').split('_')[0];
        const currentDateKey = dateKey;

        if (originalDateKey === currentDateKey) {
          // SAME DATE: Keep original key (update in place)
          finalKey = currentStorageKey;
        } else {
          // DATE CHANGED: Delete old entry, create new one with new timestamp
          await AsyncStorage.removeItem(currentStorageKey);
          finalKey = `journal_entry_${dateKey}_${timeKey}`;
        }
      }

      // Save the entry
      await AsyncStorage.setItem(finalKey, currentEntry);

      setTimeout(() => {
        setIsSaving(false);
        setFocusModalVisible(false);
        loadAllEntries(); // Refresh list
      }, 500);
    } catch (error) {
      console.error('Error saving journal entry:', error);
      setIsSaving(false);
      Alert.alert('Error', 'Failed to save entry.');
    }
  };

  // Delete entry
  const handleDelete = () => {
    if (isNewEntry) {
      // If it's a new entry, just close modal
      setFocusModalVisible(false);
      return;
    }

    Alert.alert(
      'Delete Entry?',
      'This entry will be permanently deleted. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(currentStorageKey);
              setFocusModalVisible(false);
              loadAllEntries();
            } catch (error) {
              console.error('Error deleting entry:', error);
              Alert.alert('Error', 'Failed to delete entry.');
            }
          },
        },
      ]
    );
  };

  // Export entry
  const handleExport = async () => {
    if (!currentEntry.trim()) {
      Alert.alert('Empty Entry', 'Write something before exporting.');
      return;
    }

    try {
      const dateStr = formatDateDisplay(currentDate);
      await Share.share({
        message: `Journal Entry - ${dateStr}\n\n${currentEntry}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Date picker handler WITH SAFETY PROMPT
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // Keep open on iOS

    if (selectedDate && selectedDate.getTime() !== currentDate.getTime()) {
      // Date actually changed
      if (!isNewEntry) {
        // EXISTING ENTRY: Warn user about moving
        const oldDateStr = formatDateDisplay(currentDate);
        const newDateStr = formatDateDisplay(selectedDate);

        Alert.alert(
          'Move Entry?',
          `This will move your journal entry from ${oldDateStr} to ${newDateStr}.`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => {
                // Keep original date, don't change anything
              }
            },
            {
              text: 'Move Entry',
              style: 'default',
              onPress: () => {
                setCurrentDate(selectedDate);
              }
            }
          ]
        );
      } else {
        // NEW ENTRY: Just change the date, no warning needed
        setCurrentDate(selectedDate);
      }
    }
  };

  // RENDER: Landing page with entry cards
  const renderLandingPage = () => {
    return (
      <SafeAreaView style={styles.safeArea}>
        <BreathingBackground />
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <ChevronLeft size={28} color={THEME.textWhite} />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>My Journal</Text>
              <Text style={styles.subtitle}>Your private thoughts</Text>
            </View>
            <View style={{ width: 28 }} />
          </View>

          {/* Entry Cards */}
          {entries.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No journal entries yet.</Text>
              <Text style={styles.emptyHint}>Tap the + button to start writing.</Text>
            </View>
          ) : (
            entries.map((entry) => (
              <TouchableOpacity
                key={entry.key}
                onPress={() => handleOpenEntry(entry)}
                activeOpacity={0.8}
              >
                <View style={styles.entryCard}>
                  <LinearGradient
                    colors={THEME.cosmicSoft}
                    style={styles.entryCardGradient}
                  >
                    <View style={styles.entryCardHeader}>
                      <Text style={styles.entryDate}>
                        {entry.date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </Text>
                      <Text style={styles.entryTime}>{formatTimeDisplay(entry.date)}</Text>
                    </View>
                    <Text style={styles.entryPreview} numberOfLines={3}>
                      {entry.text}
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };

  // RENDER: Focus modal (full-screen editor)
  const renderFocusModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={focusModalVisible}
        onRequestClose={() => setFocusModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Journal Entry</Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={styles.dateButton}
                >
                  <Calendar size={16} color={THEME.accentPurple} style={{ marginRight: 8 }} />
                  <Text style={styles.modalDate}>{formatDateDisplay(currentDate)}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalHeaderIcons}>
                {/* Trash icon - only show for existing entries */}
                {!isNewEntry && (
                  <TouchableOpacity onPress={handleDelete} style={styles.trashButton}>
                    <Trash2 size={22} color={THEME.textGray} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => setFocusModalVisible(false)}
                  style={styles.closeButton}
                >
                  <X size={24} color={THEME.textGray} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Date Picker */}
            {showDatePicker && (
              <DateTimePicker
                value={currentDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}

            {/* Text Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                multiline
                placeholder="What's on your mind?"
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={currentEntry}
                onChangeText={setCurrentEntry}
                textAlignVertical="top"
                autoFocus={true}
              />
            </View>

            {/* Footer Actions */}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
                <Share2 size={20} color={THEME.textWhite} />
                <Text style={styles.exportButtonText}>Export</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                disabled={isSaving}
              >
                <Save size={20} color="#0F0F1B" />
                <Text style={styles.saveButtonText}>
                  {isSaving ? 'Saving...' : 'Save Entry'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {renderLandingPage()}
      {renderFocusModal()}

      {/* FAB Button */}
      <TouchableOpacity style={styles.fab} onPress={handleCreateNew} activeOpacity={0.9}>
        <LinearGradient
          colors={[THEME.accentPurple, THEME.accentPink]}
          style={styles.fabGradient}
        >
          <Plus size={28} color={THEME.textWhite} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default JournalScreen;

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    padding: 4,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: THEME.textWhite,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: THEME.accentPurple,
    opacity: 0.9,
  },

  // EMPTY STATE
  emptyState: {
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    color: THEME.textWhite,
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 14,
    color: THEME.textGray,
    textAlign: 'center',
  },

  // ENTRY CARDS
  entryCard: {
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
    overflow: 'hidden',
  },
  entryCardGradient: {
    padding: 16,
  },
  entryCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryDate: {
    fontSize: 16,
    color: THEME.textWhite,
    fontWeight: '600',
  },
  entryTime: {
    fontSize: 12,
    color: THEME.textGray,
  },
  entryPreview: {
    fontSize: 14,
    color: THEME.textSoft,
    lineHeight: 20,
  },

  // FAB BUTTON
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // MODAL
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 15, 27, 0.95)',
  },
  modalContent: {
    backgroundColor: '#1A1A2E',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 60,
    height: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(168, 85, 247, 0.2)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.textWhite,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  modalDate: {
    fontSize: 14,
    color: THEME.accentPurple,
  },
  modalHeaderIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trashButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
  },
  closeButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
  },

  // TEXT INPUT
  inputContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.2)',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: THEME.textWhite,
    lineHeight: 24,
  },

  // FOOTER ACTIONS
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  exportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 16,
    borderRadius: 12,
  },
  exportButtonText: {
    color: THEME.textWhite,
    fontWeight: '600',
    marginLeft: 8,
  },
  saveButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.accentPurple,
    padding: 16,
    borderRadius: 12,
  },
  saveButtonText: {
    color: '#0F0F1B',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});
