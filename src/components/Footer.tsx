
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, PhoneCall, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Wheels<span className="text-blue-400">Xchange</span></h3>
            <p className="text-gray-400 mb-4">
              Your trusted marketplace for buying and selling quality pre-owned vehicles. We make car trading simple, transparent, and hassle-free.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/buy-car" className="text-gray-400 hover:text-white">Buy Car</Link>
              </li>
              <li>
                <Link to="/sell-car" className="text-gray-400 hover:text-white">Sell Car</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-400 hover:text-white">FAQs</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Car Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/buy-car?category=sedan" className="text-gray-400 hover:text-white">Sedans</Link>
              </li>
              <li>
                <Link to="/buy-car?category=suv" className="text-gray-400 hover:text-white">SUVs</Link>
              </li>
              <li>
                <Link to="/buy-car?category=hatchback" className="text-gray-400 hover:text-white">Hatchbacks</Link>
              </li>
              <li>
                <Link to="/buy-car?category=luxury" className="text-gray-400 hover:text-white">Luxury Cars</Link>
              </li>
              <li>
                <Link to="/buy-car?category=electric" className="text-gray-400 hover:text-white">Electric Cars</Link>
              </li>
              <li>
                <Link to="/buy-car?budget=under-5-lakh" className="text-gray-400 hover:text-white">Budget Cars</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <PhoneCall className="h-5 w-5 mr-3 text-gray-400" />
                <span className="text-gray-400">+91 1234567890</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-3 text-gray-400" />
                <span className="text-gray-400">info@wheelsxchange.com</span>
              </li>
              <li className="flex">
                <MapPin className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">123 Car Street, Auto City, Vehicle State, India - 123456</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link to="/refund-policy" className="text-gray-400 hover:text-white text-sm">
              Refund Policy
            </Link>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} WheelsXchange. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
