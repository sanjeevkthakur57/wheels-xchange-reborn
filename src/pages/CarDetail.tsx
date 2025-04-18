
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Share2, 
  Calendar, 
  BarChart4, 
  Fuel, 
  Gauge, 
  Users, 
  MapPin, 
  Car, 
  Shield, 
  CheckCircle, 
  XCircle, 
  PhoneCall 
} from 'lucide-react';

interface Car {
  id: string;
  title: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  location: string;
  images: string[];
  featured: boolean;
  category: string;
  make: string;
  model: string;
  bodyType: string;
  owners: number;
  description: string;
  color: string;
  engine: string;
  power: string;
  seatingCapacity: number;
  features: string[];
  specifications: {
    engine: string;
    power: string;
    torque: string;
    transmission: string;
    drivetrain: string;
    fuelType: string;
    fuelTankCapacity: string;
    seatingCapacity: number;
    bootSpace: string;
    groundClearance: string;
    dimensions: {
      length: string;
      width: string;
      height: string;
      wheelbase: string;
    };
  };
  sellerName: string;
  sellerType: string;
  sellerRating: number;
  sellerImage: string;
  listedDate: string;
  warranty: string;
  inspectionScore: number;
  inspectionReport: {
    exterior: number;
    interior: number;
    mechanical: number;
    electrical: number;
    tires: number;
  };
}

// Mock data for detailed car
const mockCar: Car = {
  id: '1',
  title: 'Honda City ZX',
  year: 2021,
  price: 1200000,
  mileage: 15000,
  fuel: 'Petrol',
  transmission: 'Automatic',
  location: 'Mumbai',
  images: [
    'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80'
  ],
  featured: true,
  category: 'sedan',
  make: 'Honda',
  model: 'City',
  bodyType: 'Sedan',
  owners: 1,
  description: 'Well-maintained Honda City ZX with all service records. Single owner, non-smoker vehicle with no accidents. The car comes with additional features like sunroof, leather seats, and premium sound system. All maintenance has been done at authorized Honda service centers.',
  color: 'Pearl White',
  engine: '1.5L i-VTEC',
  power: '121 bhp',
  seatingCapacity: 5,
  features: [
    'Sunroof',
    'Leather Seats',
    'Push Button Start',
    'Keyless Entry',
    'Automatic Climate Control',
    'Cruise Control',
    'Rear Parking Camera',
    'Apple CarPlay & Android Auto',
    'LED Headlamps',
    'Alloy Wheels',
    'Power Windows',
    'Power Steering',
    'Anti-lock Braking System (ABS)',
    'Electronic Brake-force Distribution (EBD)',
    'Airbags',
    'Hill Start Assist'
  ],
  specifications: {
    engine: '1.5L i-VTEC Petrol',
    power: '121 bhp @ 6600 rpm',
    torque: '145 Nm @ 4300 rpm',
    transmission: '7-Speed CVT Automatic',
    drivetrain: 'FWD',
    fuelType: 'Petrol',
    fuelTankCapacity: '40 liters',
    seatingCapacity: 5,
    bootSpace: '506 liters',
    groundClearance: '165 mm',
    dimensions: {
      length: '4549 mm',
      width: '1748 mm',
      height: '1489 mm',
      wheelbase: '2600 mm'
    }
  },
  sellerName: 'Rajesh Kumar',
  sellerType: 'Individual',
  sellerRating: 4.8,
  sellerImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  listedDate: '2023-11-15',
  warranty: '6 months',
  inspectionScore: 92,
  inspectionReport: {
    exterior: 95,
    interior: 90,
    mechanical: 94,
    electrical: 90,
    tires: 88
  }
};

// Similar cars data
const similarCars = [
  {
    id: '2',
    title: 'Hyundai Verna SX',
    year: 2021,
    price: 1100000,
    mileage: 18000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80'
  },
  {
    id: '3',
    title: 'Toyota Yaris VX',
    year: 2020,
    price: 950000,
    mileage: 25000,
    fuel: 'Petrol',
    transmission: 'Manual',
    location: 'Delhi',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '4',
    title: 'Maruti Suzuki Ciaz Alpha',
    year: 2022,
    price: 1050000,
    mileage: 12000,
    fuel: 'Petrol',
    transmission: 'Manual',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // Simulating API call delay
    const timer = setTimeout(() => {
      setCar(mockCar);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  const nextImage = () => {
    if (car) {
      setCurrentImage((prev) => (prev === car.images.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = () => {
    if (car) {
      setCurrentImage((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));
    }
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert('Share functionality will be implemented here');
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-amber-500';
    return 'text-red-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-96 bg-gray-200 rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="h-10 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div>
                <div className="h-48 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Car Not Found</h1>
          <p className="text-gray-600 mb-6">The car you're looking for might have been sold or removed.</p>
          <Button onClick={() => navigate('/buy-car')}>Browse Other Cars</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <button onClick={() => navigate('/buy-car')} className="hover:text-blue-600">
            Browse Cars
          </button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/buy-car?category=' + car.category)} className="hover:text-blue-600">
            {car.category.charAt(0).toUpperCase() + car.category.slice(1)}s
          </button>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{car.title}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Car Images Section */}
          <div className="lg:col-span-2">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img 
                src={car.images[currentImage]} 
                alt={car.title} 
                className="w-full h-full object-cover"
              />
              {car.featured && (
                <div className="absolute top-0 right-0 m-4">
                  <Badge className="bg-blue-600 hover:bg-blue-700">Featured</Badge>
                </div>
              )}
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>
            </div>
            
            <div className="flex space-x-2 mt-4 overflow-x-auto py-2">
              {car.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded overflow-hidden ${currentImage === index ? 'ring-2 ring-blue-600' : 'opacity-70'}`}
                >
                  <img 
                    src={image} 
                    alt={`${car.title} - view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Car Details & Pricing Section */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{car.title}</h1>
                  <p className="text-sm text-gray-500">
                    {car.year} | {car.mileage.toLocaleString()} km | {car.owners} Owner
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={toggleWishlist}
                    className={`p-2 rounded-full ${isWishlist ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'} hover:bg-opacity-80`}
                  >
                    <Heart className={`h-5 w-5 ${isWishlist ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    onClick={handleShare}
                    className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-opacity-80"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-3xl font-bold text-blue-600">{formatPrice(car.price)}</p>
                <p className="text-sm text-gray-500">Ex-showroom price: {formatPrice(car.price + 80000)}</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Book Test Drive
                </Button>
                <Button variant="outline" className="w-full">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Contact Seller
                </Button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-medium">WheelsXchange Assured</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>140-point inspection</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>{car.warranty} warranty</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>7-day money-back guarantee</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Free service for 1 year</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Car Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Registration Year</p>
                      <p className="font-medium">{car.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BarChart4 className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Mileage</p>
                      <p className="font-medium">{car.mileage.toLocaleString()} km</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Fuel Type</p>
                      <p className="font-medium">{car.fuel}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Gauge className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Transmission</p>
                      <p className="font-medium">{car.transmission}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Owners</p>
                      <p className="font-medium">{car.owners === 1 ? '1st Owner' : `${car.owners}${car.owners === 2 ? 'nd' : car.owners === 3 ? 'rd' : 'th'} Owner`}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-medium">{car.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Seller Information */}
            <Card className="p-6 mt-6">
              <h3 className="font-medium mb-4">Seller Information</h3>
              <div className="flex items-center">
                <img 
                  src={car.sellerImage} 
                  alt={car.sellerName} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium">{car.sellerName}</p>
                  <p className="text-sm text-gray-500">{car.sellerType} Seller</p>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(car.sellerRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs ml-1">{car.sellerRating}/5</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">Listed on: {new Date(car.listedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </Card>
          </div>
        </div>
        
        {/* Detailed Information Tabs */}
        <div className="mt-10">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none mb-6 overflow-x-auto flex-nowrap">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="inspection">Inspection Report</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-2">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-xl font-bold mb-4">About This Car</h2>
                  <p className="text-gray-600 mb-6">{car.description}</p>
                  
                  <h3 className="font-semibold text-lg mb-3">Key Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Well Maintained</p>
                        <p className="text-sm text-gray-500">Regular service at authorized centers</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">No Accidents</p>
                        <p className="text-sm text-gray-500">Zero reported accidents or damages</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Non-Smoker Car</p>
                        <p className="text-sm text-gray-500">Clean interior with no smoke odor</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">All Service Records</p>
                        <p className="text-sm text-gray-500">Complete service history available</p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-3">Additional Information</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Color</p>
                      <p className="font-medium">{car.color}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Engine</p>
                      <p className="font-medium">{car.engine}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Power</p>
                      <p className="font-medium">{car.power}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Body Type</p>
                      <p className="font-medium">{car.bodyType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Seating Capacity</p>
                      <p className="font-medium">{car.seatingCapacity} Persons</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Insurance Valid Till</p>
                      <p className="font-medium">Dec 2023</p>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <Card className="p-6 bg-blue-50 border-blue-100">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Shield className="h-5 w-5 text-blue-600 mr-2" />
                      Inspection Score
                    </h3>
                    <div className="mb-6 text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white border-4 border-blue-500">
                        <div>
                          <p className="text-3xl font-bold text-blue-600">{car.inspectionScore}</p>
                          <p className="text-xs text-gray-500">Out of 100</p>
                        </div>
                      </div>
                    </div>
                    <h4 className="font-medium mb-3">Category Scores</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Exterior</span>
                          <span className={`text-sm font-medium ${getScoreColor(car.inspectionReport.exterior)}`}>
                            {car.inspectionReport.exterior}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${car.inspectionReport.exterior}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Interior</span>
                          <span className={`text-sm font-medium ${getScoreColor(car.inspectionReport.interior)}`}>
                            {car.inspectionReport.interior}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${car.inspectionReport.interior}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Mechanical</span>
                          <span className={`text-sm font-medium ${getScoreColor(car.inspectionReport.mechanical)}`}>
                            {car.inspectionReport.mechanical}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${car.inspectionReport.mechanical}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Electrical</span>
                          <span className={`text-sm font-medium ${getScoreColor(car.inspectionReport.electrical)}`}>
                            {car.inspectionReport.electrical}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${car.inspectionReport.electrical}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Tires</span>
                          <span className={`text-sm font-medium ${getScoreColor(car.inspectionReport.tires)}`}>
                            {car.inspectionReport.tires}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${car.inspectionReport.tires}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-6">
                      View Full Inspection Report
                    </Button>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="pt-2">
              <h2 className="text-xl font-bold mb-6">Car Specifications</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Engine & Performance</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Engine Type</span>
                      <span className="font-medium">{car.specifications.engine}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Maximum Power</span>
                      <span className="font-medium">{car.specifications.power}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Maximum Torque</span>
                      <span className="font-medium">{car.specifications.torque}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Transmission</span>
                      <span className="font-medium">{car.specifications.transmission}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Drivetrain</span>
                      <span className="font-medium">{car.specifications.drivetrain}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-4 text-lg mt-8">Fuel & Efficiency</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Fuel Type</span>
                      <span className="font-medium">{car.specifications.fuelType}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Fuel Tank Capacity</span>
                      <span className="font-medium">{car.specifications.fuelTankCapacity}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Mileage (ARAI)</span>
                      <span className="font-medium">17.8 km/l</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Emission Norm</span>
                      <span className="font-medium">BS6</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Dimensions & Capacity</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Length</span>
                      <span className="font-medium">{car.specifications.dimensions.length}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Width</span>
                      <span className="font-medium">{car.specifications.dimensions.width}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Height</span>
                      <span className="font-medium">{car.specifications.dimensions.height}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Wheelbase</span>
                      <span className="font-medium">{car.specifications.dimensions.wheelbase}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Ground Clearance</span>
                      <span className="font-medium">{car.specifications.groundClearance}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Boot Space</span>
                      <span className="font-medium">{car.specifications.bootSpace}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Seating Capacity</span>
                      <span className="font-medium">{car.specifications.seatingCapacity} Persons</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-4 text-lg mt-8">Wheels & Tyres</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Wheel Size</span>
                      <span className="font-medium">16 inches</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Tyre Size</span>
                      <span className="font-medium">185/65 R16</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Wheel Type</span>
                      <span className="font-medium">Alloy Wheels</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="pt-2">
              <h2 className="text-xl font-bold mb-6">Car Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Comfort & Convenience</h3>
                  <ul className="space-y-3">
                    {car.features.slice(0, 6).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Safety & Security</h3>
                  <ul className="space-y-3">
                    {car.features.slice(6, 12).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Entertainment & Communication</h3>
                  <ul className="space-y-3">
                    {car.features.slice(12).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {/* Some items that might not be present */}
                    <li className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500">Wireless Charging</span>
                    </li>
                    <li className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500">Rear Entertainment System</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="inspection" className="pt-2">
              <h2 className="text-xl font-bold mb-6">Inspection Report</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8 flex flex-col md:flex-row items-center md:justify-between">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <p className="text-gray-600 mb-2">Overall Inspection Score</p>
                  <div className="flex items-center">
                    <div className="text-5xl font-bold text-blue-600 mr-2">{car.inspectionScore}</div>
                    <div className="text-left">
                      <div className="text-green-600 font-medium">Excellent</div>
                      <div className="text-sm text-gray-600">Out of 100</div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button>
                    Download Full Inspection Report
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center text-lg">
                    <Car className="h-5 w-5 text-blue-600 mr-2" />
                    Exterior Inspection
                  </h3>
                  
                  <Card className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Paint & Body Condition</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">The car's exterior paint is in excellent condition with no major scratches or dents. Minor wear consistent with age.</p>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Lights & Lenses</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">All lights and lenses are in perfect working condition with no cracks or yellowing.</p>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Wheels & Tyres</span>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Good</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">Tyres show normal wear with approximately 70% tread life remaining. Alloy wheels in good condition with minor scuffs.</p>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Glass & Mirrors</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>
                    </div>
                    <p className="text-gray-600">All glass and mirror surfaces are in perfect condition without any cracks or chips.</p>
                  </Card>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4 flex items-center text-lg">
                    <Gauge className="h-5 w-5 text-blue-600 mr-2" />
                    Mechanical Inspection
                  </h3>
                  
                  <Card className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Engine Performance</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">Engine performs flawlessly with no unusual noises or vibrations. All fluid levels are optimal.</p>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Transmission & Clutch</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">Transmission shifts smoothly with no delays or hard shifts. Clutch engagement is precise and consistent.</p>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Suspension & Steering</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">Suspension components are in excellent condition. Steering is responsive with no play or unusual noises.</p>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Braking System</span>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Good</Badge>
                    </div>
                    <p className="text-gray-600">Brakes function properly with approximately 65% pad life remaining. Rotors show normal wear patterns.</p>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Similar Cars Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Cars You Might Like</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarCars.map((car) => (
              <Link to={`/car/${car.id}`} key={car.id}>
                <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={car.image} 
                      alt={car.title} 
                      className="w-full h-full object-cover"
                    />
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CarDetail;
