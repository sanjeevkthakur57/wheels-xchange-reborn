
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Search, Filter, RefreshCw } from 'lucide-react';
import CarListingTable from '@/components/database/CarListingTable';
import DatabaseStats from '@/components/database/DatabaseStats';

const DatabasePage = () => {
  const [activeTab, setActiveTab] = useState("listings");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Database refreshed",
        description: "Car listings have been refreshed from the database"
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Management</h1>
            <p className="text-gray-600">View and manage your car listings database</p>
          </div>
          <Button onClick={handleRefresh} className="flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        </div>
        
        <Tabs defaultValue="listings" className="mb-8">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="listings" onClick={() => setActiveTab("listings")}>
              Car Listings
            </TabsTrigger>
            <TabsTrigger value="stats" onClick={() => setActiveTab("stats")}>
              Database Stats
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="listings" className="mt-6">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search cars..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-56">
                  <Select 
                    value={statusFilter} 
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger>
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Listings</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <CarListingTable 
                searchTerm={searchTerm} 
                statusFilter={statusFilter} 
                loading={loading} 
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="stats" className="mt-6">
            <DatabaseStats loading={loading} />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default DatabasePage;
