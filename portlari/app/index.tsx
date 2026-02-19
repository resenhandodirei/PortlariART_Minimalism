import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/app/hooks/use-color-scheme';
import { Colors } from '@/app/constants/theme';
import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import ActionButtons from '@/app/components/Button'; 
import Footer from '@/app/components/Footer';
import Timeline from '@/app/components/Timeline';
import ProjectCards from '@/app/components/ProjectCards';


export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  
  const [activeSection, setActiveSection] = useState<'none' | 'about' | 'work'>('none');
  const [filter, setFilter] = useState<'Todos' | 'Frontend' | 'Backend' | 'Fullstack' | 'Mobile' | 'IA'>('Todos');

  const categories = ['Todos', 'FullStack', 'Frontend', 'Backend', 'Mobile', 'IA'] as const;

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
                  Sou desenvolvedora Fullstack e Mobile com foco em construir soluções que funcionam de verdade — rápidas, escaláveis e bem estruturadas. Trabalho com React, React Native, SwiftUI, TypeScript, Vue e Angular, sempre priorizando código limpo, organização e experiência do usuário.

                    Tenho experiência com backend utilizando Node.js, Prisma, TypeORM, PostgreSQL, MariaDB e MySQL, além de atuar com estilização moderna usando Tailwind, SASS e outras bibliotecas de UI. Gosto de transformar ideias em produtos reais, saindo do conceito até a entrega funcional.

                    Tenho forte interesse em dados e inteligência artificial, atualmente cursando pós-graduação em Big Data e IA, aprofundando meus conhecimentos em análise de dados, modelagem e aplicações inteligentes.

                    Estou em constante evolução, estudando arquitetura, mobile e boas práticas de desenvolvimento para construir soluções cada vez mais robustas e orientadas a dados.
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  
  },
  sectionTitle: { 
    fontSize: 22, 
    fontWeight: '900', 
    marginBottom: 15,
    letterSpacing: 1,
    marginRight: 'auto',
  },
  bioText: {
    fontSize: 16, 
    lineHeight: 24, 
    marginBottom: 20,
    opacity: 0.8,
  },
  dynamicArea: {
    minHeight: 400, 
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