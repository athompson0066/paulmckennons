import { useState } from 'react';
import { motion } from 'motion/react';

export default function MortgageCalculator() {
    const [step, setStep] = useState(1);
    
    // Form fields
    const [income, setIncome] = useState('');
    const [coIncome, setCoIncome] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [amortization, setAmortization] = useState('30');
    const [location, setLocation] = useState('');
    
    // Optional costs
    const [propertyTax, setPropertyTax] = useState('');
    const [condoFees, setCondoFees] = useState('');
    const [heating, setHeating] = useState('');
    
    // Debt
    const [ccDebt, setCcDebt] = useState('');
    const [carPayment, setCarPayment] = useState('');
    const [otherLoan, setOtherLoan] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-heading text-2xl font-bold mb-6">Mortgage Affordability</h3>
            
            {/* Simple Progress Bar */}
            <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4].map(s => (
                    <div key={s} className={`h-2 flex-grow rounded-full ${step >= s ? 'bg-brand-blue' : 'bg-slate-200'}`} />
                ))}
            </div>

            {step === 1 && (
                <div className="space-y-4">
                    <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="Annual Income (before tax)" className="w-full p-3 rounded-xl border border-slate-200" />
                    <input type="number" value={coIncome} onChange={e => setCoIncome(e.target.value)} placeholder="Co-applicant's income (optional)" className="w-full p-3 rounded-xl border border-slate-200" />
                    <button onClick={nextStep} className="w-full bg-brand-blue text-white py-3 rounded-xl font-bold">Next</button>
                </div>
            )}
            {step === 2 && (
                <div className="space-y-4">
                    <input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)} placeholder="Down Payment ($)" className="w-full p-3 rounded-xl border border-slate-200" />
                    <select value={amortization} onChange={e => setAmortization(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200">
                        <option value="30">30-year amortization</option>
                        <option value="25">25-year amortization</option>
                    </select>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="City" className="w-full p-3 rounded-xl border border-slate-200" />
                    <div className="flex gap-4">
                        <button onClick={prevStep} className="flex-1 bg-slate-200 py-3 rounded-xl font-bold">Back</button>
                        <button onClick={nextStep} className="flex-1 bg-brand-blue text-white py-3 rounded-xl font-bold">Next</button>
                    </div>
                </div>
            )}
            {step === 3 && (
                <div className="space-y-4">
                    <input type="number" value={propertyTax} onChange={e => setPropertyTax(e.target.value)} placeholder="Annual Property Tax" className="w-full p-3 rounded-xl border border-slate-200" />
                    <input type="number" value={condoFees} onChange={e => setCondoFees(e.target.value)} placeholder="Monthly Condo Fees" className="w-full p-3 rounded-xl border border-slate-200" />
                    <input type="number" value={heating} onChange={e => setHeating(e.target.value)} placeholder="Monthly Heating Costs" className="w-full p-3 rounded-xl border border-slate-200" />
                    
                    <div className="flex gap-4">
                        <button onClick={prevStep} className="flex-1 bg-slate-200 py-3 rounded-xl font-bold">Back</button>
                        <button onClick={nextStep} className="flex-1 bg-brand-blue text-white py-3 rounded-xl font-bold">Next</button>
                    </div>
                </div>
            )}
             {step === 4 && (
                <div className="space-y-4">
                    <input type="number" value={ccDebt} onChange={e => setCcDebt(e.target.value)} placeholder="Credit Card Debt Payment" className="w-full p-3 rounded-xl border border-slate-200" />
                    <input type="number" value={carPayment} onChange={e => setCarPayment(e.target.value)} placeholder="Car Payment" className="w-full p-3 rounded-xl border border-slate-200" />
                    <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" className="w-full p-3 rounded-xl border border-slate-200" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" className="w-full p-3 rounded-xl border border-slate-200" />
                    
                    <button className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold text-lg">Calculate Affordability</button>
                    <button onClick={prevStep} className="w-full bg-slate-200 py-3 rounded-xl font-bold">Back</button>
                </div>
            )}
        </div>
    );
}
