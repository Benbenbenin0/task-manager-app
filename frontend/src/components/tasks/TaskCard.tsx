import { useState } from 'react';
import { FiEdit2, FiTrash2, FiCheckCircle, FiClock, FiPlayCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { Task, TaskStatus } from '@/types';
import { useTaskStore } from '@/store/task.store';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const { deleteTask, updateTaskStatus } = useTaskStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get status badge color
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return 'bg-yellow-100 text-yellow-800';
      case TaskStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800';
      case TaskStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const StatusIcon = () => {
    switch (task.status) {
      case TaskStatus.TODO:
        return <FiClock className="h-5 w-5 text-yellow-500" />;
      case TaskStatus.IN_PROGRESS:
        return <FiPlayCircle className="h-5 w-5 text-blue-500" />;
      case TaskStatus.COMPLETED:
        return <FiCheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  // Handle delete task
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      const success = await deleteTask(task.id);
      setIsDeleting(false);
      
      if (success) {
        toast.success('Task deleted successfully');
      } else {
        toast.error('Failed to delete task');
      }
    }
  };

  // Handle status change
  const handleStatusChange = async (newStatus: TaskStatus) => {
    if (newStatus === task.status) return;
    
    setIsUpdating(true);
    const success = await updateTaskStatus(task.id, newStatus);
    setIsUpdating(false);
    
    if (success) {
      toast.success(`Task marked as ${newStatus.replace('_', ' ').toLowerCase()}`);
    } else {
      toast.error('Failed to update task status');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center">
            <StatusIcon />
            <h3 className="ml-2 text-lg font-medium text-gray-900">{task.title}</h3>
          </div>
          
          {task.description && (
            <p className="mt-1 text-gray-600">{task.description}</p>
          )}
          
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span className="mr-2">Due: {formatDate(task.dueDate)}</span>
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                task.status
              )}`}
            >
              {task.status.replace('_', ' ')}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-400 hover:text-gray-500"
            title="Edit task"
          >
            <FiEdit2 className="h-5 w-5" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-400 hover:text-red-500 disabled:opacity-50"
            title="Delete task"
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Status change buttons */}
      <div className="mt-4 flex justify-end space-x-2">
        {task.status !== TaskStatus.TODO && (
          <button
            onClick={() => handleStatusChange(TaskStatus.TODO)}
            disabled={isUpdating}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <FiClock className="mr-1" /> To Do
          </button>
        )}
        
        {task.status !== TaskStatus.IN_PROGRESS && (
          <button
            onClick={() => handleStatusChange(TaskStatus.IN_PROGRESS)}
            disabled={isUpdating}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <FiPlayCircle className="mr-1" /> In Progress
          </button>
        )}
        
        {task.status !== TaskStatus.COMPLETED && (
          <button
            onClick={() => handleStatusChange(TaskStatus.COMPLETED)}
            disabled={isUpdating}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <FiCheckCircle className="mr-1" /> Complete
          </button>
        )}
      </div>
    </div>
  );
}
