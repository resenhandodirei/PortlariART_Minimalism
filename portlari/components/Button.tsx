import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface Props {
  onAction: (type: 'about' | 'work') => void;
  activeSection: 'none' | 'about' | 'work';
}

export default function ActionButtons({ onAction, activeSection }: Props) {
    const themeKey = useColorScheme() ?? 'light';
    const theme = Colors[themeKey];
    
    return (
        <View style={styles.buttonGroup}>
            <TouchableOpacity 
                onPress={() => onAction('about')}
                style={[
                    styles.baseButton, 
                    activeSection === 'about' 
                        ? { backgroundColor: theme.tint, borderColor: theme.tint } 
                        : { backgroundColor: 'transparent', borderColor: theme.text }
                ]}>
              <Text style={[
                  styles.buttonText, 
                  { color: activeSection === 'about' ? '#000' : theme.text }
              ]}>
                SOBRE MIM
              </Text>
            </TouchableOpacity>
    
            <TouchableOpacity 
                onPress={() => onAction('work')}
                style={[
                    styles.baseButton, 
                    activeSection === 'work' 
                        ? { backgroundColor: theme.tint, borderColor: theme.tint } 
                        : { backgroundColor: 'transparent', borderColor: theme.text }
                ]}>
              <Text style={[
                  styles.buttonText, 
                  { color: activeSection === 'work' ? '#000' : theme.text }
              ]}>
                MEU TRABALHO
              </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonGroup: {
        flexDirection: 'row',
        marginTop: 30,
        gap: 15, 
    },
    baseButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderWidth: 2, 
        borderRadius: 0, 
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1,
    },
});