
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Upload, Camera, FileText } from 'lucide-react';

interface PhotosDocsUploadProps {
  carPhotos: any;
  documents: any;
  handleBack: () => void;
  handleNext: () => void;
  handlePhotoUpload: (type: string, file: File | null) => void;
  handleDocumentUpload: (type: string, file: File | null) => void;
  uploading: boolean;
  photoTypes: Array<{ key: string; label: string }>;
  documentTypes: Array<{ key: string; label: string }>;
}

const PhotosDocsUpload = ({
  carPhotos,
  documents,
  handleBack,
  handleNext,
  handlePhotoUpload,
  handleDocumentUpload,
  uploading,
  photoTypes,
  documentTypes
}: PhotosDocsUploadProps) => {
  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>, type: string, uploadHandler: (type: string, file: File | null) => void) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      uploadHandler(type, file);
    }
  };

  return (
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
                className={`border-2 ${carPhotos[item.key] ? 'border-green-300 bg-green-50' : 'border-dashed border-gray-300'} rounded-lg p-4 flex flex-col items-center justify-center h-40`}
              >
                {carPhotos[item.key] ? (
                  <>
                    <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                    <p className="text-sm font-medium text-gray-700">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {carPhotos[item.key]?.name.slice(0, 15)}
                      {carPhotos[item.key]?.name.length > 15 ? '...' : ''}
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
                className={`border-2 ${documents[doc.key] ? 'border-green-300 bg-green-50' : 'border-dashed border-gray-300'} rounded-lg p-4 flex flex-col items-center justify-center h-32`}
              >
                {documents[doc.key] ? (
                  <>
                    <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                    <p className="text-sm font-medium text-gray-700">{doc.label}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {documents[doc.key]?.name.slice(0, 15)}
                      {documents[doc.key]?.name.length > 15 ? '...' : ''}
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
  );
};

export default PhotosDocsUpload;
