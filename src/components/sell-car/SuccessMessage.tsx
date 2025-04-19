
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock } from 'lucide-react';

const SuccessMessage = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Choosing WheelsXchange!</h2>
      <p className="text-gray-600 mb-8">
        Your car details have been submitted successfully. Our team will review your information and get back to you within 24 hours.
      </p>
      
      <div className="max-w-md mx-auto">
        <Card className="p-6 bg-blue-50 mb-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">What Happens Next?</h3>
          <ul className="space-y-4 text-left">
            {[
              { title: 'Car Evaluation', desc: 'Our experts will evaluate your car based on the details provided' },
              { title: 'Price Quote', desc: 'We\'ll provide you with the best possible price for your car' },
              { title: 'Car Inspection', desc: 'Schedule a convenient time for a thorough inspection of your car' },
              { title: 'Instant Payment', desc: 'Get paid instantly once the deal is finalized' }
            ].map((step, index) => (
              <li key={index} className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{step.title}</p>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Track Status
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default SuccessMessage;
