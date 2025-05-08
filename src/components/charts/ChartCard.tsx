import React from 'react';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';

type ChartType = 'line' | 'bar' | 'doughnut' | 'pie';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  chartType: ChartType;
  data: any;
  options?: any;
  height?: string;
  className?: string;
}

export default function ChartCard({
  title,
  subtitle,
  chartType,
  data,
  options = {},
  height = 'h-60',
  className = '',
}: ChartCardProps) {
  // Default chart options
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  // Merge default options with provided options
  const chartOptions = { ...defaultOptions, ...options };

  // Render the appropriate chart based on chartType
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={data} options={chartOptions} />;
      case 'bar':
        return <Bar data={data} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={data} options={chartOptions} />;
      case 'pie':
        return <Pie data={data} options={chartOptions} />;
      default:
        return <Line data={data} options={chartOptions} />;
    }
  };

  return (
    <div className={`bg-white overflow-hidden rounded-lg shadow-card p-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      <div className={`mt-6 ${height}`}>
        {renderChart()}
      </div>
    </div>
  );
}