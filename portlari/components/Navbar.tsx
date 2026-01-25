import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/theme'; // Usando caminho relativo para evitar erro de alias
import { useColorScheme } from '../hooks/use-color-scheme'; // Caminho relativo também

export default function Navbar() {
  const colorScheme = useColorScheme();
  const currentMode = colorScheme === 'dark' ? 'dark' : 'light';
  const theme = Colors[currentMode];

  // Se o tema falhar por algum motivo, não deixamos o app quebrar
  if (!theme) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.background, borderBottomColor: theme.tint }]}>
      <Text style={[styles.logo, { color: theme.text }]}>
        PORT<Text style={{ color: theme.tint }}>.LARI</Text>
      </Text>
      
      <TouchableOpacity 
        activeOpacity={0.7}
        style={[styles.button, { backgroundColor: theme.tint }]}
      >
        <Text style={styles.buttonText}>Contato</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    //marginTop: 40, 
  },
  logo: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -1,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: '#000',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
});