'use client';

import React, { useState } from 'react';

interface ContactProps {
  onToast?: (msg: string, type: 'info' | 'success' | 'error') => void;
}

export default function Contact({ onToast }: ContactProps) {
  const [activeTab, setActiveTab] = useState<'inquiry' | 'collaboration'>('inquiry');

  // Contact Inquiry Form State
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    affiliation: '',
    subject: 'Computational Chemistry / DFT Collaboration',
    message: '',
    website_hp: '', // honeypot
  });
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [inquiryErrorMsg, setInquiryErrorMsg] = useState('');

  // Collaboration Proposal Form State
  const [collabForm, setCollabForm] = useState({
    title: '',
    lead_investigator: '',
    institution: '',
    email: '',
    domain: 'DFT Electrocatalysis (ORR/OER)',
    timeline: '6 - 12 Months',
    abstract: '',
  });
  const [collabStatus, setCollabStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [collabErrorMsg, setCollabErrorMsg] = useState('');

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.message) {
      if (onToast) onToast('Please complete all required fields.', 'error');
      return;
    }
    setInquiryStatus('submitting');
    setInquiryErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryForm),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch academic inquiry.');
      }
      setInquiryStatus('success');
      if (onToast) onToast('Inquiry logged successfully to Neon PostgreSQL database.', 'success');
      setInquiryForm({
        name: '',
        email: '',
        affiliation: '',
        subject: 'Computational Chemistry / DFT Collaboration',
        message: '',
        website_hp: '',
      });
    } catch (err: any) {
      setInquiryStatus('error');
      setInquiryErrorMsg(err.message || 'Submission failed. Please email kamranashraf51214@gmail.com directly.');
      if (onToast) onToast('Error sending message. You can write directly to my email.', 'error');
    }
  };

  const handleCollabSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collabForm.title || !collabForm.lead_investigator || !collabForm.institution || !collabForm.email || !collabForm.abstract) {
      if (onToast) onToast('Please fill out all required proposal fields.', 'error');
      return;
    }
    setCollabStatus('submitting');
    setCollabErrorMsg('');

    try {
      const res = await fetch('/api/collaborations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collabForm),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to record collaboration proposal.');
      }
      setCollabStatus('success');
      if (onToast) onToast('Research collaboration proposal submitted for supervisor review.', 'success');
      setCollabForm({
        title: '',
        lead_investigator: '',
        institution: '',
        email: '',
        domain: 'DFT Electrocatalysis (ORR/OER)',
        timeline: '6 - 12 Months',
        abstract: '',
      });
    } catch (err: any) {
      setCollabStatus('error');
      setCollabErrorMsg(err.message || 'Submission failed. Please write to kamranashraf51214@gmail.com.');
      if (onToast) onToast('Submission failed. Check network or email directly.', 'error');
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('kamranashraf51214@gmail.com');
    if (onToast) onToast('Copied email to clipboard: kamranashraf51214@gmail.com', 'info');
  };

  return (
    <section className="py-16" id="contact">
      <div className="flex flex-col gap-2 mb-10">
        <span className="font-mono text-xs text-[var(--accent-blue)] uppercase tracking-wider font-semibold">Academic Inquiries</span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text-heading)]">Connect &amp; Supervised Research</h2>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-3xl">
          Available for scientific collaborations in computational electrochemistry, DFT modeling of energy nanomaterials, and postgraduate research initiatives at Quaid-i-Azam University.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Contact Info & Academic Coordinates */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 rounded-md">
            <h3 className="font-heading text-base font-bold text-[var(--text-heading)] mb-4 flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--accent-blue)]">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Laboratory Coordinates</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[var(--text-muted)]">
              <div>
                <strong className="block text-[var(--text-heading)] font-medium">Institution &amp; Lab:</strong>
                <span>Electrochemistry &amp; Nanomaterials Research Lab 208, Department of Chemistry, Quaid-i-Azam University (QAU), Islamabad 45320, Pakistan.</span>
              </div>

              <div>
                <strong className="block text-[var(--text-heading)] font-medium">Principal Supervision:</strong>
                <span className="text-[var(--text-main)]">Prof. Dr. Safeer Ahmed</span>
                <span className="block text-xs text-[var(--text-muted)]">Professor of Physical Chemistry, Department of Chemistry, QAU Islamabad.</span>
              </div>

              <div>
                <strong className="block text-[var(--text-heading)] font-medium">Co-Supervision:</strong>
                <span className="text-[var(--text-main)]">Dr. Zahid Rashid</span>
                <span className="block text-xs text-[var(--text-muted)]">Computational &amp; Quantum Chemistry Specialist.</span>
              </div>

              <div>
                <strong className="block text-[var(--text-heading)] font-medium">Direct Scholar Email:</strong>
                <div className="flex items-center gap-2 mt-1">
                  <a
                    href="mailto:kamranashraf51214@gmail.com"
                    className="font-mono text-xs text-[var(--accent-blue)] hover:underline break-all"
                  >
                    kamranashraf51214@gmail.com
                  </a>
                  <button
                    onClick={copyEmail}
                    className="text-[var(--text-muted)] hover:text-white p-1 rounded bg-[rgba(255,255,255,0.03)] border border-[var(--border-subtle)]"
                    title="Copy Email Address"
                    aria-label="Copy Email"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <strong className="block text-[var(--text-heading)] font-medium">Code &amp; Repositories:</strong>
                <a
                  href="https://github.com/Kamran5H"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--accent-blue)] hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <span>github.com/Kamran5H</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Database & Cloud Telemetry Box */}
          <div className="bg-[rgba(10,14,23,0.6)] border border-[var(--border-subtle)] p-5 rounded-md text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">Web App Stack</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live on Azure
              </span>
            </div>
            <div className="text-[var(--text-muted)] leading-relaxed">
              Inquiries and collaboration requests are stored in serverless <strong className="text-[var(--text-main)]">Neon PostgreSQL</strong> with transactional isolation and SSL enforcement.
            </div>
          </div>
        </div>

        {/* Right: Form Area (Inquiry vs Collaboration) */}
        <div className="lg:col-span-7 bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 sm:p-8 rounded-md">
          {/* Sub-tabs */}
          <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-4 mb-6">
            <button
              onClick={() => setActiveTab('inquiry')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'inquiry'
                  ? 'bg-[var(--accent-blue)] text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-white bg-transparent'
              }`}
            >
              Academic Inquiry
            </button>
            <button
              onClick={() => setActiveTab('collaboration')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'collaboration'
                  ? 'bg-[var(--accent-blue)] text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-white bg-transparent'
              }`}
            >
              Scientific Proposal
            </button>
          </div>

          {/* Tab 1: General Academic Inquiry */}
          {activeTab === 'inquiry' && (
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              {/* Honeypot field for bot spam */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={inquiryForm.website_hp}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, website_hp: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-heading)] mb-1">
                    Your Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Robert Chen"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-[var(--accent-blue)] rounded px-3 py-2 text-xs text-[var(--text-main)] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-heading)] mb-1">
                    Institutional Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="r.chen@institution.edu"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-[var(--accent-blue)] rounded px-3 py-2 text-xs text-[var(--text-main)] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-heading)] mb-1">
                    University / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Quaid-i-Azam University"
                    value={inquiryForm.affiliation}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, affiliation: e.target.value })}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-[var(--accent-blue)] rounded px-3 py-2 text-xs text-[var(--text-main)] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-heading)] mb-1">
                    Subject / Area
                  </label>
                  <select
                    value={inquiryForm.subject}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, subject: e.target.value })}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-[var(--accent-blue)] rounded px-3 py-2 text-xs text-[var(--text-main)] outline-none"
                  >
                    <option value="Computational Chemistry / DFT Collaboration">Computational Chemistry / DFT</option>
                    <option value="Electrocatalysis (ORR/OER) Research">Electrocatalysis (ORR/OER) Research</option>
                    <option value="Postgraduate Seminar / Speaking Invitation">Postgraduate Seminar / Speaking</option>
                    <option value="Academic Inquiry / Document Verification">Academic Document Verification</option>
                    <option value="Other Scientific Inquiry">Other Scientific Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-heading)] mb-1">
                  Message / Details <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Outline your research topic, potential computational objectives, or general academic inquiry..."
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-[var(--accent-blue)] rounded p-3 text-xs text-[var(--text-main)] outline-none leading-relaxed"
                />
              </div>

              {inquiryStatus === 'error' && (
                <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs rounded">
                  {inquiryErrorMsg}
                </div>
              )}

              {inquiryStatus === 'success' && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs rounded flex items-center justify-between">
                  <span>Inquiry received and safely stored. Expect a response within 24–48 hours.</span>
                  <button
                    type="button"
                    onClick={() => setInquiryStatus('idle')}
                    className="text-white underline ml-3 font-medium"
                  >
                    Reset Form
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-[var(--text-muted)] font-mono">
                  Secured by Neon Serverless Postgres
                </span>
                <button
                  type="submit"
                  disabled={inquiryStatus === 'submitting'}
                  className="inline-flex items-center gap-2 bg-[var(--accent-blue)] hover:bg-[#1d4ed8] disabled:opacity-50 text-white px-5 py-2.5 rounded-md text-xs font-semibold tracking-wide transition-all"
                >
                  {inquiryStatus === 'submitting' ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      <span>Dispatch Academic Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Tab 2: Scientific Collaboration Proposal */}
          {activeTab === 'collaboration' && (
            <form onSubmit={handleCollabSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-heading)] mb-1">
                  Proposed Project Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. High-Throughput DFT Screening of Transition Metal Heteroatoms"
                  value={collabForm.title}
                  onChange={(e) => setCollabForm({ ...collabForm, title: e.target.value })}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-[var(--accent-blue)] rounded px-3 py-2 text-xs text-[var(--text-main)] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-heading)] mb-1">
                    Lead Investigator / Co-PI <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prof. / Dr. Full Name"
                    value={collabForm.lead_investigator}
                    onChange={(e) => setCollabForm({ ...collabForm, lead_investigator: e.target.value })}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-[var(--accent-blue)] rounded px-3 py-2 text-xs text-[var(--text-main)] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-heading)] mb-1">
                    Institution / University <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Quaid-i-Azam University"
                    value={collabForm.institution}
                    onChange={(e) => setCollabForm({ ...collabForm, institution: e.target.value })}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-[var(--accent-blue)] rounded px-3 py-2 text-xs text-[var(--text-main)] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-heading)] mb-1">
                    Contact Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="lead@institution.org"
                    value={collabForm.email}
                    onChange={(e) => setCollabForm({ ...collabForm, email: e.target.value })}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-[var(--accent-blue)] rounded px-3 py-2 text-xs text-[var(--text-main)] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-heading)] mb-1">
                    Research Domain
                  </label>
                  <select
                    value={collabForm.domain}
                    onChange={(e) => setCollabForm({ ...collabForm, domain: e.target.value })}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-[var(--accent-blue)] rounded px-3 py-2 text-xs text-[var(--text-main)] outline-none"
                  >
                    <option value="DFT Electrocatalysis (ORR/OER)">DFT Electrocatalysis (ORR/OER)</option>
                    <option value="MOF / Nanomaterial Synthesis">MOF / Nanomaterial Synthesis</option>
                    <option value="Conducting Polymer Composites">Conducting Polymer Composites</option>
                    <option value="Electrochemical Sensor Prototyping">Electrochemical Sensors</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-heading)] mb-1">
                    Proposed Timeline
                  </label>
                  <select
                    value={collabForm.timeline}
                    onChange={(e) => setCollabForm({ ...collabForm, timeline: e.target.value })}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-[var(--accent-blue)] rounded px-3 py-2 text-xs text-[var(--text-main)] outline-none"
                  >
                    <option value="3 - 6 Months">3 - 6 Months</option>
                    <option value="6 - 12 Months">6 - 12 Months</option>
                    <option value="1 - 2 Years (Grant funded)">1 - 2 Years (Grant)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-heading)] mb-1">
                  Proposal Abstract &amp; Resource Scope <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Outline the scope, computational requirements, lab access, and intended publication targets..."
                  value={collabForm.abstract}
                  onChange={(e) => setCollabForm({ ...collabForm, abstract: e.target.value })}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-[var(--accent-blue)] rounded p-3 text-xs text-[var(--text-main)] outline-none leading-relaxed"
                />
              </div>

              {collabStatus === 'error' && (
                <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs rounded">
                  {collabErrorMsg}
                </div>
              )}

              {collabStatus === 'success' && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs rounded flex items-center justify-between">
                  <span>Proposal registered. Forwarded to Prof. Dr. Safeer Ahmed &amp; Muhammad Kamran Ashraf.</span>
                  <button
                    type="button"
                    onClick={() => setCollabStatus('idle')}
                    className="text-white underline ml-3 font-medium"
                  >
                    Reset Form
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-[var(--text-muted)] font-mono">
                  Forwarded to QAU Electrochemistry Lab
                </span>
                <button
                  type="submit"
                  disabled={collabStatus === 'submitting'}
                  className="inline-flex items-center gap-2 bg-[var(--accent-blue)] hover:bg-[#1d4ed8] disabled:opacity-50 text-white px-5 py-2.5 rounded-md text-xs font-semibold tracking-wide transition-all"
                >
                  {collabStatus === 'submitting' ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Recording...</span>
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="12" y1="18" x2="12" y2="12" />
                        <line x1="9" y1="15" x2="15" y2="15" />
                      </svg>
                      <span>Submit Collaboration Proposal</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
