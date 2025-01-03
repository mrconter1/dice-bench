'use client'

import { useState } from 'react'

type SystemData = {
  name: string
  accuracy: number
  tooltip: string
}

export function SortableTable() {
  const [sortConfig, setSortConfig] = useState<{
    key: 'name' | 'accuracy'
    direction: 'asc' | 'desc'
  }>({ key: 'accuracy', direction: 'desc' })

  const data: SystemData[] = [
    {
      name: 'Random Baseline',
      accuracy: 16.67,
      tooltip: 'Random guessing among the six possible outcomes'
    },
    {
      name: 'Human Performance',
      accuracy: 21.3,
      tooltip: 'Average accuracy from 10 human participants each predicting outcomes for 10 randomly selected videos'
    },
    {
      name: 'Gemini 1.5 Pro',
      accuracy: 19.8,
      tooltip: 'Performance of Google\'s Gemini 1.5 Pro model on the test set'
    },
    {
      name: 'GPT-4V',
      accuracy: 18.2,
      tooltip: 'Performance of OpenAI\'s GPT-4V model on the test set'
    }
  ]

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key === 'name') {
      return sortConfig.direction === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    } else {
      return sortConfig.direction === 'asc'
        ? a.accuracy - b.accuracy
        : b.accuracy - a.accuracy
    }
  })

  const requestSort = (key: 'name' | 'accuracy') => {
    setSortConfig(prevConfig => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === 'asc'
          ? 'desc'
          : 'asc'
    }))
  }

  return (
    <div className="border-2 rounded-xl p-8 bg-secondary/20 shadow-lg shadow-secondary/5">
      <table className="w-full">
        <thead>
          <tr>
            <th 
              className="text-left pb-4 text-primary font-bold cursor-pointer hover:text-accent transition-colors"
              onClick={() => requestSort('name')}
            >
              <div className="flex items-center gap-2">
                System
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={`text-primary/50 transition-transform ${
                    sortConfig.key === 'name' 
                      ? sortConfig.direction === 'asc' 
                        ? 'rotate-180' 
                        : ''
                      : ''
                  }`}
                >
                  <path d="m19 15-3 3-3-3"/>
                  <path d="M16 18V6"/>
                </svg>
              </div>
            </th>
            <th 
              className="text-right pb-4 text-primary font-bold cursor-pointer hover:text-accent transition-colors"
              onClick={() => requestSort('accuracy')}
            >
              <div className="flex items-center justify-end gap-2">
                Accuracy
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={`text-primary/50 transition-transform ${
                    sortConfig.key === 'accuracy' 
                      ? sortConfig.direction === 'asc' 
                        ? 'rotate-180' 
                        : ''
                      : ''
                  }`}
                >
                  <path d="m19 15-3 3-3-3"/>
                  <path d="M16 18V6"/>
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-secondary">
          {sortedData.map((item) => (
            <tr key={item.name}>
              <td className="py-4 group relative">
                <div className="flex items-center gap-2">
                  {item.name}
                  <div className="relative inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary/50 hover:text-accent cursor-help transition-colors"
                    >
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4"/>
                      <path d="M12 8h.01"/>
                    </svg>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-secondary/90 text-sm p-3 rounded-lg shadow-lg w-64 z-10 backdrop-blur-sm border border-secondary/50 transition-all duration-200">
                      {item.tooltip}
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-right font-mono text-accent">{item.accuracy.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 