import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const categories = ['Mobile', 'Fullstack', 'Frontend', 'Back', 'Dados', 'IA'];

export default function WorkFilter() {
  const theme = useColorScheme() ?? 'light';
  
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity key={cat} style={[styles.chip, { borderColor: Colors[theme].text }]}>
          <Text style={[styles.chipText, { color: Colors[theme].text }]}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, flexDirection: 'row' },
  chip: { borderWidth: 2, paddingHorizontal: 15, paddingVertical: 8, marginRight: 10, marginBottom: 10 },
  chipText: { fontWeight: '900', fontSize: 12 }
});