
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from 'lucide-react';
import { cars } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import CarDetailsModal from './CarDetailsModal';

export interface Car {
  _id: string;
  make: string;
  model: string;
  year: string;
  fuel: string;
  transmission: string;
  bodyType: string;
  kilometers: string;
  owners: string;
  registrationState: string;
  registrationNumber: string;
  expectedPrice: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status?: string;
  createdAt: string;
}

const CarListingTable = () => {
  const [carData, setCarData] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await cars.getAll();
      setCarData(response.cars || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast({
        title: "Error",
        description: "Failed to fetch car listings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await cars.delete(id);
      toast({
        title: "Success",
        description: "Car listing deleted successfully",
      });
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
      toast({
        title: "Error",
        description: "Failed to delete car listing",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: string = 'pending') => {
    const statusConfig = {
      pending: { label: 'Pending', variant: 'secondary' as const },
      approved: { label: 'Approved', variant: 'default' as const },
      rejected: { label: 'Rejected', variant: 'destructive' as const },
      sold: { label: 'Sold', variant: 'outline' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return <div className="text-center py-4">Loading car listings...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car Details</TableHead>
              <TableHead>Owner Info</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carData.map((car) => (
              <TableRow key={car._id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{car.make} {car.model}</div>
                    <div className="text-sm text-gray-500">
                      {car.year} • {car.fuel} • {car.kilometers} km
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{car.name}</div>
                    <div className="text-sm text-gray-500">{car.email}</div>
                  </div>
                </TableCell>
                <TableCell>₹{parseInt(car.expectedPrice).toLocaleString()}</TableCell>
                <TableCell>{getStatusBadge(car.status)}</TableCell>
                <TableCell>{new Date(car.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(car)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(car._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CarListingTable;
