import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarDetailsForm from '@/components/sell-car/CarDetailsForm';
import PhotosDocsUpload from '@/components/sell-car/PhotosDocsUpload';
import ContactForm from '@/components/sell-car/ContactForm';
import SuccessMessage from '@/components/sell-car/SuccessMessage';
import WhyChooseUs from '@/components/sell-car/WhyChooseUs';
import { CheckCircle } from 'lucide-react';
import { cars } from '@/services/api';
import { Dialog, DialogContent } from '@/components/ui/dialog';

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
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      const requiredFields = ['make', 'model', 'year', 'fuel', 'transmission', 'bodyType', 'kilometers', 'registrationState', 'registrationNumber', 'expectedPrice'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields marked with *",
          variant: "destructive"
        });
        return;
      }
      
      // Check insurance validity only if insurance is 'yes'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    
    try {
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key as keyof typeof formData]);
      });
      
      Object.keys(carPhotos).forEach(key => {
        if (carPhotos[key as keyof typeof carPhotos]) {
          formDataToSend.append(key, carPhotos[key as keyof typeof carPhotos] as File);
        }
      });
      
      Object.keys(documents).forEach(key => {
        if (documents[key as keyof typeof documents]) {
          formDataToSend.append(key, documents[key as keyof typeof documents] as File);
        }
      });
      
      await cars.create(formDataToSend);
      setShowSubmitDialog(true);
      setPopupMessage('Your car is listed');
      setTimeout(() => {
        setShowSubmitDialog(false);
        setStep(4);
        window.scrollTo(0, 0);
      }, 2200);
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.response?.data?.message || "An error occurred while submitting your car details",
        variant: "destructive",
      });
    }
  };
  
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

  const makes = ['Honda', 'Toyota', 'Hyundai', 'Maruti Suzuki', 'Tata', 'Mahindra', 'Ford', 'Mercedes-Benz', 'Audi', 'BMW', 'Volkswagen'];
  const years = Array.from({ length: 20 }, (_, i) => (new Date().getFullYear() - i).toString());
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon'];
  const transmissions = ['Automatic', 'Manual', 'Semi-Automatic', 'CVT'];
  const states = ['Maharashtra', 'Delhi', 'Tamil Nadu', 'Karnataka', 'Uttar Pradesh', 'Gujarat', 'West Bengal'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad'];

  const photoTypes = [
    { key: 'frontView', label: 'Front View' },
    { key: 'sideView', label: 'Side View' },
    { key: 'rearView', label: 'Rear View' },
    { key: 'interior', label: 'Interior' },
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'seats', label: 'Seats' }
  ];
  
  const documentTypes = [
    { key: 'rc', label: 'RC (Registration Certificate)' },
    { key: 'insurance', label: 'Insurance Policy' },
    { key: 'puc', label: 'PUC Certificate' },
    { key: 'service', label: 'Service History' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Popup after contact submit */}
      <Dialog open={showSubmitDialog}>
        <DialogContent className="max-w-md text-center">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h2>
            <p className="text-gray-700 mb-2">{popupMessage}</p>
          </div>
        </DialogContent>
      </Dialog>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Your Car</h1>
          <p className="text-gray-600">Get the best value for your car with our hassle-free process</p>
        </div>
        
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
        
        {step === 1 && (
          <CarDetailsForm 
            formData={formData}
            handleChange={handleChange}
            handleNext={handleNext}
            makes={makes}
            years={years}
            fuelTypes={fuelTypes}
            bodyTypes={bodyTypes}
            transmissions={transmissions}
            states={states}
          />
        )}
        
        {step === 2 && (
          <PhotosDocsUpload 
            carPhotos={carPhotos}
            documents={documents}
            handleBack={handleBack}
            handleNext={handleNext}
            handlePhotoUpload={handlePhotoUpload}
            handleDocumentUpload={handleDocumentUpload}
            uploading={uploading}
            photoTypes={photoTypes}
            documentTypes={documentTypes}
          />
        )}
        
        {step === 3 && (
          <ContactForm 
            formData={formData}
            handleChange={handleChange}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            cities={cities}
          />
        )}
        
        {step === 4 && <SuccessMessage />}
        
        {step < 4 && <WhyChooseUs />}
      </main>
      
      <Footer />
    </div>
  );
};

export default SellCar;
