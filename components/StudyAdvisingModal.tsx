
import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Mail, Phone, CheckCircle, Upload, FileText, ChevronRight, ArrowLeft } from 'lucide-react';
import { UserProfile } from '../types';

interface StudyAdvisingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
}

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", 
  "01:00 PM", "02:30 PM", "03:00 PM", "04:30 PM"
];

// Generate next 5 days
const getNextDays = () => {
  const days = [];
  for (let i = 1; i <= 5; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      fullDate: d.toISOString().split('T')[0]
    });
  }
  return days;
};

export const StudyAdvisingModal: React.FC<StudyAdvisingModalProps> = ({ isOpen, onClose, userProfile }) => {
  const [step, setStep] = useState(1); // 1: Calendar, 2: Form, 3: Upload, 4: Success
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    agreed: false
  });

  // Auto-fill when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: userProfile.name || '',
        email: '', // Email isn't currently in UserProfile, would usually come from auth
        phone: '',
        agreed: false
      });
      setStep(1);
      setFiles([]);
      setSelectedDate(null);
      setSelectedTime(null);
    }
  }, [isOpen, userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  if (!isOpen) return null;

  const dates = getNextDays();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            {step === 4 ? <CheckCircle className="text-green-600"/> : <Calendar className="text-blue-600"/>}
            {step === 4 ? 'Booking Confirmed' : 'Book Free Study Advice'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-1 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-grow">
          
          {/* Step Indicator */}
          {step < 4 && (
            <div className="flex items-center justify-center mb-8 space-x-2">
              <div className={`h-2 w-2 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className={`h-1 w-8 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className={`h-2 w-2 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className={`h-1 w-8 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className={`h-2 w-2 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            </div>
          )}

          {/* STEP 1: Date & Time */}
          {step === 1 && (
            <div className="animate-in slide-in-from-right duration-300">
              <h4 className="text-lg font-semibold mb-4">Select a Date & Time</h4>
              
              <div className="mb-6">
                <label className="text-sm text-gray-500 mb-2 block">Available Dates</label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {dates.map((d) => (
                    <button
                      key={d.fullDate}
                      onClick={() => setSelectedDate(d.fullDate)}
                      className={`flex flex-col items-center min-w-[70px] p-3 rounded-xl border transition-all
                        ${selectedDate === d.fullDate 
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
                    >
                      <span className="text-xs font-medium uppercase">{d.day}</span>
                      <span className="text-xl font-bold">{d.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-2 block">Available Slots (EST)</label>
                <div className="grid grid-cols-3 gap-3">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      disabled={!selectedDate}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all flex items-center justify-center gap-2
                        ${!selectedDate ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
                        ${selectedTime === time 
                          ? 'border-blue-600 bg-blue-600 text-white shadow-md' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700'}`}
                    >
                      <Clock size={14} /> {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: User Details */}
          {step === 2 && (
            <div className="animate-in slide-in-from-right duration-300 space-y-4">
              <h4 className="text-lg font-semibold mb-1">Confirm Details</h4>
              <p className="text-sm text-gray-500 mb-4">
                Booking for: <span className="font-medium text-gray-900">{selectedDate}</span> at <span className="font-medium text-gray-900">{selectedTime}</span>
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleInputChange}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:border-blue-600 checked:bg-blue-600 hover:border-blue-400"
                    />
                    <CheckCircle className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" size={14} />
                  </div>
                  <span className="text-sm text-gray-600 leading-tight group-hover:text-gray-900">
                    I agree to receive communication regarding my study application and allow ImmiPlanner to process my data.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: Document Upload */}
          {step === 3 && (
            <div className="animate-in slide-in-from-right duration-300 text-center">
               <h4 className="text-lg font-semibold mb-2">Upload Documents (Optional)</h4>
               <p className="text-sm text-gray-500 mb-6">
                 Upload your transcripts or IELTS results for an early assessment before the call.
               </p>

               <div className="border-2 border-dashed border-blue-200 bg-blue-50 rounded-xl p-8 transition hover:border-blue-400 hover:bg-blue-100">
                  <input 
                    type="file" 
                    multiple 
                    onChange={handleFileUpload} 
                    id="doc-upload" 
                    className="hidden" 
                  />
                  <label htmlFor="doc-upload" className="cursor-pointer flex flex-col items-center">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-3 text-blue-600">
                      <Upload size={32} />
                    </div>
                    <span className="font-semibold text-blue-900">Click to Upload</span>
                    <span className="text-xs text-blue-600 mt-1">PDF, JPG, PNG (Max 5MB)</span>
                  </label>
               </div>

               {files.length > 0 && (
                 <div className="mt-4 bg-gray-50 rounded-lg border border-gray-200 divide-y divide-gray-200">
                   {files.map((f, idx) => (
                     <div key={idx} className="p-3 flex items-center gap-3 text-sm text-gray-700">
                        <FileText size={16} className="text-blue-500"/>
                        <span className="truncate max-w-[200px]">{f.name}</span>
                        <span className="ml-auto text-gray-400 text-xs">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
             <div className="text-center py-8 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-600 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You're Booked!</h3>
                <p className="text-gray-600 mb-6 max-w-xs mx-auto">
                  A confirmation email has been sent to <strong>{formData.email}</strong>. Your advisor will call you at the scheduled time.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 inline-block text-left min-w-[250px]">
                   <div className="flex items-center gap-3 mb-2">
                      <Calendar size={18} className="text-gray-500"/> 
                      <span className="font-medium">{selectedDate}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <Clock size={18} className="text-gray-500"/> 
                      <span className="font-medium">{selectedTime}</span>
                   </div>
                </div>
             </div>
          )}

        </div>

        {/* Footer Buttons */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between">
          {step === 1 && (
             <div className="w-full flex justify-end">
               <button 
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(2)}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Continue <ChevronRight size={18} />
              </button>
             </div>
          )}

          {step === 2 && (
            <>
              <button onClick={() => setStep(1)} className="text-gray-600 font-medium px-4 py-2 hover:bg-gray-200 rounded-lg flex items-center gap-2">
                <ArrowLeft size={18} /> Back
              </button>
              <button 
                disabled={!formData.fullName || !formData.email || !formData.phone || !formData.agreed}
                onClick={() => setStep(3)}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Confirm & Next <ChevronRight size={18} />
              </button>
            </>
          )}

          {step === 3 && (
            <>
               <button onClick={() => setStep(4)} className="text-gray-500 font-medium px-4 py-2 hover:text-gray-700">
                Skip Upload
              </button>
              <button 
                onClick={() => setStep(4)}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 shadow-lg shadow-blue-200"
              >
                Finish Booking <CheckCircle size={18} />
              </button>
            </>
          )}

          {step === 4 && (
             <button onClick={onClose} className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800">
               Return to Dashboard
             </button>
          )}
        </div>

      </div>
    </div>
  );
};
