
import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Briefcase, Clock, CheckCircle2, Filter, Building2, ArrowRight } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Part-time' | 'Full-time';
  salary: string;
  posted: string;
  isVerified: boolean;
  description: string;
}

const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: 'Customer Service Representative',
    company: 'Telus Communications',
    location: 'Toronto, ON',
    type: 'Part-time',
    salary: '$18.50/hr',
    posted: '2 days ago',
    isVerified: true,
    description: 'Flexible evening shifts available. Perfect for students. No previous experience required.'
  },
  {
    id: 2,
    title: 'Junior Web Developer',
    company: 'Shopify',
    location: 'Remote (Canada)',
    type: 'Full-time',
    salary: '$75,000/yr',
    posted: '5 days ago',
    isVerified: true,
    description: 'Entry level role for recent graduates. Support for PR application available after 1 year.'
  },
  {
    id: 3,
    title: 'Warehouse Associate',
    company: 'Amazon Fulfillment',
    location: 'Brampton, ON',
    type: 'Full-time',
    salary: '$21.00/hr',
    posted: '1 day ago',
    isVerified: true,
    description: 'Immediate start. Night shift premium available. Transport provided from major hubs.'
  },
  {
    id: 4,
    title: 'Barista',
    company: 'Starbucks',
    location: 'Vancouver, BC',
    type: 'Part-time',
    salary: '$17.25/hr + Tips',
    posted: '3 days ago',
    isVerified: true,
    description: 'Join our downtown team. Benefits included for partners working 20+ hours.'
  },
  {
    id: 5,
    title: 'Construction Helper',
    company: 'PCL Construction',
    location: 'Calgary, AB',
    type: 'Full-time',
    salary: '$24.00/hr',
    posted: '1 week ago',
    isVerified: true,
    description: 'Assist with site cleanup and material handling. Safety training provided.'
  },
  {
    id: 6,
    title: 'Sales Associate',
    company: 'Uniqlo',
    location: 'Montreal, QC',
    type: 'Part-time',
    salary: '$16.00/hr',
    posted: '2 days ago',
    isVerified: true,
    description: 'Bilingual (French/English) preferred but not mandatory for back-of-house roles.'
  }
];

export const JobsFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState<'All' | 'Part-time' | 'Full-time'>('All');
  const [locationFilter, setLocationFilter] = useState('');

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = jobType === 'All' || job.type === jobType;
    const matchesLocation = locationFilter === '' || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Briefcase className="text-blue-600" size={32} /> Find Foreign Jobs
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Exclusive opportunities for ImmiPlanner clients. Connect with immigrant-friendly employers across Canada.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search job title or company..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Location (e.g. Toronto)" 
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="relative">
            <select 
              value={jobType}
              onChange={(e) => setJobType(e.target.value as any)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white appearance-none"
            >
              <option value="All">All Job Types</option>
              <option value="Part-time">Part-time (Student Friendly)</option>
              <option value="Full-time">Full-time</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* Job List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                      {job.title}
                      {job.isVerified && (
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold border border-green-100">
                          <CheckCircle2 size={10} /> Verified Employer
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><Building2 size={14} /> {job.company}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {job.posted}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2 min-w-[150px]">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.type === 'Part-time' ? 'bg-orange-50 text-orange-700' : 'bg-blue-50 text-blue-700'}`}>
                      {job.type}
                    </span>
                    <span className="font-bold text-gray-900">{job.salary}</span>
                  </div>
                  <button 
                    onClick={() => alert(`Application started for ${job.title} at ${job.company}. This feature will connect to the employer portal.`)}
                    className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition w-full md:w-auto flex items-center justify-center gap-2"
                  >
                    Apply Now <ArrowRight size={16} />
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50">
                <p className="text-sm text-gray-500 line-clamp-2">{job.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
             <Briefcase className="mx-auto text-gray-300 mb-3" size={48} />
             <h3 className="text-lg font-bold text-gray-900">No jobs found</h3>
             <p className="text-gray-500">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="mt-8 bg-blue-600 rounded-xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-bold text-xl mb-2">Need help with your resume?</h3>
          <p className="text-blue-100 max-w-xl">
            Canadian employers expect a specific resume format. Use our AI Resume Builder to adapt your CV for the Canadian market.
          </p>
        </div>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg">
          Fix My Resume
        </button>
      </div>
    </div>
  );
};
