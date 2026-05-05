import React from 'react';

interface Listing {
  mls_number: string;
  image_url: string;
  address: string;
  formatted_price: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  listing_url: string;
}

interface ListingCardsProps {
  listings: Listing[];
  message?: string;
}

export default function ListingCards({ listings, message }: ListingCardsProps) {
  return (
    <div className="space-y-4">
      {message && <p className="text-sm text-slate-700">{message}</p>}
      <div className="space-y-3">
        {listings.map((l) => (
          <div key={l.mls_number} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
            {l.image_url && (
              <img src={l.image_url} alt={l.address} className="w-full h-32 object-cover rounded mb-2" />
            )}
            <h4 className="font-semibold text-brand-blue">{l.address}</h4>
            <p className="text-sm font-bold text-slate-900">{l.formatted_price}</p>
            <p className="text-xs text-slate-600 mb-2">
              {l.bedrooms} bed · {l.bathrooms} bath · {l.sqft} sqft
            </p>
            <a 
              href={l.listing_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-xs font-medium text-brand-blue hover:text-brand-red transition-colors"
            >
              View Full Listing
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
