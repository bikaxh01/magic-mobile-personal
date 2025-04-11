import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { TodoItem } from './TodoItem';
import { ThemedText } from './ThemedText';
import { Todo } from '@/types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggleTodo, 
  onDeleteTodo 
}) => {
  if (todos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>No tasks yet. Add one!</ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      )}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    opacity: 0.6,
  }
});
