import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Filter, Sliders, ChevronDown, ChevronUp, Grid3X3, List } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Car {
  id: string;
  title: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  location: string;
  image: string;
  featured: boolean;
  category: string;
  make: string;
  model: string;
  bodyType: string;
  owners: number;
  description: string;
}

// Mock data for demonstration
const mockCars: Car[] = [
  {
    id: '1',
    title: 'Honda City ZX',
    year: 2021,
    price: 1200000,
    mileage: 15000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: true,
    category: 'sedan',
    make: 'Honda',
    model: 'City',
    bodyType: 'Sedan',
    owners: 1,
    description: 'Well-maintained Honda City with all service records. Single owner, non-smoker vehicle with no accidents.'
  },
  {
    id: '2',
    title: 'Hyundai Creta SX',
    year: 2020,
    price: 1450000,
    mileage: 22000,
    fuel: 'Diesel',
    transmission: 'Manual',
    location: 'Delhi',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: true,
    category: 'suv',
    make: 'Hyundai',
    model: 'Creta',
    bodyType: 'SUV',
    owners: 1,
    description: 'Feature-packed Hyundai Creta in excellent condition. All terrain capabilities with premium interior features.'
  },
  {
    id: '3',
    title: 'Maruti Swift VXI',
    year: 2022,
    price: 750000,
    mileage: 8000,
    fuel: 'Petrol',
    transmission: 'Manual',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    featured: true,
    category: 'hatchback',
    make: 'Maruti Suzuki',
    model: 'Swift',
    bodyType: 'Hatchback',
    owners: 1,
    description: 'Sporty Swift with excellent fuel efficiency. Perfect city car with low maintenance costs.'
  },
  {
    id: '4',
    title: 'Toyota Fortuner 4x4',
    year: 2019,
    price: 3500000,
    mileage: 45000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    location: 'Chennai',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80',
    featured: true,
    category: 'suv',
    make: 'Toyota',
    model: 'Fortuner',
    bodyType: 'SUV',
    owners: 2,
    description: 'Powerful Fortuner with 4x4 capability. Perfect for adventures and long drives with exceptional comfort.'
  },
  {
    id: '5',
    title: 'Mercedes-Benz C-Class',
    year: 2020,
    price: 4500000,
    mileage: 18000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    location: 'Delhi',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: true,
    category: 'luxury',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    bodyType: 'Sedan',
    owners: 1,
    description: 'Luxurious Mercedes C-Class with premium features. Excellent condition with low mileage.'
  },
  {
    id: '6',
    title: 'Maruti Baleno Alpha',
    year: 2021,
    price: 850000,
    mileage: 12000,
    fuel: 'Petrol',
    transmission: 'Manual',
    location: 'Pune',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: true,
    category: 'hatchback',
    make: 'Maruti Suzuki',
    model: 'Baleno',
    bodyType: 'Hatchback',
    owners: 1,
    description: 'Spacious Baleno with high-end features. Excellent fuel economy with smooth driving experience.'
  },
  {
    id: '7',
    title: 'Audi A4 Premium Plus',
    year: 2019,
    price: 3900000,
    mileage: 25000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
    featured: true,
    category: 'luxury',
    make: 'Audi',
    model: 'A4',
    bodyType: 'Sedan',
    owners: 1,
    description: 'Stunning Audi A4 with premium features. Excellent performance with signature Audi quality.'
  },
  {
    id: '8',
    title: 'Mahindra XUV700 AX7',
    year: 2022,
    price: 2100000,
    mileage: 5000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    location: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: true,
    category: 'suv',
    make: 'Mahindra',
    model: 'XUV700',
    bodyType: 'SUV',
    owners: 1,
    description: 'Feature-rich XUV700 with advanced driver assistance. Spacious 7-seater with premium comfort features.'
  },
  {
    id: '9',
    title: 'Tata Nexon XZ+',
    year: 2021,
    price: 1100000,
    mileage: 15000,
    fuel: 'Petrol',
    transmission: 'Manual',
    location: 'Kolkata',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: false,
    category: 'suv',
    make: 'Tata',
    model: 'Nexon',
    bodyType: 'SUV',
    owners: 1,
    description: 'Safe and reliable Nexon with 5-star safety rating. Feature-packed compact SUV with excellent build quality.'
  },
  {
    id: '10',
    title: 'Volkswagen Polo GT',
    year: 2020,
    price: 950000,
    mileage: 20000,
    fuel: 'Petrol',
    transmission: 'Manual',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: false,
    category: 'hatchback',
    make: 'Volkswagen',
    model: 'Polo',
    bodyType: 'Hatchback',
    owners: 1,
    description: 'Sporty Polo GT with German engineering. Fun to drive with excellent handling and build quality.'
  }
];

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const BuyCar = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  
  const [filters, setFilters] = useState({
    make: searchParams.get('make') || '',
    model: searchParams.get('model') || '',
    minYear: 0,
    maxYear: new Date().getFullYear(),
    minPrice: parseInt(searchParams.get('minPrice') || '0'),
    maxPrice: parseInt(searchParams.get('maxPrice') || '10000000'),
    fuel: searchParams.get('fuel') || '',
    transmission: searchParams.get('transmission') || '',
    bodyType: searchParams.get('bodyType') || '',
    maxOwners: 10,
    featured: false
  });

  useEffect(() => {
    setCars(mockCars);
    filterCars();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterCars();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, cars]);

  const filterCars = () => {
    let result = [...cars];
    
    if (filters.make) {
      result = result.filter(car => car.make === filters.make);
    }
    
    if (filters.model) {
      result = result.filter(car => car.model.toLowerCase().includes(filters.model.toLowerCase()));
    }
    
    result = result.filter(car => car.year >= filters.minYear && car.year <= filters.maxYear);
    result = result.filter(car => car.price >= filters.minPrice && car.price <= filters.maxPrice);
    
    if (filters.fuel) {
      result = result.filter(car => car.fuel === filters.fuel);
    }
    
    if (filters.transmission) {
      result = result.filter(car => car.transmission === filters.transmission);
    }
    
    if (filters.bodyType) {
      result = result.filter(car => car.bodyType === filters.bodyType);
    }
    
    result = result.filter(car => car.owners <= filters.maxOwners);
    
    if (filters.featured) {
      result = result.filter(car => car.featured);
    }
    
    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'oldest':
        result.sort((a, b) => a.year - b.year);
        break;
      case 'mileage-low-high':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      default:
        break;
    }
    
    setFilteredCars(result);
  };

  const handleFilterChange = (name: string, value: any) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const resetFilters = () => {
    setFilters({
      make: '',
      model: '',
      minYear: 0,
      maxYear: new Date().getFullYear(),
      minPrice: 0,
      maxPrice: 10000000,
      fuel: '',
      transmission: '',
      bodyType: '',
      maxOwners: 10,
      featured: false
    });
  };

  const makes = ['Honda', 'Toyota', 'Hyundai', 'Maruti Suzuki', 'Tata', 'Mahindra', 'Ford', 'Mercedes-Benz', 'Audi', 'BMW', 'Volkswagen'];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon'];
  const transmissions = ['Automatic', 'Manual', 'Semi-Automatic', 'CVT'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Buy a Car</h1>
          <Button
            variant="outline"
            className="md:hidden"
            onClick={toggleFilter}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className={`md:w-1/4 bg-white p-6 rounded-lg shadow-sm hidden md:block`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Reset
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                <Select 
                  value={filters.make}
                  onValueChange={(value) => handleFilterChange('make', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_makes">All Makes</SelectItem>
                    {makes.map(make => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <Input 
                  placeholder="Model name" 
                  value={filters.model}
                  onChange={(e) => handleFilterChange('model', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range: {formatPrice(filters.minPrice)} - {formatPrice(filters.maxPrice)}
                </label>
                <Slider
                  value={[filters.minPrice, filters.maxPrice]}
                  min={0}
                  max={10000000}
                  step={100000}
                  onValueChange={(value) => {
                    handleFilterChange('minPrice', value[0]);
                    handleFilterChange('maxPrice', value[1]);
                  }}
                  className="my-4"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                <Select 
                  value={filters.fuel}
                  onValueChange={(value) => handleFilterChange('fuel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_fuel_types">All Fuel Types</SelectItem>
                    {fuelTypes.map(fuel => (
                      <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Body Type</label>
                <Select 
                  value={filters.bodyType}
                  onValueChange={(value) => handleFilterChange('bodyType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_body_types">All Body Types</SelectItem>
                    {bodyTypes.map(body => (
                      <SelectItem key={body} value={body}>{body}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                <Select 
                  value={filters.transmission}
                  onValueChange={(value) => handleFilterChange('transmission', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_transmissions">All Transmissions</SelectItem>
                    {transmissions.map(transmission => (
                      <SelectItem key={transmission} value={transmission}>{transmission}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured"
                  checked={filters.featured}
                  onCheckedChange={(checked) => handleFilterChange('featured', Boolean(checked))}
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured Cars Only
                </label>
              </div>
            </div>
          </div>
          
          {isFilterOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden" onClick={toggleFilter}></div>
          )}
          
          <div className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl p-6 z-50 transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={toggleFilter}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                <Select 
                  value={filters.make}
                  onValueChange={(value) => handleFilterChange('make', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_makes">All Makes</SelectItem>
                    {makes.map(make => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <Input 
                  placeholder="Model name" 
                  value={filters.model}
                  onChange={(e) => handleFilterChange('model', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range: {formatPrice(filters.minPrice)} - {formatPrice(filters.maxPrice)}
                </label>
                <Slider
                  value={[filters.minPrice, filters.maxPrice]}
                  min={0}
                  max={10000000}
                  step={100000}
                  onValueChange={(value) => {
                    handleFilterChange('minPrice', value[0]);
                    handleFilterChange('maxPrice', value[1]);
                  }}
                  className="my-4"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                <Select 
                  value={filters.fuel}
                  onValueChange={(value) => handleFilterChange('fuel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_fuel_types">All Fuel Types</SelectItem>
                    {fuelTypes.map(fuel => (
                      <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Body Type</label>
                <Select 
                  value={filters.bodyType}
                  onValueChange={(value) => handleFilterChange('bodyType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_body_types">All Body Types</SelectItem>
                    {bodyTypes.map(body => (
                      <SelectItem key={body} value={body}>{body}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                <Select 
                  value={filters.transmission}
                  onValueChange={(value) => handleFilterChange('transmission', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_transmissions">All Transmissions</SelectItem>
                    {transmissions.map(transmission => (
                      <SelectItem key={transmission} value={transmission}>{transmission}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured-mobile"
                  checked={filters.featured}
                  onCheckedChange={(checked) => handleFilterChange('featured', Boolean(checked))}
                />
                <label htmlFor="featured-mobile" className="text-sm font-medium">
                  Featured Cars Only
                </label>
              </div>
              
              <div className="pt-4 flex space-x-4">
                <Button variant="outline" className="w-1/2" onClick={resetFilters}>
                  Reset
                </Button>
                <Button className="w-1/2 bg-blue-600 hover:bg-blue-700" onClick={toggleFilter}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-gray-600">Showing {filteredCars.length} cars</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div>
                    <Select 
                      value={sortBy}
                      onValueChange={setSortBy}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                        <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="mileage-low-high">Lowest Mileage First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="hidden sm:flex border rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={viewMode === 'grid' ? 'bg-gray-100' : ''}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid3X3 className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={viewMode === 'list' ? 'bg-gray-100' : ''}
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {filteredCars.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 text-lg">No cars found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="mt-4"
                >
                  Reset Filters
                </Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <Card key={car.id} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={car.image} 
                          alt={car.title} 
                          className="w-full h-full object-cover"
                        />
                        {car.featured && (
                          <div className="absolute top-0 right-0 m-2">
                            <Badge className="bg-blue-600 hover:bg-blue-700">Featured</Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900">{car.title}</h3>
                        <p className="text-xl font-bold text-blue-600 mt-1">{formatPrice(car.price)}</p>
                        <div className="mt-2 flex justify-between text-sm text-gray-500">
                          <div>{car.year}</div>
                          <div>{car.mileage.toLocaleString()} km</div>
                          <div>{car.fuel}</div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="text-sm text-gray-500">{car.location}</div>
                          <Link to={`/car/${car.id}`}>
                            <Button className="bg-blue-600 hover:bg-blue-700">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredCars.map((car) => (
                  <Card key={car.id} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative">
                        <img 
                          src={car.image} 
                          alt={car.title} 
                          className="w-full h-60 md:h-full object-cover"
                        />
                        {car.featured && (
                          <div className="absolute top-0 right-0 m-2">
                            <Badge className="bg-blue-600 hover:bg-blue-700">Featured</Badge>
                          </div>
                        )}
                      </div>
                      <div className="md:w-2/3 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-medium text-gray-900">{car.title}</h3>
                              <p className="text-sm text-gray-500 mt-1">{car.make} | {car.bodyType} | {car.owners} Owner</p>
                            </div>
                            <p className="text-2xl font-bold text-blue-600">{formatPrice(car.price)}</p>
                          </div>
                          <p className="mt-4 text-gray-600 line-clamp-2">{car.description}</p>
                          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Year</p>
                              <p className="font-medium">{car.year}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Mileage</p>
                              <p className="font-medium">{car.mileage.toLocaleString()} km</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Fuel</p>
                              <p className="font-medium">{car.fuel}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Transmission</p>
                              <p className="font-medium">{car.transmission}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                          <div className="text-sm text-gray-500">{car.location}</div>
                          <Link to={`/car/${car.id}`}>
                            <Button className="bg-blue-600 hover:bg-blue-700">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BuyCar;
