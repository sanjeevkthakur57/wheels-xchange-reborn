
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Car, Zap, BarChart2, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

interface DatabaseStatsProps {
  loading: boolean;
}

const DatabaseStats = ({ loading }: DatabaseStatsProps) => {
  // Mock data - in a real app, this would come from your API
  const stats = {
    totalCars: 247,
    pendingApproval: 32,
    approved: 178,
    rejected: 12,
    sold: 25,
    recentSales: [
      { month: 'Jan', count: 3 },
      { month: 'Feb', count: 5 },
      { month: 'Mar', count: 4 },
      { month: 'Apr', count: 6 },
      { month: 'May', count: 7 },
    ],
    popularMakes: [
      { make: 'Honda', percentage: 25 },
      { make: 'Toyota', percentage: 22 },
      { make: 'Maruti Suzuki', percentage: 18 },
      { make: 'Hyundai', percentage: 15 },
      { make: 'Tata', percentage: 10 },
    ]
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-8 w-36 mb-4" />
            <Skeleton className="h-12 w-28" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Total Listings</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Car className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold">{stats.totalCars}</span>
            <span className="ml-2 text-sm text-green-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              12%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Compared to last month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Pending Approval</h3>
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Zap className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold">{stats.pendingApproval}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Listings awaiting approval</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Approved</h3>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold">{stats.approved}</span>
            <span className="ml-2 text-sm text-green-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              8%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Active listings currently</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Sold</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart2 className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold">{stats.sold}</span>
            <span className="ml-2 text-sm text-red-500 flex items-center">
              <ArrowDown className="h-3 w-3 mr-1" />
              3%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Compared to last month</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Car Makes Distribution</h3>
          <div className="space-y-4">
            {stats.popularMakes.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{item.make}</span>
                  <span className="text-sm text-gray-500">{item.percentage}%</span>
                </div>
                <Progress value={item.percentage} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Status Distribution</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{Math.round((stats.approved / stats.totalCars) * 100)}%</div>
              <div className="text-sm text-gray-600 mt-1">Approved</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-yellow-600">{Math.round((stats.pendingApproval / stats.totalCars) * 100)}%</div>
              <div className="text-sm text-gray-600 mt-1">Pending</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-red-600">{Math.round((stats.rejected / stats.totalCars) * 100)}%</div>
              <div className="text-sm text-gray-600 mt-1">Rejected</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{Math.round((stats.sold / stats.totalCars) * 100)}%</div>
              <div className="text-sm text-gray-600 mt-1">Sold</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DatabaseStats;
