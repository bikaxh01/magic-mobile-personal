import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, FlatList, Platform } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TodoItem } from '@/components/TodoItem';
import { useTodos } from '@/hooks/useTodos';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TodoApp() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [text, setText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const handleAddTodo = () => {
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Todo App</ThemedText>
      hello world
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAddTodo}
        />
        <TouchableOpacity onPress={handleAddTodo} style={styles.addButton}>
          <IconSymbol name="chevron.right" size={24} color="#FFF" />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]} 
          onPress={() => setFilter('all')}
        >
          <ThemedText style={filter === 'all' ? styles.activeFilterText : styles.filterText}>All</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'active' && styles.activeFilter]} 
          onPress={() => setFilter('active')}
        >
          <ThemedText style={filter === 'active' ? styles.activeFilterText : styles.filterText}>Active</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'completed' && styles.activeFilter]} 
          onPress={() => setFilter('completed')}
        >
          <ThemedText style={filter === 'completed' ? styles.activeFilterText : styles.filterText}>Completed</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.listContainer}>
        <FlatList
          data={filteredTodos}
          renderItem={({ item }) => (
            <TodoItem 
              todo={item} 
              onToggle={() => toggleTodo(item.id)} 
              onDelete={() => deleteTodo(item.id)} 
            />
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <ThemedView style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>No tasks found</ThemedText>
            </ThemedView>
          }
        />
      </ThemedView>

      <ThemedView style={styles.footer}>
        <ThemedText>{activeTodosCount} tasks left</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#0a7ea4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeFilter: {
    backgroundColor: '#0a7ea4',
  },
  filterText: {
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
  },
  listContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});
