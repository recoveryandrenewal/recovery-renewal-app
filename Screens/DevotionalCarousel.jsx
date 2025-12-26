// Components/DevotionalCarousel.jsx
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
import { Book, Flower2, Columns, Sparkles } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Import JSON data
import spurgeonData from '../assets/m_e.json';
import dhammapadaData from '../assets/dhammapada_authentic.json';
import marcusData from '../assets/marcus_aurelius_v2.json';
import epictetusData from '../assets/epictetus.json';
import taoData from '../assets/tao_te_ching.json';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 48;

const THEME = {
  // DEEPER, CONTEMPLATIVE COLORS FOR DEVOTIONAL CAROUSEL
  gradientChristian: ['#0369A1', '#1E40AF'], // Deep Cyan → Navy Blue
  gradientBuddhist: ['#991B1B', '#7C2D12'], // Deep Red → Maroon
  gradientStoic: ['#6D28D9', '#BE185D'], // Deep Purple → Deep Pink
  gradientTaoist: ['#065F46', '#0E7490'], // Forest Green → Deep Teal
  textWhite: '#FFFFFF',
  textGray: '#A0A0B0',
};

export default function DevotionalCarousel() {
  const navigation = useNavigation();
  const [cards, setCards] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const loadPreferenceAndBuildCards = useCallback(async () => {
    try {
      const pref = await AsyncStorage.getItem('readingPreference');

      // Load spiritual detail config (defaults = all true)
      const detailJson = await AsyncStorage.getItem('spiritualDetailConfig');
      const detail = detailJson ? JSON.parse(detailJson) : {};
      const buddhistOn = detail.buddhist !== false;
      const taoistOn = detail.taoist !== false;
      const stoicOn = detail.stoic !== false;

      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      // TIME LOGIC  spurgeonMode
      const spurgeonMode = (await AsyncStorage.getItem('spurgeonMode')) || 'auto';

      let time;
      if (spurgeonMode === 'morning') time = 'am';
      else if (spurgeonMode === 'evening') time = 'pm';
      else {
        const hour = today.getHours();
        time = (hour >= 17 || hour < 2) ? 'pm' : 'am';
      }


      let builtCards = [];

      // SPURGEON (Christian or Both)
      if (pref === 'christian' || pref === 'both') {
        const spurgeonReading = spurgeonData.find(
          (item) => item.month === month && item.day === day && item.time === time
        );

        if (spurgeonReading) {
          builtCards.push({
            id: 'spurgeon',
            type: 'christian',
            title: "Today's Devotional",
            subtitle: spurgeonReading.keyverse,
            preview: spurgeonReading.body.slice(0, 120) + '...',
            gradient: THEME.gradientChristian,
            icon: 'book',
            onPress: () => navigation.navigate('SpurgeonReading', { month, day, time }),
          });
        }
      }

      // BUDDHIST (Spiritual or Both) + checkbox
      if ((pref === 'spiritual' || pref === 'both') && buddhistOn) {
        const buddhistReading = dhammapadaData.find(
          (item) => item.month === month && item.day === day
        );

        if (buddhistReading) {
          builtCards.push({
            id: 'buddhist',
            type: 'spiritual',
            title: 'Buddhist Wisdom',
            subtitle: `Dhammapada ${buddhistReading.chapter}:${buddhistReading.verse}`,
            preview: buddhistReading.body.slice(0, 120) + '...',
            gradient: THEME.gradientBuddhist,
            icon: 'flower',
            onPress: () => navigation.navigate('BuddhistReading', { month, day }),
          });
        }
      }

      // STOIC (Spiritual or Both) + checkbox
      if ((pref === 'spiritual' || pref === 'both') && stoicOn) {
        const stoicReading = marcusData.find(
          (item) => item.month === month && item.day === day
        );

        if (stoicReading) {
          builtCards.push({
            id: 'stoic',
            type: 'spiritual',
            title: 'Stoic Wisdom',
            subtitle: `Meditations ${stoicReading.book}:${stoicReading.section}`,
            preview: stoicReading.body.slice(0, 120) + '...',
            gradient: THEME.gradientStoic,
            icon: 'columns',
            onPress: () => navigation.navigate('StoicReading', { month, day }),
          });
        }
      }

      // TAOIST (Spiritual or Both) + checkbox
      if ((pref === 'spiritual' || pref === 'both') && taoistOn) {
        const taoistReading = taoData.find(
          (item) => item.month === month && item.day === day
        );

        if (taoistReading) {
          builtCards.push({
            id: 'taoist',
            type: 'spiritual',
            title: 'Taoist Wisdom',
            subtitle: `Tao Te Ching ${taoistReading.chapter}`,
            preview: taoistReading.body.slice(0, 120) + '...',
            gradient: THEME.gradientTaoist,
            icon: 'sparkles',
            onPress: () => navigation.navigate('TaoistReading', { month, day }),
          });
        }
      }

      setCards(builtCards);
    } catch (error) {
      console.error('Error loading devotional cards:', error);
      setCards([]);
    }
  }, [navigation]);

  // Initial load
  useEffect(() => {
    loadPreferenceAndBuildCards();
  }, [loadPreferenceAndBuildCards]);

  // Reload whenever screen gains focus (back from Settings)
  useFocusEffect(
    useCallback(() => {
      loadPreferenceAndBuildCards();
    }, [loadPreferenceAndBuildCards])
  );

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + 16));
    setActiveIndex(index);
  };

  const renderIcon = (iconType) => {
    const iconProps = { size: 20, color: THEME.textWhite };
    switch (iconType) {
      case 'book':
        return <Book {...iconProps} />;
      case 'flower':
        return <Flower2 {...iconProps} />;
      case 'columns':
        return <Columns {...iconProps} />;
      case 'sparkles':
        return <Sparkles {...iconProps} />;
      default:
        return <Book {...iconProps} />;
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
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <View style={styles.iconBadge}>
                  {renderIcon(card.icon)}
                </View>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                <Text style={styles.cardPreview} numberOfLines={2}>
                  {card.preview}
                </Text>
              </View>

              <View style={styles.ctaContainer}>
                <Text style={styles.ctaText}>
                  Tap to read today&apos;s {card.type === 'christian' ? 'devotional' : 'wisdom'} ›
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
