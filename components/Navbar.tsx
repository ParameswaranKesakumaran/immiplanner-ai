
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, LogOut, Menu, X, ShieldCheck, Briefcase, User, ChevronDown, Calendar, DollarSign, CreditCard, LayoutDashboard, Settings } from 'lucide-react';
import { UserType } from '../types';

interface NavbarProps {
  userType: UserType | null;
  onLogout: () => void;
  onSwitchView: (view: string) => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({ userType, onLogout, onSwitchView, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = (view: string) => {
      onSwitchView(view);
      setIsUserDropdownOpen(false);
      setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer" 
          onClick={() => onSwitchView('home')}
        >
          <div className="bg-red-600 p-1.5 rounded-lg shadow-md">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-900 tracking-tight">
            ImmiPlanner<span className="text-red-600">.AI</span>
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          {userType ? (
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4 md:mt-0">
              
              {/* Quick Access Items */}
              <button 
                onClick={() => onSwitchView(userType === 'Partner' ? 'partner-dashboard' : 'user-dashboard')}
                className={`text-sm font-medium px-3 py-2 rounded-lg transition flex items-center gap-2 ${currentView.includes('dashboard') ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                 <LayoutDashboard size={16} /> Dashboard
              </button>

              {/* Find Jobs - Visible for Students/Workers */}
              {(userType === UserType.Student || userType === UserType.Worker) && (
                <button 
                  onClick={() => onSwitchView('jobs-finder')}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition flex items-center gap-2 ${currentView === 'jobs-finder' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <Briefcase size={16} /> Find Jobs
                </button>
              )}

              <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition border border-transparent hover:border-gray-200 focus:ring-2 focus:ring-gray-100"
                  >
                     <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 border border-gray-200">
                        <User size={16}/>
                     </div>
                     <div className="text-left hidden sm:block">
                        <span className="block text-gray-900 leading-none">{userType === 'SuperAdmin' ? 'Admin' : userType}</span>
                     </div>
                     <ChevronDown size={14} className={`text-gray-400 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                     <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                           <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">My Account</p>
                        </div>
                        <div className="py-1">
                           {/* Appointments - For Everyone */}
                           <button onClick={() => handleDropdownClick('appointments')} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                              <Calendar size={16} className="text-blue-500"/> Appointments
                           </button>

                           {/* Availability - Partners Only */}
                           {userType === UserType.Partner && (
                               <button onClick={() => handleDropdownClick('availability')} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                  <Settings size={16} className="text-gray-500"/> My Calendar (Edit)
                               </button>
                           )}

                           {/* Subscription - For Everyone (Different Logic) */}
                           <button onClick={() => handleDropdownClick('subscription')} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                              <CreditCard size={16} className="text-purple-500"/> Subscription & Billing
                           </button>

                           {/* Commission - Partners Only */}
                           {userType === UserType.Partner && (
                               <button onClick={() => handleDropdownClick('commission')} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                  <DollarSign size={16} className="text-green-600"/> Commissions
                               </button>
                           )}
                        </div>
                        <div className="border-t border-gray-100 py-1">
                           <button onClick={onLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                              <LogOut size={16}/> Logout
                           </button>
                        </div>
                     </div>
                  )}
              </div>
            </div>
          ) : (
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white items-center">
              {/* Standard Links */}
              <li>
                <button 
                  onClick={() => onSwitchView('home')} 
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSwitchView('jobs-finder')}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0"
                >
                  Find Jobs
                </button>
              </li>
              <li>
                <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0">
                  Blog
                </button>
              </li>

              {/* Admin Access (Subtle) */}
              <li>
                 <button 
                    onClick={() => onSwitchView('super-admin-login')}
                    className="block py-2 px-3 text-gray-400 text-sm hover:text-gray-600 md:p-0 flex items-center gap-1"
                >
                   <ShieldCheck size={14}/> Admin
                </button>
              </li>

              {/* Actions */}
              <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0 md:ml-4">
                <button 
                    onClick={() => onSwitchView('partner-signup')}
                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                    Partner Signup/Login
                </button>
                <button
                    onClick={() => onSwitchView('applicant-login')} 
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center shadow-lg shadow-red-200"
                >
                    Applicant Signup/Login
                </button>
              </div>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};
