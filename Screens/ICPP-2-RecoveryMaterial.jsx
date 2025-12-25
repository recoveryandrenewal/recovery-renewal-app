import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME = {
    cosmicDeep: ['#121024', '#2A1832', '#151525'],
    accentCyan: '#00E5FF',
    accentPink: '#EC4899',
    textWhite: '#FFFFFF',
};

const RECOVERY_OPTIONS = [
    { id: 'aa', label: 'AA' },
    { id: 'na', label: 'NA' },
    { id: 'ga', label: 'GA' },
    { id: 'behavioral', label: 'Behavioral' },
    { id: 'devotional', label: 'Devotional' },
    { id: 'step', label: 'Step Calendar' },
];

export default function ICPP2({ navigation }) {
    const [selections, setSelections] = useState([]);

    const toggleSelection = (id) => {
        if (selections.includes(id)) {
            setSelections(selections.filter(s => s !== id));
        } else {
            setSelections([...selections, id]);
        }
    };

    const handleContinue = async () => {
        try {
            await AsyncStorage.setItem('recoveryMaterialConfig', JSON.stringify({ recoveryType: selections }));
            navigation.navigate('ICPP-3');
        } catch (error) {
            console.log('Error saving recovery material:', error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <LinearGradient colors={THEME.cosmicDeep} style={StyleSheet.absoluteFill} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.title}>Recovery Material</Text>
                    <Text style={styles.subtitle}>Select your recovery paths</Text>
                    <View style={styles.optionsContainer}>
                        {RECOVERY_OPTIONS.map(option => (
                            <TouchableOpacity
                                key={option.id}
                                style={[styles.option, selections.includes(option.id) && styles.optionSelected]}
                                onPress={() => toggleSelection(option.id)}
                            >
                                <Text style={styles.optionText}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    content: { padding: 20, paddingTop: 60, alignItems: 'center' },
    title: { fontSize: 28, fontWeight: 'bold', color: THEME.textWhite, marginBottom: 10 },
    subtitle: { fontSize: 16, color: THEME.textWhite, opacity: 0.7, marginBottom: 30 },
    optionsContainer: { width: '100%', maxWidth: 400 },
    option: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 12, padding: 18, marginBottom: 12, borderWidth: 2, borderColor: 'transparent' },
    optionSelected: { borderColor: THEME.accentCyan, backgroundColor: 'rgba(0, 229, 255, 0.1)' },
    optionText: { color: THEME.textWhite, fontSize: 16, fontWeight: '600', textAlign: 'center' },
    continueButton: { backgroundColor: THEME.accentPink, paddingVertical: 16, paddingHorizontal: 40, borderRadius: 30, marginTop: 30 },
    continueButtonText: { color: THEME.textWhite, fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' },
});