
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, ArrowRight, Upload, Clock, Car, Calendar, FileText, Camera, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SellCar = () => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    fuel: '',
    transmission: '',
    bodyType: '',
    variant: '',
    kilometers: '',
    owners: '1',
    registrationState: '',
    registrationNumber: '',
    color: '',
    insurance: 'yes',
    insuranceValidity: '',
    expectedPrice: '',
    description: '',
    name: '',
    email: '',
    phone: '',
    city: ''
  });
  
  // Add states for file uploads
  const [carPhotos, setCarPhotos] = useState({
    frontView: null,
    sideView: null,
    rearView: null,
    interior: null,
    dashboard: null,
    seats: null
  });
  
  const [documents, setDocuments] = useState({
    rc: null,
    insurance: null,
    puc: null,
    service: null
  });
  
  const [uploading, setUploading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (step === 1) {
      // Basic validation for required fields in step 1
      const requiredFields = ['make', 'model', 'year', 'fuel', 'transmission', 'bodyType', 'kilometers', 'registrationState', 'registrationNumber'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields marked with *",
          variant: "destructive"
        });
        return;
      }
      
      if (formData.insurance === 'yes' && !formData.insuranceValidity) {
        toast({
          title: "Missing information",
          description: "Please provide insurance validity date",
          variant: "destructive"
        });
        return;
      }
    }
    
    setStep(prevStep => prevStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate contact info before submission
    const requiredContactFields = ['name', 'email', 'phone', 'city'];
    const missingFields = requiredContactFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required contact information fields",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would submit the data to the backend
    console.log('Form data submitted:', formData);
    console.log('Car photos:', carPhotos);
    console.log('Documents:', documents);
    
    // Show success toast
    toast({
      title: "Submission successful",
      description: "Your car details have been submitted successfully!",
    });
    
    // Move to success step
    setStep(4);
    window.scrollTo(0, 0);
  };
  
  // Handle file uploads for car photos
  const handlePhotoUpload = (photoType: keyof typeof carPhotos, file: File | null) => {
    setCarPhotos(prev => ({
      ...prev,
      [photoType]: file
    }));
    
    if (file) {
      toast({
        title: "Photo uploaded",
        description: `${photoType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} photo has been uploaded successfully.`,
      });
    }
  };
  
  // Handle file uploads for documents
  const handleDocumentUpload = (docType: keyof typeof documents, file: File | null) => {
    setDocuments(prev => ({
      ...prev,
      [docType]: file
    }));
    
    if (file) {
      toast({
        title: "Document uploaded",
        description: `${docType === 'rc' ? 'RC' : docType.replace(/^./, str => str.toUpperCase())} document has been uploaded successfully.`,
      });
    }
  };
  
  // Function to simulate file upload
  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>, type: string, uploadHandler: (type: any, file: File | null) => void) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        uploadHandler(type, file);
        setUploading(false);
      }, 1000);
    }
  };

  // Mock data for dropdowns
  const makes = ['Honda', 'Toyota', 'Hyundai', 'Maruti Suzuki', 'Tata', 'Mahindra', 'Ford', 'Mercedes-Benz', 'Audi', 'BMW', 'Volkswagen'];
  const years = Array.from({ length: 20 }, (_, i) => (new Date().getFullYear() - i).toString());
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon'];
  const transmissions = ['Automatic', 'Manual', 'Semi-Automatic', 'CVT'];
  const states = ['Maharashtra', 'Delhi', 'Tamil Nadu', 'Karnataka', 'Uttar Pradesh', 'Gujarat', 'West Bengal'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad'];

  // Define photo types for upload step
  const photoTypes = [
    { key: 'frontView', label: 'Front View' },
    { key: 'sideView', label: 'Side View' },
    { key: 'rearView', label: 'Rear View' },
    { key: 'interior', label: 'Interior' },
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'seats', label: 'Seats' }
  ];
  
  // Define document types for upload step
  const documentTypes = [
    { key: 'rc', label: 'RC (Registration Certificate)' },
    { key: 'insurance', label: 'Insurance Policy' },
    { key: 'puc', label: 'PUC Certificate' },
    { key: 'service', label: 'Service History' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Your Car</h1>
          <p className="text-gray-600">Get the best value for your car with our hassle-free process</p>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-10 hidden sm:block">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  s < step ? 'bg-green-500 text-white' : 
                  s === step ? 'bg-blue-600 text-white' : 
                  'bg-gray-200 text-gray-600'
                }`}>
                  {s < step ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    s
                  )}
                </div>
                <div className="text-sm mt-2 text-gray-600">
                  {s === 1 && 'Car Details'}
                  {s === 2 && 'Photos & Docs'}
                  {s === 3 && 'Contact Info'}
                  {s === 4 && 'Complete'}
                </div>
              </div>
            ))}
          </div>
          <div className="relative max-w-2xl mx-auto mt-3">
            <div className="absolute top-0 left-[10%] right-[10%] h-1 bg-gray-200">
              <div 
                className="h-full bg-blue-600" 
                style={{ width: `${(step - 1) * 50}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Step 1: Car Details */}
        {step === 1 && (
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Valid <span className="text-red-500">*</span></label>
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
                  <label htmlFor="insuranceValidity" className="block text-sm font-medium text-gray-700 mb-1">Insurance Valid Till <span className="text-red-500">*</span></label>
                  <Input 
                    id="insuranceValidity"
                    type="date"
                    value={formData.insuranceValidity}
                    onChange={(e) => handleChange('insuranceValidity', e.target.value)}
                    required
                  />
                </div>
              )}
              
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
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Car Description</label>
                <Textarea 
                  id="description"
                  placeholder="Describe your car's condition, features, modifications, etc."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                />
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
        )}
        
        {/* Step 2: Photos & Documents */}
        {step === 2 && (
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6">Upload Photos & Documents</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Car Photos</h3>
                <p className="text-gray-600 mb-4">Upload clear photos of your car from different angles</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {photoTypes.map((item) => (
                    <div 
                      key={item.key} 
                      className={`border-2 ${carPhotos[item.key as keyof typeof carPhotos] ? 'border-green-300 bg-green-50' : 'border-dashed border-gray-300'} rounded-lg p-4 flex flex-col items-center justify-center h-40`}
                    >
                      {carPhotos[item.key as keyof typeof carPhotos] ? (
                        <>
                          <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                          <p className="text-sm font-medium text-gray-700">{item.label}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {(carPhotos[item.key as keyof typeof carPhotos] as File)?.name.slice(0, 15)}
                            {(carPhotos[item.key as keyof typeof carPhotos] as File)?.name.length > 15 ? '...' : ''}
                          </p>
                          <label htmlFor={`photo-${item.key}`} className="mt-2">
                            <span className="text-xs text-blue-600 cursor-pointer hover:underline">Change</span>
                          </label>
                        </>
                      ) : (
                        <>
                          <Camera className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm font-medium text-gray-700">{item.label}</p>
                          <label 
                            htmlFor={`photo-${item.key}`}
                            className="mt-2 px-3 py-1.5 bg-blue-50 text-blue-600 text-sm rounded-md hover:bg-blue-100 transition cursor-pointer flex items-center"
                          >
                            <Upload className="h-4 w-4 mr-1" /> Upload
                          </label>
                        </>
                      )}
                      <input
                        type="file"
                        id={`photo-${item.key}`}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => uploadFile(e, item.key, handlePhotoUpload)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Documents</h3>
                <p className="text-gray-600 mb-4">Upload clear photos of your car documents</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {documentTypes.map((doc) => (
                    <div 
                      key={doc.key} 
                      className={`border-2 ${documents[doc.key as keyof typeof documents] ? 'border-green-300 bg-green-50' : 'border-dashed border-gray-300'} rounded-lg p-4 flex flex-col items-center justify-center h-32`}
                    >
                      {documents[doc.key as keyof typeof documents] ? (
                        <>
                          <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                          <p className="text-sm font-medium text-gray-700">{doc.label}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {(documents[doc.key as keyof typeof documents] as File)?.name.slice(0, 15)}
                            {(documents[doc.key as keyof typeof documents] as File)?.name.length > 15 ? '...' : ''}
                          </p>
                          <label htmlFor={`doc-${doc.key}`} className="mt-2">
                            <span className="text-xs text-blue-600 cursor-pointer hover:underline">Change</span>
                          </label>
                        </>
                      ) : (
                        <>
                          <FileText className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm font-medium text-gray-700">{doc.label}</p>
                          <label 
                            htmlFor={`doc-${doc.key}`}
                            className="mt-2 px-3 py-1.5 bg-blue-50 text-blue-600 text-sm rounded-md hover:bg-blue-100 transition cursor-pointer flex items-center"
                          >
                            <Upload className="h-4 w-4 mr-1" /> Upload
                          </label>
                        </>
                      )}
                      <input
                        type="file"
                        id={`doc-${doc.key}`}
                        className="hidden"
                        accept=".pdf,image/*"
                        onChange={(e) => uploadFile(e, doc.key, handleDocumentUpload)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {uploading && (
                <div className="text-center py-2">
                  <div className="animate-pulse text-blue-600">Uploading...</div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Continue to Contact Information
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Contact Information */}
        {step === 3 && (
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
        )}
        
        {/* Step 4: Success */}
        {step === 4 && (
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
                  <li className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold">1</div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Car Evaluation</p>
                      <p className="text-sm text-gray-600">Our experts will evaluate your car based on the details provided</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold">2</div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Price Quote</p>
                      <p className="text-sm text-gray-600">We'll provide you with the best possible price for your car</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold">3</div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Car Inspection</p>
                      <p className="text-sm text-gray-600">Schedule a convenient time for a thorough inspection of your car</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold">4</div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Instant Payment</p>
                      <p className="text-sm text-gray-600">Get paid instantly once the deal is finalized</p>
                    </div>
                  </li>
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
        )}
        
        {/* Why Sell with WheelsXchange Section */}
        {step < 4 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-10">Why Sell with WheelsXchange?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Car className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Best Price Guarantee</h3>
                <p className="text-gray-600">We ensure you get the best value for your car based on its condition and market value.</p>
              </Card>
              
              <Card className="p-6 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Hassle-Free Process</h3>
                <p className="text-gray-600">From evaluation to payment, our experts handle everything, making the selling process smooth and efficient.</p>
              </Card>
              
              <Card className="p-6 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Free Home Inspection</h3>
                <p className="text-gray-600">Our experts come to your location for a thorough inspection at no additional cost.</p>
              </Card>
            </div>
            
            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              
              <Tabs defaultValue="selling" className="max-w-3xl mx-auto">
                <TabsList className="w-full">
                  <TabsTrigger value="selling" className="flex-1">Selling Process</TabsTrigger>
                  <TabsTrigger value="payments" className="flex-1">Payments</TabsTrigger>
                  <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
                </TabsList>
                
                <TabsContent value="selling" className="pt-6 space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg">How does the car selling process work?</h3>
                    <p className="text-gray-600 mt-2">Our car selling process is simple: submit your car details, get a price quote, schedule an inspection, and receive instant payment once the deal is finalized.</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg">How long does it take to sell my car?</h3>
                    <p className="text-gray-600 mt-2">The entire process can be completed within 24-48 hours. In many cases, we can finalize the deal on the same day.</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg">What types of cars do you buy?</h3>
                    <p className="text-gray-600 mt-2">We buy all types of cars regardless of make, model, or condition, as long as they are legally owned and have proper documentation.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="payments" className="pt-6 space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg">How will I receive the payment?</h3>
                    <p className="text-gray-600 mt-2">We offer multiple payment options including instant bank transfers, checks, or cash payments as per your preference.</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg">Are there any hidden fees?</h3>
                    <p className="text-gray-600 mt-2">No, there are absolutely no hidden fees. The price we quote is what you get, without any deductions or processing charges.</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg">How do you determine my car's value?</h3>
                    <p className="text-gray-600 mt-2">We evaluate your car based on its make, model, year, condition, mileage, service history, market demand, and current market value.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="pt-6 space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg">What documents do I need to sell my car?</h3>
                    <p className="text-gray-600 mt-2">You'll need your car's Registration Certificate (RC), insurance policy, PUC certificate, service records, and a valid ID proof.</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg">What if my car has a loan outstanding?</h3>
                    <p className="text-gray-600 mt-2">We can still buy your car with an outstanding loan. We'll help you with the paperwork and settle the remaining loan amount directly with the bank.</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg">Who handles the transfer of ownership?</h3>
                    <p className="text-gray-600 mt-2">Our team handles all the paperwork related to the transfer of ownership, making the process hassle-free for you.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SellCar;
