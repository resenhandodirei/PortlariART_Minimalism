import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { Colors } from '@/app/constants/theme';
import { useColorScheme } from '@/app/hooks/use-color-scheme';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function Contact() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const openLink = (url: string) => Linking.openURL(url);

  const ContactLink = ({ icon, label, subtext, url }: any) => {
    const [isPressed, setIsPressed] = useState(false);
    
    const activeColor = isPressed ? theme.tint : theme.text;
    const bgOpacity = isPressed ? theme.tint + '25' : (colorScheme === 'dark' ? '#f30092' : '#f5f5f5');

    return (
      <TouchableOpacity 
        style={styles.linkRow} 
        onPress={() => openLink(url)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        activeOpacity={1} 
      >
        <View style={[styles.iconCircle, { backgroundColor: bgOpacity }]}>
          <Feather name={icon} size={22} color={activeColor} />
        </View>
        <View style={styles.textColumn}>
          <Text style={[styles.linkLabel, { color: activeColor }]}>{label}</Text>
          <Text style={styles.linkValue}>{subtext}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
  
    <View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
      <Navbar />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.centerWrapper}>
          
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>Vamos conversar?</Text>
          </View>

          <Text style={[styles.description, { color: theme.text }]}>
            Seja para um projeto, uma ideia ou apenas um café virtual, estou sempre disponível para novas conexões.
          </Text>

          <View style={styles.linkList}>
            <ContactLink 
              icon="message-circle"
              label="WhatsApp"
              subtext="Disponível agora"
              url="https://wa.me/5585991984587"
            />
            <ContactLink 
              icon="mail"
              label="E-mail"
              subtext="Clique para enviar"
              url="mailto:larimscorrea@gmail.com"
            />
            <ContactLink 
              icon="linkedin"
              label="LinkedIn"
              subtext="Conexões profissionais"
              url="https://linkedin.com/in/resenhandodirei"
            />
          </View>
        </View>
        <View style={[styles.footerWrapper]}> 
          <Footer />
        </View>
      </ScrollView>

      
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  centerWrapper: {
    alignItems: 'center', 
    paddingHorizontal: 30,
    paddingTop: 60, 
    paddingBottom: 40,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: -1,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.5,
    marginBottom: 50,
    textAlign: 'center', 
    maxWidth: 500, 
  },
  linkList: {
    gap: 30,
    width: '100%',
    maxWidth: 260,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  textColumn: {
    marginLeft: 18,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  linkValue: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  footerWrapper: {
    marginTop: 'auto', 
    width: '100%',
    
  },
});