import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '@/types/todo';

const STORAGE_KEY = 'todos_list';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.error('Failed to load todos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (error) {
        console.error('Failed to save todos:', error);
      }
    };

    if (!loading) {
      saveTodos();
    }
  }, [todos, loading]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return { todos, loading, addTodo, toggleTodo, deleteTodo };
};
