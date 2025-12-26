import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from 'lucide-react-native';

const THEME = {
    cosmicDeep: ['#121024', '#2A1832', '#151525'],
    accentCyan: '#00E5FF',
    accentPink: '#EC4899',
    textWhite: '#FFFFFF',
    textGray: '#A0A0B0',
};

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <LinearGradient colors={THEME.cosmicDeep} style={StyleSheet.absoluteFill} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.header}>
                        <Heart size={40} color={THEME.accentPink} fill={THEME.accentPink} />
                        <Text style={styles.title}>Recovery & Renewal</Text>
                    </View>
                    <Text style={styles.version}>Version 1.0.1</Text>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Our Mission</Text>
                        <Text style={styles.bodyText}>
                            Recovery & Renewal is a privacy-first companion app for those on the journey of recovery. We believe your journey is yours alone, and we're here to support you without collecting any data.
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Our Promise</Text>
                        <Text style={styles.highlight}>Zero data collection. Zero tracking. 100% Free.</Text>
                        <Text style={styles.bodyText}>
                            Everything stays on your device. What you see here, what you read here, stays here.
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Built With Love</Text>
                        <Text style={styles.bodyText}>
                            Created by someone in recovery, for others on the same path. Open source. Always free. No ads. No premium features. No paywalls.
                        </Text>
                    </View>
                    <Text style={styles.footer}>"Freely you have received, freely give."</Text>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    content: { padding: 20, paddingTop: 60, alignItems: 'center' },
    header: { alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: THEME.textWhite, marginTop: 15, textAlign: 'center' },
    version: { fontSize: 14, color: THEME.textGray, marginBottom: 30 },
    section: { width: '100%', marginBottom: 25 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: THEME.accentCyan, marginBottom: 10 },
    bodyText: { fontSize: 16, color: THEME.textGray, lineHeight: 24 },
    highlight: { fontSize: 16, fontWeight: 'bold', color: THEME.accentPink, marginBottom: 10 },
    footer: { fontSize: 14, color: THEME.accentCyan, fontStyle: 'italic', marginTop: 30, textAlign: 'center' },
});