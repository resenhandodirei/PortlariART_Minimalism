import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ActionButtons from '@/components/Button'; 
import Footer from '@/components/Footer';
import Timeline from '@/components/Timeline';
import ProjectCards from '@/components/ProjectCards';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  
  const [activeSection, setActiveSection] = useState<'none' | 'about' | 'work'>('none');
  const [filter, setFilter] = useState<'Todos' | 'Frontend' | 'Backend' | 'Fullstack' | 'Mobile' | 'IA'>('Todos');

  const categories = ['Todos', 'Frontend', 'Backend', 'Mobile', 'IA'] as const;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Navbar />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.centerWrapper}>
          <Hero />        
        
          <ActionButtons 
            onAction={(section: any) => setActiveSection(section)} 
            activeSection={activeSection} 
          />

          <View style={styles.dynamicArea}>
            {/* SEÇÃO SOBRE MIM */}
            {activeSection === 'about' && (
              <View style={styles.sectionContainer}>
                <Text style={[styles.sectionTitle, { color: theme.tint }]}>_SOBRE_MIM</Text>
                <Text style={[styles.bioText, { color: theme.text }]}>
                  Engenheiro de Software focado em criar sistemas robustos com estética minimalista. 
                  Especialista em ecossistemas JavaScript e Inteligência Artificial.
                </Text>
                <Timeline />
              </View>
            )}

            {/* SEÇÃO TRABALHOS */}
            {activeSection === 'work' && (
              <View style={styles.sectionContainer}>
                <Text style={[styles.sectionTitle, { color: theme.tint }]}>_PROJETOS</Text>
                
                <View style={styles.filterBar}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
                    {categories.map((cat) => (
                      <TouchableOpacity 
                        key={cat} 
                        onPress={() => setFilter(cat)}
                        style={[
                          styles.filterTab, 
                          { borderColor: filter === cat ? theme.tint : theme.text + '40' }
                        ]}
                      >
                        <Text style={[
                          styles.filterText, 
                          { 
                            color: filter === cat ? theme.tint : theme.text, 
                            fontWeight: filter === cat ? '700' : '400' 
                          }
                        ]}>
                          {cat}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <ProjectCards activeFilter={filter} />
              </View>
            )}
          </View>
        </View>

        <View style={styles.footerWrapper}>
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { 
    flexGrow: 1 
  },
  centerWrapper: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  sectionContainer: { 
    marginTop: 30, 
    width: '100%',
    maxWidth: 800, 
  },
  sectionTitle: { 
    fontSize: 22, 
    fontWeight: '900', 
    marginBottom: 15,
    letterSpacing: 1,
  },
  bioText: {
    fontSize: 16, 
    lineHeight: 24, 
    marginBottom: 20,
    opacity: 0.8,
  },
  dynamicArea: {
    width: '100%',
    minHeight: 300, 
  },
  filterBar: {
    flexDirection: 'row',
    marginBottom: 25,
    paddingVertical: 5,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 13,
    textTransform: 'uppercase',
  },
  footerWrapper: {
    marginTop: 'auto',
    width: '100%',
  },
});