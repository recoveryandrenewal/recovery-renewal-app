import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, ChevronRight } from 'lucide-react-native';

const THEME = {
    cosmicDeep: ['#121024', '#2A1832', '#151525'],
    accentCyan: '#00E5FF',
    textWhite: '#FFFFFF',
    textGray: '#A0A0B0',
};

export default function SettingsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <LinearGradient colors={THEME.cosmicDeep} style={StyleSheet.absoluteFill} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.header}>
                        <Settings size={32} color={THEME.accentCyan} />
                        <Text style={styles.title}>Settings</Text>
                    </View>
                    <View style={styles.section}>
                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingText}>Reading Preference</Text>
                            <ChevronRight size={20} color={THEME.textGray} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingText}>Privacy Policy</Text>
                            <ChevronRight size={20} color={THEME.textGray} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('About')}>
                            <Text style={styles.settingText}>About</Text>
                            <ChevronRight size={20} color={THEME.textGray} />
                        </TouchableOpacity>
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
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
    title: { fontSize: 28, fontWeight: 'bold', color: THEME.textWhite, marginLeft: 12 },
    section: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 16, overflow: 'hidden' },
    settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.05)' },
    settingText: { fontSize: 16, color: THEME.textWhite },
});