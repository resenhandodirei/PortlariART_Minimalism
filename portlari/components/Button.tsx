import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';


export default function Button() {
    const theme = useColorScheme();
    const themeKey = typeof theme === 'string' ? theme : 'light';
    return(
        <>
        <View style={styles.buttonGroup}>
            <TouchableOpacity style={[styles.ctaButton, { backgroundColor: Colors[themeKey]?.tint ?? '#000' }]}>
              <Text style={styles.ctaText}>MEU TRABALHO</Text>
            </TouchableOpacity>
    
            <TouchableOpacity style={[styles.secondaryButton, { borderBottomColor: Colors[themeKey]?.text ?? '#000' }]}>
              <Text style={[styles.secondaryText, { color: Colors[themeKey]?.text ?? '#000' }]}>SOBRE MIM</Text>
            </TouchableOpacity>
          </View>
          </>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        flexDirection: 'row',
        marginTop: 30,
        },
        ctaButton: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        marginRight: 15,
        },
        ctaText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
        },
        secondaryButton: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderBottomWidth: 2,
        },
        secondaryText: {
        fontSize: 16,
        fontWeight: '600',
        },
});