import { Link } from 'react-router-dom';
import { Vote, Twitter, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Vote className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold text-gray-900">VoteStream</span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              Interactive voting platform with real-time chat integration. 
              Engage with your community through polls, challenges, and prize draws.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/draws" className="text-gray-600 hover:text-gray-900">
                  Prize Draws
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="text-gray-600 hover:text-gray-900">
                  Challenges
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-gray-600 hover:text-gray-900">
                  Education
                </Link>
              </li>
              <li>
                <Link to="/referral" className="text-gray-600 hover:text-gray-900">
                  Referral Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} VoteStream. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;