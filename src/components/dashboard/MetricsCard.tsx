import React from 'react';

interface MetricProps {
  name: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
}

export default function MetricsCard({
  metrics,
  title,
  subtitle,
  className = '',
}: {
  metrics: MetricProps[];
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`bg-white overflow-hidden rounded-lg shadow-card p-6 ${className}`}>
      {title && <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 overflow-hidden rounded-lg p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">{metric.name}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{metric.value}</dd>
            {metric.change && (
              <dd className="mt-2">
                <span 
                  className={`text-sm ${
                    metric.changeType === 'increase' ? 'text-green-600' : 
                    metric.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                  }`}
                >
                  {metric.change}
                </span>
              </dd>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Single metric card component for more flexible layouts
export function SingleMetricCard({ name, value, change, changeType = 'neutral', icon, className = '' }: MetricProps) {
  return (
    <div className={`bg-white overflow-hidden rounded-lg shadow-sm p-5 ${className}`}>
      <div className="flex justify-between">
        <dt className="text-sm font-medium text-gray-500 truncate">{name}</dt>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
      {change && (
        <dd className="mt-2">
          <span 
            className={`text-sm ${
              changeType === 'increase' ? 'text-green-600' : 
              changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            {change}
          </span>
        </dd>
      )}
    </div>
  );
}