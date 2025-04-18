
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';

const CarSearch = () => {
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    priceRange: [0, 5000000],
    year: '',
    fuel: '',
    bodyType: '',
    transmission: ''
  });

  const handlePriceChange = (value: number[]) => {
    setFilters({ ...filters, priceRange: value });
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    // In a real app, this would construct a query string based on filters
    const params = new URLSearchParams();
    
    if (filters.make) params.append('make', filters.make);
    if (filters.model) params.append('model', filters.model);
    if (filters.year) params.append('year', filters.year);
    if (filters.fuel) params.append('fuel', filters.fuel);
    if (filters.bodyType) params.append('bodyType', filters.bodyType);
    if (filters.transmission) params.append('transmission', filters.transmission);
    
    params.append('minPrice', filters.priceRange[0].toString());
    params.append('maxPrice', filters.priceRange[1].toString());
    
    navigate(`/buy-car?${params.toString()}`);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Mock data for dropdowns
  const makes = ['Honda', 'Toyota', 'Hyundai', 'Maruti Suzuki', 'Tata', 'Mahindra', 'Ford'];
  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString());
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon'];
  const transmissions = ['Automatic', 'Manual', 'Semi-Automatic', 'CVT'];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 -mt-16 relative z-10 mx-4 lg:mx-auto max-w-5xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Find Your Perfect Car</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">Make</label>
          <Select onValueChange={(value) => handleFilterChange('make', value)}>
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
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">Model</label>
          <Input 
            id="model" 
            placeholder="Any model" 
            onChange={(e) => handleFilterChange('model', e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <Select onValueChange={(value) => handleFilterChange('year', value)}>
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
          <label htmlFor="fuel" className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
          <Select onValueChange={(value) => handleFilterChange('fuel', value)}>
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
          <label htmlFor="bodyType" className="block text-sm font-medium text-gray-700 mb-1">Body Type</label>
          <Select onValueChange={(value) => handleFilterChange('bodyType', value)}>
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
          <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
          <Select onValueChange={(value) => handleFilterChange('transmission', value)}>
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
      </div>
      
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}</label>
        <Slider
          defaultValue={[0, 5000000]}
          max={10000000}
          step={100000}
          onValueChange={handlePriceChange}
          className="my-4"
        />
      </div>
      
      <div className="mt-6 flex justify-center">
        <Button 
          onClick={handleSearch}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-6"
        >
          Search Cars
        </Button>
      </div>
    </div>
  );
};

export default CarSearch;
