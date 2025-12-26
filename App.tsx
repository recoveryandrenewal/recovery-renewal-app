import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './Screens/Splash-Screen.jsx';
import DuaaScreen from './Screens/Duaa-Screen.jsx';
import ICPP1ReadingPreference from './Screens/ICPP-1-ReadingPreference.jsx';
import ICPP2RecoveryMaterial from './Screens/ICPP-2-RecoveryMaterial.jsx';
import ICPP3PersonalMilestones from './Screens/ICPP-3-PersonalMilestones.jsx';
import HomeScreen from './Screens/HomeScreen.jsx';
import SpurgeonReadingScreen from './Screens/SpurgeonReadingScreen.jsx';
import BuddhistReadingScreen from './Screens/BuddhistReadingScreen.jsx';
import TaoistReadingScreen from './Screens/TaoistReadingScreen.jsx';
import StoicReadingScreen from './Screens/StoicReadingScreen.jsx';
import WisdomReadingScreen from './Screens/WisdomReadingScreen.jsx';
import ReflectionReadingScreen from './Screens/ReflectionReadingScreen.jsx';
import SettingsScreen from './Screens/SettingsScreen.jsx';
import ResourcesScreen from './Screens/ResourcesScreen.jsx';
import LibraryScreen from './Screens/LibraryScreen.jsx';
import BibleScreen from './Screens/Biblescreen.jsx';
import PrayersScreen from './Screens/PrayerScreen.jsx';
import StepWorkScreen from './Screens/StepWorkScreen.jsx';
import WisdomScreen from './Screens/WisdomScreen.jsx';
import AboutScreen from './Screens/AboutScreen.jsx';

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
          <Stack.Screen name="BuddhistReading" component={BuddhistReadingScreen} />
          <Stack.Screen name="TaoistReading" component={TaoistReadingScreen} />
          <Stack.Screen name="StoicReading" component={StoicReadingScreen} />
          <Stack.Screen name="WisdomReading" component={WisdomReadingScreen} />
          <Stack.Screen name="ReflectionReading" component={ReflectionReadingScreen} />
          <Stack.Screen name="BibleScreen" component={BibleScreen} />
          <Stack.Screen name="PrayersScreen" component={PrayersScreen} />
          <Stack.Screen name="StepWorkScreen" component={StepWorkScreen} />
          <Stack.Screen name="WisdomScreen" component={WisdomScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}