import { ApiResponse, Task, TaskFormData, TaskStatus } from '@/types';
import { apiRequest } from './api';

/**
 * Get all tasks for the current user
 * @param status Optional filter by task status
 * @returns API response with array of tasks
 */
export const getTasks = async (status?: string): Promise<ApiResponse<Task[]>> => {
  return apiRequest<Task[]>({
    method: 'GET',
    url: '/tasks',
    params: status ? { status } : undefined,
  });
};

/**
 * Get a single task by ID
 * @param id Task ID
 * @returns API response with task data
 */
export const getTaskById = async (id: string): Promise<ApiResponse<Task>> => {
  return apiRequest<Task>({
    method: 'GET',
    url: `/tasks/${id}`,
  });
};

/**
 * Create a new task
 * @param taskData Task data
 * @returns API response with created task
 */
export const createTask = async (taskData: TaskFormData): Promise<ApiResponse<Task>> => {
  return apiRequest<Task>({
    method: 'POST',
    url: '/tasks',
    data: taskData,
  });
};

/**
 * Update an existing task
 * @param id Task ID
 * @param taskData Task data to update
 * @returns API response with updated task
 */
export const updateTask = async (
  id: string,
  taskData: Partial<TaskFormData>
): Promise<ApiResponse<Task>> => {
  return apiRequest<Task>({
    method: 'PUT',
    url: `/tasks/${id}`,
    data: taskData,
  });
};

/**
 * Delete a task
 * @param id Task ID
 * @returns API response with success message
 */
export const deleteTask = async (id: string): Promise<ApiResponse<{ message: string }>> => {
  return apiRequest<{ message: string }>({
    method: 'DELETE',
    url: `/tasks/${id}`,
  });
};

/**
 * Update task status
 * @param id Task ID
 * @param status New task status
 * @returns API response with updated task
 */
export const updateTaskStatus = async (
  id: string,
  status: TaskStatus
): Promise<ApiResponse<Task>> => {
  return updateTask(id, { status });
};
