
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

interface Car {
  id: string;
  make: string;
  model: string;
  year: string;
  registrationNumber: string;
  sellerInfo: {
    name: string;
    phone: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'sold';
  createdAt: string;
}

interface CarListingTableProps {
  loading: boolean;
  searchTerm: string;
  statusFilter: string;
}

const CarListingTable = ({ loading, searchTerm, statusFilter }: CarListingTableProps) => {
  const { toast } = useToast();
  
  // Mock data - in a real app, this would come from your API
  const [cars, setCars] = useState<Car[]>([
    {
      id: '1',
      make: 'Honda',
      model: 'City',
      year: '2020',
      registrationNumber: 'MH01AB1234',
      sellerInfo: {
        name: 'John Doe',
        phone: '9876543210',
      },
      status: 'pending',
      createdAt: '2023-05-15T10:30:00',
    },
    {
      id: '2',
      make: 'Toyota',
      model: 'Fortuner',
      year: '2019',
      registrationNumber: 'DL01CD5678',
      sellerInfo: {
        name: 'Jane Smith',
        phone: '8765432109',
      },
      status: 'approved',
      createdAt: '2023-04-22T14:15:00',
    },
    {
      id: '3',
      make: 'Maruti Suzuki',
      model: 'Swift',
      year: '2021',
      registrationNumber: 'KA01EF9012',
      sellerInfo: {
        name: 'Robert Johnson',
        phone: '7654321098',
      },
      status: 'rejected',
      createdAt: '2023-06-05T09:45:00',
    },
    {
      id: '4',
      make: 'Hyundai',
      model: 'Creta',
      year: '2018',
      registrationNumber: 'TN01GH3456',
      sellerInfo: {
        name: 'Emily Williams',
        phone: '6543210987',
      },
      status: 'sold',
      createdAt: '2023-03-10T16:20:00',
    },
  ]);

  const handleDeleteCar = (id: string) => {
    setCars(cars.filter(car => car.id !== id));
    toast({
      title: "Car deleted",
      description: `Car listing with ID ${id} has been deleted.`,
    });
  };

  const handleUpdateStatus = (id: string, newStatus: 'pending' | 'approved' | 'rejected' | 'sold') => {
    setCars(cars.map(car => 
      car.id === id ? { ...car, status: newStatus } : car
    ));
    toast({
      title: "Status updated",
      description: `Car listing status has been updated to ${newStatus}.`,
    });
  };

  // Filter cars based on search term and status filter
  const filteredCars = cars.filter(car => {
    const matchesSearch = 
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.sellerInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || car.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Car Details</TableHead>
            <TableHead>Registration</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Listed On</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCars.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                No car listings found matching your criteria
              </TableCell>
            </TableRow>
          ) : (
            filteredCars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{car.make} {car.model}</div>
                    <div className="text-sm text-gray-500">{car.year}</div>
                  </div>
                </TableCell>
                <TableCell>{car.registrationNumber}</TableCell>
                <TableCell>
                  <div>
                    <div>{car.sellerInfo.name}</div>
                    <div className="text-sm text-gray-500">{car.sellerInfo.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(car.status)}>
                    {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(car.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="text-red-500"
                      onClick={() => handleDeleteCar(car.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CarListingTable;
