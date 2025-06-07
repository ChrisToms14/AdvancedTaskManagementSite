import { useState, useMemo } from 'react';
import { Todo, TodoFilters, TodoStats } from '../types/todo';
import { useLocalStorage } from './useLocalStorage';

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filters, setFilters] = useState<TodoFilters>({
    status: 'all',
    search: '',
  });

  const addTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date() }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    updateTodo(id, { completed: !todos.find(t => t.id === id)?.completed });
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      // Status filter
      if (filters.status === 'active' && todo.completed) return false;
      if (filters.status === 'completed' && !todo.completed) return false;

      // Priority filter
      if (filters.priority && todo.priority !== filters.priority) return false;

      // Category filter
      if (filters.category && todo.category !== filters.category) return false;

      // Search filter
      if (filters.search) {
        const search = filters.search.toLowerCase();
        const matchesTitle = todo.title.toLowerCase().includes(search);
        const matchesDescription = todo.description?.toLowerCase().includes(search);
        const matchesCategory = todo.category.toLowerCase().includes(search);
        if (!matchesTitle && !matchesDescription && !matchesCategory) return false;
      }

      return true;
    });
  }, [todos, filters]);

  const stats: TodoStats = useMemo(() => {
    const now = new Date();
    const overdue = todos.filter(
      todo => !todo.completed && todo.dueDate && new Date(todo.dueDate) < now
    ).length;

    const categories = todos.reduce((acc, todo) => {
      acc[todo.category] = (acc[todo.category] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      active: todos.filter(t => !t.completed).length,
      overdue,
      categories,
    };
  }, [todos]);

  const categories = useMemo(() => {
    return Array.from(new Set(todos.map(todo => todo.category))).filter(Boolean);
  }, [todos]);

  return {
    todos: filteredTodos,
    allTodos: todos,
    filters,
    setFilters,
    stats,
    categories,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
  };
}