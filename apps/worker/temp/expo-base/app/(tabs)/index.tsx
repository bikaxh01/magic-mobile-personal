import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TodoInput } from '@/components/TodoInput';
import { TodoList } from '@/components/TodoList';
import { useTodos } from '@/hooks/useTodos';

export default function HomeScreen() {
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Todo List</ThemedText>
      </ThemedView>
      
      <TodoInput onAddTodo={addTodo} />
      
      <ThemedView style={styles.listContainer}>
        <TodoList 
          todos={todos} 
          onToggleTodo={toggleTodo} 
          onDeleteTodo={deleteTodo} 
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  listContainer: {
    flex: 1,
    minHeight: 300,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
