
import React from 'react';
import { GraduationCap, Briefcase, Search, ArrowRight, LogIn, CheckCircle2, Plane } from 'lucide-react';
import { UserType } from '../types';

interface CanadaLandingPageProps {
  onStartAssessment: (type: UserType) => void;
  onSwitchView: (view: string) => void;
}

export const CanadaLandingPage: React.FC<CanadaLandingPageProps> = ({ onStartAssessment, onSwitchView }) => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero */}
      <div className="relative bg-red-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1965&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-900/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
          <div className="inline-flex items-center gap-2 bg-red-800/50 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium mb-8 border border-red-500 shadow-lg">
            <span className="text-xl">🇨🇦</span> <span className="tracking-wide uppercase font-bold">Welcome to Canada</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-sm">
            Your Future Starts Here
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
            Canada offers over 80 immigration programs. Select your profile below to let our AI engine find the perfect match for you.
          </p>
        </div>
      </div>

      {/* Options Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Student Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
            <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <div className="p-6 xl:p-8 flex flex-col flex-grow">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <GraduationCap size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">I am a Student</h3>
              <p className="text-gray-500 mb-6 leading-relaxed text-sm flex-grow">
                Check eligibility for study permits, find designated learning institutions (DLIs), and calculate post-graduation work permit (PGWP) timelines.
              </p>
              <div className="space-y-3 mb-8 bg-blue-50/50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0"/> 
                    <span>School Matching</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0"/> 
                    <span>Visa Probability</span>
                </div>
              </div>
              <button 
                onClick={() => onStartAssessment(UserType.Student)}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group-hover:gap-3 text-sm"
              >
                Start Assessment <ArrowRight size={16}/>
              </button>
            </div>
          </div>

          {/* Worker / PR Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
            <div className="h-2 bg-gradient-to-r from-red-500 to-red-600"></div>
            <div className="p-6 xl:p-8 flex flex-col flex-grow">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Briefcase size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Canadian PR</h3>
              <p className="text-gray-500 mb-6 leading-relaxed text-sm flex-grow">
                Calculate your CRS score for Express Entry, explore Provincial Nominee Programs (PNPs), and check direct PR eligibility.
              </p>
              <div className="space-y-3 mb-8 bg-red-50/50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle2 size={16} className="text-red-500 shrink-0"/> 
                    <span>CRS Calculator</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle2 size={16} className="text-red-500 shrink-0"/> 
                    <span>PNP Matcher</span>
                </div>
              </div>
              <button 
                onClick={() => onStartAssessment(UserType.Worker)}
                className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-200 flex items-center justify-center gap-2 group-hover:gap-3 text-sm"
              >
                Check Eligibility <ArrowRight size={16}/>
              </button>
            </div>
          </div>

          {/* Visitor Card (New) */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
            <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
            <div className="p-6 xl:p-8 flex flex-col flex-grow">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Plane size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Canada</h3>
              <p className="text-gray-500 mb-6 leading-relaxed text-sm flex-grow">
                Apply for a Visitor Visa (TRV), Super Visa for parents/grandparents, or check Electronic Travel Authorization (eTA) requirements.
              </p>
              <div className="space-y-3 mb-8 bg-purple-50/50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle2 size={16} className="text-purple-500 shrink-0"/> 
                    <span>Visitor Visa (TRV)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle2 size={16} className="text-purple-500 shrink-0"/> 
                    <span>Super Visa</span>
                </div>
              </div>
              <button 
                onClick={() => alert("Visitor assessment module is coming soon!")}
                className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-200 flex items-center justify-center gap-2 group-hover:gap-3 text-sm"
              >
                Check Eligibility <ArrowRight size={16}/>
              </button>
            </div>
          </div>

          {/* Job Seeker Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
            <div className="h-2 bg-gradient-to-r from-gray-700 to-gray-900"></div>
            <div className="p-6 xl:p-8 flex flex-col flex-grow">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-700 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Search size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Browse Jobs</h3>
              <p className="text-gray-500 mb-6 leading-relaxed text-sm flex-grow">
                Find LMIA-supported and LMIA-exempt jobs from Canadian employers looking for international talent.
              </p>
              <div className="space-y-3 mb-8 bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle2 size={16} className="text-gray-500 shrink-0"/> 
                    <span>Verified Employers</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle2 size={16} className="text-gray-500 shrink-0"/> 
                    <span>Salary Insights</span>
                </div>
              </div>
              <button 
                onClick={() => onSwitchView('jobs-finder')}
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200 flex items-center justify-center gap-2 group-hover:gap-3 text-sm"
              >
                Find Jobs <ArrowRight size={16}/>
              </button>
            </div>
          </div>

        </div>

        {/* Footer Link */}
        <div className="mt-16 text-center bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
           <p className="text-gray-500 mb-4 font-medium">Already have an ongoing application?</p>
           <button 
             onClick={() => alert("Redirecting to login portal...")} 
             className="inline-flex items-center gap-2 text-gray-700 font-bold bg-white border border-gray-200 hover:bg-gray-50 hover:text-blue-600 px-8 py-3 rounded-xl transition shadow-sm"
           >
             <LogIn size={20} /> Login to Applicant Portal
           </button>
        </div>
      </div>
    </div>
  );
};
