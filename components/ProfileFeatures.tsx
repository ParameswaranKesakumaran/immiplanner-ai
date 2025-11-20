
import React, { useState } from 'react';
import { UserType, Appointment, CommissionRecord } from '../types';
import { Calendar, Clock, CreditCard, DollarSign, CheckCircle, XCircle, Video, User, Briefcase, TrendingUp, AlertCircle, ChevronRight, ShieldCheck } from 'lucide-react';

interface FeatureProps {
  userType: UserType;
}

// --- MOCK DATA ---
const MOCK_APPOINTMENTS: Appointment[] = [
  { id: '1', date: '2023-10-25', time: '10:00 AM', withPerson: 'Sarah Jenkins (RCIC)', type: 'Consultation', status: 'Confirmed', link: 'https://meet.google.com/abc' },
  { id: '2', date: '2023-10-20', time: '02:30 PM', withPerson: 'David Ross (Lawyer)', type: 'Follow-up', status: 'Completed' },
  { id: '3', date: '2023-11-02', time: '09:00 AM', withPerson: 'ImmiPlanner Advisor', type: 'Advising', status: 'Confirmed', link: 'https://meet.google.com/xyz' },
];

const MOCK_COMMISSIONS: CommissionRecord[] = [
  { id: '101', clientName: 'John Doe', applicationType: 'Study Permit', status: 'Landed', amount: 500, payoutStatus: 'Eligible', dateUpdated: '2023-10-01' },
  { id: '102', clientName: 'Maria Garcia', applicationType: 'Express Entry', status: 'Visa Approved', amount: 1200, payoutStatus: 'Pending', dateUpdated: '2023-10-15' },
  { id: '103', clientName: 'Ahmed Khan', applicationType: 'PNP Nomination', status: 'Application Submitted', amount: 800, payoutStatus: 'Pending', dateUpdated: '2023-09-20' },
];

// --- SUB-COMPONENTS ---

export const AppointmentsView: React.FC<FeatureProps> = ({ userType }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Calendar className="text-blue-600" /> My Appointments
      </h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {MOCK_APPOINTMENTS.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {MOCK_APPOINTMENTS.map((app) => (
              <div key={app.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-center min-w-[80px]">
                    <p className="text-xs text-blue-600 font-bold uppercase">{new Date(app.date).toLocaleDateString('en-US', { month: 'short' })}</p>
                    <p className="text-xl font-bold text-gray-900">{new Date(app.date).getDate()}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{app.withPerson}</h3>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <Clock size={14} /> {app.time} • {app.type}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                    ${app.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 
                      app.status === 'Completed' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'}`}>
                    {app.status}
                  </span>
                  {app.status === 'Confirmed' && app.link && (
                    <a href={app.link} target="_blank" rel="noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
                      <Video size={16} /> Join Call
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No appointments scheduled.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const AvailabilityView: React.FC<FeatureProps> = ({ userType }) => {
  // Simplified availability grid for demo
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const times = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];

  if (userType !== UserType.Partner) {
    return <div className="p-8 text-center">Access Restricted. Only Partners can manage availability.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Clock className="text-blue-600" /> My Availability Calendar
        </h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Save Changes</button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <p className="text-gray-500 mb-6">Select the time slots where you are available to accept new client consultations.</p>
        
        <div className="grid grid-cols-1 gap-6">
          {days.map((day) => (
            <div key={day} className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-100 pb-4 last:border-0">
              <div className="w-24 font-bold text-gray-900 text-lg mb-2 md:mb-0">{day}</div>
              <div className="flex flex-wrap gap-3">
                {times.map((time) => (
                  <label key={`${day}-${time}`} className="cursor-pointer select-none">
                    <input type="checkbox" className="peer sr-only" defaultChecked={Math.random() > 0.5} />
                    <div className="px-4 py-2 rounded-lg border border-gray-200 text-gray-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-checked:border-blue-500 transition-all text-sm font-medium">
                      {time}
                    </div>
                  </label>
                ))}
                <button className="text-blue-600 text-sm font-medium hover:underline px-2">+ Add Slot</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SubscriptionView: React.FC<FeatureProps> = ({ userType }) => {
  const [partnerPlan, setPartnerPlan] = useState<'monthly' | 'per-client'>('monthly');
  const [userCredits, setUserCredits] = useState(0); // 0 means only used free one

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <CreditCard className="text-blue-600" /> Subscription & Billing
      </h2>

      {userType === UserType.Partner ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-xl">
             <h3 className="text-xl font-bold mb-4">Current Plan</h3>
             <div className="flex gap-4 mb-6">
                <button 
                  onClick={() => setPartnerPlan('monthly')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center ${partnerPlan === 'monthly' ? 'border-blue-500 bg-white/10' : 'border-gray-600 hover:bg-white/5'}`}
                >
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Unlimited Access</span>
                    <span className="text-3xl font-bold mt-2">$29<span className="text-sm font-normal">/mo</span></span>
                    <CheckCircle size={20} className={`mt-2 ${partnerPlan === 'monthly' ? 'text-blue-400' : 'text-gray-600'}`}/>
                </button>
                <button 
                  onClick={() => setPartnerPlan('per-client')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center ${partnerPlan === 'per-client' ? 'border-blue-500 bg-white/10' : 'border-gray-600 hover:bg-white/5'}`}
                >
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Pay As You Go</span>
                    <span className="text-3xl font-bold mt-2">$10<span className="text-sm font-normal">/client</span></span>
                    <CheckCircle size={20} className={`mt-2 ${partnerPlan === 'per-client' ? 'text-blue-400' : 'text-gray-600'}`}/>
                </button>
             </div>
             <p className="text-sm text-gray-400 text-center">Next billing date: Nov 01, 2025</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
             <h4 className="font-bold text-gray-900 mb-4">Payment Methods</h4>
             <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-3">
                <div className="flex items-center gap-3">
                   <div className="bg-gray-100 p-2 rounded"><CreditCard size={20}/></div>
                   <div>
                      <p className="font-bold text-gray-800">Visa ending in 4242</p>
                      <p className="text-xs text-gray-500">Expiry 12/28</p>
                   </div>
                </div>
                <button className="text-sm text-red-600 font-medium">Remove</button>
             </div>
             <button className="text-blue-600 font-bold text-sm">+ Add New Card</button>
          </div>
        </div>
      ) : (
        // INDIVIDUAL USER VIEW
        <div className="space-y-6">
           <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                  <div>
                      <h3 className="font-bold text-xl text-gray-900">Analysis Credits</h3>
                      <p className="text-gray-500">Pay-per-use for detailed AI assessments.</p>
                  </div>
                  <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">{userCredits}</p>
                      <p className="text-xs text-gray-500">Credits Remaining</p>
                  </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <CheckCircle className="text-blue-600 mt-1 shrink-0" size={18} />
                  <div>
                      <p className="font-bold text-blue-900 text-sm">1st Analysis Free (Used)</p>
                      <p className="text-xs text-blue-700">You have used your complimentary detailed report. Top up to generate new scenarios.</p>
                  </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button className="border border-gray-200 hover:border-blue-500 hover:bg-blue-50 p-4 rounded-xl transition text-center group">
                      <p className="text-sm text-gray-500 mb-1">1 Report</p>
                      <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-700">$5.00</p>
                  </button>
                  <button className="border-2 border-blue-500 bg-blue-50 p-4 rounded-xl transition text-center relative">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">POPULAR</div>
                      <p className="text-sm text-blue-800 mb-1">3 Reports</p>
                      <p className="text-2xl font-bold text-blue-900">$12.00</p>
                      <p className="text-[10px] text-blue-600 line-through">$15.00</p>
                  </button>
                  <button className="border border-gray-200 hover:border-blue-500 hover:bg-blue-50 p-4 rounded-xl transition text-center group">
                      <p className="text-sm text-gray-500 mb-1">5 Reports</p>
                      <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-700">$18.00</p>
                  </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export const CommissionView: React.FC<FeatureProps> = ({ userType }) => {
  if (userType !== UserType.Partner) return null;

  const totalPending = MOCK_COMMISSIONS.filter(c => c.payoutStatus === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);
  const totalPaid = 14500; // Mock total lifetime

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
         <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <DollarSign className="text-green-600" /> Commission Dashboard
         </h2>
         <p className="text-gray-600 mt-2">
            Earn commissions on successful visa applications processed through the ImmiPlanner network.
            <span className="block text-xs mt-1 text-gray-400">*Payouts are eligible only after the applicant lands and completes requirements.</span>
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Pending Payouts</p>
              <h3 className="text-3xl font-bold text-gray-900">${totalPending.toLocaleString()}</h3>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Processing</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Lifetime Earnings</p>
              <h3 className="text-3xl font-bold text-green-600">${totalPaid.toLocaleString()}</h3>
          </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Next Payout Date</p>
              <h3 className="text-xl font-bold text-gray-900">Nov 15, 2025</h3>
          </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-900">Commission Activity</h3>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
                 <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                     <tr>
                         <th className="px-6 py-3">Client</th>
                         <th className="px-6 py-3">Application</th>
                         <th className="px-6 py-3">Stage</th>
                         <th className="px-6 py-3">Amount</th>
                         <th className="px-6 py-3">Status</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                     {MOCK_COMMISSIONS.map(record => (
                         <tr key={record.id} className="hover:bg-gray-50">
                             <td className="px-6 py-4 font-medium text-gray-900">{record.clientName}</td>
                             <td className="px-6 py-4 text-gray-600">{record.applicationType}</td>
                             <td className="px-6 py-4">
                                 <div className="flex items-center gap-2">
                                    {record.status === 'Landed' ? <CheckCircle size={16} className="text-green-600"/> : <Clock size={16} className="text-blue-400"/>}
                                    <span className={record.status === 'Landed' ? 'text-green-700 font-medium' : 'text-gray-600'}>{record.status}</span>
                                 </div>
                             </td>
                             <td className="px-6 py-4 font-bold text-gray-900">${record.amount}</td>
                             <td className="px-6 py-4">
                                 <span className={`px-2 py-1 rounded-full text-xs font-bold
                                     ${record.payoutStatus === 'Eligible' ? 'bg-green-100 text-green-700' : 
                                       record.payoutStatus === 'Paid' ? 'bg-gray-100 text-gray-600' : 'bg-yellow-50 text-yellow-700'}`}>
                                     {record.payoutStatus}
                                 </span>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
          </div>
      </div>
    </div>
  );
};
