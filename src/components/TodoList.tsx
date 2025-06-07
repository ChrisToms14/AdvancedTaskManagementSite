import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  categories: string[];
}

export function TodoList({ todos, onToggle, onEdit, onDelete, categories }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No tasks found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Create your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => {
        const categoryIndex = categories.indexOf(todo.category);
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            categoryIndex={categoryIndex >= 0 ? categoryIndex : 0}
          />
        );
      })}
    </div>
  );
}