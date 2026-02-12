import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const formatCategoryName = (category) => {
  const categoryMap = {
    'ELECTRONICS': 'Electronics',
    'CLOTHING': 'Clothing',
    'FOOD': 'Food',
    'HOME_GARDEN': 'Home & Garden',
    'BEAUTY': 'Beauty',
    'SPORTS': 'Sports',
    'TOYS': 'Toys',
    'BOOKS': 'Books',
    'AUTOMOTIVE': 'Auto',
    'HEALTH': 'Health',
    'FURNITURE': 'Furniture',
    'OTHER': 'Other'
  };
  return categoryMap[category] || category;
};

export default function SpendingSummary({ categoryBreakdown, totalSpent }) {
  if (!categoryBreakdown || categoryBreakdown.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No spending data available
      </div>
    );
  }

  const sortedCategories = [...categoryBreakdown]
    .sort((a, b) => parseFloat(b.totalSpent) - parseFloat(a.totalSpent))
    .slice(0, 6);

  const data = {
    labels: sortedCategories.map(cat => formatCategoryName(cat.category)),
    datasets: [
      {
        label: 'Amount (₹)',
        data: sortedCategories.map(cat => parseFloat(cat.totalSpent)),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const cat = sortedCategories[context.dataIndex];
            return [
              `Amount: ₹${context.parsed.y.toFixed(2)}`,
              `Items: ${cat.itemCount}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: { size: 10 },
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => '₹' + value
        }
      }
    }
  };

  return (
    <div className="h-80">
      <Bar data={data} options={options} />
    </div>
  );
}
