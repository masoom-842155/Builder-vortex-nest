import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-slate-950 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-4">
            Stay updated with RepeatHarmony
          </h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Get the latest insights, tips, and updates delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">RepeatHarmony</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your personal AI-powered mental health companion for emotional
              well-being and inner peace.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Mobile App
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-slate-400 text-sm">
            © 2025 RepeatHarmony. All rights reserved.
          </div>

          <div className="flex space-x-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Language Selector */}
        <div className="text-center mt-8">
          <select className="bg-slate-800 border border-slate-700 text-slate-400 px-3 py-1 rounded text-sm">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
