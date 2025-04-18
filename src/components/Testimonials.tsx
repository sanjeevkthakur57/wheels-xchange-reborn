
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Card } from './ui/card';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  car: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Raj Sharma",
    location: "Mumbai",
    rating: 5,
    comment: "Buying a car from WheelsXchange was the best decision I made. The process was smooth, transparent, and hassle-free. I got my dream car at a great price with all paperwork handled professionally.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    car: "Honda City"
  },
  {
    id: 2,
    name: "Priya Patel",
    location: "Delhi",
    rating: 5,
    comment: "I was skeptical about buying a pre-owned car, but WheelsXchange changed my perspective. The car was in excellent condition, just as described online. The 7-day return policy gave me confidence in my purchase.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    car: "Hyundai Creta"
  },
  {
    id: 3,
    name: "Amit Kumar",
    location: "Bangalore",
    rating: 4,
    comment: "Selling my car through WheelsXchange was a breeze. They offered a fair price and took care of all the paperwork. The entire process was completed within 3 days, much faster than I expected.",
    image: "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    car: "Maruti Swift"
  },
  {
    id: 4,
    name: "Meera Reddy",
    location: "Chennai",
    rating: 5,
    comment: "Exceptional service from start to finish! The test drive at my doorstep was extremely convenient, and the financing options they offered were better than what my bank had proposed. Highly recommend!",
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    car: "Toyota Fortuner"
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Hyderabad",
    rating: 5,
    comment: "The warranty coverage provided by WheelsXchange is unbeatable. When I had an issue with the AC, they fixed it promptly without any additional cost. Their after-sales service is truly commendable.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    car: "Mahindra XUV700"
  }
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Don't just take our word for it — hear from our satisfied customers
          </p>
        </div>

        <div className="mt-12 relative">
          <div className="flex justify-center">
            <Card className="max-w-4xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].name} 
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-medium text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-gray-500">
                      {testimonials[currentTestimonial].location}
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      {testimonials[currentTestimonial].car} Owner
                    </p>
                    <div className="flex justify-center mt-2">
                      {renderStars(testimonials[currentTestimonial].rating)}
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 md:pl-8 flex items-center">
                  <blockquote className="relative">
                    <div className="text-lg text-gray-600 italic">
                      "{testimonials[currentTestimonial].comment}"
                    </div>
                  </blockquote>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentTestimonial(idx)}
              className={`mx-1 h-3 w-3 rounded-full ${
                idx === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
