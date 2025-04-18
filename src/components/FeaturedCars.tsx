
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

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
  category: 'sedan' | 'suv' | 'hatchback' | 'luxury';
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
    category: 'hatchback'
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
    category: 'luxury'
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

const FeaturedCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    // In a real app, this would be an API call
    setCars(mockCars);
  }, []);

  const filterCarsByCategory = (category: string) => {
    if (category === 'all') {
      return cars;
    }
    return cars.filter(car => car.category === category);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Cars
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Browse our handpicked selection of quality pre-owned vehicles
          </p>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all">All Cars</TabsTrigger>
                <TabsTrigger value="sedan">Sedans</TabsTrigger>
                <TabsTrigger value="suv">SUVs</TabsTrigger>
                <TabsTrigger value="hatchback">Hatchbacks</TabsTrigger>
                <TabsTrigger value="luxury">Luxury</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {filterCarsByCategory('all').map((car) => (
                  <Link to={`/car/${car.id}`} key={car.id}>
                    <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={car.image} 
                          alt={car.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 m-2">
                          <Badge className="bg-blue-600 hover:bg-blue-700">Featured</Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900">{car.title}</h3>
                        <p className="text-xl font-bold text-blue-600 mt-1">{formatPrice(car.price)}</p>
                        <div className="mt-2 flex justify-between text-sm text-gray-500">
                          <div>{car.year}</div>
                          <div>{car.mileage.toLocaleString()} km</div>
                          <div>{car.fuel}</div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm text-gray-500">{car.location}</div>
                          <div className="text-sm font-medium text-blue-600">{car.transmission}</div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="sedan" className="mt-8">
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {filterCarsByCategory('sedan').map((car) => (
                  <Link to={`/car/${car.id}`} key={car.id}>
                    <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={car.image} 
                          alt={car.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 m-2">
                          <Badge className="bg-blue-600 hover:bg-blue-700">Featured</Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900">{car.title}</h3>
                        <p className="text-xl font-bold text-blue-600 mt-1">{formatPrice(car.price)}</p>
                        <div className="mt-2 flex justify-between text-sm text-gray-500">
                          <div>{car.year}</div>
                          <div>{car.mileage.toLocaleString()} km</div>
                          <div>{car.fuel}</div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm text-gray-500">{car.location}</div>
                          <div className="text-sm font-medium text-blue-600">{car.transmission}</div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="suv" className="mt-8">
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {filterCarsByCategory('suv').map((car) => (
                  <Link to={`/car/${car.id}`} key={car.id}>
                    <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={car.image} 
                          alt={car.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 m-2">
                          <Badge className="bg-blue-600 hover:bg-blue-700">Featured</Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900">{car.title}</h3>
                        <p className="text-xl font-bold text-blue-600 mt-1">{formatPrice(car.price)}</p>
                        <div className="mt-2 flex justify-between text-sm text-gray-500">
                          <div>{car.year}</div>
                          <div>{car.mileage.toLocaleString()} km</div>
                          <div>{car.fuel}</div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm text-gray-500">{car.location}</div>
                          <div className="text-sm font-medium text-blue-600">{car.transmission}</div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="hatchback" className="mt-8">
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {filterCarsByCategory('hatchback').map((car) => (
                  <Link to={`/car/${car.id}`} key={car.id}>
                    <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={car.image} 
                          alt={car.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 m-2">
                          <Badge className="bg-blue-600 hover:bg-blue-700">Featured</Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900">{car.title}</h3>
                        <p className="text-xl font-bold text-blue-600 mt-1">{formatPrice(car.price)}</p>
                        <div className="mt-2 flex justify-between text-sm text-gray-500">
                          <div>{car.year}</div>
                          <div>{car.mileage.toLocaleString()} km</div>
                          <div>{car.fuel}</div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm text-gray-500">{car.location}</div>
                          <div className="text-sm font-medium text-blue-600">{car.transmission}</div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="luxury" className="mt-8">
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {filterCarsByCategory('luxury').map((car) => (
                  <Link to={`/car/${car.id}`} key={car.id}>
                    <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={car.image} 
                          alt={car.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 m-2">
                          <Badge className="bg-blue-600 hover:bg-blue-700">Featured</Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900">{car.title}</h3>
                        <p className="text-xl font-bold text-blue-600 mt-1">{formatPrice(car.price)}</p>
                        <div className="mt-2 flex justify-between text-sm text-gray-500">
                          <div>{car.year}</div>
                          <div>{car.mileage.toLocaleString()} km</div>
                          <div>{car.fuel}</div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm text-gray-500">{car.location}</div>
                          <div className="text-sm font-medium text-blue-600">{car.transmission}</div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/buy-car">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
              View All Cars
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
