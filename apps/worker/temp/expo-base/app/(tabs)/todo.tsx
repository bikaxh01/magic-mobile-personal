import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { TodoItem } from '@/components/TodoItem';
import { AddTodo } from '@/components/AddTodo';
import { EmptyState } from '@/components/EmptyState';
import { useTodos } from '@/hooks/useTodos';

export default function TodoScreen() {
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos();
  const insets = useSafeAreaInsets();

  if (loading) {
    return (
      <ThemedView style={[styles.loadingContainer, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Todo List</ThemedText>
        <ThemedText style={styles.counter}>
          {todos.filter(todo => !todo.completed).length} remaining
        </ThemedText>
      </ThemedView>
      
      <AddTodo onAdd={addTodo} />
      
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem 
            todo={item} 
            onToggle={toggleTodo} 
            onDelete={deleteTodo} 
          />
        )}
        style={styles.list}
        contentContainerStyle={[
          styles.listContent,
          todos.length === 0 && styles.emptyList
        ]}
        ListEmptyComponent={EmptyState}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  counter: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyList: {
    flex: 1,
  }
});
