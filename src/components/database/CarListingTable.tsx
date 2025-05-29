
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from 'lucide-react';
import CarDetailsModal from './CarDetailsModal';

export interface Car {
  _id: string;
  make: string;
  model: string;
  year: string;
  fuel: string;
  transmission: string;
  bodyType: string;
  variant?: string;
  kilometers: string;
  owners: string;
  registrationState: string;
  registrationNumber: string;
  color?: string;
  insurance: string;
  insuranceValidity?: string;
  expectedPrice: string;
  description?: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status?: 'pending' | 'approved' | 'rejected' | 'sold';
  createdAt: string;
}

interface CarListingTableProps {
  searchTerm: string;
  statusFilter: string;
  loading: boolean;
}

const CarListingTable = ({ searchTerm, statusFilter, loading }: CarListingTableProps) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Mock data for now - replace with actual API call
  const mockCars: Car[] = [
    {
      _id: '1',
      make: 'Honda',
      model: 'City',
      year: '2020',
      fuel: 'Petrol',
      transmission: 'Manual',
      bodyType: 'Sedan',
      kilometers: '25000',
      owners: '1',
      registrationState: 'Maharashtra',
      registrationNumber: 'MH12AB1234',
      insurance: 'yes',
      expectedPrice: '800000',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      city: 'Mumbai',
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  ];

  const filteredCars = mockCars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const handleDelete = (carId: string) => {
    setCars(cars.filter(car => car._id !== carId));
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car Details</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCars.map((car) => (
              <TableRow key={car._id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{car.make} {car.model}</div>
                    <div className="text-sm text-gray-500">{car.year} • {car.fuel} • {car.kilometers} km</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{car.name}</div>
                    <div className="text-sm text-gray-500">{car.city}</div>
                  </div>
                </TableCell>
                <TableCell>₹{parseInt(car.expectedPrice).toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={car.status === 'approved' ? 'default' : car.status === 'rejected' ? 'destructive' : 'secondary'}>
                    {car.status || 'Pending'}
                  </Badge>
                </TableCell>
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
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default CarListingTable;
