import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Todo } from '@/types/todo';
import { useThemeColor } from '@/hooks/useThemeColor';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <ThemedView style={styles.todoItem}>
      <TouchableOpacity 
        style={styles.checkbox} 
        onPress={() => onToggle(todo.id)}
      >
        <View style={[
          styles.checkboxInner, 
          todo.completed && { backgroundColor: '#0a7ea4' }
        ]} />
      </TouchableOpacity>
      
      <ThemedText 
        style={[
          styles.todoText, 
          todo.completed && styles.completedText
        ]}
      >
        {todo.text}
      </ThemedText>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
      >
        <ThemedText style={styles.deleteText}>Delete</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0a7ea4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: '500',
  }
});
