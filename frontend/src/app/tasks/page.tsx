'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TaskList from '@/components/tasks/TaskList';
import { TaskStatus } from '@/types';

export default function TasksPage() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status');
  const [title, setTitle] = useState('All Tasks');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | undefined>(undefined);

  // Set title and status filter based on URL query parameter
  useEffect(() => {
    if (statusParam) {
      switch (statusParam) {
        case 'TODO':
          setTitle('To Do Tasks');
          setStatusFilter(TaskStatus.TODO);
          break;
        case 'IN_PROGRESS':
          setTitle('In Progress Tasks');
          setStatusFilter(TaskStatus.IN_PROGRESS);
          break;
        case 'COMPLETED':
          setTitle('Completed Tasks');
          setStatusFilter(TaskStatus.COMPLETED);
          break;
        default:
          setTitle('All Tasks');
          setStatusFilter(undefined);
      }
    } else {
      setTitle('All Tasks');
      setStatusFilter(undefined);
    }
  }, [statusParam]);

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <TaskList title={title} statusFilter={statusFilter} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
