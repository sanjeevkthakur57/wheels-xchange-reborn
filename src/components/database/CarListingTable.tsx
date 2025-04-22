import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { cars } from '@/services/api';  // Import the cars service

interface Car {
  _id: string;
  make: string;
  model: string;
  year: string;
  registrationNumber: string;
  seller: {
    name: string;
    // Add phone if available in your User model
  };
  status: 'pending' | 'approved' | 'rejected' | 'sold';
  createdAt: string;
}

interface CarListingTableProps {
  searchTerm: string;
  statusFilter: string;
}

const CarListingTable = ({ searchTerm, statusFilter }: CarListingTableProps) => {
  const { toast } = useToast();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const fetchedCars = await cars.getAll();
        setCars(fetchedCars);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cars');
        setLoading(false);
        toast({
          title: 'Error',
          description: 'Unable to fetch car listings',
          variant: 'destructive'
        });
      }
    };

    fetchCars();
  }, []);

  const handleDeleteCar = async (id: string) => {
    try {
      await cars.delete(id);  // Add delete method to cars service
      setCars(cars.filter(car => car._id !== id));
      toast({
        title: "Car deleted",
        description: `Car listing has been deleted.`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete car listing",
        variant: 'destructive'
      });
    }
  };

  // Filtering logic stays the same as in the previous implementation
  const filteredCars = cars.filter(car => {
    const matchesSearch = 
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
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
              <TableRow key={car._id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{car.make} {car.model}</div>
                    <div className="text-sm text-gray-500">{car.year}</div>
                  </div>
                </TableCell>
                <TableCell>{car.registrationNumber}</TableCell>
                <TableCell>
                  <div>
                    <div>{car.seller.name}</div>
                    {/* <div className="text-sm text-gray-500">{car.sellerInfo.phone}</div> */}
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
                      onClick={() => handleDeleteCar(car._id)}
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
