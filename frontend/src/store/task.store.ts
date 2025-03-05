import { create } from 'zustand';
import { Task, TaskFormData, TaskStatus } from '@/types';
import * as taskService from '@/services/task.service';

interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  isLoading: boolean;
  error: string | null;
  
  // Task CRUD operations
  fetchTasks: (status?: string) => Promise<void>;
  fetchTaskById: (id: string) => Promise<void>;
  createTask: (taskData: TaskFormData) => Promise<boolean>;
  updateTask: (id: string, taskData: Partial<TaskFormData>) => Promise<boolean>;
  deleteTask: (id: string) => Promise<boolean>;
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<boolean>;
  
  // UI state management
  setCurrentTask: (task: Task | null) => void;
  clearError: () => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  currentTask: null,
  isLoading: false,
  error: null,

  fetchTasks: async (status) => {
    set({ isLoading: true, error: null });
    try {
      const response = await taskService.getTasks(status);
      
      if (response.error || !response.data) {
        set({ isLoading: false, error: response.error || 'Failed to fetch tasks' });
        return;
      }
      
      set({ tasks: response.data, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch tasks',
      });
    }
  },

  fetchTaskById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await taskService.getTaskById(id);
      
      if (response.error || !response.data) {
        set({ isLoading: false, error: response.error || 'Failed to fetch task' });
        return;
      }
      
      set({ currentTask: response.data, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch task',
      });
    }
  },

  createTask: async (taskData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await taskService.createTask(taskData);
      
      if (response.error || !response.data) {
        set({ isLoading: false, error: response.error || 'Failed to create task' });
        return false;
      }
      
      // Add the new task to the tasks array
      set((state) => ({
        tasks: [response.data!, ...state.tasks],
        isLoading: false,
      }));
      
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create task',
      });
      return false;
    }
  },

  updateTask: async (id, taskData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await taskService.updateTask(id, taskData);
      
      if (response.error || !response.data) {
        set({ isLoading: false, error: response.error || 'Failed to update task' });
        return false;
      }
      
      // Update the task in the tasks array
      set((state) => ({
        tasks: state.tasks.map((task) => 
          task.id === id ? response.data! : task
        ),
        currentTask: state.currentTask?.id === id ? response.data! : state.currentTask,
        isLoading: false,
      }));
      
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update task',
      });
      return false;
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await taskService.deleteTask(id);
      
      if (response.error) {
        set({ isLoading: false, error: response.error });
        return false;
      }
      
      // Remove the task from the tasks array
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        currentTask: state.currentTask?.id === id ? null : state.currentTask,
        isLoading: false,
      }));
      
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to delete task',
      });
      return false;
    }
  },

  updateTaskStatus: async (id, status) => {
    return get().updateTask(id, { status });
  },

  setCurrentTask: (task) => {
    set({ currentTask: task });
  },

  clearError: () => {
    set({ error: null });
  },
}));
