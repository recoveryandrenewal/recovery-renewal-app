// Screens/LibraryScreen.jsx

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Book,
  Heart,
  ClipboardList,
  PenTool,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react-native';

// THEME - Match HomeScreen & ResourcesScreen
const THEME = {
  cosmicDeep: ['#121024', '#2A1832', '#151525'],
  cosmicSoft: ['#3E1E45', '#454E9E'],
  accentCyan: '#00E5FF',
  accentPurple: '#A855F7',
  accentPink: '#EC4899',
  textWhite: '#FFFFFF',
  textSoft: '#C0C0D0',
  textGray: '#A0A0B0',
};

// BREATHING BACKGROUND
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
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>
    </>
  );
};

// UPDATED: COMPACT CARD COMPONENT (NO FOOTER)
const CategoryCard = ({ icon: Icon, title, subtitle, description, gradient, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.categoryCardWrapper}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.categoryCard}
      >
        <View style={styles.cardInnerRow}>
          {/* Icon */}
          <View style={styles.categoryIconContainer}>
            <Icon size={26} color="#FFFFFF" strokeWidth={2.5} />
          </View>

          {/* Text Content */}
          <View style={styles.cardTextContainer}>
            <Text style={styles.categoryTitle}>{title}</Text>
            <Text style={styles.categorySubtitle}>{subtitle}</Text>
            <Text style={styles.categoryDescription}>{description}</Text>
          </View>

          {/* Chevron */}
          <View style={styles.chevronContainer}>
            <ChevronRight size={24} color="rgba(255, 255, 255, 0.7)" strokeWidth={2.5} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// MAIN COMPONENT
const LibraryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <BreathingBackground />

      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeft size={28} color={THEME.accentCyan} strokeWidth={2.5} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Library</Text>
            <Text style={styles.headerSubtitle}>Recovery Resources</Text>
          </View>

          <View style={{ width: 28 }} />
        </View>

        {/* SCROLLABLE CONTENT */}
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* SECTION HEADER */}
          <Text style={styles.sectionTitle}>BROWSE LIBRARY</Text>

          {/* CATEGORY CARDS */}
          <View style={styles.categoriesSection}>
            {/* 1. Bible Card */}
            <CategoryCard
              icon={Book}
              title="Bible"
              subtitle="King James Version"
              description="Full text of the Old and New Testament"
              gradient={['#667eea', '#764ba2']}
              onPress={() => navigation.navigate('BibleScreen')}
            />

            {/* 2. Prayers Card */}
            <CategoryCard
              icon={Heart}
              title="Prayers"
              subtitle="For Recovery & Peace"
              description="Sacred prayers for comfort, guidance, and strength"
              gradient={['#f093fb', '#f5576c']}
              onPress={() => navigation.navigate('PrayersScreen')}
            />

            {/* 3. Journal Card (NEW) */}
            <CategoryCard
              icon={PenTool}
              title="Journal"
              subtitle="My Journal"
              description="Personal journal stored locally on your device"
              gradient={['#667eea', '#764ba2', '#f093fb']}
              onPress={() => navigation.navigate('JournalScreen')}
            />

            {/* 4. 12 Steps Card (Moved to 4th) */}
            <CategoryCard
              icon={ClipboardList}
              title="12 Steps"
              subtitle="Work the Program"
              description="Interactive worksheets and recovery tools"
              gradient={['#11998e', '#38ef7d']}
              onPress={() => navigation.navigate('StepWorkScreen')}
            />
          </View>

          {/* ATTRIBUTION FOOTER */}
          <View style={styles.attributionBox}>
            <Text style={styles.attributionTitle}>📖 About This Library</Text>
            <Text style={styles.attributionText}>
              All content is public domain or openly licensed (CC BY 4.0). Sources include Project
              Gutenberg, 12Step.org, bible-api.com, and ancient spiritual texts.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default LibraryScreen;

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
    paddingTop: 10,
    paddingHorizontal: 20,
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
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: THEME.textWhite,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  // SECTION TITLES
  sectionTitle: {
    fontSize: 13,
    color: THEME.accentCyan,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 16,
    marginLeft: 4,
  },

  // CARD STYLES (COMPACT - NO FOOTER)
  categoriesSection: {
    marginBottom: 24,
  },
  categoryCardWrapper: {
    marginBottom: 16,
  },
  categoryCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cardInnerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 2,
  },
  categorySubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    marginBottom: 6,
  },
  categoryDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },
  chevronContainer: {
    justifyContent: 'center',
    height: 48,
  },

  // ATTRIBUTION FOOTER
  attributionBox: {
    backgroundColor: 'rgba(0, 229, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
    marginTop: 8,
  },
  attributionTitle: {
    fontSize: 14,
    color: THEME.accentCyan,
    fontWeight: '700',
    marginBottom: 8,
  },
  attributionText: {
    fontSize: 12,
    color: THEME.textSoft,
    lineHeight: 18,
  },
});
