import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Padrão Expo
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface TimelineItem {
  title: string;
  date: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

const timeline: TimelineItem[] = [
  {
    title: 'Início no Direito - UFC',
    date: '2019',
    description: 'Jornada na UFC com foco em Direitos Humanos e Tecnologia.',
    icon: 'school',
  },
  {
    title: 'Entrada no Grupo GETIS',
    date: '2022',
    description: 'Privacidade e proteção de dados na liga de Direito Digital da Unifor.',
    icon: 'shield-check',
  },
  {
    title: 'Transição para a T.I',
    date: '2023',
    description: 'Início em ADS e mergulho em Machine Learning.',
    icon: 'laptop',
  },
  {
    title: 'Residência em TIC & iOS',
    date: '2024',
    description: 'Residência tecnológica do MCTI com foco em mobile.',
    icon: 'cellphone',
  },
  {
    title: 'Criação do PortariART',
    date: '2025',
    description: 'Lançamento do portfólio reunindo arte e tecnologia.',
    icon: 'palette',
  },
];

export default function Timeline() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.tint }]}>_TRAJETÓRIA</Text>
      
      <View style={styles.list}>
        {/* Linha vertical que fica atrás dos ícones */}
        <View style={[styles.verticalLine, { backgroundColor: theme.tint }]} />

        {timeline.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            {/* Círculo com Ícone */}
            <View style={[styles.iconCircle, { backgroundColor: theme.tint, borderColor: theme.background }]}>
              <MaterialCommunityIcons name={item.icon} size={16} color="#000" />
            </View>

            {/* Conteúdo */}
            <View style={styles.content}>
              <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
              <Text style={[styles.date, { color: theme.tint }]}>{item.date}</Text>
              <Text style={[styles.description, { color: theme.text }]}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 30,
    letterSpacing: -1,
  },
  list: {
    paddingLeft: 10,
  },
  verticalLine: {
    position: 'absolute',
    left: 24, // Alinhado com o centro do ícone
    top: 0,
    bottom: 0,
    width: 2,
    opacity: 0.3,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  content: {
    flex: 1,
    marginLeft: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.8,
  },
});