import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Tipagem
export type ProjectCategory = 'Frontend' | 'Backend' | 'Fullstack' | 'Mobile' | 'IA';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: ProjectCategory;
  link: string;
}

// ARRAYS DE DADOS (Certifique-se de que ele está aqui!)
const projects: Project[] = [
  {
    id: '1',
    title: 'PortlariArt',
    description: 'Portfólio minimalista focado em experiência do usuário e performance.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
    category: 'Frontend',
    link: 'https://github.com/larimscorrea',
  },
  {
    id: '2',
    title: 'IA Jurídica',
    description: 'Sistema inteligente para análise de dados e recomendação de processos.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80',
    category: 'IA',
    link: 'https://github.com/larimscorrea',
  },
  {
    id: '3',
    title: 'App Residência',
    description: 'Solução mobile desenvolvida para gestão de tarefas em tempo real.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80',
    category: 'Mobile',
    link: 'https://github.com/resenhandodirei',
  },
];

export default function ProjectCards({ activeFilter }: { activeFilter: ProjectCategory | 'Todos' }) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const data = projects || [];

  const filteredProjects = activeFilter === 'Todos' 
    ? data 
    : data.filter(p => p.category === activeFilter);

  const renderProject = (item: Project) => {
    // Calcula se deve ser 1 ou 2 colunas baseado na largura da tela (Web vs Mobile)
    const isMobile = width < 768;
    const cardStyle = isMobile ? styles.cardFull : styles.cardHalf;


    const router = useRouter();

    return (
      <View key={item.id} style={[styles.card, cardStyle, { 
        backgroundColor: theme.background, 
        borderColor: colorScheme === 'dark' ? '#333' : '#eee' 
      }]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={[styles.badge, { backgroundColor: theme.tint }]}>
            <Text style={styles.badgeText}>{item.category.toUpperCase()}</Text>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text numberOfLines={1} style={[styles.title, { color: theme.text }]}>{item.title}</Text>
          <Text numberOfLines={3} style={[styles.description, { color: theme.text }]}>
            {item.description}
          </Text>
          
          <TouchableOpacity 
            style={styles.readMore}
            //onPress={() => Linking.openURL(item.link)}
            onPress={() => router.push(`/project/${item.id}`)}
          >
            <Text style={[styles.readMoreText, { color: theme.tint }]}>VER PROJETO</Text>
            <Feather name="arrow-right" size={14} color={theme.tint} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.grid}>
      {filteredProjects && filteredProjects.length > 0 ? (
        filteredProjects.map(renderProject)
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.text }]}>
            Nenhum projeto encontrado em "{activeFilter}".
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 25,
    paddingVertical: 20,
    width: '100%',
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardFull: {
    width: '100%',
  },
  cardHalf: {
    width: '48.5%', 
  },
  imageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#000',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.6,
    marginBottom: 15,
    height: 54, 
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  readMoreText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  emptyContainer: {
    width: '100%',
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    opacity: 0.5,
    fontSize: 14,
    textAlign: 'center',
  }
});