import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export function EmptyState() {
  const iconColor = useThemeColor({ light: '#ccc', dark: '#555' }, 'icon');
  
  return (
    <View style={styles.container}>
      <IconSymbol name="checklist" size={80} color={iconColor} style={styles.icon} />
      <ThemedText style={styles.title}>No tasks yet</ThemedText>
      <ThemedText style={styles.subtitle}>Add some tasks to get started</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  }
});
