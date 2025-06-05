
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

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
  category: string;
}

// Mock car data for search
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
    category: 'sedan'
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
    category: 'suv'
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
    category: 'hatchback'
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
    category: 'suv'
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
    category: 'luxury'
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
    category: 'hatchback'
  },
  {
    id: '7',
    title: 'BMW X1 sDrive',
    year: 2020,
    price: 2800000,
    mileage: 20000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
    category: 'suv'
  },
  {
    id: '8',
    title: 'Tata Nexon XZ Plus',
    year: 2022,
    price: 1100000,
    mileage: 8000,
    fuel: 'Petrol',
    transmission: 'Manual',
    location: 'Kolkata',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'suv'
  }
];

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const CarSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(value.length > 0);
  };

  const filteredCars = mockCars.filter(car => {
    const searchLower = searchTerm.toLowerCase();
    return (
      car.title.toLowerCase().includes(searchLower) ||
      car.category.toLowerCase().includes(searchLower) ||
      car.fuel.toLowerCase().includes(searchLower) ||
      car.transmission.toLowerCase().includes(searchLower) ||
      car.location.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="relative -mt-20 mx-4 sm:mx-8 lg:mx-12">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Car</h2>
          <p className="text-gray-600">Search from thousands of verified cars</p>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by car name, category (SUV, Sedan, Hatchback), fuel type..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-20 py-3 text-lg border-2 border-gray-200 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              Search
            </Button>
          </div>
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Search Results ({filteredCars.length} cars found)
              </h3>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSearchTerm('');
                  setShowResults(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear
              </Button>
            </div>
            
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {filteredCars.map((car) => (
                  <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={car.image} 
                        alt={car.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-blue-600 text-white text-xs">
                          {car.category.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-gray-900 text-sm">{car.title}</h4>
                      <p className="text-blue-600 font-bold text-lg">{formatPrice(car.price)}</p>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{car.year}</span>
                        <span>{car.mileage.toLocaleString()} km</span>
                        <span>{car.fuel}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{car.location}</span>
                        <span>{car.transmission}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No cars found matching "{searchTerm}"</p>
                <p className="text-sm text-gray-400 mt-1">Try searching for SUV, Sedan, Hatchback, or car brands</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarSearch;
