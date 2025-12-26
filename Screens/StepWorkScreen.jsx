// Screens/StepWorkScreen.jsx
// "Progress, not perfection." - 12-Step Recovery Wisdom

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
 // SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  Animated,
  Easing,
  Alert,
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
} from 'lucide-react-native';

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

// MAIN COMPONENT
const StepWorkScreen = ({ navigation }) => {
  const [viewMode, setViewMode] = useState('steps'); // 'steps' | 'step_detail' | 'special'
  const [selectedStep, setSelectedStep] = useState(null);
  const [selectedSpecial, setSelectedSpecial] = useState(null);

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

  // RENDER: Steps Overview
  const renderStepsOverview = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={28} color={THEME.accentGreen} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <ClipboardList size={40} color={THEME.accentGreen} strokeWidth={2} />
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
          >
            <View style={styles.stepCardHeader}>
              <LinearGradient
                colors={[THEME.accentGreen, THEME.accentGreenLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
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
              <ChevronRight size={24} color={THEME.accentGreen} />
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
        >
          <Heart size={32} color={THEME.accentGreenLight} strokeWidth={2} />
          <View style={styles.specialCardContent}>
            <Text style={styles.specialCardTitle}>Gratitude Practice</Text>
            <Text style={styles.specialCardSubtitle}>Daily gratitude prompts</Text>
          </View>
          <ChevronRight size={24} color={THEME.accentGreen} />
        </TouchableOpacity>

        {/* Relapse Prevention */}
        <TouchableOpacity
          style={styles.specialCard}
          onPress={() => handleSpecialSelect('relapse')}
        >
          <Shield size={32} color={THEME.accentGreenLight} strokeWidth={2} />
          <View style={styles.specialCardContent}>
            <Text style={styles.specialCardTitle}>Relapse Prevention</Text>
            <Text style={styles.specialCardSubtitle}>Warning signs & emergency plan</Text>
          </View>
          <ChevronRight size={24} color={THEME.accentGreen} />
        </TouchableOpacity>
      </View>

      {/* Attribution */}
      <View style={styles.attributionBox}>
        <Text style={styles.attributionText}>
          Step work questions adapted from 12Step.org (CC BY 4.0)
        </Text>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );

  // RENDER: Step Detail
  const renderStepDetail = () => {
    if (!selectedStep) return null;

    return (
      <View style={styles.detailContainer}>
        {/* Header */}
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={() => setViewMode('steps')} style={styles.backButton}>
            <ChevronLeft size={36} color={THEME.accentGreen} />
          </TouchableOpacity>
          <View style={styles.detailHeaderText}>
            <Text style={styles.detailHeaderTitle}>Step {selectedStep.step_number}</Text>
          </View>
          <View style={{ width: 28 }} />
        </View>

        {/* Step Content */}
        <ScrollView
          contentContainerStyle={styles.detailScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Green Gradient Title */}
          <LinearGradient
            colors={[THEME.accentGreen, THEME.accentGreenLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
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
                <View key={index} style={styles.promptCard}>
                  <View style={styles.promptBullet}>
                    <Circle size={8} color={THEME.accentGreen} fill={THEME.accentGreen} />
                  </View>
                  <Text style={styles.promptText}>{prompt}</Text>
                </View>
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
                    <View key={qIndex} style={styles.promptCard}>
                      <View style={styles.promptBullet}>
                        <Circle size={8} color={THEME.accentGreen} fill={THEME.accentGreen} />
                      </View>
                      <Text style={styles.promptText}>{question}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Reflection Note */}
          {selectedStep.reflection && (
            <View style={styles.reflectionBox}>
              <BookOpen size={20} color={THEME.accentGreenLight} style={{ marginBottom: 8 }} />
              <Text style={styles.reflectionText}>{selectedStep.reflection}</Text>
            </View>
          )}

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={[
              styles.navButton,
              selectedStep.step_number === 1 && styles.navButtonDisabled,
            ]}
            onPress={handlePrevStep}
            disabled={selectedStep.step_number === 1}
          >
            <ChevronLeft size={20} color={THEME.textWhite} />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButtonCenter}
            onPress={() => setViewMode('steps')}
          >
            <ClipboardList size={20} color={THEME.accentGreen} />
            <Text style={styles.navButtonTextCenter}>All Steps</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton,
              selectedStep.step_number === 12 && styles.navButtonDisabled,
            ]}
            onPress={handleNextStep}
            disabled={selectedStep.step_number === 12}
          >
            <Text style={styles.navButtonText}>Next</Text>
            <ChevronRight size={20} color={THEME.textWhite} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // RENDER: Special Sections (Gratitude / Relapse Prevention)
  const renderSpecialSection = () => {
    return (
      <View style={styles.detailContainer}>
        {/* Header */}
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={() => setViewMode('steps')} style={styles.backButton}>
            <ChevronLeft size={28} color={THEME.accentGreen} />
          </TouchableOpacity>
          <View style={styles.detailHeaderText}>
            <Text style={styles.detailHeaderTitle}>
              {selectedSpecial === 'gratitude' ? 'Gratitude Practice' : 'Relapse Prevention'}
            </Text>
          </View>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.detailScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {selectedSpecial === 'gratitude' && (
            <>
              <LinearGradient
                colors={[THEME.accentGreen, THEME.accentGreenLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.detailTitleGradient}
              >
                <Heart size={32} color={THEME.textWhite} strokeWidth={2} style={{ marginBottom: 8 }} />
                <Text style={styles.detailTitle}>Gratitude Practice</Text>
              </LinearGradient>

              <View style={styles.promptsContainer}>
                {gratitudePrompts.map((prompt, index) => (
                  <View key={index} style={styles.promptCard}>
                    <View style={styles.promptBullet}>
                      <Circle size={8} color={THEME.accentGreen} fill={THEME.accentGreen} />
                    </View>
                    <Text style={styles.promptText}>{prompt}</Text>
                  </View>
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
                colors={[THEME.accentGreen, THEME.accentGreenLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.detailTitleGradient}
              >
                <Shield size={32} color={THEME.textWhite} strokeWidth={2} style={{ marginBottom: 8 }} />
                <Text style={styles.detailTitle}>Relapse Prevention Plan</Text>
              </LinearGradient>

              <View style={styles.detailDescriptionBox}>
                <Text style={styles.detailDescription}>{relapsePrevention.description}</Text>
              </View>

              {relapsePrevention.sections && relapsePrevention.sections.map((section, index) => (
                <View key={index} style={styles.inventorySection}>
                  <Text style={styles.inventorySectionTitle}>{section.category}</Text>
                  {section.prompts && section.prompts.map((prompt, pIndex) => (
                    <View key={pIndex} style={styles.promptCard}>
                      <View style={styles.promptBullet}>
                        <Circle size={8} color={THEME.accentGreen} fill={THEME.accentGreen} />
                      </View>
                      <Text style={styles.promptText}>{prompt}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BreathingBackground />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <SafeAreaView style={styles.safeArea}>
        {viewMode === 'steps' && renderStepsOverview()}
        {viewMode === 'step_detail' && renderStepDetail()}
        {viewMode === 'special' && renderSpecialSection()}
      </SafeAreaView>
    </View>
  );
};

export default StepWorkScreen;

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
});
