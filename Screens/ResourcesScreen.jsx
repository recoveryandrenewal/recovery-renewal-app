import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { LifeBuoy, Phone } from 'lucide-react-native';

const THEME = {
    cosmicDeep: ['#121024', '#2A1832', '#151525'],
    accentCyan: '#00E5FF',
    accentPink: '#EC4899',
    textWhite: '#FFFFFF',
    textGray: '#A0A0B0',
};

const RESOURCES = [
    { title: '988 Suicide & Crisis Lifeline', number: '988', description: '24/7 crisis support' },
    { title: 'SAMHSA National Helpline', number: '1-800-662-4357', description: 'Treatment referral service' },
    { title: 'Crisis Text Line', number: '741741', description: 'Text HOME to 741741' },
];

export default function ResourcesScreen() {
    const handleCall = (number) => {
        Linking.openURL(`tel:${number}`);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <LinearGradient colors={THEME.cosmicDeep} style={StyleSheet.absoluteFill} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.header}>
                        <LifeBuoy size={32} color={THEME.accentCyan} />
                        <Text style={styles.title}>Resources</Text>
                    </View>
                    <Text style={styles.subtitle}>Help is always available</Text>
                    {RESOURCES.map((resource, index) => (
                        <View key={index} style={styles.resourceCard}>
                            <Text style={styles.resourceTitle}>{resource.title}</Text>
                            <Text style={styles.resourceDescription}>{resource.description}</Text>
                            <TouchableOpacity style={styles.callButton} onPress={() => handleCall(resource.number)}>
                                <Phone size={18} color={THEME.textWhite} />
                                <Text style={styles.callButtonText}>{resource.number}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
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
    resourceCard: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 16, padding: 20, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: THEME.accentCyan },
    resourceTitle: { fontSize: 18, fontWeight: 'bold', color: THEME.textWhite, marginBottom: 5 },
    resourceDescription: { fontSize: 14, color: THEME.textGray, marginBottom: 15 },
    callButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: THEME.accentPink, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 25, alignSelf: 'flex-start' },
    callButtonText: { color: THEME.textWhite, fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
});