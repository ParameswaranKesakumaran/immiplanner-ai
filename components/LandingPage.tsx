import React, { useState } from 'react';
import { Globe, Star, CheckCircle2, ArrowRight, Scale, UserCheck, Briefcase, GraduationCap } from 'lucide-react';
import { UserType } from '../types';

interface LandingPageProps {
  onStartAssessment: (type: UserType) => void;
  onSelectCountry: (countryName: string) => void;
}

const COUNTRIES = [
  { name: 'Canada', flag: '🇨🇦', description: 'Express Entry, PNP, & Study Pathways', active: true, consultants: 120, lawyers: 45 },
  { name: 'Australia', flag: '🇦🇺', description: 'SkillSelect & Subclass Visas', active: false, consultants: 85, lawyers: 30 },
  { name: 'UK', flag: '🇬🇧', description: 'Skilled Worker & Graduate Routes', active: false, consultants: 90, lawyers: 50 },
  { name: 'USA', flag: '🇺🇸', description: 'H-1B, Green Cards & O-1', active: false, consultants: 200, lawyers: 150 },
];

const EXPERTS = [
  { id: 1, name: 'Global Visa Solutions', type: 'Consultancy', country: 'Canada', rating: 4.9, reviews: 340, image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80' },
  { id: 2, name: 'Maple Legal Group', type: 'Law Firm', country: 'Canada', rating: 5.0, reviews: 120, image: 'https://images.unsplash.com/photo-1556157382-97eda2d6229b?auto=format&fit=crop&w=200&q=80' },
  { id: 3, name: 'Oz Migration', type: 'Consultancy', country: 'Australia', rating: 4.8, reviews: 210, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
  { id: 4, name: 'UK Pathways', type: 'Law Firm', country: 'UK', rating: 4.9, reviews: 88, image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=200&q=80' },
];

const SUCCESS_STORIES = [
  { id: 1, name: "Elena R.", outcome: "PR Approved in 6 Months", quote: "ImmiPlanner's AI assessment was spot on. It suggested a PNP stream I didn't know about!", image: "https://randomuser.me/api/portraits/women/44.jpg", from: "Brazil", to: "Canada" },
  { id: 2, name: "Rajesh K.", outcome: "Study Permit + Part-time Job", quote: "Found the perfect college in Ontario and got my visa sorted. The dashboard kept me organized.", image: "https://randomuser.me/api/portraits/men/32.jpg", from: "India", to: "Canada" },
  { id: 3, name: "Chen Wei", outcome: "Start-up Visa Success", quote: "Connecting with a verified lawyer through this platform made my business immigration seamless.", image: "https://randomuser.me/api/portraits/men/85.jpg", from: "China", to: "Canada" },
];

const PARTNERS = [
  "EduWorld", "VisaFast", "GlobalSettlement", "MapleConnect", "PathFinder", "StudyAbroad Inc"
];

export const LandingPage: React.FC<LandingPageProps> = ({ onStartAssessment, onSelectCountry }) => {
  const [activeTab, setActiveTab] = useState<'Consultants' | 'Lawyers'>('Consultants');

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-6">
            🚀 The #1 AI-Powered Immigration Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
            Your Journey to <span className="text-red-600">Global Citizenship</span> <br className="hidden md:block"/> Starts Here.
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Navigate complex immigration rules with AI. Connect with top-rated consultants. 
            Find your perfect study or work pathway in minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => onStartAssessment(UserType.Student)}
              className="px-8 py-4 bg-red-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-red-200 hover:bg-red-700 transition hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <GraduationCap /> Start Student Assessment
            </button>
            <button 
               onClick={() => onStartAssessment(UserType.Worker)}
               className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 transition hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Briefcase /> Check Work Eligibility
            </button>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-red-100 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Choose Your Destination */}
      <section id="destinations" className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Destination</h2>
           <p className="text-gray-500 max-w-2xl mx-auto">Select a country to see specific visa requirements, consultants, and legal experts.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COUNTRIES.map((country) => (
            <div 
              key={country.name}
              onClick={() => country.active && onSelectCountry(country.name)}
              className={`group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer overflow-hidden
                ${!country.active && 'opacity-70 grayscale'}`}
            >
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition duration-300">{country.flag}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{country.name}</h3>
              <p className="text-sm text-gray-500 mb-4 h-10">{country.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3">
                 <span>{country.consultants} Consultants</span>
                 <span>{country.lawyers} Lawyers</span>
              </div>

              {country.active ? (
                 <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              ) : (
                 <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px]">
                    <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">Coming Soon</span>
                 </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Expert Directory */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div className="mb-6 md:mb-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Trusted Experts</h2>
                  <p className="text-gray-500">Verified professionals to guide your application.</p>
              </div>
              <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex">
                  <button 
                    onClick={() => setActiveTab('Consultants')}
                    className={`px-6 py-2 rounded-md text-sm font-bold transition ${activeTab === 'Consultants' ? 'bg-red-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    Immigration Consultants
                  </button>
                  <button 
                    onClick={() => setActiveTab('Lawyers')}
                    className={`px-6 py-2 rounded-md text-sm font-bold transition ${activeTab === 'Lawyers' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    Immigration Lawyers
                  </button>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {EXPERTS
                .filter(e => (activeTab === 'Consultants' ? e.type === 'Consultancy' : e.type === 'Law Firm'))
                .map((expert) => (
                  <div key={expert.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition group">
                      <div className="h-24 bg-gray-200 relative">
                          <img src={expert.image} alt="Office" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
                      </div>
                      <div className="p-5 pt-8 relative">
                          <div className="absolute -top-10 left-5 w-16 h-16 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center text-2xl font-bold text-gray-300">
                             {expert.name.charAt(0)}
                          </div>
                          <div className="mb-1">
                             <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wide">{expert.country}</span>
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg mb-1">{expert.name}</h3>
                          <div className="flex items-center gap-1 mb-4">
                              <Star size={14} className="text-yellow-400 fill-current" />
                              <span className="text-sm font-bold text-gray-900">{expert.rating}</span>
                              <span className="text-xs text-gray-400">({expert.reviews} reviews)</span>
                          </div>
                          <button className="w-full py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition">
                              View Profile
                          </button>
                      </div>
                  </div>
              ))}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 flex flex-col justify-center items-center text-center text-white">
                  <h3 className="text-xl font-bold mb-2">See All {activeTab}</h3>
                  <p className="text-gray-400 text-sm mb-6">Browse 500+ verified experts across 4 countries.</p>
                  <button className="bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition">
                      View Full Directory
                  </button>
              </div>
           </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 max-w-7xl mx-auto px-4">
         <div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
           <p className="text-gray-500">Real people, real dreams achieved.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {SUCCESS_STORIES.map((story) => (
              <div key={story.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative">
                  <div className="absolute top-8 right-8 text-6xl text-red-50 font-serif">"</div>
                  <div className="flex items-center gap-4 mb-6">
                      <img src={story.image} alt={story.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
                      <div>
                          <h4 className="font-bold text-gray-900">{story.name}</h4>
                          <p className="text-xs text-gray-500">{story.from} ➔ {story.to}</p>
                      </div>
                  </div>
                  <p className="text-gray-600 italic mb-6 relative z-10">{story.quote}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold">
                      <CheckCircle2 size={12} /> {story.outcome}
                  </div>
              </div>
           ))}
        </div>
      </section>

      {/* Partners Strip */}
      <section className="py-12 border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4">
              <p className="text-center text-sm text-gray-400 font-semibold uppercase tracking-widest mb-8">Trusted by Leading Immigration Firms</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                  {PARTNERS.map((partner, idx) => (
                      <span key={idx} className="text-xl md:text-2xl font-black text-gray-800">{partner}</span>
                  ))}
              </div>
          </div>
      </section>

    </div>
  );
};
