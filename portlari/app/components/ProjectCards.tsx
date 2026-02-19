import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/app/constants/theme';
import { useColorScheme } from '@/app/hooks/use-color-scheme';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Tipagem
export type ProjectCategory = 'FullStack' | 'Frontend' | 'Backend' | 'Fullstack' | 'Mobile' | 'IA';

interface Project {
  id: string;
  title: string;
  description: string;
  image: any;
  category: ProjectCategory;
  link: string;
}

// ARRAYS DE DADOS
const projects: Project[] = [
  {
    id: '1',
    title: 'PortLariArt',
    description: 'Portfólio minimalista focado em experiência do usuário e performance.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
    category: 'Frontend',
    link: 'https://github.com/resenhandodirei/portlari-minimalism',
  },
  {
    id: '4',
    title: 'ProJuven',
    description: 'Plataforma voltada para gestão e acompanhamento de demandas relacionadas à juventude, com foco em organização de dados e eficiência institucional.',
    image: require('@/app/assets/images/projuven.png'),
    category: 'FullStack',
    link: 'https://github.com/resenhandodirei/projuven',
  },
  {
    id: '5',
    title: 'FVConsultoria',
    description: 'Sistema web institucional desenvolvido para consultoria jurídica, com foco em apresentação profissional e captação estratégica de clientes.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80',
    category: 'Frontend',
    link: 'https://github.com/larimscorrea',
  },
  {
    id: '6',
    title: 'Portfólio Dandara da Luz',
    description: 'Website autoral para fotógrafa profissional, com foco em identidade visual, performance e experiência imersiva.',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=500&q=80',
    category: 'Frontend',
    link: 'https://github.com/larimscorrea',
  },
  {
    id: '7',
    title: 'JusExtractor',
    description: 'Ferramenta para extração e organização automatizada de dados jurídicos, estruturando informações para análise estratégica.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&q=80',
    category: 'IA',
    link: 'https://github.com/larimscorrea',
  },
  {
    id: '11',
    title: 'PetroCity',
    description: 'Aplicação mobile voltada para gestão e visualização estratégica de dados urbanos.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
    category: 'Mobile',
    link: 'https://github.com/larimscorrea',
  },
  {
    id: '13',
    title: 'HangmanGame (Python)',
    description: 'Jogo da forca desenvolvido em Python com foco em lógica de programação e manipulação de estruturas de dados.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80',
    category: 'Backend',
    link: 'https://github.com/larimscorrea',
  },
];

export default function ProjectCards({ activeFilter }: { activeFilter: ProjectCategory | 'Todos' }) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const router = useRouter();

  const filteredProjects = activeFilter === 'Todos' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const renderProject = (item: Project) => {
    const isMobile = width < 768;
    const cardStyle = isMobile ? styles.cardFull : styles.cardHalf;

    // Lógica para tratar a origem da imagem
    const imageSource = typeof item.image === 'string' 
      ? { uri: item.image } 
      : item.image;

    return (
      <View key={item.id} style={[styles.card, cardStyle, { 
        backgroundColor: theme.background, 
        borderColor: colorScheme === 'dark' ? '#333' : '#eee' 
      }]}>
        <View style={styles.imageContainer}>
          {/* CORREÇÃO: Usando a variável tratada imageSource */}
          <Image source={imageSource} style={styles.image} />
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
    backgroundColor: '#f0f0f0', // Cor de fundo caso a imagem demore
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