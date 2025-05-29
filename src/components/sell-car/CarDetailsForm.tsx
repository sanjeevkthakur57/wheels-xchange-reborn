import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

interface CarDetailsFormProps {
  formData: any;
  handleChange: (field: string, value: string) => void;
  handleNext: () => void;
  makes: string[];
  years: string[];
  fuelTypes: string[];
  bodyTypes: string[];
  transmissions: string[];
  states: string[];
}

const CarDetailsForm = ({
  formData,
  handleChange,
  handleNext,
  makes,
  years,
  fuelTypes,
  bodyTypes,
  transmissions,
  states
}: CarDetailsFormProps) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
      <h2 className="text-xl font-semibold mb-6">Tell us about your car</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">Make <span className="text-red-500">*</span></label>
            <Select
              value={formData.make}
              onValueChange={(value) => handleChange('make', value)}
              required
            >
              <SelectTrigger id="make">
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {makes.map(make => (
                  <SelectItem key={make} value={make}>{make}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">Model <span className="text-red-500">*</span></label>
            <Input 
              id="model"
              placeholder="e.g., City, Creta"
              value={formData.model}
              onChange={(e) => handleChange('model', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year <span className="text-red-500">*</span></label>
            <Select
              value={formData.year}
              onValueChange={(value) => handleChange('year', value)}
              required
            >
              <SelectTrigger id="year">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="fuel" className="block text-sm font-medium text-gray-700 mb-1">Fuel Type <span className="text-red-500">*</span></label>
            <Select
              value={formData.fuel}
              onValueChange={(value) => handleChange('fuel', value)}
              required
            >
              <SelectTrigger id="fuel">
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                {fuelTypes.map(fuel => (
                  <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">Transmission <span className="text-red-500">*</span></label>
            <Select
              value={formData.transmission}
              onValueChange={(value) => handleChange('transmission', value)}
              required
            >
              <SelectTrigger id="transmission">
                <SelectValue placeholder="Select transmission" />
              </SelectTrigger>
              <SelectContent>
                {transmissions.map(transmission => (
                  <SelectItem key={transmission} value={transmission}>{transmission}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="bodyType" className="block text-sm font-medium text-gray-700 mb-1">Body Type <span className="text-red-500">*</span></label>
            <Select
              value={formData.bodyType}
              onValueChange={(value) => handleChange('bodyType', value)}
              required
            >
              <SelectTrigger id="bodyType">
                <SelectValue placeholder="Select body type" />
              </SelectTrigger>
              <SelectContent>
                {bodyTypes.map(body => (
                  <SelectItem key={body} value={body}>{body}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="variant" className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
            <Input 
              id="variant"
              placeholder="e.g., VXi, SX"
              value={formData.variant}
              onChange={(e) => handleChange('variant', e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="kilometers" className="block text-sm font-medium text-gray-700 mb-1">Kilometers Driven <span className="text-red-500">*</span></label>
            <Input 
              id="kilometers"
              type="number"
              placeholder="e.g., 25000"
              value={formData.kilometers}
              onChange={(e) => handleChange('kilometers', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Owners <span className="text-red-500">*</span></label>
            <RadioGroup
              defaultValue="1"
              value={formData.owners}
              onValueChange={(value) => handleChange('owners', value)}
            >
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="owner1" />
                  <Label htmlFor="owner1">1st</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="owner2" />
                  <Label htmlFor="owner2">2nd</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="owner3" />
                  <Label htmlFor="owner3">3rd</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4+" id="owner4" />
                  <Label htmlFor="owner4">4+</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <label htmlFor="registrationState" className="block text-sm font-medium text-gray-700 mb-1">Registration State <span className="text-red-500">*</span></label>
            <Select
              value={formData.registrationState}
              onValueChange={(value) => handleChange('registrationState', value)}
              required
            >
              <SelectTrigger id="registrationState">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {states.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">Registration Number <span className="text-red-500">*</span></label>
            <Input 
              id="registrationNumber"
              placeholder="e.g., MH01AB1234"
              value={formData.registrationNumber}
              onChange={(e) => handleChange('registrationNumber', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <Input 
              id="color"
              placeholder="e.g., White, Silver"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
            />
          </div>
        </div>
        
        {/* Insurance Section */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900">Insurance Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Status <span className="text-red-500">*</span></label>
            <RadioGroup
              defaultValue="yes"
              value={formData.insurance}
              onValueChange={(value) => handleChange('insurance', value)}
            >
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="insurance-yes" />
                  <Label htmlFor="insurance-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="insurance-no" />
                  <Label htmlFor="insurance-no">No</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          {formData.insurance === 'yes' && (
            <div>
              <label htmlFor="insuranceValidity" className="block text-sm font-medium text-gray-700 mb-1">Insurance Validity <span className="text-red-500">*</span></label>
              <Input 
                id="insuranceValidity"
                type="date"
                value={formData.insuranceValidity}
                onChange={(e) => handleChange('insuranceValidity', e.target.value)}
                required={formData.insurance === 'yes'}
              />
            </div>
          )}
        </div>
        
        {/* Price and Description */}
        <div className="grid grid-cols-1 gap-6 border-t pt-6">
          <div>
            <label htmlFor="expectedPrice" className="block text-sm font-medium text-gray-700 mb-1">Expected Price (₹) <span className="text-red-500">*</span></label>
            <Input 
              id="expectedPrice"
              type="number"
              placeholder="e.g., 500000"
              value={formData.expectedPrice}
              onChange={(e) => handleChange('expectedPrice', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Additional Description</label>
            <Textarea 
              id="description"
              placeholder="Describe any additional features, condition details, or special notes about your car..."
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={handleNext}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
          >
            Continue to Photos & Documents
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsForm;
