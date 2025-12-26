import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Library, BookOpen, Heart, Sparkles } from 'lucide-react-native';

const THEME = {
    cosmicDeep: ['#121024', '#2A1832', '#151525'],
    accentCyan: '#00E5FF',
    accentPink: '#EC4899',
    textWhite: '#FFFFFF',
    textGray: '#A0A0B0',
};

const LIBRARY_SECTIONS = [
    { title: 'Spurgeon Devotionals', icon: Heart, route: 'SpurgeonReading' },
    { title: 'Buddhist Wisdom', icon: Sparkles, route: 'BuddhistReading' },
    { title: 'Taoist Teachings', icon: Sparkles, route: 'TaoistReading' },
    { title: 'Stoic Reflections', icon: BookOpen, route: 'StoicReading' },
];

export default function LibraryScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <LinearGradient colors={THEME.cosmicDeep} style={StyleSheet.absoluteFill} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.header}>
                        <Library size={32} color={THEME.accentCyan} />
                        <Text style={styles.title}>Library</Text>
                    </View>
                    <Text style={styles.subtitle}>Browse all readings</Text>
                    {LIBRARY_SECTIONS.map((section, index) => {
                        const IconComponent = section.icon;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.sectionCard}
                                onPress={() => navigation.navigate(section.route)}
                            >
                                <IconComponent size={24} color={THEME.accentCyan} />
                                <Text style={styles.sectionTitle}>{section.title}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    content: { padding: 20, paddingTop: 60 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    title: { fontSize: 28, fontWeight: 'bold', color: THEME.textWhite, marginLeft: 12 },
    subtitle: { fontSize: 16, color: THEME.textGray, marginBottom: 25 },
    sectionCard: { backgroundColor: 'rgba(62, 30, 69, 0.4)', borderRadius: 16, padding: 20, marginBottom: 15, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
    sectionTitle: { fontSize: 18, fontWeight: '600', color: THEME.textWhite, marginLeft: 15 },
});