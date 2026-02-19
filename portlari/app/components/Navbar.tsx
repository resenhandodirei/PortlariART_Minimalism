import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Colors } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';

export default function Navbar() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  if (!theme) return null;

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: theme.background, 
        borderBottomColor: theme.text, // Mudamos para a cor do texto para um contraste mais "bruto"
        borderBottomWidth: 4 
      }
    ]}>
      <View>
        <Text style={[styles.logo, { color: theme.text }]}>
          PORT<Text style={{ color: theme.tint }}>.LARI</Text>
        </Text>
        <View style={[styles.logoLine, { backgroundColor: theme.tint }]} />
      </View>
      
      <TouchableOpacity 
        activeOpacity={0.8}
        style={[styles.button, { backgroundColor: theme.tint, shadowColor: theme.text }]}
      >
        <Text style={styles.buttonText}>CONTATO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    zIndex: 100,
  },
  logo: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -1.5,
    textTransform: 'uppercase',
  },
  logoLine: {
    height: 4,
    width: '40%',
    marginTop: -2,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 0,
    // Efeito Neubrutalista de sombra sólida
    ...Platform.select({
      ios: {
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
      },
      android: {
        elevation: 0, // No Android, sombras customizadas são limitadas, usamos bordas
      },
      web: {
        boxShadow: '4px 4px 0px 0px #000',
      }
    }),
  },
  buttonText: {
    color: '#000',
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1,
  },
});