// Screens/PrayersScreen.jsx
// "The prayer of a righteous person is powerful and effective." - James 5:16

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
  Animated,
  Easing,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Heart,
  ChevronLeft,
  Copy,
} from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';

// Import prayers data
import prayersData from '../assets/library/prayers.json';

// THEME - Serene Blue (peaceful, prayerful)
const THEME = {
  cosmicDeep: ['#121024', '#2A1832', '#151525'],
  cosmicSoft: ['#1A0B2E', '#16213E', '#0F3460'],
  accentBlue: '#3B82F6',
  accentBlueLight: '#60A5FA',
  accentCyan: '#00E5FF',
  textWhite: '#FFFFFF',
  textSoft: '#E0E0F0',
  textGray: '#A0A0B0',
  cardBg: 'rgba(255, 255, 255, 0.05)',
  cardBorder: 'rgba(59, 130, 246, 0.3)',
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
const PrayersScreen = ({ navigation }) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'detail'
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get prayers and categories
  const prayers = prayersData.prayers || [];

  // Exclude "All" from initial category set to build it dynamically based on visible prayers
  const visiblePrayers = prayers.filter(p => p.embed_allowed !== false);
  const categories = ['All', ...new Set(visiblePrayers.map(p => p.category))];

  // Filter prayers by category AND ensure we only show safe (embedded) prayers
  const filteredPrayers = visiblePrayers.filter(prayer => {
    return selectedCategory === 'All' || prayer.category === selectedCategory;
  });

  // Handle prayer selection - Simplified (No external link logic needed)
  const handlePrayerSelect = (prayer) => {
    setSelectedPrayer(prayer);
    setViewMode('detail');
  };

  // Copy to clipboard
  const handleCopyPrayer = () => {
    if (!selectedPrayer) return;
    Clipboard.setString(selectedPrayer.text);
    Alert.alert('Prayer Copied', 'Prayer text copied to clipboard.');
  };

  // RENDER: Prayer List
  const renderPrayerList = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
    {/* Header */}
    <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    <ChevronLeft size={28} color={THEME.accentBlue} />
    </TouchableOpacity>
    <View style={styles.headerTextContainer}>
    <Heart size={40} color={THEME.accentBlue} strokeWidth={2} />
    <Text style={styles.title}>Prayers</Text>
    <Text style={styles.subtitle}>Traditional & Recovery</Text>
    </View>
    </View>


    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.categoryFilterContainer}
    >
    {categories.map((category) => (
      <TouchableOpacity
      key={category}
      style={[
        styles.categoryChip,
        selectedCategory === category && styles.categoryChipActive,
      ]}
      onPress={() => setSelectedCategory(category)}
      >
      <Text
      style={[
        styles.categoryChipText,
        selectedCategory === category && styles.categoryChipTextActive,
      ]}
      >
      {category}
      </Text>
      </TouchableOpacity>
    ))}
    </ScrollView>


    <View style={styles.prayersContainer}>
    {filteredPrayers.map((prayer) => (
      <TouchableOpacity
      key={prayer.id}
      style={styles.prayerCard}
      onPress={() => handlePrayerSelect(prayer)}
      >

      <LinearGradient
      colors={[THEME.accentBlue, THEME.accentBlueLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.prayerCardHeader}
      >
      <Text style={styles.prayerCardTitle}>{prayer.title}</Text>
      </LinearGradient>


      <View style={styles.prayerCardBody}>
      <Text style={styles.prayerCategory}>{prayer.category}</Text>
      <Text style={styles.prayerPreview} numberOfLines={3}>
      {prayer.text ? prayer.text.substring(0, 120) + '...' : 'Tap to view prayer'}
      </Text>
      {prayer.tradition && (
        <Text style={styles.prayerTradition}>{prayer.tradition}</Text>
      )}
      </View>
      </TouchableOpacity>
    ))}
    </View>


    <View style={styles.attributionBox}>
    <Text style={styles.attributionText}>
    All embedded prayers are public domain or openly licensed.
    </Text>
    </View>

    <View style={{ height: 100 }} />
    </ScrollView>
  );

  // RENDER: Prayer Detail
  const renderPrayerDetail = () => {
    if (!selectedPrayer) return null;

    return (
      <View style={styles.detailContainer}>
      {/* Header */}
      <View style={styles.detailHeader}>
      <TouchableOpacity
      onPress={() => setViewMode('list')}
      style={styles.backButton}
      >
      <ChevronLeft size={36} color={THEME.accentBlue} />
      </TouchableOpacity>
      <View style={styles.detailHeaderText}>
      <Text style={styles.detailHeaderTitle} numberOfLines={1}>
      {selectedPrayer.title}
      </Text>
      </View>
      <TouchableOpacity style={styles.copyButton} onPress={handleCopyPrayer}>
      <Copy size={24} color={THEME.accentBlue} />
      </TouchableOpacity>
      </View>


      <ScrollView
      contentContainerStyle={styles.detailScrollContent}
      showsVerticalScrollIndicator={false}
      >

      <LinearGradient
      colors={[THEME.accentBlue, THEME.accentBlueLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.detailTitleGradient}
      >
      <Text style={styles.detailTitle}>{selectedPrayer.title}</Text>
      </LinearGradient>


      <View style={styles.detailMeta}>
      <Text style={styles.detailCategory}>{selectedPrayer.category}</Text>
      {selectedPrayer.tradition && (
        <Text style={styles.detailTradition}>{selectedPrayer.tradition}</Text>
      )}
      {selectedPrayer.source && (
        <Text style={styles.detailSource}>Source: {selectedPrayer.source}</Text>
      )}
      </View>


      <View style={styles.detailTextContainer}>
      <Text style={styles.detailText}>{selectedPrayer.text}</Text>
      </View>


      {selectedPrayer.license && (
        <View style={styles.detailAttribution}>
        <Text style={styles.detailLicense}>{selectedPrayer.license}</Text>
        </View>
      )}


      {selectedPrayer.notes && (
        <View style={styles.detailNotesBox}>
        <Text style={styles.detailNotesText}>{selectedPrayer.notes}</Text>
        </View>
      )}

      <View style={{ height: 120 }} />
      </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
    <BreathingBackground />
    <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

    <SafeAreaView style={styles.safeArea}>
    {viewMode === 'list' && renderPrayerList()}
    {viewMode === 'detail' && renderPrayerDetail()}
    </SafeAreaView>
    </View>
  );
};

export default PrayersScreen;

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
    color: THEME.accentBlue,
    opacity: 0.9,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 60,
    zIndex: 10,
  },

  // CATEGORY FILTER
  categoryFilterContainer: {
    paddingBottom: 16,
    paddingRight: 20,
  },
  categoryChip: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
  },
  categoryChipActive: {
    backgroundColor: THEME.accentBlue,
    borderColor: THEME.accentBlue,
  },
  categoryChipText: {
    fontSize: 13,
    color: THEME.textGray,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: THEME.textWhite,
  },

  // PRAYER CARDS
  prayersContainer: {
    marginTop: 8,
  },
  prayerCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.cardBorder,
  },
  prayerCardHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prayerCardTitle: {
    fontSize: 18,
    color: THEME.textWhite,
    fontWeight: '700',
    flex: 1,
  },
  prayerCardBody: {
    padding: 16,
  },
  prayerCategory: {
    fontSize: 12,
    color: THEME.accentBlueLight,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  prayerPreview: {
    fontSize: 14,
    color: THEME.textSoft,
    lineHeight: 20,
    marginBottom: 8,
  },
  prayerTradition: {
    fontSize: 12,
    color: THEME.textGray,
    fontStyle: 'italic',
  },

  // PRAYER DETAIL
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
  copyButton: {
    padding: 4,
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
  },
  detailTitle: {
    fontSize: 26,
    color: THEME.textWhite,
    fontWeight: '700',
    textAlign: 'center',
  },
  detailMeta: {
    marginBottom: 24,
    alignItems: 'center',
  },
  detailCategory: {
    fontSize: 13,
    color: THEME.accentBlueLight,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailTradition: {
    fontSize: 14,
    color: THEME.textGray,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  detailSource: {
    fontSize: 12,
    color: THEME.textGray,
  },
  detailTextContainer: {
    backgroundColor: THEME.cardBg,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
  },
  detailText: {
    fontSize: 17,
    color: THEME.textSoft,
    lineHeight: 28,
    fontWeight: '400',
  },
  detailAttribution: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: THEME.cardBorder,
  },
  detailLicense: {
    fontSize: 11,
    color: THEME.textGray,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  detailNotesBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                 borderRadius: 12,
                                 padding: 16,
                                 marginTop: 20,
                                 borderWidth: 1,
                                 borderColor: THEME.accentBlue,
  },
  detailNotesText: {
    fontSize: 13,
    color: THEME.accentBlueLight,
    lineHeight: 20,
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
