// Screens/SimpsonReadingScreen.jsx

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import simpsonData from '../assets/simpsonDaily.json';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const THEME = {
    cosmicDeep: ['#121024', '#2A1832', '#151525'],
    cosmicSoft: ['#3E1E45', '#454E9E'],
    accentCyan: '#00E5FF',
    accentPurple: '#9D4EDD',
    textWhite: '#FFFFFF',
    textGray: '#A0A0B0',
    textSoft: '#C0C0D0',
};

const BreathingBackground = () => {
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withRepeat(
            withTiming(0.6, {
                duration: 12500,
                easing: Easing.inOut(Easing.quad),
            }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <>
        <Animated.View
        style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: THEME.accentPurple },
            animatedStyle,
        ]}
        />
        </>
    );
};

export default function SimpsonReadingScreen({ route, navigation }) {
    const today = new Date();

    // Calculate initial day of year
    const getInitialDayOfYear = () => {
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    };

    const [currentDayOfYear, setCurrentDayOfYear] = useState(getInitialDayOfYear());
    const [devotional, setDevotional] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        loadDevotional(currentDayOfYear);
    }, [currentDayOfYear]);

    const loadDevotional = (dayOfYear) => {
        const entry = simpsonData.find((item) => item.day === dayOfYear);

        if (entry) {
            const cleanedBody = entry.body
            .replace(/\r\n/g, '\n')
            .replace(/\n\s+/g, '\n\n')
            .trim();

            setDevotional({
                ...entry,
                body: cleanedBody,
            });
        } else {
            setDevotional(null);
        }
    };

    const goToPrevious = () => {
        let newDay = currentDayOfYear - 1;
        if (newDay < 1) {
            newDay = 365;
        }
        setCurrentDayOfYear(newDay);
    };

    const goToNext = () => {
        let newDay = currentDayOfYear + 1;
        if (newDay > 365) {
            newDay = 1;
        }
        setCurrentDayOfYear(newDay);
    };

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const start = new Date(selectedDate.getFullYear(), 0, 0);
            const diff = selectedDate - start;
            const oneDay = 1000 * 60 * 60 * 24;
            const dayOfYear = Math.floor(diff / oneDay);
            setCurrentDayOfYear(dayOfYear);
        }
    };

    const getCurrentDateFromDayOfYear = () => {
        const date = new Date(today.getFullYear(), 0);
        date.setDate(currentDayOfYear);
        return date;
    };

    const formatDate = () => {
        if (devotional) {
            return devotional.date;
        }
        return '';
    };

    if (!devotional) {
        return (
            <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <BreathingBackground />
            <SafeAreaView style={styles.safeArea}>
            <View style={styles.centerContent}>
            <Text style={styles.errorText}>Loading devotional...</Text>
            </View>
            </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <BreathingBackground />
        <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
        <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerButton}
        >
        <ChevronLeft size={28} color={THEME.textWhite} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
        <Text style={styles.headerDate}>{formatDate()}</Text>
        </View>

        <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.headerButton}
        >
        <Calendar size={24} color={THEME.textWhite} />
        </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <LinearGradient
        colors={['rgba(157, 78, 221, 0.4)', 'rgba(62, 30, 69, 0.3)']}
        style={styles.contentCard}
        >
        <View style={styles.verseContainer}>
        <Text style={styles.verseText}>{devotional.verse}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.bodyText}>{devotional.body}</Text>
        </LinearGradient>
        </ScrollView>

        <LinearGradient
        colors={['rgba(157, 78, 221, 0.95)', 'rgba(62, 30, 69, 0.95)']}
        style={styles.navFooter}
        >
        <View style={styles.navFooterBackground}>
        <TouchableOpacity style={styles.navButton} onPress={goToPrevious}>
        <ChevronLeft size={20} color={THEME.textWhite} />
        <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        <View style={styles.navDivider} />

        <TouchableOpacity style={styles.navButton} onPress={goToNext}>
        <Text style={styles.navButtonText}>Next</Text>
        <ChevronRight size={20} color={THEME.textWhite} />
        </TouchableOpacity>
        </View>
        </LinearGradient>

        {showDatePicker && (
            <DateTimePicker
            value={getCurrentDateFromDayOfYear()}
            mode="date"
            display="default"
            onChange={onDateChange}
            />
        )}
        </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F0F1B',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 50 : 10,
        paddingBottom: 16,
    },
    headerButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerCenter: {
        flex: 1,
        alignItems: 'center',
    },
    headerDate: {
        fontSize: 20,
        fontWeight: '600',
        color: THEME.textWhite,
        marginBottom: 2,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 100,
    },
    contentCard: {
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
                                 shadowColor: '#000',
                                 shadowOffset: { width: 0, height: 4 },
                                 shadowOpacity: 0.3,
                                 shadowRadius: 8,
                                 elevation: 8,
    },
    verseContainer: {
        marginBottom: 20,
    },
    verseText: {
        fontSize: 18,
        lineHeight: 28,
        fontWeight: '600',
        color: THEME.accentCyan,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    divider: {
        height: 2,
        backgroundColor: THEME.accentCyan,
        opacity: 0.3,
        marginBottom: 20,
        borderRadius: 1,
    },
    bodyText: {
        fontSize: 16,
        lineHeight: 26,
        color: THEME.textSoft,
        fontWeight: '400',
    },
    navFooter: {
        position: 'absolute',
        bottom: 70,
        left: 16,
        right: 16,
        height: 70,
        borderRadius: 35,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 10,
    },
    navFooterBackground: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    navButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: THEME.textWhite,
    },
    navDivider: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: THEME.textGray,
    },
});
