import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME = {
    cosmicDeep: ['#121024', '#2A1832', '#151525'],
    accentCyan: '#00E5FF',
    textWhite: '#FFFFFF',
    textGray: '#A0A0B0',
};

export default function HomeScreen({ navigation }) {
    const [userName, setUserName] = useState('');
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        loadUserData();
        updateGreeting();
    }, []);

    const loadUserData = async () => {
        try {
            const name = await AsyncStorage.getItem('userName');
            setUserName(name || '');
        } catch (error) {
            console.log('Error loading user data:', error);
        }
    };

    const updateGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <LinearGradient colors={THEME.cosmicDeep} style={StyleSheet.absoluteFill} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greeting}>
                            {greeting}{userName ? `, ${userName}` : ''}
                        </Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Welcome Home</Text>
                        <Text style={styles.cardText}>Your journey begins here.</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    content: { padding: 20, paddingTop: 60 },
    greetingContainer: { marginBottom: 30 },
    greeting: { fontSize: 24, fontWeight: '600', color: THEME.textWhite },
    card: { backgroundColor: 'rgba(62, 30, 69, 0.4)', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: THEME.accentCyan, marginBottom: 8 },
    cardText: { fontSize: 14, color: THEME.textGray },
});