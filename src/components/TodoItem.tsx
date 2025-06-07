import React, { useState } from 'react';
import { Check, Edit, Trash2, Calendar, Flag, Tag, Clock, AlertTriangle } from 'lucide-react';
import { Todo } from '../types/todo';
import { formatDate, isOverdue, isDueSoon, getPriorityColor, getCategoryColor } from '../utils/todoUtils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  categoryIndex: number;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete, categoryIndex }: TodoItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleEdit = () => {
    onEdit(todo);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(todo.id);
    }
  };

  const overdue = isOverdue(todo);
  const dueSoon = isDueSoon(todo);

  return (
    <div
      className={`group bg-white dark:bg-gray-800 rounded-xl border transition-all duration-200 hover:shadow-lg ${
        todo.completed
          ? 'border-gray-200 dark:border-gray-700 opacity-75'
          : overdue
          ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950'
          : dueSoon
          ? 'border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-950'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <button
            onClick={handleToggle}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              todo.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
            }`}
          >
            {todo.completed && <Check className="w-4 h-4" />}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3
                  className={`text-lg font-medium transition-all duration-200 ${
                    todo.completed
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {todo.title}
                </h3>
                
                {todo.description && (
                  <p
                    className={`mt-2 text-sm transition-all duration-200 ${
                      todo.completed
                        ? 'line-through text-gray-400 dark:text-gray-500'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {todo.description}
                  </p>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  {/* Priority */}
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${getPriorityColor(todo.priority)}`}>
                    <Flag className="w-3 h-3" />
                    {todo.priority}
                  </span>

                  {/* Category */}
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(categoryIndex)}`}>
                    <Tag className="w-3 h-3" />
                    {todo.category}
                  </span>

                  {/* Due Date */}
                  {todo.dueDate && (
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                        overdue
                          ? 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900'
                          : dueSoon
                          ? 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900'
                          : 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700'
                      }`}
                    >
                      {overdue ? (
                        <AlertTriangle className="w-3 h-3" />
                      ) : dueSoon ? (
                        <Clock className="w-3 h-3" />
                      ) : (
                        <Calendar className="w-3 h-3" />
                      )}
                      {formatDate(todo.dueDate)}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className={`flex items-center gap-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <button
                  onClick={handleEdit}
                  className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-all duration-200"
                  aria-label="Edit task"
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                <button
                  onClick={handleDelete}
                  className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-all duration-200"
                  aria-label="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}