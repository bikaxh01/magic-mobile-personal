import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const handleAddTodo = () => {
    if (text.trim()) {
      onAddTodo(text);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { backgroundColor, color: textColor }]}
        value={text}
        onChangeText={setText}
        placeholder="Add a new task..."
        placeholderTextColor={Colors.light.icon}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={handleAddTodo}
        activeOpacity={0.7}
      >
        <ThemedText style={styles.addButtonText}>Add</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#0a7ea4',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
