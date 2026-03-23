import React, { useState } from 'react';
import './ConsultantCTA.css';
import { submitLead } from '@/services/leadVault';
import { useNavigate } from 'react-router-dom';

const ConsultantCTA = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const COUNTRY_CODES = [
        { code: '+91', label: 'IN' },
        { code: '+1', label: 'US/CA' },
        { code: '+44', label: 'UK' },
        { code: '+61', label: 'AU' },
        { code: '+971', label: 'UAE' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!/^\d{7,15}$/.test(phone.replace(/[\s-]/g, ''))) {
            alert('Please enter a valid phone number');
            return;
        }

        setStatus('submitting');
        const res = await submitLead({
            source: 'Landing Consultant CTA',
            data: {
                name,
                email: 'not-provided@example.com',
                phone: `${countryCode} ${phone}`,
                interest: 'Talk to Consultant',
                formName: 'Consultant CTA'
            }
        });
        if (res.success) {
            navigate('/thank-you');
            setStatus('success');
            setName('');
            setPhone('');
        } else {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section className="cta-wrapper">
            <div className="cta-container">
                {/* Decorative Shapes */}
                <div className="cta-shape cta-shape-tl"></div>
                <div className="cta-shape cta-shape-br"></div>

                <div className="cta-content">
                    <h2 className="cta-title">Talk to Our Consultant Now</h2>

                    <form className="cta-form" onSubmit={handleSubmit}>
                        <div className="cta-input-group">
                            <input
                                type="text"
                                placeholder="First name"
                                className="cta-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="cta-input-group" style={{ display: 'flex', gap: '8px' }}>
                            <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="cta-input"
                                style={{ width: '85px', padding: '0 10px', backgroundColor: '#f9fafb' }}
                            >
                                {COUNTRY_CODES.map(c => (
                                    <option key={c.code} value={c.code}>{c.code}</option>
                                ))}
                            </select>
                            <input
                                type="tel"
                                placeholder="Phone No"
                                className="cta-input"
                                style={{ flex: 1 }}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="cta-submit-btn" disabled={status === 'submitting'}>
                            {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ConsultantCTA;
