import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform, StatusBar } from 'react-native';
import { Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- MODERN THEME COLORS ---
const COLORS = {
    bgGradient: ['#121024', '#2A1832', '#000000'],
    textMain: '#FFFFFF',
    textGlow: 'rgba(168, 85, 247, 0.5)',
    heartColor: '#EC4899',
    heartGlow: 'rgba(236, 72, 153, 0.4)',
};

export default function SplashScreen({ navigation }) {
    const [splashStep, setSplashStep] = useState(0);
    const heartScale = useRef(new Animated.Value(1)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const particle1Anim = useRef(new Animated.Value(0)).current;
    const particle2Anim = useRef(new Animated.Value(0)).current;
    const particle3Anim = useRef(new Animated.Value(0)).current;
    const particle4Anim = useRef(new Animated.Value(0)).current;
    const particle5Anim = useRef(new Animated.Value(0)).current;
    const particle6Anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (splashStep >= 5) {
            const heartbeatAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(heartScale, { toValue: 1.15, duration: 150, useNativeDriver: true }),
                    Animated.timing(heartScale, { toValue: 1, duration: 150, useNativeDriver: true }),
                    Animated.timing(heartScale, { toValue: 1.15, duration: 150, useNativeDriver: true }),
                    Animated.timing(heartScale, { toValue: 1, duration: 600, useNativeDriver: true }),
                ])
            );
            heartbeatAnimation.start();
            return () => heartbeatAnimation.stop();
        }
    }, [splashStep, heartScale]);

    useEffect(() => {
        const createParticleAnim = (anim, duration) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.timing(anim, { toValue: 1, duration: duration, useNativeDriver: true }),
                    Animated.timing(anim, { toValue: 0, duration: duration, useNativeDriver: true }),
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

    useEffect(() => {
        setSplashStep(0);
        const timers = [
            setTimeout(() => {
                setSplashStep(1);
                Animated.timing(textOpacity, { toValue: 1, duration: 800, useNativeDriver: true }).start();
            }, 800),
            setTimeout(() => setSplashStep(2), 1600),
            setTimeout(() => setSplashStep(3), 2400),
            setTimeout(() => {
                setSplashStep(4);
                Animated.timing(textOpacity, { toValue: 0, duration: 800, useNativeDriver: true }).start();
            }, 3600),
            setTimeout(() => {
                setSplashStep(5);
                Animated.timing(logoOpacity, { toValue: 1, duration: 800, useNativeDriver: true }).start();
            }, 3650),
            setTimeout(async () => {
                if (navigation) {
                    try {
                        const hasCompletedSetup = await AsyncStorage.getItem('onboardingComplete');
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

        return () => timers.forEach(timer => clearTimeout(timer));
    }, [navigation]);

    const getParticleStyle = (anim, initialTop, initialLeft) => {
        return {
            ...styles.particle,
            top: initialTop,
            left: initialLeft,
            opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.6] }),
            transform: [{
                translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -20] })
            }]
        };
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <LinearGradient colors={COLORS.bgGradient} style={StyleSheet.absoluteFillObject} />
            
            <Animated.View style={[styles.particle, getParticleStyle(particle1Anim, '10%', '15%')]} />
            <Animated.View style={[styles.particle, getParticleStyle(particle2Anim, '25%', '70%'), { backgroundColor: 'rgba(168, 85, 247, 0.4)' }]} />
            <Animated.View style={[styles.particle, getParticleStyle(particle3Anim, '50%', '80%'), { backgroundColor: 'rgba(236, 72, 153, 0.3)' }]} />
            <Animated.View style={[styles.particle, getParticleStyle(particle4Anim, '70%', '20%')]} />
            <Animated.View style={[styles.particle, getParticleStyle(particle5Anim, '45%', '50%'), { backgroundColor: 'rgba(217, 70, 239, 0.4)' }]} />
            <Animated.View style={[styles.particle, getParticleStyle(particle6Anim, '85%', '65%')]} />

            <View style={styles.content}>
                {splashStep < 4 && (
                    <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
                        <Text style={[styles.textLine, splashStep >= 1 && styles.textVisible]}>You are not alone.</Text>
                        <Text style={[styles.textLine, splashStep >= 2 && styles.textVisible]}>You are not broken.</Text>
                        <Text style={[styles.textLine, splashStep >= 3 && styles.textVisible]}>You are loved.</Text>
                    </Animated.View>
                )}

                {splashStep >= 5 && (
                    <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
                        <Animated.View style={[styles.heartGlow, { transform: [{ scale: heartScale }] }]}>
                            <Heart size={80} color={COLORS.heartColor} fill={COLORS.heartColor} strokeWidth={2} />
                        </Animated.View>
                        <Text style={styles.logoTitle}>Recovery & Renewal</Text>
                        <Text style={styles.logoSubtitle}>A companion for your journey home</Text>
                    </Animated.View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', paddingHorizontal: 30 },
    textContainer: { alignItems: 'center' },
    textLine: { fontSize: 24, fontWeight: '300', color: COLORS.textMain, marginVertical: 10, opacity: 0, textAlign: 'center', textShadowColor: COLORS.textGlow, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20 },
    textVisible: { opacity: 1 },
    logoContainer: { alignItems: 'center' },
    heartGlow: { shadowColor: COLORS.heartGlow, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 30, elevation: 10, marginBottom: 20 },
    logoTitle: { fontSize: 32, fontWeight: '700', color: COLORS.textMain, marginTop: 15, textAlign: 'center' },
    logoSubtitle: { fontSize: 16, fontWeight: '300', color: COLORS.textMain, opacity: 0.8, marginTop: 8, textAlign: 'center' },
    particle: { position: 'absolute', width: 4, height: 4, backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: 2 },
});