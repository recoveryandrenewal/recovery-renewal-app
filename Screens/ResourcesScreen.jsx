// Screens/ResourcesScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Linking,
  Alert,
  Animated,
  Easing,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Phone,
  MessageCircle,
  Globe,
  Heart,
  Users,
  Shield,
  Home as HomeIcon,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ChevronLeft, // <--- Added ChevronLeft
} from 'lucide-react-native';

// THEME - Match HomeScreen & SettingsScreen
const THEME = {
  cosmicDeep: ['#121024', '#2A1832', '#151525'],
  cosmicSoft: ['#3E1E45', '#454E9E'],
  accentCyan: '#00E5FF',
  accentRed: '#FF6B6B',
  accentGreen: '#10B981',
  accentAmber: '#F59E0B',
  textWhite: '#FFFFFF',
  textSoft: '#C0C0D0',
  textGray: '#A0A0B0',
};

// BREATHING BACKGROUND
const BreathingBackground = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 12500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 12500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  return (
    <>
      <LinearGradient
        colors={THEME.cosmicDeep}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
        <LinearGradient
          colors={['#1A0B2E', '#16213E', '#0F3460']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </>
  );
};

// COLLAPSIBLE SECTION COMPONENT
const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <View style={styles.collapsibleContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setIsOpen(!isOpen)}
        style={styles.collapsibleHeader}
      >
        <Text style={styles.collapsibleTitle}>{title}</Text>
        {isOpen ? (
          <ChevronUp size={20} color={THEME.accentCyan} />
        ) : (
          <ChevronDown size={20} color={THEME.accentCyan} />
        )}
      </TouchableOpacity>
      {isOpen && <View style={styles.collapsibleContent}>{children}</View>}
    </View>
  );
};

// RESOURCE CARD COMPONENT
const ResourceCard = ({
  icon: Icon,
  iconColor,
  title,
  phone,
  phoneLabel,
  text,
  textLabel,
  chat,
  chatLabel,
  website,
  hours,
  description,
  note,
  gradientColors = THEME.cosmicSoft,
  linksEnabled = true,
}) => {
  const handlePress = async (type, value) => {
    if (!linksEnabled) {
      Alert.alert('Links Locked', 'Turn on "Active Links" at the top of the screen to use tap-to-call/text/chat.');
      return;
    }

    let url;
    switch (type) {
      case 'phone':
        url = `tel:${value}`;
        break;
      case 'sms':
        url = `sms:${value}`;
        break;
      case 'url':
        url = value.startsWith('http') ? value : `https://${value}`;
        break;
      default:
        return;
    }

    try {
      if (type === 'phone' || type === 'sms') {
        await Linking.openURL(url);
        return;
      }
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open link: ${value}`);
      }
    } catch (error) {
      Alert.alert('Error', `Failed to open ${type}`);
      console.error('Linking error:', error);
    }
  };

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.resourceCard}
    >
      <View style={styles.resourceHeader}>
        <View style={[styles.resourceIconContainer, { backgroundColor: `${iconColor}20` }]}>
          <Icon size={24} color={iconColor} />
        </View>
        <Text style={styles.resourceTitle}>{title}</Text>
      </View>
      {description && <Text style={styles.resourceDescription}>{description}</Text>}
      <View style={styles.actionButtons}>
        {phone && (
          <TouchableOpacity style={styles.actionButton} onPress={() => handlePress('phone', phone)}>
            <Phone size={18} color={THEME.accentCyan} />
            <Text style={styles.actionButtonText}>{phoneLabel || 'Call'}</Text>
            <Text style={styles.actionButtonSubtext}>{phone}</Text>
          </TouchableOpacity>
        )}
        {text && (
          <TouchableOpacity style={styles.actionButton} onPress={() => handlePress('sms', text)}>
            <MessageCircle size={18} color={THEME.accentCyan} />
            <Text style={styles.actionButtonText}>{textLabel || 'Text'}</Text>
            <Text style={styles.actionButtonSubtext}>{text}</Text>
          </TouchableOpacity>
        )}
        {chat && (
          <TouchableOpacity style={styles.actionButton} onPress={() => handlePress('url', chat)}>
            <MessageCircle size={18} color={THEME.accentCyan} />
            <Text style={styles.actionButtonText}>{chatLabel || 'Chat'}</Text>
            <ExternalLink size={12} color={THEME.textGray} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        )}
        {website && (
          <TouchableOpacity style={styles.actionButton} onPress={() => handlePress('url', website)}>
            <Globe size={18} color={THEME.accentCyan} />
            <Text style={styles.actionButtonText}>Website</Text>
            <ExternalLink size={12} color={THEME.textGray} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        )}
      </View>
      {hours && <Text style={styles.resourceHours}>⏰ {hours}</Text>}
      {note && <Text style={styles.resourceNote}>{note}</Text>}
    </LinearGradient>
  );
};

// MAIN COMPONENT
const ResourcesScreen = ({ navigation }) => {
  const [linksEnabled, setLinksEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <BreathingBackground />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <SafeAreaView style={styles.safeArea}>


        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeft size={28} color={THEME.textWhite} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Get Help Now</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.linksToggleRow}>
            <View style={styles.linksToggleTextContainer}>
              <Text style={styles.linksToggleLabel}>Active Links</Text>
              <Text style={styles.linksToggleHint}>Turn on to enable calling/texting</Text>
            </View>
            <Switch
              value={linksEnabled}
              onValueChange={setLinksEnabled}
              trackColor={{ false: '#3E3E3E', true: THEME.accentCyan }}
              thumbColor="#FFFFFF"
            />
          </View>


          <LinearGradient
            colors={['#7F1D1D', '#991B1B', '#7F1D1D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.crisisBanner}
          >
            <AlertTriangle size={28} color="#FCA5A5" />
            <View style={styles.crisisContent}>
              <Text style={styles.crisisTitle}>IF YOU ARE IN CRISIS RIGHT NOW</Text>
              <TouchableOpacity disabled={!linksEnabled} onPress={() => Linking.openURL('tel:988')}>
                <Text style={[styles.crisisPhone, !linksEnabled && { opacity: 0.5 }]}>📞 Call 988</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={!linksEnabled} onPress={() => Linking.openURL('sms:988')}>
                <Text style={[styles.crisisText, !linksEnabled && { opacity: 0.5 }]}>📱 Text TALK to 988</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={!linksEnabled} onPress={() => Linking.openURL('https://988lifeline.org/chat')}>
                <Text style={[styles.crisisChat, !linksEnabled && { opacity: 0.5 }]}>💬 Chat at 988lifeline.org/chat</Text>
              </TouchableOpacity>
              <Text style={styles.crisisEmergency}>🚨 Call 911 if in immediate danger</Text>
            </View>
          </LinearGradient>


          <View style={styles.disclaimerBox}>
            <Shield size={20} color={THEME.accentCyan} />
            <Text style={styles.disclaimerText}>
              <Text style={styles.disclaimerBold}>Important: </Text>
              This app provides information only. It is NOT monitored and NOT a substitute for
              emergency services.
            </Text>
          </View>


          <Text style={styles.sectionTitle}>CRISIS SUPPORT</Text>
          <ResourceCard
            linksEnabled={linksEnabled}
            icon={Phone}
            iconColor={THEME.accentRed}
            title="988 Suicide & Crisis Lifeline"
            phone="988"
            phoneLabel="Call 988"
            text="988"
            textLabel="Text TALK"
            chat="https://988lifeline.org/chat"
            hours="24/7/365"
            description="Free, confidential crisis support."
            note="🇪🇸 Spanish: Press 2 after dialing 988"
          />


          <Text style={styles.sectionTitle}>SUBSTANCE USE & RECOVERY</Text>
          <ResourceCard
            linksEnabled={linksEnabled}
            icon={Heart}
            iconColor={THEME.accentGreen}
            title="SAMHSA National Helpline"
            phone="1-800-662-4357"
            phoneLabel="Call"
            hours="24/7/365"
            description="Free treatment referrals and information."
          />


          <CollapsibleSection title="Find Recovery Meetings" defaultOpen={false}>
            <ResourceCard
              linksEnabled={linksEnabled}
              icon={Users}
              iconColor={THEME.accentAmber}
              title="Alcoholics Anonymous (AA)"
              website="https://www.aa.org/meetings"
              description="Peer-support fellowship for alcohol recovery."
              gradientColors={['#2A1F3D', '#3E2F4D']}
            />
            <ResourceCard
              linksEnabled={linksEnabled}
              icon={Users}
              iconColor={THEME.accentAmber}
              title="Narcotics Anonymous (NA)"
              website="https://na.org/meetingsearch"
              description="Peer-support fellowship for substance recovery."
              gradientColors={['#2A1F3D', '#3E2F4D']}
            />
            <ResourceCard
              linksEnabled={linksEnabled}
              icon={Users}
              iconColor="#10B981"
              title="Recovery Dharma"
              website="https://recoverydharma.org/locations"
              description="Buddhist-inspired recovery community."
              gradientColors={['#2A1F3D', '#3E2F4D']}
            />
            <ResourceCard
              linksEnabled={linksEnabled}
              icon={Users}
              iconColor="#8B5CF6"
              title="SMART Recovery"
              website="https://smartrecovery.org/meeting"
              description="Evidence-based, secular recovery."
              gradientColors={['#2A1F3D', '#3E2F4D']}
            />
          </CollapsibleSection>


          <Text style={styles.sectionTitle}>VETERANS</Text>
          <ResourceCard
            linksEnabled={linksEnabled}
            icon={Shield}
            iconColor="#3B82F6"
            title="Veterans Crisis Line"
            phone="988"
            phoneLabel="988, Press 1"
            text="838255"
            description="Crisis support for veterans and families."
          />

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ResourcesScreen;

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1B',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 10, // Adjusted since header has padding
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  // --- HEADER STYLES ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: THEME.textWhite,
  },
  backButton: {
    padding: 4,
  },
  // --- END HEADER STYLES ---

  crisisBanner: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  crisisContent: {
    marginTop: 12,
  },
  crisisTitle: {
    fontSize: 15,
    color: '#FCA5A5',
    fontWeight: '700',
    marginBottom: 12,
  },
  crisisPhone: {
    fontSize: 16,
    color: '#FEF3C7',
    fontWeight: '600',
    marginBottom: 6,
  },
  crisisText: {
    fontSize: 16,
    color: '#FEF3C7',
    fontWeight: '600',
    marginBottom: 6,
  },
  crisisChat: {
    fontSize: 16,
    color: '#FEF3C7',
    fontWeight: '600',
    marginBottom: 12,
  },
  crisisEmergency: {
    fontSize: 14,
    color: '#FCA5A5',
    fontWeight: '700',
    marginTop: 8,
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 229, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
  },
  disclaimerText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 12,
    color: THEME.textSoft,
    lineHeight: 18,
  },
  disclaimerBold: {
    fontWeight: '700',
    color: THEME.accentCyan,
  },
  sectionTitle: {
    fontSize: 14,
    color: THEME.accentCyan,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 24,
    marginBottom: 12,
  },
  resourceCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resourceTitle: {
    flex: 1,
    fontSize: 16,
    color: THEME.textWhite,
    fontWeight: '700',
  },
  resourceDescription: {
    fontSize: 13,
    color: THEME.textSoft,
    lineHeight: 20,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginHorizontal: -4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)',
  },
  actionButtonText: {
    fontSize: 13,
    color: THEME.textWhite,
    fontWeight: '600',
    marginLeft: 6,
  },
  actionButtonSubtext: {
    fontSize: 11,
    color: THEME.textGray,
    marginLeft: 4,
  },
  resourceHours: {
    fontSize: 12,
    color: THEME.accentCyan,
    marginTop: 8,
    fontWeight: '600',
  },
  resourceNote: {
    fontSize: 11,
    color: THEME.textGray,
    marginTop: 8,
    fontStyle: 'italic',
  },
  collapsibleContainer: {
    marginBottom: 12,
  },
  collapsibleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
  },
  collapsibleTitle: {
    fontSize: 15,
    color: THEME.textWhite,
    fontWeight: '600',
  },
  collapsibleContent: {
    marginTop: 8,
  },
  linksToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
  },
  linksToggleTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  linksToggleLabel: {
    fontSize: 15,
    color: THEME.textWhite,
    fontWeight: '600',
  },
  linksToggleHint: {
    fontSize: 12,
    color: THEME.textGray,
    marginTop: 2,
  },
  whyBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  whyTitle: {
    fontSize: 14,
    color: THEME.accentCyan,
    fontWeight: '700',
    marginBottom: 8,
  },
  whyText: {
    fontSize: 12,
    color: THEME.textGray,
    lineHeight: 18,
  },
});