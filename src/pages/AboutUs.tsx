
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { CheckCircle, PhoneCall, Shield, Car, Users, Award, Zap, Clock } from 'lucide-react';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Rajesh Kumar',
      position: 'CEO & Founder',
      bio: '15+ years in automotive industry. Previously led operations at a major car dealership network.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
    },
    {
      name: 'Priya Sharma',
      position: 'COO',
      bio: 'Expert in business operations with a strong background in customer experience and process optimization.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
    },
    {
      name: 'Amit Patel',
      position: 'CTO',
      bio: 'Tech visionary with expertise in building digital platforms for automotive marketplaces.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
    },
    {
      name: 'Meera Reddy',
      position: 'Head of Vehicle Acquisition',
      bio: 'Specialist in vehicle valuation with deep knowledge of the Indian used car market.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-blue-600 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Wheels<span className="text-yellow-300">Xchange</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
              Transforming the way India buys and sells pre-owned cars with transparency, trust, and technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/buy-car">
                <Button variant="secondary" size="lg">
                  Browse Cars
                </Button>
              </Link>
              <Link to="/sell-car">
                <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-blue-700">
                  Sell Your Car
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:space-x-10">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Founded in 2023, WheelsXchange was born out of a simple observation: buying and selling used cars in India was unnecessarily complex, opaque, and often frustrating.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Our founders, having experienced these challenges firsthand, set out to create a platform that would make the process transparent, fair, and enjoyable for everyone involved.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  What started as a small operation in Mumbai has now grown into one of India's most trusted car marketplaces, with operations across major cities and thousands of satisfied customers.
                </p>
                <p className="text-lg text-gray-600">
                  Our mission remains the same: to revolutionize the pre-owned car market by putting trust, transparency, and customer satisfaction at the heart of everything we do.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="WheelsXchange founder"
                    className="rounded-lg h-64 w-full object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1551186547-e862bf136072?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="WheelsXchange office"
                    className="rounded-lg h-64 w-full object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="WheelsXchange team meeting"
                    className="rounded-lg h-64 w-full object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="WheelsXchange customer"
                    className="rounded-lg h-64 w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These core principles guide every decision we make and every car we sell.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-6 hover:shadow-md transition-shadow duration-300 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Trust</h3>
                <p className="text-gray-600">
                  We build lasting relationships through honesty and transparency in every interaction.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-md transition-shadow duration-300 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Customer First</h3>
                <p className="text-gray-600">
                  Our customers' needs drive every decision we make and every service we provide.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-md transition-shadow duration-300 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-gray-600">
                  We uphold the highest standards in our car selection, inspection, and customer service.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-md transition-shadow duration-300 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continuously improve and innovate to create better experiences for our customers.
                </p>
              </Card>
            </div>
          </div>
        </section>
        
        {/* What Makes Us Different Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                WheelsXchange stands apart from traditional car dealerships and classifieds platforms.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1565043666747-69f6646db940?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Car inspection"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">140-Point Inspection</h3>
                  <p className="text-gray-600 mb-4">
                    Every car on our platform undergoes a rigorous 140-point inspection process conducted by certified automotive engineers, ensuring only the best quality vehicles make it to our customers.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Thorough mechanical inspection</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Detailed body and paint evaluation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Complete electronic systems check</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Road test by expert drivers</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Customer satisfaction"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Fixed Pricing & No Haggling</h3>
                  <p className="text-gray-600 mb-4">
                    We've eliminated the stress of price negotiations with our transparent, fixed pricing model. The price you see is the best price, determined through data-driven market analysis.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Transparent pricing with no hidden fees</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Competitive rates based on market analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>No pressure sales tactics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Best value guarantee</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560574188-6a6774965120?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Paperwork"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Hassle-Free Documentation</h3>
                  <p className="text-gray-600 mb-4">
                    We handle all the complex paperwork involved in buying or selling a car, making the entire process smooth and worry-free for our customers.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Complete ownership transfer assistance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Insurance and registration support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Loan payoff and financing coordination</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Digital document processing</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Customer support"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">After-Sales Support</h3>
                  <p className="text-gray-600 mb-4">
                    Our relationship with customers doesn't end after the sale. We provide comprehensive after-sales support to ensure complete satisfaction.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>6-month comprehensive warranty</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>24/7 roadside assistance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Scheduled maintenance reminders</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Dedicated customer relationship manager</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The experienced professionals driving WheelsXchange's mission forward.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 mb-4">{member.position}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Numbers Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">WheelsXchange by the Numbers</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Our impact on the pre-owned car market in India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">10K+</div>
                <p className="text-xl text-blue-100">Cars Sold</p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">15K+</div>
                <p className="text-xl text-blue-100">Happy Customers</p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">20+</div>
                <p className="text-xl text-blue-100">Cities Covered</p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">4.8/5</div>
                <p className="text-xl text-blue-100">Customer Rating</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <div className="md:flex md:items-center md:justify-between">
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Experience the WheelsXchange Difference?</h2>
                  <p className="text-xl text-gray-600 mb-6 md:mb-0">
                    Whether you're looking to buy or sell a car, we're here to make it a smooth, transparent, and enjoyable experience.
                  </p>
                </div>
                <div className="md:w-1/3 flex flex-col sm:flex-row md:flex-col space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-0 md:space-y-4">
                  <Link to="/buy-car" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Car className="mr-2 h-5 w-5" />
                      Browse Cars
                    </Button>
                  </Link>
                  <Link to="/sell-car" className="w-full">
                    <Button variant="outline" className="w-full">
                      <Clock className="mr-2 h-5 w-5" />
                      Sell Your Car
                    </Button>
                  </Link>
                  <Link to="/contact" className="w-full">
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600">
                      <PhoneCall className="mr-2 h-5 w-5" />
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
