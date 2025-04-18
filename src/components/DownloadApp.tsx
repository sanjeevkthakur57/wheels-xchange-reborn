
import { Button } from './ui/button';

const DownloadApp = () => {
  return (
    <section className="bg-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Download Our Mobile App
            </h2>
            <p className="mt-3 text-lg text-blue-100">
              Get the full car buying and selling experience on your mobile device. Browse cars, book test drives, and track your purchase — all from your phone.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Button variant="secondary" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm bg-white text-blue-600 hover:bg-blue-50">
                <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.707,12l-8.353,8.354L7.939,19.02l6.99-6.99L7.99,5.01l1.414-1.414L17.707,12z" />
                </svg>
                App Store
              </Button>
              <Button variant="secondary" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm bg-white text-blue-600 hover:bg-blue-50">
                <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18,12l-8.5,8.5L8,19l7-7L8,5l1.5-1.5L18,12z" />
                </svg>
                Google Play
              </Button>
            </div>
            <div className="mt-6 text-blue-100">
              <p>Scan the QR code to download the app</p>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center">
            <div className="relative">
              <img
                className="w-auto h-96 object-cover rounded-lg shadow-xl"
                src="https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                alt="WheelsXchange mobile app"
              />
              <div className="absolute bottom-0 right-0 bg-white p-3 rounded-lg shadow-lg m-4">
                {/* Placeholder for QR code */}
                <div className="w-24 h-24 bg-gray-900 flex items-center justify-center text-white text-xs">
                  QR Code for App Download
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
