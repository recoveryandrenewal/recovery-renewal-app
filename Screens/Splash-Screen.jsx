import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform, StatusBar } from 'react-native';
import { Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- MODERN THEME COLORS ---
const COLORS = {
    bgGradient: ['#121024', '#2A1832', '#000000'], // Deep Cosmic (Matches App)
    textMain: '#FFFFFF',                            // Clean White (No more blinding Cyan)
    textGlow: 'rgba(168, 85, 247, 0.5)',            // Subtle Purple Glow
    heartColor: '#EC4899',                          // The Pink/Red you liked
    heartGlow: 'rgba(236, 72, 153, 0.4)',           // Matching Heart Glow
};

export default function SplashScreen({ navigation }) {
    const [splashStep, setSplashStep] = useState(0);

    // Animated values
    const heartScale = useRef(new Animated.Value(1)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;

    // Particle animations
    const particle1Anim = useRef(new Animated.Value(0)).current;
    const particle2Anim = useRef(new Animated.Value(0)).current;
    const particle3Anim = useRef(new Animated.Value(0)).current;
    const particle4Anim = useRef(new Animated.Value(0)).current;
    const particle5Anim = useRef(new Animated.Value(0)).current;
    const particle6Anim = useRef(new Animated.Value(0)).current;

    // --- HEARTBEAT ANIMATION (Timing Preserved) ---
    useEffect(() => {
        if (splashStep >= 5) {
            const heartbeatAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(heartScale, {
                        toValue: 1.15,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                    Animated.timing(heartScale, {
                        toValue: 1,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                    Animated.timing(heartScale, {
                        toValue: 1.15,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                    Animated.timing(heartScale, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                ])
            );
            heartbeatAnimation.start();
            return () => heartbeatAnimation.stop();
        }
    }, [splashStep, heartScale]);

    // --- PARTICLE FLOATING (Subtler Movement) ---
    useEffect(() => {
        const createParticleAnim = (anim, duration) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: duration,
                        useNativeDriver: true
                    }),
                    Animated.timing(anim, {
                        toValue: 0,
                        duration: duration,
                        useNativeDriver: true
                    }),
                ])
            );
        };

        const animations = [
            createParticleAnim(particle1Anim, 3000),
            createParticleAnim(particle2Anim, 3500),
            createParticleAnim(particle3Anim, 4000),
            createParticleAnim(particle4Anim, 3250),
            createParticleAnim(particle5Anim, 3250),
            createParticleAnim(particle6Anim, 3500),
        ];

        animations.forEach(anim => anim.start());

        return () => animations.forEach(anim => anim.stop());
    }, []);

    // --- MAIN SEQUENCE (Timing Preserved) ---
    useEffect(() => {
        setSplashStep(0);

        const timers = [
            setTimeout(() => {
                setSplashStep(1);
                Animated.timing(textOpacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }).start();
            }, 800),

            setTimeout(() => setSplashStep(2), 1600),
            setTimeout(() => setSplashStep(3), 2400),

            setTimeout(() => {
                setSplashStep(4);
                Animated.timing(textOpacity, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }).start();
            }, 3600),

            setTimeout(() => {
                setSplashStep(5);
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }).start();
            }, 3650),

            // NAVIGATE
            setTimeout(async () => {
                if (navigation) {
                    try {
                        const hasCompletedSetup = await AsyncStorage.getItem('onboardingComplete'); // Fixed key name consistency
                        if (hasCompletedSetup === 'true') {
                            navigation.replace('Home');
                        } else {
                            navigation.navigate('DUAA');
                        }
                    } catch (error) {
                        navigation.navigate('DUAA');
                    }
                }
            }, 10500)
        ];

        return () => timers.forEach(t => clearTimeout(t));
    }, [navigation, textOpacity, logoOpacity]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <LinearGradient
                colors={COLORS.bgGradient}
                style={StyleSheet.absoluteFill}
            />

            {/* --- PARTICLES (Subtler Opacity) --- */}
            <Animated.View style={[styles.particle, styles.particle1, { opacity: 0.3, transform: [{ translateY: particle1Anim.interpolate({ inputRange: [0, 1], outputRange: [0, -20] }) }] }]} />
            <Animated.View style={[styles.particle, styles.particle2, { opacity: 0.2, transform: [{ translateY: particle2Anim.interpolate({ inputRange: [0, 1], outputRange: [0, -20] }) }] }]} />
            <Animated.View style={[styles.particle, styles.particle3, { opacity: 0.3, transform: [{ translateY: particle3Anim.interpolate({ inputRange: [0, 1], outputRange: [0, -20] }) }] }]} />
            <Animated.View style={[styles.particle, styles.particle4, { opacity: 0.2, transform: [{ translateY: particle4Anim.interpolate({ inputRange: [0, 1], outputRange: [0, -20] }) }] }]} />
            <Animated.View style={[styles.particle, styles.particle5, { opacity: 0.25, transform: [{ translateY: particle5Anim.interpolate({ inputRange: [0, 1], outputRange: [0, -20] }) }] }]} />
            <Animated.View style={[styles.particle, styles.particle6, { opacity: 0.2, transform: [{ translateY: particle6Anim.interpolate({ inputRange: [0, 1], outputRange: [0, -20] }) }] }]} />

            {/* --- SEQUENCE TEXT (Modern Light Font) --- */}
            {splashStep >= 1 && splashStep <= 4 && (
                <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
                    {splashStep >= 1 && <Text style={styles.text}>Recovery</Text>}
                    {splashStep >= 2 && <Text style={[styles.text, styles.ampersand]}>&</Text>}
                    {splashStep >= 3 && <Text style={styles.text}>Renewal</Text>}
                </Animated.View>
            )}

            {/* --- FINAL LOGO (Refined Glow) --- */}
            {splashStep >= 5 && (
                <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
                    <Text style={styles.bigText}>R&R</Text>
                    <Animated.View style={{ transform: [{ scale: heartScale }] }}>
                        <Heart
                            color={COLORS.heartColor}
                            size={80}
                            fill={COLORS.heartColor}
                            strokeWidth={0} // Filled completely
                        />
                    </Animated.View>
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    textContainer: {
        alignItems: 'flex-start', // Keeps the "Step" layout
        justifyContent: 'center',
    },
    text: {
        fontSize: 52,
        fontWeight: '300', // Thin/Light font = Modern/Premium
        color: COLORS.textMain,
        letterSpacing: 1.5, // Spaced out for elegance
        textShadowColor: COLORS.textGlow,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15, // Tighter glow, less bleed
        marginBottom: -5, // Tighter leading
    },
    ampersand: {
        fontSize: 40,
        fontWeight: '200',
        color: COLORS.heartColor, // Subtle pink accent for the '&'
        marginLeft: 4,
        marginVertical: 4,
        opacity: 0.9,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    bigText: {
        fontSize: 90,
        fontWeight: '700', // Bold for the final Logo
        color: COLORS.textMain,
        letterSpacing: -2,
        textShadowColor: COLORS.heartGlow,
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 20,
    },

    // --- PARTICLES (Subtle white/purple dots) ---
    particle: {
        position: 'absolute',
        borderRadius: 50,
        backgroundColor: '#FFF',
    },
    particle1: { width: 3, height: 3, top: '20%', left: '15%' },
    particle2: { width: 2, height: 2, top: '65%', left: '85%' },
    particle3: { width: 4, height: 4, top: '35%', left: '75%', backgroundColor: COLORS.heartColor },
    particle4: { width: 2, height: 2, top: '80%', left: '25%' },
    particle5: { width: 3, height: 3, top: '25%', left: '55%', backgroundColor: '#A855F7' },
    particle6: { width: 2, height: 2, top: '75%', left: '60%' },
});