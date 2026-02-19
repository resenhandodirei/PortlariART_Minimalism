import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Dimensions, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/app/constants/theme';
import { useColorScheme } from '@/app/hooks/use-color-scheme';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
//import ProjuvenVideo from '@/assets/media/Projuven.mp4';
//import video from "../media/Projuven.mp4"


const { width } = Dimensions.get('window');

// 1. Definição da Interface
interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description?: string;
  fullDescription: string;
  images: any[]; // Array que aceita strings ou require
  video?: string;
  link: string;
}

export default function ProjectDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  // 2. Dados Mock (Sugestão: Mova para um arquivo constants/projects.ts no futuro)
  const projects: Project[] = [
    {
      id: '1',
      title: 'PortlariArt',
      category: 'Frontend Development',
      year: '2024',
      fullDescription: 'Uma exploração profunda sobre a intersecção entre performance técnica e estética minimalista. Este projeto foca em interfaces limpas e código otimizado.',
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      ],
      video: '',
      link: 'https://github.com/resenhandodirei/portlari-minimalism',
    },
    {
      id: '4', // Ajustado para '4' para bater com o ID do seu ProjectCards
      title: 'ProJuven',
      category: 'FullStack',
      year: '2024',
      fullDescription: 'Desenvolvimento de uma plataforma completa para gestão de demandas juvenis, integrando backend robusto e frontend intuitivo, com foco em eficiência e organização de dados.',
      images: [
        require('@/app/assets/images/projuven.png'),
      ],
      video: '/media/Projuven.mp4',
      link: 'https://github.com/resenhandodirei/projuven',
    }
  ];

  // 3. Busca o projeto específico pelo ID da URL
  const project = projects.find((p) => p.id === id);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  // Se o projeto não for encontrado
  if (!project) {
    return (
      <View style={[styles.main, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: theme.text }}>Projeto não encontrado.</Text>
        <TouchableOpacity onPress={handleBack} style={{ marginTop: 20 }}>
          <Text style={{ color: theme.tint }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.main, { backgroundColor: theme.background }]}>
      <Navbar />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerSection}>
          <TouchableOpacity onPress={handleBack} style={styles.miniBack} activeOpacity={0.7}>
            <Feather name="arrow-left" size={16} color={theme.text} />
            <Text style={[styles.miniBackText, { color: theme.text }]}>VOLTAR AOS PROJETOS</Text>
          </TouchableOpacity>

          <Text style={[styles.title, { color: theme.text }]}>{project.title}</Text>
          
          <View style={styles.metaRow}>
            <Text style={[styles.metaText, { color: theme.text }]}>{project.category}</Text>
            <View style={[styles.dot, { backgroundColor: theme.tint }]} />
            <Text style={[styles.metaText, { color: theme.text }]}>{project.year}</Text>
          </View>
        </View>

        <View style={styles.galleryContainer}>
          <FlatList
            data={project.images}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.galleryList}
            snapToAlignment="center"
            decelerationRate="fast"
            snapToInterval={width * 0.8 + 15}
            renderItem={({ item }) => {
              // Lógica de imagem corrigida (uri vs require)
              const source = typeof item === 'string' ? { uri: item } : item;
              return <Image source={source} style={styles.galleryImage} />;
            }}
            keyExtractor={(_, index) => index.toString()}
          />

          {project.video && (
            <View style={{ paddingHorizontal: 24, marginTop: 20 }}>
                <Video
                source={typeof project.video === 'string' ? { uri: project.video } : project.video}
                style={{
                    width: '100%',
                    height: 300,
                    borderRadius: 4,
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                />
  </View>
)}

        </View>

        

        <View style={styles.contentGrid}>
          <View style={styles.descriptionColumn}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>_SOBRE</Text>
            <Text style={[styles.descriptionText, { color: theme.text }]}>
              {project.fullDescription}
            </Text>
          </View>

          <View style={styles.actionColumn}>
            {project.link ? (
              <TouchableOpacity 
                style={[styles.primaryButton, { backgroundColor: theme.text }]}
                onPress={() => Linking.openURL(project.link)}
              >
                <Text style={[styles.buttonText, { color: theme.background }]}>GITHUB</Text>
                <Feather name="github" size={18} color={theme.background} />
              </TouchableOpacity>
            ) : (
              <Text style={[styles.metaText, { color: theme.text, opacity: 0.3 }]}>Link indisponível</Text>
            )}
          </View>
        </View>

        <View style={styles.footerWrapper}>
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 30,
    marginBottom: 30,
  },
  miniBack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  miniBackText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    fontSize: 42,
    fontWeight: '200',
    letterSpacing: -2,
    marginBottom: 5,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    opacity: 0.5,
  },
  metaText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  galleryContainer: {
    marginVertical: 20,
  },
  galleryList: {
    paddingHorizontal: 24,
    gap: 15,
  },
  galleryImage: {
    width: width * 0.8,
    height: 300,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  contentGrid: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    flexDirection: width > 700 ? 'row' : 'column',
    gap: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.1)',
    marginTop: 20,
  },
  descriptionColumn: {
    flex: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 15,
    opacity: 0.3,
  },
  descriptionText: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '300',
  },
  actionColumn: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    gap: 10,
    width: '100%',
  },
  buttonText: {
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 1,
  },
  footerWrapper: {
    marginTop: 'auto',
    width: '100%',
  },
});