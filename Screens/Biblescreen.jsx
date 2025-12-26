// Screens/BibleScreen.jsx
// "Thy word is a lamp unto my feet, and a light unto my path." - Psalm 119:105

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import {
  Book,
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Search,
  X,
} from 'lucide-react-native';

// Import KJV data
import kjvData from '../assets/library/kjv_mapped.json';

// THEME - Sacred Reverent
const THEME = {
  cosmicDeep: ['#121024', '#2A1832', '#151525'],
  cosmicSoft: ['#1A0B2E', '#16213E', '#0F3460'],
  accentCyan: '#00E5FF',
  accentGold: '#FFD700',
  textWhite: '#FFFFFF',
  textSoft: '#E0E0F0',
  textGray: '#A0A0B0',
  cardBg: 'rgba(255, 255, 255, 0.05)',
  cardBorder: 'rgba(0, 229, 255, 0.2)',
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
const BibleScreen = ({ navigation }) => {
  const [viewMode, setViewMode] = useState('books');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Ref for the verse ScrollView
  const verseScrollRef = useRef(null);

  // Scroll to top when chapter changes
  useEffect(() => {
    if (verseScrollRef.current && selectedChapter) {
      verseScrollRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [selectedChapter]);

  // Filtering Logic
  const filteredOldTestament = useMemo(() => {
    return kjvData.books
      .filter(b => b.testament === 'Old Testament')
      .filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const filteredNewTestament = useMemo(() => {
    return kjvData.books
      .filter(b => b.testament === 'New Testament')
      .filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setViewMode('chapters');
    setSearchQuery('');
  };

  const handleChapterSelect = (chapterNum) => {
    setSelectedChapter(chapterNum);
    setViewMode('verses');
  };

  const handleBack = () => {
    if (viewMode === 'verses') {
      setViewMode('chapters');
      setSelectedChapter(null);
    } else if (viewMode === 'chapters') {
      setViewMode('books');
      setSelectedBook(null);
    } else {
      navigation.goBack();
    }
  };

  const handleNextChapter = () => {
    if (!selectedBook || !selectedChapter) return;
    const currentChapterIndex = selectedBook.chapters.findIndex(ch => ch.chapter === selectedChapter);
    if (currentChapterIndex < selectedBook.chapters.length - 1) {
      setSelectedChapter(selectedBook.chapters[currentChapterIndex + 1].chapter);
    }
  };

  const handlePrevChapter = () => {
    if (!selectedBook || !selectedChapter) return;
    const currentChapterIndex = selectedBook.chapters.findIndex(ch => ch.chapter === selectedChapter);
    if (currentChapterIndex > 0) {
      setSelectedChapter(selectedBook.chapters[currentChapterIndex - 1].chapter);
    }
  };

  const currentChapterData = selectedBook?.chapters.find(ch => ch.chapter === selectedChapter);

  // GESTURE for swipe navigation
  const swipeGesture = Gesture.Pan()
    .activeOffsetX([-30, 30])
    .failOffsetY([-20, 20])
    .onEnd((event) => {
      if (event.translationX > 50) {
        runOnJS(handlePrevChapter)();
      } else if (event.translationX < -50) {
        runOnJS(handleNextChapter)();
      }
    });

  // RENDER: Book Selector
  const renderBookSelector = () => (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.topNavRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ChevronLeft size={28} color={THEME.accentCyan} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Book size={40} color={THEME.accentCyan} strokeWidth={2} />
        <Text style={styles.title}>Holy Bible</Text>
        <Text style={styles.subtitle}>King James Version</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={THEME.textGray} style={{ marginLeft: 12 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Books..."
            placeholderTextColor={THEME.textGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
            keyboardAppearance="dark"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={{ padding: 10 }}>
              <X size={20} color={THEME.textGray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {filteredOldTestament.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>OLD TESTAMENT</Text>
          {filteredOldTestament.map((book) => (
            <TouchableOpacity key={book.id} style={styles.bookCard} onPress={() => handleBookSelect(book)}>
              <View style={styles.bookCardContent}>
                <Text style={styles.bookTitle}>{book.name}</Text>
                <Text style={styles.bookSubtitle}>
                  {book.chapters.length} {book.chapters.length === 1 ? 'chapter' : 'chapters'}
                </Text>
              </View>
              <ChevronRight size={24} color={THEME.accentCyan} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {filteredNewTestament.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NEW TESTAMENT</Text>
          {filteredNewTestament.map((book) => (
            <TouchableOpacity key={book.id} style={styles.bookCard} onPress={() => handleBookSelect(book)}>
              <View style={styles.bookCardContent}>
                <Text style={styles.bookTitle}>{book.name}</Text>
                <Text style={styles.bookSubtitle}>
                  {book.chapters.length} {book.chapters.length === 1 ? 'chapter' : 'chapters'}
                </Text>
              </View>
              <ChevronRight size={24} color={THEME.accentCyan} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {filteredOldTestament.length === 0 && filteredNewTestament.length === 0 && (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>No books found matching "{searchQuery}"</Text>
        </View>
      )}

      <View style={styles.attributionBox}>
        <Text style={styles.attributionText}>King James Version (1611) - Public Domain</Text>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );

  // RENDER: Chapter Selector
  const renderChapterSelector = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.selectorHeader}>
        <TouchableOpacity onPress={handleBack} style={styles.backButtonInline}>
          <ChevronLeft size={28} color={THEME.accentCyan} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>{selectedBook?.name}</Text>
          <Text style={styles.subtitle}>Select Chapter</Text>
        </View>
      </View>

      <View style={styles.chapterGrid}>
        {selectedBook?.chapters.map((chapter) => (
          <TouchableOpacity key={chapter.chapter} style={styles.chapterBox} onPress={() => handleChapterSelect(chapter.chapter)}>
            <Text style={styles.chapterNumber}>{chapter.chapter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );

  // RENDER: Verse Reader
  const renderVerseReader = () => (
    <GestureDetector gesture={swipeGesture}>
      <View style={styles.readerContainer}>
        <View style={styles.readerHeader}>
          <TouchableOpacity onPress={handleBack} style={styles.backButtonInline}>
            <ChevronLeft size={32} color={THEME.accentCyan} />
          </TouchableOpacity>
          <View style={styles.readerHeaderText}>
            <Text style={styles.readerTitle}>
              {selectedBook?.name} {selectedChapter}
            </Text>
          </View>
          <TouchableOpacity style={styles.chaptersButtonTopRight} onPress={() => setViewMode('chapters')}>
            <Book size={22} color={THEME.accentCyan} />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={verseScrollRef}
          contentContainerStyle={styles.versesScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {currentChapterData?.verses.map((verse) => (
            <View key={verse.verse} style={styles.verseRow}>
              <Text style={styles.verseNumber}>{verse.verse}</Text>
              <Text style={styles.verseText}>{verse.text}</Text>
            </View>
          ))}
          <View style={{ height: 80 }} />
        </ScrollView>
      </View>
    </GestureDetector>
  );

  return (
    <View style={styles.container}>
      <BreathingBackground />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        {viewMode === 'books' && renderBookSelector()}
        {viewMode === 'chapters' && renderChapterSelector()}
        {viewMode === 'verses' && renderVerseReader()}
      </SafeAreaView>
    </View>
  );
};

export default BibleScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F1B' },
  safeArea: { flex: 1 },
  scrollContent: { paddingTop: Platform.OS === 'android' ? 20 : 0, paddingHorizontal: 20, paddingBottom: 20 },

  topNavRow: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  backButton: {
    padding: 4,
  },

  header: { alignItems: 'center', marginBottom: 20 },
  selectorHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  headerTextContainer: { alignItems: 'center', flex: 1 },
  title: { fontSize: 32, color: THEME.textWhite, fontWeight: '700', letterSpacing: 0.5, marginTop: 12 },
  subtitle: { marginTop: 4, fontSize: 14, color: THEME.accentCyan, opacity: 0.9 },
  backButtonInline: { padding: 4 },
  searchContainer: { marginBottom: 24 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: THEME.cardBg, borderRadius: 12, borderWidth: 1, borderColor: THEME.cardBorder, height: 50 },
  searchInput: { flex: 1, color: THEME.textWhite, fontSize: 16, paddingHorizontal: 12 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 13, color: THEME.accentCyan, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 },
  bookCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: THEME.cardBg, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: THEME.cardBorder },
  bookCardContent: { flex: 1 },
  bookTitle: { fontSize: 18, color: THEME.textWhite, fontWeight: '600', marginBottom: 4 },
  bookSubtitle: { fontSize: 13, color: THEME.textGray },
  chapterGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
  chapterBox: { width: '20%', aspectRatio: 1, padding: 6 },
  chapterNumber: { flex: 1, backgroundColor: THEME.cardBg, borderRadius: 12, borderWidth: 1, borderColor: THEME.cardBorder, textAlign: 'center', textAlignVertical: 'center', fontSize: 18, color: THEME.textWhite, fontWeight: '600', lineHeight: 60 },

  readerContainer: { flex: 1 },
  readerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.cardBorder,
  },
  readerHeaderText: { flex: 1, alignItems: 'center', marginHorizontal: 8 },
  readerTitle: { fontSize: 20, color: THEME.textWhite, fontWeight: '700' },

  chaptersButtonTopRight: {
    padding: 8,
    backgroundColor: THEME.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
  },

  versesScrollContent: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 20 },
  verseRow: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-start' },
  verseNumber: { fontSize: 14, color: THEME.accentCyan, fontWeight: '700', marginRight: 12, marginTop: 2, minWidth: 24 },
  verseText: { flex: 1, fontSize: 17, color: THEME.textSoft, lineHeight: 28 },

  attributionBox: { backgroundColor: THEME.cardBg, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: THEME.cardBorder, marginTop: 16, alignItems: 'center' },
  attributionText: { fontSize: 12, color: THEME.textGray, textAlign: 'center' },
  noResults: { padding: 40, alignItems: 'center' },
  noResultsText: { color: THEME.textGray, fontSize: 14, textAlign: 'center' },
});
