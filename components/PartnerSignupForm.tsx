
import React, { useState } from 'react';
import { Building2, Mail, User, Globe, Phone, CheckCircle, ArrowRight, LogIn } from 'lucide-react';

interface PartnerSignupFormProps {
  onSuccess: () => void;
  onLogin: () => void;
}

export const PartnerSignupForm: React.FC<PartnerSignupFormProps> = ({ onSuccess, onLogin }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(onSuccess, 3000); // Redirect after 3s
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 animate-fade-in">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Received!</h2>
        <p className="text-gray-600 max-w-md mb-8 text-lg">
          Thank you for your interest in partnering with ImmiPlanner. Our B2B team will review your agency details and contact you within 24 hours.
        </p>
        <p className="text-sm text-gray-400">Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 my-10 animate-fade-in relative">
      
      {/* Login Shortcut */}
      <div className="absolute top-6 right-6 md:top-12 md:right-12">
          <button 
            onClick={onLogin}
            className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:bg-blue-50 px-3 py-2 rounded-lg transition"
          >
             Already a Partner? Login <LogIn size={16}/>
          </button>
      </div>

      <div className="text-center mb-10 mt-6 md:mt-0">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-6">
          <Building2 size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Become a Partner</h1>
        <p className="text-gray-600">Join the network of 500+ immigration consultancies using our AI infrastructure.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Agency Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input required type="text" className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="Global Migration Inc." />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Contact Person</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input required type="text" className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="Jane Doe" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input required type="email" className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="jane@agency.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input required type="tel" className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="+1 (555) 000-0000" />
            </div>
          </div>
        </div>

        <div>
           <label className="block text-sm font-bold text-gray-900 mb-2">Website / LinkedIn</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="url" className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="https://www.agency.com" />
            </div>
        </div>

        <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Primary Service Area</label>
            <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                <option>Student Visas</option>
                <option>Express Entry / PR</option>
                <option>Business Immigration</option>
                <option>Family Sponsorship</option>
                <option>Refugee / Asylum</option>
            </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2 text-lg mt-4">
          Submit Application <ArrowRight size={20} />
        </button>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          By submitting, you agree to our Partner Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
};
