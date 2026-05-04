import React from 'react';

interface Contractor {
  name: string;
  address: string;
  city: string;
  phone: string;
  email?: string;
  website?: string;
  rating: number;
  category: string;
}

interface ContractorCardsProps {
  contractors: Contractor[];
  message?: string;
}

export default function ContractorCards({ contractors, message }: ContractorCardsProps) {
  return (
    <div className="space-y-4">
      {message && <p className="text-sm text-slate-700">{message}</p>}
      <div className="space-y-3">
        {contractors.map((c) => (
          <div key={c.name + c.phone} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
            <h4 className="font-semibold text-brand-blue">{c.name}</h4>
            <p className="text-xs text-slate-600 mb-1">{c.category}</p>
            <p className="text-xs text-slate-600 mb-1">📍 {c.address}, {c.city}</p>
            <p className="text-xs text-slate-600 mb-1">📞 {c.phone}</p>
            {c.email && <p className="text-xs text-slate-600 mb-1">✉️ {c.email}</p>}
            {c.website && (
              <a 
                href={c.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-xs font-medium text-brand-blue hover:text-brand-red transition-colors mb-2"
              >
                Website
              </a>
            )}
            <p className="text-xs font-bold text-slate-900">⭐ {c.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
