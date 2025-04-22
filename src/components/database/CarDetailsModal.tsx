
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Car } from './CarListingTable'; // Reuse existing type

interface CarDetailsModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ car, isOpen, onClose }) => {
  if (!car) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Car Details: {car.make} {car.model}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Basic Information</h3>
            <p>Year: {car.year}</p>
            <p>Registration Number: {car.registrationNumber}</p>
          </div>
          <div>
            <h3 className="font-semibold">Seller Information</h3>
            <p>Name: {car.seller.name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status</h3>
            <Badge>{car.status}</Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailsModal;
