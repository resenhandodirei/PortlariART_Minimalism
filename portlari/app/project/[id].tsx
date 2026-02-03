import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Dimensions, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const { width } = Dimensions.get('window');

export default function ProjectDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  // Dados Mock (Certifique-se de que os IDs batem com os do ProjectCards)
  const project = { 
    id: '1', 
    title: 'PortlariArt', 
    category: 'Frontend Development', 
    year: '2024',
    fullDescription: 'Uma exploração profunda sobre a intersecção entre performance técnica e estética minimalista. Este projeto foca em interfaces limpas e código otimizado.',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    ],
    link: 'https://github.com/larimscorrea'
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/'); // Volta para a home se não houver histórico
    }
  };

  return (
    <View style={[styles.main, { backgroundColor: theme.background }]}>
      <Navbar />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerSection}>
          {/* Botão Corrigido */}
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
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.galleryImage} />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>

        {/* Layout Lado a Lado (Content Grid) */}
        <View style={styles.contentGrid}>
          <View style={styles.descriptionColumn}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>_SOBRE</Text>
            <Text style={[styles.descriptionText, { color: theme.text }]}>
              {project.fullDescription}
            </Text>
          </View>

          <View style={styles.actionColumn}>
            <TouchableOpacity 
              style={[styles.primaryButton, { backgroundColor: theme.text }]}
              onPress={() => Linking.openURL(project.link)}
            >
              <Text style={[styles.buttonText, { color: theme.background }]}>GITHUB</Text>
              <Feather name="github" size={18} color={theme.background} />
            </TouchableOpacity>
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
  },
  contentGrid: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    flexDirection: width > 700 ? 'row' : 'column', // Lado a lado em telas maiores
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