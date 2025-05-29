
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Car } from './CarListingTable';

interface CarDetailsModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

const CarDetailsModal = ({ car, isOpen, onClose }: CarDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{car.make} {car.model} - Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Car Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Car Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">Make:</span> {car.make}</div>
              <div><span className="font-medium">Model:</span> {car.model}</div>
              <div><span className="font-medium">Year:</span> {car.year}</div>
              <div><span className="font-medium">Fuel Type:</span> {car.fuel}</div>
              <div><span className="font-medium">Transmission:</span> {car.transmission}</div>
              <div><span className="font-medium">Body Type:</span> {car.bodyType}</div>
              <div><span className="font-medium">Kilometers:</span> {car.kilometers}</div>
              <div><span className="font-medium">Owners:</span> {car.owners}</div>
              <div><span className="font-medium">Registration State:</span> {car.registrationState}</div>
              <div><span className="font-medium">Registration Number:</span> {car.registrationNumber}</div>
            </div>
          </div>

          {/* Owner Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Owner Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">Name:</span> {car.name}</div>
              <div><span className="font-medium">Email:</span> {car.email}</div>
              <div><span className="font-medium">Phone:</span> {car.phone}</div>
              <div><span className="font-medium">City:</span> {car.city}</div>
            </div>
          </div>

          {/* Price and Status */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Listing Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">Expected Price:</span> ₹{parseInt(car.expectedPrice).toLocaleString()}</div>
              <div>
                <span className="font-medium">Status:</span> 
                <Badge className="ml-2" variant={car.status === 'approved' ? 'default' : car.status === 'rejected' ? 'destructive' : 'secondary'}>
                  {car.status || 'Pending'}
                </Badge>
              </div>
              <div><span className="font-medium">Listed Date:</span> {new Date(car.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailsModal;
