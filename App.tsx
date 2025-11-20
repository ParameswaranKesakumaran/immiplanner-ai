
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AssessmentForm } from './components/AssessmentForm';
import { UserDashboard } from './components/UserDashboard';
import { PartnerDashboard } from './components/PartnerDashboard';
import { SuperAdminDashboard } from './components/SuperAdminDashboard';
import { LandingPage } from './components/LandingPage';
import { PartnerSignupForm } from './components/PartnerSignupForm';
import { JobsFinder } from './components/JobsFinder';
import { CanadaLandingPage } from './components/CanadaLandingPage';
import { AppointmentsView, AvailabilityView, SubscriptionView, CommissionView } from './components/ProfileFeatures';
import { analyzeProfile } from './services/geminiService';
import { UserType, UserProfile, AIAnalysisResult } from './types';

type ViewState = 
  | 'home' 
  | 'canada-landing'
  | 'country-selection' 
  | 'applicant-login'
  | 'assessment' 
  | 'user-dashboard' 
  | 'partner-dashboard' 
  | 'super-admin-dashboard' 
  | 'partner-signup' 
  | 'jobs-finder'
  | 'appointments'
  | 'availability'
  | 'subscription'
  | 'commission';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AIAnalysisResult | null>(null);
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  
  // Tracking for Partner Referral
  const [referralPartnerId, setReferralPartnerId] = useState<string | null>(null);

  // Check URL for partnerId on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pId = params.get('partnerId');
    if (pId) {
      setReferralPartnerId(pId);
      console.log("Partner Referral Detected:", pId);
      // Optionally auto-direct to landing page if deep linked
      setView('canada-landing');
    }
  }, []);

  const handleStartAssessment = (type: UserType) => {
    setUserType(type);
    setView('assessment');
  };

  const handleAssessmentSubmit = async (data: UserProfile) => {
    if (!userType) return;
    setIsLoading(true);

    // Attach referral ID if it exists
    const profileWithReferral = {
      ...data,
      partnerId: referralPartnerId || undefined
    };

    setCurrentProfile(profileWithReferral);
    
    try {
      const result = await analyzeProfile(profileWithReferral, userType);
      setAssessmentResult(result);
      setView('user-dashboard');
    } catch (error) {
      console.error("Assessment failed", error);
      alert("Something went wrong with the AI assessment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setAssessmentResult(null);
    setCurrentProfile(null);
    setView('home');
  };

  const handleNavigation = (target: string) => {
    if (target === 'home') {
      setView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'super-admin-login') {
       setUserType(UserType.SuperAdmin);
       setView('super-admin-dashboard');
    } else if (target === 'partner-login') {
       setUserType(UserType.Partner);
       setView('partner-dashboard');
    } else if (target === 'partner-signup') {
       setView('partner-signup');
    } else if (target === 'applicant-login') {
      // Use the Canada landing page as the main portal entry for now
      setView('canada-landing');
    } else if (target === 'country-selection') {
       if (view === 'home') {
        const element = document.getElementById('destinations');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        setView('home');
        setTimeout(() => {
          const element = document.getElementById('destinations');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
       setView(target as ViewState);
    }
  };

  const handleCountrySelect = (countryName: string) => {
    if (countryName === 'Canada') {
       setView('canada-landing');
    } else {
      alert(`${countryName} module is coming soon!`);
    }
  };

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">ImmiPlanner<span className="text-red-500">.AI</span></h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            The world's first AI-driven immigration lifecycle platform. Simplifying pathways for students, workers, and families.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><button onClick={() => handleNavigation('home')} className="hover:text-white">Home</button></li>
            <li><button onClick={() => handleNavigation('partner-signup')} className="hover:text-white">Become a Partner</button></li>
            <li><button className="hover:text-white">Find a Consultant</button></li>
            <li><button className="hover:text-white">Success Stories</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><button className="hover:text-white">Blog</button></li>
            <li><button className="hover:text-white">Visa Guides</button></li>
            <li><button className="hover:text-white">CRS Calculator</button></li>
            <li><button className="hover:text-white">Admin Portal</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <p className="text-sm text-gray-400 mb-2">support@immiplanner.ai</p>
          <p className="text-sm text-gray-400">+1 (647) 000-0000</p>
          <div className="mt-4 flex gap-4">
             <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">X</div>
             <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">In</div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
        © 2025 ImmiPlanner AI Inc. All rights reserved.
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16 relative">
      <Navbar 
        userType={userType} 
        onLogout={handleLogout} 
        onSwitchView={handleNavigation} 
        currentView={view}
      />

      {/* Partner Referral Banner (if active) */}
      {referralPartnerId && !userType && (
        <div className="bg-blue-600 text-white text-center py-2 px-4 text-sm font-medium">
          You have been invited by Partner ID: <span className="font-bold underline">{referralPartnerId}</span>. 
          Your assessment will be shared with your consultant.
        </div>
      )}

      <main className="flex-grow">
        {view === 'home' && (
          <LandingPage 
            onStartAssessment={handleStartAssessment}
            onSelectCountry={handleCountrySelect}
          />
        )}

        {view === 'canada-landing' && (
          <CanadaLandingPage 
            onStartAssessment={handleStartAssessment}
            onSwitchView={handleNavigation}
          />
        )}

        {view === 'partner-signup' && (
          <PartnerSignupForm 
            onSuccess={() => setView('home')} 
            onLogin={() => {
              setUserType(UserType.Partner);
              setView('partner-dashboard');
            }}
          />
        )}

        {view === 'assessment' && userType && (
          <div className="px-4 py-8">
             <AssessmentForm userType={userType} onSubmit={handleAssessmentSubmit} isLoading={isLoading} />
          </div>
        )}

        {view === 'user-dashboard' && assessmentResult && currentProfile && (
          <div className="px-4 py-8">
            <UserDashboard 
              results={assessmentResult} 
              userProfile={currentProfile} 
              onSwitchView={handleNavigation}
            />
          </div>
        )}
        
        {view === 'jobs-finder' && (
          <JobsFinder />
        )}

        {view === 'partner-dashboard' && (
          <div className="px-4 py-8">
             <PartnerDashboard />
          </div>
        )}

        {view === 'super-admin-dashboard' && (
          <div className="px-4 py-8">
            <SuperAdminDashboard />
          </div>
        )}

        {/* --- NEW PROFILE VIEWS --- */}

        {view === 'appointments' && userType && (
           <AppointmentsView userType={userType} />
        )}

        {view === 'availability' && userType && (
           <AvailabilityView userType={userType} />
        )}

        {view === 'subscription' && userType && (
           <SubscriptionView userType={userType} />
        )}

        {view === 'commission' && userType && (
           <CommissionView userType={userType} />
        )}

      </main>
      
      {(view === 'home' || view === 'canada-landing') && <Footer />}
    </div>
  );
};

export default App;
