import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Button from './Button';

export default function Hero() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={styles.heroContainer}>
      <View style={[styles.badge, { borderColor: theme.text }]}>
        <Text style={[styles.badgeText, { color: theme.text }]}>
          DISPONÍVEL PARA PROJETOS
        </Text>
      </View>

      <Text style={[styles.mainTitle, { color: theme.text }]}>
        CREATIVE{"\n"}
        <Text style={{ color: theme.tint }}>DEVELOPER</Text>
      </Text>

      <Text style={[styles.description, { color: theme.text }]}>
        Eu transformo designs complexos em interfaces <Text style={{ fontWeight: 'bold' }}>minimalistas</Text> e funcionais.
      </Text>
    
        <Button />
      
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    alignItems: 'flex-start',
    paddingVertical: 40,
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
    fontSize: 54,
    fontWeight: '900',
    lineHeight: 52,
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
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 3,
  },
  secondaryText: {
    fontWeight: '700',
  },
});