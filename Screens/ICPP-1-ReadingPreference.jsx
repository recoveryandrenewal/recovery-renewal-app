import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME = {
    cosmicDeep: ['#121024', '#2A1832', '#151525'],
    accentCyan: '#00E5FF',
    accentPink: '#EC4899',
    textWhite: '#FFFFFF',
};

export default function ICPP1({ navigation }) {
    const [selection, setSelection] = useState('');

    const handleSelection = (choice) => {
        setSelection(choice);
    };

    const handleContinue = async () => {
        if (!selection) return;
        try {
            await AsyncStorage.setItem('readingPreference', selection);
            navigation.navigate('ICPP-2');
        } catch (error) {
            console.log('Error saving preference:', error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <LinearGradient colors={THEME.cosmicDeep} style={StyleSheet.absoluteFill} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <Text style={styles.title}>Reading Preference</Text>
                    <Text style={styles.subtitle}>Choose your spiritual path</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, selection === 'christian' && styles.buttonSelected]}
                            onPress={() => handleSelection('christian')}
                        >
                            <Text style={styles.buttonText}>Christian</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, selection === 'spiritual' && styles.buttonSelected]}
                            onPress={() => handleSelection('spiritual')}
                        >
                            <Text style={styles.buttonText}>Spiritual</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, selection === 'random' && styles.buttonSelected]}
                            onPress={() => handleSelection('random')}
                        >
                            <Text style={styles.buttonText}>Random</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={[styles.continueButton, !selection && styles.continueButtonDisabled]}
                        onPress={handleContinue}
                        disabled={!selection}
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: THEME.textWhite, marginBottom: 10 },
    subtitle: { fontSize: 16, color: THEME.textWhite, opacity: 0.7, marginBottom: 40 },
    buttonContainer: { width: '100%', maxWidth: 300 },
    button: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 12, padding: 20, marginBottom: 15, borderWidth: 2, borderColor: 'transparent' },
    buttonSelected: { borderColor: THEME.accentCyan, backgroundColor: 'rgba(0, 229, 255, 0.1)' },
    buttonText: { color: THEME.textWhite, fontSize: 18, fontWeight: '600', textAlign: 'center' },
    continueButton: { backgroundColor: THEME.accentPink, paddingVertical: 16, paddingHorizontal: 40, borderRadius: 30, marginTop: 30 },
    continueButtonDisabled: { opacity: 0.5 },
    continueButtonText: { color: THEME.textWhite, fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' },
});