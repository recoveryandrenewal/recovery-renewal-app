// Screens/StepWorkScreen.jsx

// "Progress, not perfection." - 12-Step Recovery Wisdom

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
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Circle,
  BookOpen,
  Heart,
  Shield,
  PenTool,
  Save,
  Share2,
  X,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import step work data
import stepWorkData from '../assets/library/step_work.json';

// THEME - Emerald Green (growth, renewal, healing)
const THEME = {
  cosmicDeep: ['#121024', '#2A1832', '#151525'],
  cosmicSoft: ['#1A0B2E', '#16213E', '#0F3460'],
  accentGreen: '#10B981',
  accentGreenLight: '#34D399',
  accentEmerald: '#059669',
  textWhite: '#FFFFFF',
  textSoft: '#E0E0F0',
  textGray: '#A0A0B0',
  cardBg: 'rgba(255, 255, 255, 0.05)',
  cardBorder: 'rgba(16, 185, 129, 0.3)',
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
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: '#10B981',
            opacity: opacity,
          },
        ]}
      />
    </>
  );
};

// MAIN COMPONENT
const StepWorkScreen = ({ navigation }) => {
  const [viewMode, setViewMode] = useState('steps'); // 'steps' | 'step_detail' | 'special'
  const [selectedStep, setSelectedStep] = useState(null);
  const [selectedSpecial, setSelectedSpecial] = useState(null);

  // JOURNAL STATE (NEW)
  const [journalModalVisible, setJournalModalVisible] = useState(false);
  const [currentQuestionText, setCurrentQuestionText] = useState('');
  const [currentJournalEntry, setCurrentJournalEntry] = useState('');
  const [currentStorageKey, setCurrentStorageKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Get step work data
  const steps = stepWorkData.steps || [];
  const gratitudePrompts = stepWorkData.gratitude_prompts || [];
  const relapsePrevention = stepWorkData.relapse_prevention || {};

  // Handle step selection
  const handleStepSelect = (step) => {
    setSelectedStep(step);
    setViewMode('step_detail');
  };

  // Handle special section selection
  const handleSpecialSelect = (type) => {
    setSelectedSpecial(type);
    setViewMode('special');
  };

  // Navigate between steps
  const handleNextStep = () => {
    if (!selectedStep) return;
    const currentIndex = steps.findIndex(s => s.step_number === selectedStep.step_number);
    if (currentIndex < steps.length - 1) {
      setSelectedStep(steps[currentIndex + 1]);
    }
  };

  const handlePrevStep = () => {
    if (!selectedStep) return;
    const currentIndex = steps.findIndex(s => s.step_number === selectedStep.step_number);
    if (currentIndex > 0) {
      setSelectedStep(steps[currentIndex - 1]);
    }
  };

  // JOURNAL LOGIC (NEW)
  const openJournal = async (identifier, questionIndex, questionText) => {
    const key = `step_journal_${identifier}_${questionIndex}`;
    setCurrentStorageKey(key);
    setCurrentQuestionText(questionText);

    try {
      const savedEntry = await AsyncStorage.getItem(key);
      setCurrentJournalEntry(savedEntry || '');
    } catch (error) {
      console.error('Error loading journal entry:', error);
      setCurrentJournalEntry('');
    }

    setJournalModalVisible(true);
  };

  const saveJournal = async () => {
    if (!currentStorageKey) return;
    setIsSaving(true);
    try {
      await AsyncStorage.setItem(currentStorageKey, currentJournalEntry);
      setTimeout(() => {
        setIsSaving(false);
        setJournalModalVisible(false);
      }, 500);
    } catch (error) {
      console.error('Error saving journal entry:', error);
      setIsSaving(false);
    }
  };

  const shareJournalEntry = async () => {
    if (!currentJournalEntry.trim()) {
      Alert.alert('Empty Entry', 'Write something before sharing.');
      return;
    }

    try {
      await Share.share({
        message: `Reflection on: "${currentQuestionText}"\n\n${currentJournalEntry}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // RENDER: Journal Modal (NEW)
  const renderJournalModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={journalModalVisible}
      onRequestClose={() => setJournalModalVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>Reflection Journal</Text>
              <Text style={styles.modalSubtitle}>Your private thoughts</Text>
            </View>
            <TouchableOpacity
              onPress={() => setJournalModalVisible(false)}
              style={styles.closeButton}
            >
              <X size={24} color={THEME.textGray} />
            </TouchableOpacity>
          </View>

          {/* Question Display */}
          <View style={styles.questionDisplayBox}>
            <Text style={styles.questionDisplayText}>
              {currentQuestionText}
            </Text>
          </View>

          {/* Text Input Area */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Tap here to write your thoughts..."
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={currentJournalEntry}
              onChangeText={setCurrentJournalEntry}
              textAlignVertical="top"
              autoFocus={true}
            />
          </View>

          {/* Footer Actions */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={shareJournalEntry}
            >
              <Share2 size={20} color={THEME.textWhite} />
              <Text style={styles.shareButtonText}>Export</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveJournal}
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

  // RENDER: Steps Overview (ORIGINAL - UNCHANGED)
  const renderStepsOverview = () => (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.accentGreen} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <ClipboardList size={32} color={THEME.accentGreen} />
          <Text style={styles.title}>Step Work</Text>
          <Text style={styles.subtitle}>12-Step Worksheets & Tools</Text>
        </View>
      </View>

      {/* The 12 Steps */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>THE 12 STEPS</Text>
        {steps.map((step) => (
          <TouchableOpacity
            key={step.step_number}
            style={styles.stepCard}
            onPress={() => handleStepSelect(step)}
            activeOpacity={0.8}
          >
            <View style={styles.stepCardHeader}>
              <LinearGradient
                colors={[THEME.accentGreen, THEME.accentEmerald]}
                style={styles.stepNumberBadge}
              >
                <Text style={styles.stepNumber}>{step.step_number}</Text>
              </LinearGradient>
              <View style={styles.stepCardContent}>
                <Text style={styles.stepTitle}>{step.short_title}</Text>
                <Text style={styles.stepDescription} numberOfLines={2}>
                  {step.description}
                </Text>
              </View>
              <ChevronRight size={20} color={THEME.textGray} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Special Sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ADDITIONAL TOOLS</Text>

        {/* Gratitude */}
        <TouchableOpacity
          style={styles.specialCard}
          onPress={() => handleSpecialSelect('gratitude')}
          activeOpacity={0.8}
        >
          <Heart size={24} color={THEME.accentGreen} />
          <View style={styles.specialCardContent}>
            <Text style={styles.specialCardTitle}>Gratitude Practice</Text>
            <Text style={styles.specialCardSubtitle}>Daily gratitude prompts</Text>
          </View>
          <ChevronRight size={20} color={THEME.textGray} />
        </TouchableOpacity>

        {/* Relapse Prevention */}
        <TouchableOpacity
          style={styles.specialCard}
          onPress={() => handleSpecialSelect('relapse')}
          activeOpacity={0.8}
        >
          <Shield size={24} color={THEME.accentGreen} />
          <View style={styles.specialCardContent}>
            <Text style={styles.specialCardTitle}>Relapse Prevention</Text>
            <Text style={styles.specialCardSubtitle}>Warning signs & emergency plan</Text>
          </View>
          <ChevronRight size={20} color={THEME.textGray} />
        </TouchableOpacity>
      </View>

      {/* Attribution */}
      <View style={styles.attributionBox}>
        <Text style={styles.attributionText}>
          Step work questions adapted from 12Step.org (CC BY 4.0)
        </Text>
      </View>
    </ScrollView>
  );

  // RENDER: Step Detail (ORIGINAL LAYOUT, CLICKABLE PROMPTS ADDED)
  const renderStepDetail = () => {
    if (!selectedStep) return null;

    return (
      <View style={styles.detailContainer}>
        {/* Header */}
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={() => setViewMode('steps')} style={styles.backButton}>
            <ChevronLeft size={24} color={THEME.accentGreen} />
          </TouchableOpacity>
          <View style={styles.detailHeaderText}>
            <Text style={styles.detailHeaderTitle}>Step {selectedStep.step_number}</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.detailScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Step Content */}

          {/* Green Gradient Title */}
          <LinearGradient
            colors={[THEME.accentGreen, THEME.accentEmerald]}
            style={styles.detailTitleGradient}
          >
            <Text style={styles.detailStepNumber}>Step {selectedStep.step_number}</Text>
            <Text style={styles.detailTitle}>{selectedStep.short_title}</Text>
          </LinearGradient>

          {/* Description */}
          <View style={styles.detailDescriptionBox}>
            <Text style={styles.detailDescription}>{selectedStep.description}</Text>
          </View>

          {/* Prompts or Sections */}
          {selectedStep.prompts && (
            <View style={styles.promptsContainer}>
              <Text style={styles.promptsTitle}>Reflection Questions</Text>
              {selectedStep.prompts.map((prompt, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.promptCard}
                  activeOpacity={0.7}
                  onPress={() => openJournal(selectedStep.step_number, index, prompt)}
                >
                  <Circle size={8} color={THEME.accentGreen} style={styles.promptBullet} />
                  <Text style={styles.promptText}>{prompt}</Text>
                  <PenTool size={16} color={THEME.accentGreen} style={{ marginLeft: 8 }} />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Step 4 Special Sections */}
          {selectedStep.sections && (
            <View style={styles.sectionsContainer}>
              {selectedStep.sections.map((section, index) => (
                <View key={index} style={styles.inventorySection}>
                  <Text style={styles.inventorySectionTitle}>{section.inventory_type}</Text>
                  <Text style={styles.inventorySectionPrompt}>{section.prompt}</Text>
                  {section.questions && section.questions.map((question, qIndex) => (
                    <TouchableOpacity
                      key={qIndex}
                      style={styles.promptCard}
                      activeOpacity={0.7}
                      onPress={() => openJournal(`${selectedStep.step_number}_${index}`, qIndex, question)}
                    >
                      <Circle size={8} color={THEME.accentGreen} style={styles.promptBullet} />
                      <Text style={styles.promptText}>{question}</Text>
                      <PenTool size={16} color={THEME.accentGreen} style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Reflection Note */}
          {selectedStep.reflection && (
            <View style={styles.reflectionBox}>
              <Text style={styles.reflectionText}>{selectedStep.reflection}</Text>
            </View>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={[
              styles.navButton,
              steps.findIndex(s => s.step_number === selectedStep.step_number) === 0 && styles.navButtonDisabled
            ]}
            onPress={handlePrevStep}
            disabled={steps.findIndex(s => s.step_number === selectedStep.step_number) === 0}
          >
            <ChevronLeft size={20} color={THEME.textWhite} />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButtonCenter}
            onPress={() => setViewMode('steps')}
          >
            <BookOpen size={20} color={THEME.accentGreen} />
            <Text style={styles.navButtonTextCenter}>All Steps</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton,
              steps.findIndex(s => s.step_number === selectedStep.step_number) === steps.length - 1 && styles.navButtonDisabled
            ]}
            onPress={handleNextStep}
            disabled={steps.findIndex(s => s.step_number === selectedStep.step_number) === steps.length - 1}
          >
            <Text style={styles.navButtonText}>Next</Text>
            <ChevronRight size={20} color={THEME.textWhite} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // RENDER: Special Sections (Gratitude / Relapse Prevention) - CLICKABLE PROMPTS ADDED
  const renderSpecialSection = () => {
    return (
      <View style={styles.detailContainer}>
        {/* Header */}
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={() => setViewMode('steps')} style={styles.backButton}>
            <ChevronLeft size={24} color={THEME.accentGreen} />
          </TouchableOpacity>
          <View style={styles.detailHeaderText}>
            <Text style={styles.detailHeaderTitle}>
              {selectedSpecial === 'gratitude' ? 'Gratitude Practice' : 'Relapse Prevention'}
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.detailScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {selectedSpecial === 'gratitude' && (
            <>
              <LinearGradient
                colors={[THEME.accentGreen, THEME.accentEmerald]}
                style={styles.detailTitleGradient}
              >
                <Text style={styles.detailTitle}>Gratitude Practice</Text>
              </LinearGradient>

              <View style={styles.promptsContainer}>
                {gratitudePrompts.map((prompt, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.promptCard}
                    activeOpacity={0.7}
                    onPress={() => openJournal('gratitude', index, prompt)}
                  >
                    <Circle size={8} color={THEME.accentGreen} style={styles.promptBullet} />
                    <Text style={styles.promptText}>{prompt}</Text>
                    <PenTool size={16} color={THEME.accentGreen} style={{ marginLeft: 8 }} />
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.reflectionBox}>
                <Text style={styles.reflectionText}>
                  Gratitude is a powerful tool in recovery. Taking time daily to acknowledge what you're thankful for shifts focus from what's lacking to what's present.
                </Text>
              </View>
            </>
          )}

          {selectedSpecial === 'relapse' && (
            <>
              <LinearGradient
                colors={[THEME.accentGreen, THEME.accentEmerald]}
                style={styles.detailTitleGradient}
              >
                <Text style={styles.detailTitle}>Relapse Prevention Plan</Text>
              </LinearGradient>

              <View style={styles.detailDescriptionBox}>
                <Text style={styles.detailDescription}>{relapsePrevention.description}</Text>
              </View>

              {relapsePrevention.sections && relapsePrevention.sections.map((section, index) => (
                <View key={index} style={styles.inventorySection}>
                  <Text style={styles.inventorySectionTitle}>{section.category}</Text>
                  {section.prompts && section.prompts.map((prompt, pIndex) => (
                    <TouchableOpacity
                      key={pIndex}
                      style={styles.promptCard}
                      activeOpacity={0.7}
                      onPress={() => openJournal(`relapse_${index}`, pIndex, prompt)}
                    >
                      <Circle size={8} color={THEME.accentGreen} style={styles.promptBullet} />
                      <Text style={styles.promptText}>{prompt}</Text>
                      <PenTool size={16} color={THEME.accentGreen} style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </>
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BreathingBackground />
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        {viewMode === 'steps' && renderStepsOverview()}
        {viewMode === 'step_detail' && renderStepDetail()}
        {viewMode === 'special' && renderSpecialSection()}
        {renderJournalModal()}
      </SafeAreaView>
    </View>
  );
};

export default StepWorkScreen;

// STYLES (ORIGINAL + MODAL ADDITIONS)
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
    color: THEME.accentGreen,
    opacity: 0.9,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 60,
    zIndex: 10,
  },

  // SECTIONS
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 13,
    color: THEME.accentGreen,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 16,
  },

  // STEP CARDS
  stepCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
  },
  stepCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  stepNumberBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumber: {
    fontSize: 20,
    color: THEME.textWhite,
    fontWeight: '700',
  },
  stepCardContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    color: THEME.textWhite,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 13,
    color: THEME.textGray,
    lineHeight: 18,
  },

  // SPECIAL CARDS
  specialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
  },
  specialCardContent: {
    flex: 1,
    marginLeft: 16,
  },
  specialCardTitle: {
    fontSize: 18,
    color: THEME.textWhite,
    fontWeight: '600',
    marginBottom: 4,
  },
  specialCardSubtitle: {
    fontSize: 13,
    color: THEME.textGray,
  },

  // STEP DETAIL
  detailContainer: {
    flex: 1,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 60 : 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.cardBorder,
  },
  detailHeaderText: {
    flex: 1,
    alignItems: 'center',
  },
  detailHeaderTitle: {
    fontSize: 18,
    color: THEME.textWhite,
    fontWeight: '700',
  },
  detailScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  detailTitleGradient: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  detailStepNumber: {
    fontSize: 14,
    color: THEME.textWhite,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailTitle: {
    fontSize: 24,
    color: THEME.textWhite,
    fontWeight: '700',
    textAlign: 'center',
  },
  detailDescriptionBox: {
    backgroundColor: THEME.cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
  },
  detailDescription: {
    fontSize: 15,
    color: THEME.textSoft,
    lineHeight: 24,
  },

  // PROMPTS
  promptsContainer: {
    marginBottom: 20,
  },
  promptsTitle: {
    fontSize: 16,
    color: THEME.accentGreenLight,
    fontWeight: '700',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  promptCard: {
    flexDirection: 'row',
    backgroundColor: THEME.cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
    alignItems: 'flex-start',
  },
  promptBullet: {
    marginRight: 12,
    marginTop: 6,
  },
  promptText: {
    flex: 1,
    fontSize: 15,
    color: THEME.textSoft,
    lineHeight: 22,
  },

  // INVENTORY SECTIONS
  sectionsContainer: {
    marginBottom: 20,
  },
  inventorySection: {
    marginBottom: 24,
  },
  inventorySectionTitle: {
    fontSize: 18,
    color: THEME.accentGreenLight,
    fontWeight: '700',
    marginBottom: 8,
  },
  inventorySectionPrompt: {
    fontSize: 14,
    color: THEME.textGray,
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 20,
  },

  // REFLECTION BOX
  reflectionBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.accentGreen,
    marginTop: 20,
  },
  reflectionText: {
    fontSize: 14,
    color: THEME.accentGreenLight,
    lineHeight: 22,
    fontStyle: 'italic',
  },

  // BOTTOM NAV
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(18, 16, 36, 0.95)',
    borderTopWidth: 1,
    borderTopColor: THEME.cardBorder,
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.cardBg,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    fontSize: 14,
    color: THEME.textWhite,
    fontWeight: '600',
    marginHorizontal: 4,
  },
  navButtonCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  navButtonTextCenter: {
    fontSize: 12,
    color: THEME.accentGreen,
    fontWeight: '600',
    marginTop: 4,
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

  // MODAL STYLES (NEW)
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
    paddingBottom: 100,
    height: '85%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(16, 185, 129, 0.2)',
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
  modalSubtitle: {
    fontSize: 14,
    color: THEME.accentGreen,
    marginTop: 4,
  },
  closeButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
  },
  questionDisplayBox: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: THEME.accentGreen,
  },
  questionDisplayText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: THEME.textWhite,
    lineHeight: 24,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 16,
    borderRadius: 12,
  },
  shareButtonText: {
    color: THEME.textWhite,
    fontWeight: '600',
    marginLeft: 8,
  },
  saveButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.accentGreen,
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
