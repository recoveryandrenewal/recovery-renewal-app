import 'react-native-gesture-handler'; // Crucial for Stack Navigation
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens - Ensure these files exist in your ./Screens folder
import SplashScreen from './Screens/Splash-Screen.jsx';
import DuaaScreen from './Screens/Duaa-Screen.jsx';
import ICPP1ReadingPreference from './Screens/ICPP-1-ReadingPreference.jsx';
import ICPP2RecoveryMaterial from './Screens/ICPP-2-RecoveryMaterial.jsx';
import ICPP3PersonalMilestones from './Screens/ICPP-3-PersonalMilestones.jsx';
import HomeScreen from './Screens/HomeScreen.jsx';
import SpurgeonReadingScreen from './Screens/SpurgeonReadingScreen.jsx';
import SimpsonReadingScreen from './Screens/SimpsonReadingScreen.jsx';
import BuddhistReadingScreen from './Screens/BuddhistReadingScreen.jsx';
import TaoistReadingScreen from './Screens/TaoistReadingScreen.jsx';
import StoicReadingScreen from './Screens/StoicReadingScreen.jsx';
import WisdomReadingScreen from './Screens/WisdomReadingScreen.jsx';
import ReflectionReadingScreen from './Screens/ReflectionReadingScreen.jsx';
import SettingsScreen from './Screens/SettingsScreen.jsx';
import ResourcesScreen from './Screens/ResourcesScreen';
import LibraryScreen from './Screens/LibraryScreen';
import BibleScreen from './Screens/BibleScreen';
import PrayersScreen from './Screens/PrayersScreen';
import StepWorkScreen from './Screens/StepWorkScreen';
import AboutScreen from './Screens/AboutScreen.jsx';
import JournalScreen from './Screens/JournalScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
    <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}
    >
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="DUAA" component={DuaaScreen} />
    <Stack.Screen name="ICPP-1" component={ICPP1ReadingPreference} />
    <Stack.Screen name="ICPP-2" component={ICPP2RecoveryMaterial} />
    <Stack.Screen name="ICPP-3" component={ICPP3PersonalMilestones} />
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Resources" component={ResourcesScreen} />
    <Stack.Screen name="Library" component={LibraryScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
    <Stack.Screen name="SpurgeonReading" component={SpurgeonReadingScreen} />
    <Stack.Screen name="SimpsonReading" component={SimpsonReadingScreen} />
    <Stack.Screen name="BuddhistReading" component={BuddhistReadingScreen} />
    <Stack.Screen name="TaoistReading" component={TaoistReadingScreen} />
    <Stack.Screen name="StoicReading" component={StoicReadingScreen} />
    <Stack.Screen name="WisdomReading" component={WisdomReadingScreen} />
    <Stack.Screen name="ReflectionReading" component={ReflectionReadingScreen} />
    <Stack.Screen name="BibleScreen" component={BibleScreen} />
    <Stack.Screen name="PrayersScreen" component={PrayersScreen} />
    <Stack.Screen name="StepWorkScreen" component={StepWorkScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="JournalScreen" component={JournalScreen} />

    </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
