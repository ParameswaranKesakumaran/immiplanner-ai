
import React, { useState } from 'react';
import { Lead, UserType } from '../types';
import { Search, Bell, MoreHorizontal, Calendar, FileText, Filter, Copy, Check, X, Lock, Eye, FileCheck, Send, ChevronDown, Shield, GraduationCap, Plane, Users, LayoutDashboard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', status: 'New', score: 85, type: UserType.Worker, lastActive: '2 hrs ago' },
  { id: '2', name: 'Mohammed Ali', email: 'm.ali@example.com', status: 'Consultation Booked', score: 92, type: UserType.Student, lastActive: '10 mins ago' },
  { id: '3', name: 'Li Wei', email: 'li.wei@example.com', status: 'In Progress', score: 74, type: UserType.Worker, lastActive: '1 day ago' },
  { id: '4', name: 'Priya Patel', email: 'priya.p@example.com', status: 'New', score: 60, type: UserType.Student, lastActive: '5 hrs ago' },
  { id: '5', name: 'Carlos Rodriguez', email: 'carlos.r@example.com', status: 'Visa Approved', score: 98, type: UserType.Worker, lastActive: '1 week ago' },
];

const MOCK_ADMISSIONS = [
  { id: 'A1', clientName: 'Priya Patel', institution: 'Seneca College', program: 'Project Management', intake: 'Jan 2025', status: 'Offer Received', lastUpdate: '2 days ago' },
  { id: 'A2', clientName: 'Mohammed Ali', institution: 'Lambton College', program: 'Computer Software', intake: 'May 2025', status: 'Applied', lastUpdate: '1 week ago' },
  { id: 'A3', clientName: 'Chen Lu', institution: 'University of Toronto', program: 'Data Science', intake: 'Sept 2025', status: 'Docs Pending', lastUpdate: '3 days ago' },
  { id: 'A4', clientName: 'Amara Diop', institution: 'Humber College', program: 'Global Business', intake: 'Jan 2025', status: 'LOA Received', lastUpdate: 'Yesterday' },
];

const MOCK_VISAS = [
  { id: 'V1', clientName: 'Sarah Jenkins', type: 'Express Entry (CEC)', fileNumber: 'E12345678', status: 'ITA Received', timeline: 'Processing', nextAction: 'Submit PR Application' },
  { id: 'V2', clientName: 'Carlos Rodriguez', type: 'Work Permit', fileNumber: 'W98765432', status: 'Approved', timeline: 'Completed', nextAction: 'Prepare Landing' },
  { id: 'V3', clientName: 'Li Wei', type: 'PNP (OINP)', fileNumber: 'P45612378', status: 'Nomination Received', timeline: 'Processing', nextAction: 'Apply for PR' },
  { id: 'V4', clientName: 'Amara Diop', type: 'Study Permit', fileNumber: 'S78945612', status: 'Biometrics Needed', timeline: 'Action Required', nextAction: 'Book Biometrics' },
];

const STATS_DATA = [
  { name: 'Mon', leads: 12 },
  { name: 'Tue', leads: 19 },
  { name: 'Wed', leads: 15 },
  { name: 'Thu', leads: 22 },
  { name: 'Fri', leads: 30 },
  { name: 'Sat', leads: 10 },
  { name: 'Sun', leads: 5 },
];

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

const AccessControlModal: React.FC<AccessModalProps> = ({ isOpen, onClose, lead }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Student');
  const [sentAccess, setSentAccess] = useState<string | null>(null);

  if (!isOpen || !lead) return null;

  const handleGrantAccess = (type: string) => {
    // Simulate API call
    setSentAccess(type);
    setTimeout(() => {
      setSentAccess(null);
      onClose();
      alert(`Access granted to ${lead.name}: ${type}`);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Manage Client Access</h3>
            <p className="text-sm text-gray-500">Lead: <span className="font-semibold text-blue-600">{lead.name}</span></p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition hover:bg-gray-200">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Option 1: Form Only */}
          <div className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Assessment Form Only</h4>
                  <p className="text-xs text-gray-500">Client fills data, sees NO results. Data appears in your dashboard.</p>
                </div>
              </div>
              {sentAccess === 'form' ? (
                <span className="text-green-600 text-sm font-bold flex items-center gap-1"><Check size={16}/> Sent</span>
              ) : (
                <button 
                  onClick={() => handleGrantAccess('form')}
                  className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition"
                >
                  Send Form
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-xs text-gray-500 uppercase font-medium">AI Report Access</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Pathway Context</label>
            <div className="grid grid-cols-2 gap-2 mb-4">
               <button 
                  onClick={() => setSelectedCategory('Student')}
                  className={`py-2 text-sm font-medium rounded-lg border transition-all ${selectedCategory === 'Student' ? 'bg-white border-blue-500 text-blue-700 shadow-sm' : 'bg-transparent border-transparent text-gray-500 hover:bg-white'}`}
               >
                 Student Pathway
               </button>
               <button 
                  onClick={() => setSelectedCategory('Worker')}
                  className={`py-2 text-sm font-medium rounded-lg border transition-all ${selectedCategory === 'Worker' ? 'bg-white border-blue-500 text-blue-700 shadow-sm' : 'bg-transparent border-transparent text-gray-500 hover:bg-white'}`}
               >
                 Worker / PR
               </button>
            </div>

            {/* Option 2: Preview */}
            <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3 flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <Eye size={18} className="text-orange-500" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">AI Report Preview</h4>
                    <p className="text-[10px] text-gray-500">Client sees Score & Basic Eligibility for {selectedCategory}.</p>
                  </div>
               </div>
               {sentAccess === 'preview' ? (
                  <span className="text-green-600 text-sm font-bold flex items-center gap-1"><Check size={16}/> Granted</span>
                ) : (
                  <button 
                    onClick={() => handleGrantAccess(`preview-${selectedCategory}`)}
                    className="text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1"
                  >
                    Grant Preview
                  </button>
                )}
            </div>

            {/* Option 3: Detailed */}
            <div className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <FileCheck size={18} className="text-green-600" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Detailed AI Report</h4>
                    <p className="text-[10px] text-gray-500">Full access to detailed analysis & advice for {selectedCategory}.</p>
                  </div>
               </div>
               {sentAccess === 'detailed' ? (
                  <span className="text-green-600 text-sm font-bold flex items-center gap-1"><Check size={16}/> Granted</span>
                ) : (
                  <button 
                    onClick={() => handleGrantAccess(`detailed-${selectedCategory}`)}
                    className="text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1"
                  >
                    Grant Full Access
                  </button>
                )}
            </div>
          </div>

        </div>
        <div className="bg-gray-50 p-4 text-center">
           <p className="text-xs text-gray-400">Changes are logged in the activity history.</p>
        </div>
      </div>
    </div>
  );
};

type PartnerTab = 'dashboard' | 'clients' | 'admissions' | 'visas';

export const PartnerDashboard: React.FC = () => {
  const PARTNER_ID = "PARTNER-001"; // Mock ID for current session
  const [activeTab, setActiveTab] = useState<PartnerTab>('dashboard');
  const [copied, setCopied] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  const referralLink = `${window.location.origin}?partnerId=${PARTNER_ID}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleActionClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsAccessModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <AccessControlModal 
        isOpen={isAccessModalOpen} 
        onClose={() => setIsAccessModalOpen(false)} 
        lead={selectedLead} 
      />

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partner Portal</h1>
          <p className="text-gray-500">Welcome back, Global Migration Inc.</p>
        </div>
        <div className="flex gap-3 items-center">
            <button className="p-2 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500 transform translate-x-1/4 -translate-y-1/4"></span>
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 flex items-center gap-2 shadow-sm">
                <Users size={18} /> + Add Client
            </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border border-gray-100 rounded-xl p-1.5 mb-8 flex overflow-x-auto shadow-sm w-full md:w-fit">
         <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
         >
           <LayoutDashboard size={18}/> Dashboard
         </button>
         <button 
            onClick={() => setActiveTab('clients')}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'clients' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
         >
           <Users size={18}/> Clients
         </button>
         <button 
            onClick={() => setActiveTab('admissions')}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'admissions' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
         >
           <GraduationCap size={18}/> Admissions
         </button>
         <button 
            onClick={() => setActiveTab('visas')}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'visas' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
         >
           <Plane size={18}/> Visa Applications
         </button>
      </div>

      {/* --- VIEW: DASHBOARD --- */}
      {activeTab === 'dashboard' && (
        <div className="animate-fade-in space-y-8">
             {/* Invite Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-lg font-bold mb-1">Invite Clients to Apply</h3>
                        <p className="text-blue-100 text-sm opacity-90">Share this link. When clients complete the form, their data will appear here automatically.</p>
                    </div>
                    <div className="flex w-full md:w-auto bg-white/10 rounded-lg p-1.5 border border-white/20">
                        <input 
                            readOnly 
                            value={referralLink} 
                            className="bg-transparent text-white text-sm px-3 py-1.5 outline-none w-full md:w-64 placeholder-blue-200 truncate"
                        />
                        <button 
                            onClick={copyToClipboard}
                            className="bg-white text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 transition"
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? "Copied" : "Copy"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Total Active Leads</p>
                    <h2 className="text-3xl font-bold text-gray-900">142</h2>
                    <span className="text-xs text-green-600 font-medium">+12% from last month</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Consultations Booked</p>
                    <h2 className="text-3xl font-bold text-gray-900">28</h2>
                    <span className="text-xs text-green-600 font-medium">+5% from last week</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Pending Admissions</p>
                    <h2 className="text-3xl font-bold text-gray-900">14</h2>
                    <span className="text-xs text-gray-500">School Applications</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Revenue (This Month)</p>
                    <h2 className="text-3xl font-bold text-gray-900">$4,250</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Leads Table */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Recent Activity</h3>
                        <button 
                            onClick={() => setActiveTab('clients')} 
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Type</th>
                                    <th className="px-6 py-3">Score</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_LEADS.slice(0, 4).map(lead => (
                                    <tr key={lead.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 flex flex-col">
                                            <span>{lead.name}</span>
                                            <span className="text-xs text-gray-400">{lead.lastActive}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${lead.type === UserType.Worker ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                                {lead.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`font-bold ${lead.score > 80 ? 'text-green-600' : lead.score > 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                {lead.score}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium
                                                ${lead.status === 'New' ? 'bg-blue-50 text-blue-600' : 
                                                lead.status === 'Consultation Booked' ? 'bg-orange-50 text-orange-600' :
                                                lead.status === 'Visa Approved' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}
                                            `}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button 
                                                onClick={() => handleActionClick(lead)}
                                                className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition"
                                            >
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Lead Volume</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={STATS_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Bar dataKey="leads" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* --- VIEW: CLIENTS --- */}
      {activeTab === 'clients' && (
          <div className="animate-fade-in bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                     <h3 className="font-bold text-gray-900">Client Directory</h3>
                     <p className="text-sm text-gray-500">Manage all your leads and active clients.</p>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                      <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Search clients..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-full md:w-64" />
                      </div>
                      <button className="text-gray-600 hover:bg-gray-50 p-2 rounded-lg border border-gray-200"><Filter size={18} /></button>
                  </div>
              </div>
              <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                              <th className="px-6 py-3">Client Name</th>
                              <th className="px-6 py-3">Contact</th>
                              <th className="px-6 py-3">Type</th>
                              <th className="px-6 py-3">Status</th>
                              <th className="px-6 py-3">AI Score</th>
                              <th className="px-6 py-3">Last Active</th>
                              <th className="px-6 py-3">Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {MOCK_LEADS.map(lead => (
                              <tr key={lead.id} className="bg-white border-b hover:bg-gray-50">
                                  <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
                                  <td className="px-6 py-4 text-xs">{lead.email}</td>
                                  <td className="px-6 py-4">
                                      <span className={`px-2 py-1 rounded-full text-xs ${lead.type === UserType.Worker ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                          {lead.type}
                                      </span>
                                  </td>
                                  <td className="px-6 py-4">
                                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">{lead.status}</span>
                                  </td>
                                  <td className="px-6 py-4">
                                      <span className={`font-bold ${lead.score > 80 ? 'text-green-600' : 'text-yellow-600'}`}>{lead.score}</span>
                                  </td>
                                  <td className="px-6 py-4 text-xs">{lead.lastActive}</td>
                                  <td className="px-6 py-4">
                                     <button onClick={() => handleActionClick(lead)} className="text-blue-600 hover:underline text-xs font-bold">Manage</button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
              <div className="p-4 border-t border-gray-100 text-center">
                 <button className="text-sm text-gray-500 hover:text-gray-900 font-medium">Load More Clients</button>
              </div>
          </div>
      )}

      {/* --- VIEW: ADMISSIONS --- */}
      {activeTab === 'admissions' && (
          <div className="animate-fade-in space-y-6">
              <div className="flex justify-between items-center">
                 <div>
                    <h2 className="text-xl font-bold text-gray-900">School Admissions</h2>
                    <p className="text-sm text-gray-500">Track college and university applications.</p>
                 </div>
                 <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm">
                    + New Application
                 </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                              <tr>
                                  <th className="px-6 py-3">Student</th>
                                  <th className="px-6 py-3">Institution</th>
                                  <th className="px-6 py-3">Program</th>
                                  <th className="px-6 py-3">Intake</th>
                                  <th className="px-6 py-3">Status</th>
                                  <th className="px-6 py-3">Updated</th>
                                  <th className="px-6 py-3">Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                              {MOCK_ADMISSIONS.map(adm => (
                                  <tr key={adm.id} className="bg-white border-b hover:bg-gray-50">
                                      <td className="px-6 py-4 font-medium text-gray-900">{adm.clientName}</td>
                                      <td className="px-6 py-4 text-blue-600 font-medium">{adm.institution}</td>
                                      <td className="px-6 py-4">{adm.program}</td>
                                      <td className="px-6 py-4">{adm.intake}</td>
                                      <td className="px-6 py-4">
                                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border
                                              ${adm.status === 'Offer Received' ? 'bg-green-50 text-green-700 border-green-200' : 
                                                adm.status === 'LOA Received' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                adm.status === 'Applied' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-600 border-gray-200'}
                                          `}>
                                              {adm.status}
                                          </span>
                                      </td>
                                      <td className="px-6 py-4 text-xs">{adm.lastUpdate}</td>
                                      <td className="px-6 py-4">
                                          <button className="text-gray-400 hover:text-gray-900"><MoreHorizontal size={18}/></button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      )}

      {/* --- VIEW: VISAS --- */}
      {activeTab === 'visas' && (
          <div className="animate-fade-in space-y-6">
              <div className="flex justify-between items-center">
                 <div>
                    <h2 className="text-xl font-bold text-gray-900">Visa Applications</h2>
                    <p className="text-sm text-gray-500">Manage immigration files and government submissions.</p>
                 </div>
                 <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 shadow-sm">
                    + Create File
                 </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                              <tr>
                                  <th className="px-6 py-3">Applicant</th>
                                  <th className="px-6 py-3">Visa Type</th>
                                  <th className="px-6 py-3">File #</th>
                                  <th className="px-6 py-3">Status</th>
                                  <th className="px-6 py-3">Next Action</th>
                                  <th className="px-6 py-3">Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                              {MOCK_VISAS.map(visa => (
                                  <tr key={visa.id} className="bg-white border-b hover:bg-gray-50">
                                      <td className="px-6 py-4 font-medium text-gray-900">{visa.clientName}</td>
                                      <td className="px-6 py-4">{visa.type}</td>
                                      <td className="px-6 py-4 font-mono text-xs">{visa.fileNumber}</td>
                                      <td className="px-6 py-4">
                                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border
                                              ${visa.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' : 
                                                visa.status === 'ITA Received' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                'bg-orange-50 text-orange-700 border-orange-200'}
                                          `}>
                                              {visa.status}
                                          </span>
                                      </td>
                                      <td className="px-6 py-4 text-xs font-medium text-red-600">{visa.nextAction}</td>
                                      <td className="px-6 py-4">
                                          <button className="text-gray-400 hover:text-gray-900"><MoreHorizontal size={18}/></button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};
