// Components/RecoveryCarousel.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Scroll, Brain } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Import JSON data
import wisdomData from '../assets/wisdom_daily.json';
import reflectionData from '../assets/reflection_daily.json';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 48;

const THEME = {
  // RECOVERY CAROUSEL COLORS - DISTINCT FROM DEVOTIONAL
  gradientWisdom: ['#84CC16', '#10B981'], // Electric Lime → Green (fresh, hopeful, energetic)
  gradientMindfulness: ['#0891B2', '#3B82F6'], // Cyan → Blue (calm, meditative)
  textWhite: '#FFFFFF',
  textGray: '#A0A0B0',
};

export default function RecoveryCarousel() {
  const navigation = useNavigation();
  const [cards, setCards] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const loadRecoveryPreferenceAndBuildCards = useCallback(async () => {
    try {
      // MATCH ICPP-2: Read from 'recoveryMaterialConfig'
      const configJson = await AsyncStorage.getItem('recoveryMaterialConfig');

      if (!configJson) {
        console.log('RecoveryCarousel: No recoveryMaterialConfig found');
        setCards([]);
        return;
      }

      const config = JSON.parse(configJson);
      console.log('RecoveryCarousel: Loaded config =', config);

      // ICPP-2 saves: { recoveryType: ['wisdom', 'meditation'] }
      const recoveryTypes = config.recoveryType || [];

      // Check if user selected any recovery content
      if (recoveryTypes.length === 0) {
        console.log('RecoveryCarousel: No recovery types selected');
        setCards([]);
        return;
      }

      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      let builtCards = [];

      // ============================================
      // CARD 1: DAILY WISDOM (12-Step)
      // ============================================
      if (recoveryTypes.includes('wisdom')) {
        // Load from wisdom_daily.json
        const wisdomReading = wisdomData.find(
          (item) => item.month === month && item.day === day
        ) || {
          month,
          day,
          title: "One Day at a Time",
          body: "Recovery happens one day at a time. Can you stay sober just for today?",
          category: "recovery",
        };

        builtCards.push({
          id: 'wisdom',
          type: 'recovery',
          title: 'Daily Wisdom',
          subtitle: wisdomReading.title,
          preview: wisdomReading.body.slice(0, 120) + '...',
          gradient: THEME.gradientWisdom,
          icon: 'scroll',
          onPress: () => {
            console.log('Navigate to WisdomReading');
            navigation.navigate('WisdomReading', { month, day });
          },
        });
      }

      // ============================================
      // CARD 2: MINDFULNESS PRACTICE (Recovery Dharma)
      // ============================================
      if (recoveryTypes.includes('meditation')) {
        // Load from reflection_daily.json
        const reflectionReading = reflectionData.find(
          (item) => item.month === month && item.day === day
        ) || {
          month,
          day,
          title: "Breath Awareness",
          body: "Begin by bringing your attention to your breath. Notice the natural rhythm.",
          practice: "Sit comfortably. Close your eyes. Count 10 breaths.",
          category: "meditation",
        };

        builtCards.push({
          id: 'mindfulness',
          type: 'recovery',
          title: 'Mindfulness Practice',
          subtitle: reflectionReading.title,
          preview: reflectionReading.body.slice(0, 100) + '...',
          gradient: THEME.gradientMindfulness,
          icon: 'brain',
          onPress: () => {
            console.log('Navigate to ReflectionReading');
            navigation.navigate('ReflectionReading', { month, day });
          },
        });
      }

      console.log(`RecoveryCarousel: Built ${builtCards.length} cards`);
      setCards(builtCards);
    } catch (error) {
      console.error('Error loading recovery cards:', error);
      setCards([]);
    }
  }, [navigation]);

  // Initial load
  useEffect(() => {
    loadRecoveryPreferenceAndBuildCards();
  }, [loadRecoveryPreferenceAndBuildCards]);

  // Reload whenever Home gains focus (back from Settings)
  useFocusEffect(
    useCallback(() => {
      loadRecoveryPreferenceAndBuildCards();
    }, [loadRecoveryPreferenceAndBuildCards])
  );

  // SCROLL TRACKING FOR DOT INDICATOR
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + 16));
    setActiveIndex(index);
  };

  // Helper to render icon based on type
  const renderIcon = (iconType) => {
    const iconProps = { size: 20, color: THEME.textWhite };
    switch (iconType) {
      case 'scroll':
        return <Scroll {...iconProps} />;
      case 'brain':
        return <Brain {...iconProps} />;
      default:
        return <Scroll {...iconProps} />;
    }
  };

  if (cards.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + 16}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {cards.map((card, index) => (
          <TouchableOpacity
            key={card.id}
            activeOpacity={0.9}
            onPress={card.onPress}
            style={[styles.cardContainer, index === 0 && styles.firstCard]}
          >
            <LinearGradient
              colors={card.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              {/* HEADER */}
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <View style={styles.iconBadge}>
                  {renderIcon(card.icon)}
                </View>
              </View>

              {/* CONTENT */}
              <View style={styles.cardContent}>
                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                <Text style={styles.cardPreview} numberOfLines={2}>
                  {card.preview}
                </Text>
              </View>

              {/* CTA */}
              <View style={styles.ctaContainer}>
                <Text style={styles.ctaText}>
                  Tap to {card.id === 'wisdom' ? 'reflect on' : 'practice'} today&apos;s {card.id === 'wisdom' ? 'wisdom' : 'meditation'} ›
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* DOT INDICATOR */}
      {cards.length > 1 && (
        <View style={styles.dotsContainer}>
          {cards.map((card, index) => (
            <View
              key={card.id}
              style={[
                styles.dot,
                index === activeIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginHorizontal: 8,
  },
  firstCard: {
    marginLeft: 16,
  },
  card: {
    borderRadius: 20,
    padding: 18,
    minHeight: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.textWhite,
    letterSpacing: 0.3,
    flex: 1,
  },
  cardSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 10,
  },
  cardPreview: {
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '400',
  },
  ctaContainer: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.textWhite,
    letterSpacing: 0.3,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeDot: {
    width: 20,
    backgroundColor: '#00E5FF',
  },
});
