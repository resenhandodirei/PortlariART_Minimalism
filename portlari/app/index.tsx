import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import Navbar from '@/components/Navbar';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Navbar />
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* --- HERO SECTION START --- */}
        <View style={styles.heroContainer}>
          
          <View style={[styles.badge, { borderColor: theme.text }]}>
            <Text style={[styles.badgeText, { color: theme.text }]}>DISPONÍVEL PARA PROJETOS</Text>
          </View>

          <Text style={[styles.mainTitle, { color: theme.text }]}>
            CREATIVE{"\n"}
            <Text style={{ color: theme.tint }}>DEVELOPER</Text>
          </Text>

          <Text style={[styles.description, { color: theme.text }]}>
            Eu transformo designs complexos em interfaces <Text style={{fontWeight: 'bold'}}>minimalistas</Text> e funcionais.
          </Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={[styles.ctaButton, { backgroundColor: theme.tint }]}>
              <Text style={styles.ctaText}>MEU TRABALHO</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.secondaryButton, { borderColor: theme.text }]}>
              <Text style={[styles.secondaryText, { color: theme.text }]}>SOBRE MIM</Text>
            </TouchableOpacity>
          </View>

        </View>
        {/* --- HERO SECTION END --- */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingTop: 60,
  },
  heroContainer: {
    alignItems: 'flex-start',
  },
  badge: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  mainTitle: {
    fontSize: 64, // Título bem grande
    fontWeight: '900',
    lineHeight: 60,
    letterSpacing: -2,
  },
  description: {
    fontSize: 18,
    marginTop: 25,
    lineHeight: 26,
    maxWidth: '90%',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 15,
  },
  ctaButton: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: '#000',
    // Sombra "hard" neubrutalista
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    elevation: 5,
  },
  ctaText: {
    fontWeight: '900',
    color: '#000',
  },
  secondaryButton: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderBottomWidth: 4, // Apenas uma borda grossa embaixo
  },
  secondaryText: {
    fontWeight: '700',
  },
});