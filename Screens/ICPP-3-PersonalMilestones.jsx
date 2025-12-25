import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME = {
    cosmicDeep: ['#121024', '#2A1832', '#151525'],
    accentCyan: '#00E5FF',
    accentPink: '#EC4899',
    textWhite: '#FFFFFF',
    textGray: '#A0A0B0',
};

const MILESTONE_OPTIONS = [
    { id: 'sober', label: 'Sobriety Date', suffix: 'sober' },
    { id: 'new_beginning', label: 'New Beginning', suffix: 'New Beginning' },
    { id: 'spiritual_awakening', label: 'Spiritual Awakening', suffix: 'Spiritual Awakening' },
    { id: 'found_hope', label: 'Day I Found Hope', suffix: 'since I found hope' },
    { id: 'days_without', label: 'Days Without', suffix: 'Days Without', customText: true },
];

export default function ICPP3({ navigation }) {
    const [userName, setUserName] = useState('');
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [customText, setCustomText] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleContinue = async () => {
        try {
            await AsyncStorage.setItem('userName', userName);
            if (selectedMilestone) {
                await AsyncStorage.setItem('milestoneStartDate', date.toISOString());
                const label = selectedMilestone.customText ? `Days Without ${customText}` : selectedMilestone.suffix;
                await AsyncStorage.setItem('milestoneLabel', label);
            }
            await AsyncStorage.setItem('onboardingComplete', 'true');
            navigation.replace('Home');
        } catch (error) {
            console.log('Error saving milestones:', error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <LinearGradient colors={THEME.cosmicDeep} style={StyleSheet.absoluteFill} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.title}>Personal Milestones</Text>
                    <Text style={styles.subtitle}>Tell us about your journey (optional)</Text>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Your Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name (optional)"
                            placeholderTextColor={THEME.textGray}
                            value={userName}
                            onChangeText={setUserName}
                            maxLength={12}
                        />
                    </View>

                    <View style={styles.milestoneContainer}>
                        <Text style={styles.label}>Milestone (Optional)</Text>
                        {MILESTONE_OPTIONS.map(option => (
                            <TouchableOpacity
                                key={option.id}
                                style={[styles.milestoneOption, selectedMilestone?.id === option.id && styles.milestoneSelected]}
                                onPress={() => setSelectedMilestone(option)}
                            >
                                <Text style={styles.milestoneText}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {selectedMilestone?.customText && (
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Social Media"
                            placeholderTextColor={THEME.textGray}
                            value={customText}
                            onChangeText={setCustomText}
                            maxLength={30}
                        />
                    )}

                    {selectedMilestone && (
                        <View style={styles.dateContainer}>
                            <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                                <Text style={styles.dateButtonText}>Select Date: {date.toLocaleDateString()}</Text>
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShowDatePicker(Platform.OS === 'ios');
                                        if (selectedDate) setDate(selectedDate);
                                    }}
                                />
                            )}
                        </View>
                    )}

                    <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                        <Text style={styles.continueButtonText}>Complete Setup</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    content: { padding: 20, paddingTop: 60 },
    title: { fontSize: 28, fontWeight: 'bold', color: THEME.textWhite, marginBottom: 10, textAlign: 'center' },
    subtitle: { fontSize: 16, color: THEME.textWhite, opacity: 0.7, marginBottom: 30, textAlign: 'center' },
    inputContainer: { marginBottom: 25 },
    label: { fontSize: 14, color: THEME.textWhite, marginBottom: 10, fontWeight: '600' },
    input: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 12, padding: 15, color: THEME.textWhite, fontSize: 16 },
    milestoneContainer: { marginBottom: 25 },
    milestoneOption: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 12, padding: 15, marginBottom: 10, borderWidth: 2, borderColor: 'transparent' },
    milestoneSelected: { borderColor: THEME.accentCyan, backgroundColor: 'rgba(0, 229, 255, 0.1)' },
    milestoneText: { color: THEME.textWhite, fontSize: 16, textAlign: 'center' },
    dateContainer: { marginBottom: 25 },
    dateButton: { backgroundColor: THEME.accentCyan, borderRadius: 12, padding: 15 },
    dateButtonText: { color: '#000', fontSize: 16, fontWeight: '600', textAlign: 'center' },
    continueButton: { backgroundColor: THEME.accentPink, paddingVertical: 16, paddingHorizontal: 40, borderRadius: 30, marginTop: 20, alignSelf: 'center' },
    continueButtonText: { color: THEME.textWhite, fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' },
});