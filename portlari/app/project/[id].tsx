import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/app/constants/theme';
import { useColorScheme } from '@/app/hooks/use-color-scheme';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const { width } = Dimensions.get('window');

type MediaItem =
  | { type: 'image'; source: any }
  | { type: 'youtube'; videoId: string };

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  fullDescription: string;
  media: MediaItem[];
  link: string;
}

export default function ProjectDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const flatListRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  const projects: Project[] = [
    {
      id: '1',
      title: 'PortlariArt',
      category: 'Frontend Development',
      year: '2024',
      fullDescription:
        'Uma exploração profunda sobre a intersecção entre performance técnica e estética minimalista.',
      media: [
        {
          type: 'image',
          source: {
            uri: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
          },
        },
      ],
      link: 'https://github.com/resenhandodirei/portlari-minimalism',
    },
    {
      id: '4',
      title: 'ProJuven',
      category: 'FullStack',
      year: '2024',
      fullDescription:
        'Plataforma completa para gestão de demandas juvenis com backend robusto e frontend intuitivo.',
      media: [
        {
          type: 'image',
          source: require('@/app/assets/images/projuven.png'),
        },
        {
          type: 'image',
          source: require('@/app/media/imagem1.png'),
        },
        {
          type: 'youtube',
          videoId: 'oIs1rdEnFos',
        },
      ],
      link: 'https://github.com/resenhandodirei/projuven',
    },
  ];

  const project = projects.find((p) => p.id === id);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  // Função para mudar o slide via seta
  const scrollTo = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < (project?.media.length || 0)) {
      flatListRef.current?.scrollToIndex({
        index: newIndex,
        animated: true,
      });
      setIndex(newIndex);
    }
  };

  if (!project) {
    return (
      <View
        style={[
          styles.main,
          { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text style={{ color: theme.text }}>Projeto não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.main, { backgroundColor: theme.background }]}>
      <Navbar />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <TouchableOpacity onPress={handleBack} style={styles.miniBack}>
            <Feather name="arrow-left" size={16} color={theme.text} />
            <Text style={[styles.miniBackText, { color: theme.text }]}>
              VOLTAR AOS PROJETOS
            </Text>
          </TouchableOpacity>

          <Text style={[styles.title, { color: theme.text }]}>{project.title}</Text>

          <View style={styles.metaRow}>
            <Text style={[styles.metaText, { color: theme.text }]}>
              {project.category}
            </Text>
            <View style={[styles.dot, { backgroundColor: theme.tint }]} />
            <Text style={[styles.metaText, { color: theme.text }]}>
              {project.year}
            </Text>
          </View>
        </View>

        {/* GALERIA */}
        <View style={styles.galleryContainer}>
          <FlatList
            ref={flatListRef}
            data={project.media}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            // Correção fundamental: ajuda o FlatList a saber as dimensões dos itens para scrollar
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setIndex(newIndex);
            }}
            renderItem={({ item }) => (
              <View style={styles.mediaItem}>
                {item.type === 'image' && (
                  <Image
                    source={item.source}
                    style={styles.media}
                    resizeMode="contain"
                  />
                )}

                {item.type === 'youtube' && (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      Linking.openURL(`https://youtu.be/${item.videoId}`)
                    }
                    style={styles.media}
                  >
                    <Image
                      source={{
                        uri: `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`,
                      }}
                      style={styles.media}
                    />
                    <View style={styles.playButton}>
                      <Text style={styles.playIcon}>▶</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          />

          {/* Seta Esquerda */}
          {index > 0 && (
            <TouchableOpacity
              style={styles.leftArrow}
              onPress={() => scrollTo(index - 1)}
            >
              <Feather name="chevron-left" size={24} color="#fff" />
            </TouchableOpacity>
          )}

          {/* Seta Direita */}
          {index < project.media.length - 1 && (
            <TouchableOpacity
              style={styles.rightArrow}
              onPress={() => scrollTo(index + 1)}
            >
              <Feather name="chevron-right" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.contentGrid}>
          <View style={styles.descriptionColumn}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              _SOBRE
            </Text>
            <Text style={[styles.descriptionText, { color: theme.text }]}>
              {project.fullDescription}
            </Text>
          </View>

          <View style={styles.actionColumn}>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: theme.text }]}
              onPress={() => Linking.openURL(project.link)}
            >
              <Text style={[styles.buttonText, { color: theme.background }]}>
                GITHUB
              </Text>
              <Feather name="github" size={18} color={theme.background} />
            </TouchableOpacity>
          </View>
        </View>

        <Footer />
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
    position: 'relative',
    height: 350, // Garante altura para as setas aparecerem corretamente
  },

  mediaItem: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },

  media: {
    width: width * 0.9,
    height: 350,
    borderRadius: 4,
  },

  playButton: {
    position: 'absolute',
    top: '40%',
    left: '42%', // Ajustado para centralizar melhor
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  playIcon: {
    color: '#fff',
    fontSize: 26,
  },

  leftArrow: {
    position: 'absolute',
    left: 20, // Ajustado para não ficar colado na borda
    top: '45%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10, // Garante que a seta fique acima do conteúdo
  },

  rightArrow: {
    position: 'absolute',
    right: 20, // Ajustado para não ficar colado na borda
    top: '45%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10, // Garante que a seta fique acima do conteúdo
  },

  contentGrid: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    flexDirection: width > 700 ? 'row' : 'column',
    gap: 40,
  },

  descriptionColumn: { flex: 2 },

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

  actionColumn: { flex: 1 },

  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },

  buttonText: {
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 1,
  },
});