
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const CarSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
      </div>
    </div>
  );
};

export default CarSearch;
