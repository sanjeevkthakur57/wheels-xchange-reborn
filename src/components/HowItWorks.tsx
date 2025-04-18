
import { CheckCircle, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Browse Our Collection",
      description: "Explore our vast inventory of certified pre-owned cars with detailed information and high-quality images.",
      icon: <img src="https://images.unsplash.com/photo-1550829434-81dbd6662bfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Browse cars" className="w-20 h-20 object-cover rounded-full mx-auto" />
    },
    {
      title: "Choose Your Car",
      description: "Select the perfect car that matches your requirements and budget from our curated collection.",
      icon: <img src="https://images.unsplash.com/photo-1563720395-0eee3e9c37e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Choose car" className="w-20 h-20 object-cover rounded-full mx-auto" />
    },
    {
      title: "Book a Test Drive",
      description: "Schedule a test drive at your convenience to experience your chosen car firsthand.",
      icon: <img src="https://images.unsplash.com/photo-1583531350764-4c8103a36fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Test drive" className="w-20 h-20 object-cover rounded-full mx-auto" />
    },
    {
      title: "Finalize the Purchase",
      description: "Complete a seamless purchase process with flexible financing options and doorstep delivery.",
      icon: <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Purchase" className="w-20 h-20 object-cover rounded-full mx-auto" />
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How Wheels<span className="text-blue-600">Xchange</span> Works
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Your journey to owning a quality pre-owned car in just 4 simple steps
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <div className="mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="h-8 w-8 text-blue-500" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center mt-2">
                  <div className="rounded-full bg-blue-600 text-white w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Wheels<span className="text-blue-600">Xchange</span>?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">Certified Cars</h4>
                <p className="mt-1 text-gray-600">All our cars undergo a rigorous 140-point inspection</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">7-Day Return Policy</h4>
                <p className="mt-1 text-gray-600">Not satisfied? Return the car within 7 days for a full refund</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">Free Home Delivery</h4>
                <p className="mt-1 text-gray-600">We deliver your car to your doorstep at no additional cost</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">Warranty Coverage</h4>
                <p className="mt-1 text-gray-600">All cars come with a 6-month comprehensive warranty</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">Transparent Pricing</h4>
                <p className="mt-1 text-gray-600">No hidden fees or charges, what you see is what you pay</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">Financing Options</h4>
                <p className="mt-1 text-gray-600">Flexible financing solutions with competitive interest rates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
