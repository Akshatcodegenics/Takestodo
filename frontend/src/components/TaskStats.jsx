import React, { useEffect, useMemo, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { getTaskStats } from '../services/tasks'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function TaskStats() {
  const [stats, setStats] = useState({ byStatus: { todo: 0, 'in-progress': 0, done: 0 }, total: 0 })

  useEffect(() => {
    getTaskStats().then(setStats).catch(() => {})
  }, [])

  const data = useMemo(() => ({
    labels: ['Todo', 'In Progress', 'Done'],
    datasets: [
      {
        label: 'Tasks',
        data: [stats.byStatus.todo || 0, stats.byStatus['in-progress'] || 0, stats.byStatus.done || 0],
        backgroundColor: ['#f59e0b', '#6366f1', '#10b981'],
        borderWidth: 0,
      },
    ],
  }), [stats])

  const options = {
    plugins: {
      legend: { labels: { color: '#e5e7eb' } },
    },
  }

  return (
    <div className="p-4 rounded border border-white/10 bg-white/10 backdrop-blur">
      <h3 className="text-lg font-medium mb-2">Task Status Overview</h3>
      <div className="max-w-xs">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}
