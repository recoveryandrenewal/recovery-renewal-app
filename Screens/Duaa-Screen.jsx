import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

// --- THEME COLORS ---
const THEME = {
    cosmicDeep: ['#121024', '#2A1832', '#151525'],
};

// --- BREATHING BACKGROUND COMPONENT ---
const BreathingBackground = () => {
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withRepeat(
            withTiming(0.6, { duration: 12500, easing: Easing.inOut(Easing.quad) }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <>
            <LinearGradient
                colors={THEME.cosmicDeep}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFill}
            />
            <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
                <LinearGradient
                    colors={['#1A0B2E', '#16213E', '#0F3460']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
        </>
    );
};

export default function DuaaScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <BreathingBackground />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.textWrapper}>
                        <Text style={styles.heading}>This app collects</Text>
                        <Text style={styles.emphasis}>NOTHING.</Text>
                        <Text style={styles.body}>No data. No metadata. No tracking.</Text>
                        <Text style={styles.body}>Everything stays on</Text>
                        <Text style={styles.emphasis}>YOUR device.</Text>
                        <Text style={styles.body}>What you see here, what you read here, stays here.</Text>
                        <Text style={styles.body}>All content is local and free.</Text>
                        <Text style={styles.body}>Run as many copies as you want.</Text>
                        <Text style={styles.body}>Share it. Modify it.</Text>
                        <Text style={styles.emphasis}>It's yours.</Text>
                        <Text style={styles.body}>We're not here to profit from your journey.</Text>
                        <Text style={styles.body}>We're here because</Text>
                        <Text style={styles.emphasis}>recovery matters.</Text>
                        <View style={styles.divider} />
                        <Text style={styles.mission}>All We ask of You is to</Text>
                        <Text style={styles.quote}>"Breathe and grow, one day at a time, for the betterment of mankind."</Text>
                        <Text style={styles.signature}>— The Recovery & Renewal Team</Text>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ICPP-1')} activeOpacity={0.8}>
                            <Text style={styles.buttonText}>Begin Your Journey</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F0F1B' },
    safeArea: { flex: 1 },
    content: { padding: 16, flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
    textWrapper: { padding: 20, width: '100%', maxWidth: 500, alignItems: 'center', marginVertical: 20 },
    heading: { fontSize: 18, color: '#ffffff', marginBottom: 6, textAlign: 'center', fontWeight: '500' },
    emphasis: { fontSize: 24, fontWeight: 'bold', color: '#ec4899', marginBottom: 8, textAlign: 'center', textShadowColor: 'rgba(236, 72, 153, 0.3)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 10 },
    body: { fontSize: 16, color: '#ffffff', marginBottom: 8, textAlign: 'center', lineHeight: 22, fontWeight: '400', opacity: 0.9 },
    divider: { height: 1, backgroundColor: '#00ffff', marginVertical: 24, width: 60, alignSelf: 'center', opacity: 0.5 },
    mission: { fontSize: 18, color: '#00ffff', marginBottom: 6, textAlign: 'center', fontStyle: 'italic', fontWeight: '500' },
    quote: { fontSize: 16, color: '#ffffff', marginBottom: 8, textAlign: 'center', fontStyle: 'italic', lineHeight: 24, opacity: 0.9 },
    signature: { fontSize: 14, color: '#a855f7', textAlign: 'center', marginTop: 8, marginBottom: 32, fontWeight: '600' },
    button: { backgroundColor: '#ec4899', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 30, alignItems: 'center', shadowColor: '#ec4899', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 },
    buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5 },
});