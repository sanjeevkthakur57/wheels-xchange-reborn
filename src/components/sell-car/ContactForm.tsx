
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContactFormProps {
  formData: any;
  handleChange: (field: string, value: string) => void;
  handleBack: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  cities: string[];
}

const ContactForm = ({
  formData,
  handleChange,
  handleBack,
  handleSubmit,
  cities
}: ContactFormProps) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
      <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
            <Input 
              id="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
            <Input 
              id="email"
              type="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
            <Input 
              id="phone"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
            <Select
              value={formData.city}
              onValueChange={(value) => handleChange('city', value)}
              required
            >
              <SelectTrigger id="city">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="pt-6 space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              By submitting this form, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button 
              type="button"
              variant="outline" 
              onClick={handleBack}
            >
              Back
            </Button>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Submit Car Details
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
