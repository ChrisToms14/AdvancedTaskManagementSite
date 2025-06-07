import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { Todo } from '../types/todo';
import { useTodos } from '../hooks/useTodos';
import { ThemeToggle } from './ThemeToggle';
import { TodoStats } from './TodoStats';
import { TodoFilters } from './TodoFilters';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';

export function TodoApp() {
  const {
    todos,
    allTodos,
    filters,
    setFilters,
    stats,
    categories,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
  } = useTodos();

  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();

  const handleAddTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, todoData);
      setEditingTodo(undefined);
    } else {
      addTodo(todoData);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(undefined);
  };

  const hasCompleted = allTodos.some(todo => todo.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                TaskFlow
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Organize your life, one task at a time
              </p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        {/* Stats */}
        <TodoStats stats={stats} />

        {/* Filters */}
        <TodoFilters
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
          onClearCompleted={clearCompleted}
          hasCompleted={hasCompleted}
        />

        {/* Add/Edit Todo Form */}
        <TodoForm
          onSubmit={handleAddTodo}
          editingTodo={editingTodo}
          onCancel={handleCancelEdit}
          categories={categories}
        />

        {/* Todo List */}
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onEdit={handleEditTodo}
          onDelete={deleteTodo}
          categories={categories}
        />

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}