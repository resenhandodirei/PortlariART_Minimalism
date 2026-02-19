import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/app/constants/theme';
import { useColorScheme } from '@/app/hooks/use-color-scheme';

interface TimelineItemType {
  title: string;
  date: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

const timeline: TimelineItemType[] = [
  {
    title: 'Início no Direito - UFC',
    date: '08/2022',
    description:
      'Início da graduação com foco em Direitos Humanos, tecnologia e regulação digital.',
    icon: 'school',
  },
  {
    title: 'Início em Análise e Desenvolvimento de Sistemas - XP Educação',
    date: '08/2022',
    description:
      'Formação voltada para sistemas complexos, escalabilidade e estruturação de dados.',
    icon: 'laptop',
  },
  {
    title: 'GETIS - Unifor',
    date: '2023',
    description:
      'Pesquisa sobre privacidade, proteção de dados e Direito Digital.',
    icon: 'shield-check',
  },
  {
    title: 'GEDAI - UFC',
    date: '2023',
    description:
      'Estudos sobre regulação internacional de tecnologias emergentes.',
    icon: 'earth',
  },
  {
    title: 'NECC - UFC',
    date: '2023',
    description:
      'Pesquisa sobre Direito Penal, crimes cibernéticos e regulação de IA.',
    icon: 'gavel',
  },
  {
    title: 'Estágio em Dados, Fullstack e IA - Prefeitura de Fortaleza',
    date: '2023',
    description:
      'Desenvolvimento de soluções com foco em análise de dados e modernização de serviços públicos.',
    icon: 'city',
  },
  {
    title: 'Residência Mobile - IREDE / MCTI',
    date: '2024',
    description:
      'Residência tecnológica com foco em desenvolvimento mobile.',
    icon: 'cellphone',
  },
  {
    title: 'Desenvolvedora iOS - IREDE / MCTI',
    date: '2024',
    description:
      'Atuação prática em desenvolvimento iOS dentro do programa de residência.',
    icon: 'apple',
  },
  {
    title: 'Criação do PortLariART',
    date: '2025',
    description:
      'Lançamento do portfólio integrando tecnologia, design e identidade autoral.',
    icon: 'palette',
  },
  {
    title: 'Desenvolvedora Fullstack - NUAJA / DPGE-CE',
    date: '2025',
    description:
      'Desenvolvimento de soluções tecnológicas voltadas ao sistema de justiça cearense.',
    icon: 'account-tie',
  },
];

function TimelineItem({ item }: { item: TimelineItemType }) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={styles.itemContainer}>
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: theme.tint, borderColor: theme.background },
        ]}
      >
        <MaterialCommunityIcons name={item.icon} size={16} color="#000" />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          {item.title}
        </Text>
        <Text style={[styles.date, { color: theme.tint }]}>
          {item.date}
        </Text>
        <Text style={[styles.description, { color: theme.text }]}>
          {item.description}
        </Text>
      </View>
    </View>
  );
}

export default function Timeline() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.tint }]}>
        _TRAJETÓRIA
      </Text>

      <View style={styles.list}>
        <View
          style={[
            styles.verticalLine,
            { backgroundColor: theme.tint },
          ]}
        />

        {timeline.map((item, index) => (
          <TimelineItem key={index} item={item} />
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
    left: 24,
    top: 16,
    bottom: 16,
    width: 2,
    opacity: 0.25,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 30,
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
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.8,
  },
});
