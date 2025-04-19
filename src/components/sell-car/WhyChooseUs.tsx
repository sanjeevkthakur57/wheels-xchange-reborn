
import React from 'react';
import { Card } from "@/components/ui/card";
import { Car, Calendar, MapPin } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-center mb-10">Why Sell with WheelsXchange?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Car className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Best Price Guarantee</h3>
          <p className="text-gray-600">We ensure you get the best value for your car based on its condition and market value.</p>
        </Card>
        
        <Card className="p-6 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Hassle-Free Process</h3>
          <p className="text-gray-600">From evaluation to payment, our experts handle everything, making the selling process smooth and efficient.</p>
        </Card>
        
        <Card className="p-6 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <MapPin className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Free Home Inspection</h3>
          <p className="text-gray-600">Our experts come to your location for a thorough inspection at no additional cost.</p>
        </Card>
      </div>
    </div>
  );
};

export default WhyChooseUs;
