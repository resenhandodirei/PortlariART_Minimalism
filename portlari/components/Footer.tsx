import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function Footer() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.text === '#000000' ? '#F0F0F0' : '#111' }]}>
      <Text style={[styles.brand, { color: theme.text }]}>
        PORT<Text style={{ color: theme.tint }}>.LARI</Text>
      </Text>
      
      <Text style={[styles.motto, { color: theme.text }]}>
        Construindo o futuro, um pixel por vez.
      </Text>

      <View style={styles.socialRow}>
        {['Github', 'LinkedIn', 'Twitter'].map((social) => (
          <TouchableOpacity 
            key={social}
            style={[styles.socialButton, { borderColor: theme.text }]}
            onPress={() => handlePress('https://google.com')}
          >
            <Text style={[styles.socialText, { color: theme.text }]}>{social}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.divider, { backgroundColor: theme.tint }]} />

      <Text style={[styles.copyright, { color: theme.text }]}>
        © 2026 • Desenvolvido com React Native
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignItems: 'center',
    marginTop: 50,
  },
  brand: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 10,
  },
  motto: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 30,
    textAlign: 'center',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 40,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  socialButton: {
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  socialText: {
    fontWeight: '700',
    fontSize: 12,
  },
  divider: {
    height: 4,
    width: 60,
    marginBottom: 20,
  },
  copyright: {
    fontSize: 10,
    fontWeight: '600',
    opacity: 0.5,
    letterSpacing: 1,
  },
});