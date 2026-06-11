"use client";
import React, { useState, useEffect } from 'react';
import { FiSettings, FiSave, FiGlobe, FiShield, FiBell, FiKey, FiLock, FiEye, FiEyeOff, FiMail, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  // Backend Data States
  const [generalSettings, setGeneralSettings] = useState({
    businessName: '', businessEmail: '', supportPhone: '', gst: '', businessAddress: ''
  });
  const [localization, setLocalization] = useState({
    defaultCurrency: 'INR', timezone: 'IST', dateFormat: 'DD/MM/YYYY'
  });
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Fetch Settings on Mount
  useEffect(() => {
    const fetchSettings = async () => {
      setIsFetching(true);
      try {
        const token = localStorage.getItem('tenant_token');
        const res = await fetch('http://localhost:5001/api/v1/tenant/settings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await res.json();
        if (result.success && result.data) {
          if (result.data.generalSettings) {
            setGeneralSettings({
              businessName: result.data.generalSettings.businessName || '',
              businessEmail: result.data.generalSettings.businessEmail || '',
              supportPhone: result.data.generalSettings.supportPhone || '',
              gst: result.data.generalSettings.gst || '',
              businessAddress: result.data.generalSettings.businessAddress || ''
            });
          }
          if (result.data.localization) {
            setLocalization({
              defaultCurrency: result.data.localization.defaultCurrency || 'INR',
              timezone: result.data.localization.timezone || 'IST',
              dateFormat: result.data.localization.dateFormat || 'DD/MM/YYYY'
            });
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setFeedback(null);
    try {
      const token = localStorage.getItem('tenant_token');
      let endpoint = '';
      let body = {};

      if (activeTab === 'general') {
        endpoint = 'http://localhost:5001/api/v1/tenant/settings/general';
        body = generalSettings;
      } else if (activeTab === 'localization') {
        endpoint = 'http://localhost:5001/api/v1/tenant/settings/localization';
        body = localization;
      } else {
        setIsSaving(false);
        return; // Nothing to save for mock tabs yet
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      const result = await res.json();
      
      if (result.success) {
        setFeedback({ type: 'success', text: 'Settings updated successfully!' });
      } else {
        setFeedback({ type: 'error', text: result.message || 'Failed to update settings.' });
      }
    } catch (error) {
      setFeedback({ type: 'error', text: error.message });
    } finally {
      setIsSaving(false);
      // Auto-hide feedback
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Password Reset States (Mock)
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleGenerateOtp = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setFeedback({ type: 'error', text: 'Please fill in all password fields!' });
      return;
    }
    if (newPassword.length < 6) {
      setFeedback({ type: 'error', text: 'Password must be at least 6 characters long!' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setFeedback({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    setIsSaving(true);
    setFeedback(null);
    setTimeout(() => {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(code);
      setOtpSent(true);
      setIsSaving(false);
      setFeedback({ type: 'success', text: `Security code generated successfully!` });
    }, 800);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== generatedOtp) {
      setFeedback({ type: 'error', text: 'Invalid verification code! Please try again.' });
      return;
    }
    setIsSaving(true);
    setFeedback(null);
    setTimeout(() => {
      setIsSaving(false);
      setFeedback({ type: 'success', text: 'Password has been updated successfully!' });
      setNewPassword(''); setConfirmPassword(''); setOtp(''); setGeneratedOtp(''); setOtpSent(false);
    }, 1000);
  };

  const handleCancelPasswordReset = () => {
    setNewPassword(''); setConfirmPassword(''); setOtp(''); setGeneratedOtp(''); setOtpSent(false); setFeedback(null);
  };

  return (
    <div className="space-y-6 max-w-5xl relative">
      {/* Toast Feedback */}
      {feedback && (
        <div className={`absolute top-0 right-0 z-50 flex items-center gap-3 p-4 rounded-xl border text-sm transition-all duration-200 shadow-xl ${
          feedback.type === 'success' 
            ? 'bg-emerald-50 border-emerald-500 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400' 
            : 'bg-rose-50 border-rose-500 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400'
        }`}>
          {feedback.type === 'success' ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
          <span className="font-medium">{feedback.text}</span>
        </div>
      )}

      <div className="flex items-center justify-between border-b border-gray-200 pb-5 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FiSettings className="text-indigo-600 dark:text-indigo-400" />
          Tenant Settings
        </h1>
        <button onClick={handleSaveSettings} disabled={isSaving || isFetching || activeTab === 'changePassword' || activeTab === 'security' || activeTab === 'notifications'} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 disabled:opacity-50">
          <FiSave size={16} /> {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {[
            { id: 'general', icon: FiSettings, label: 'General Settings' },
            { id: 'localization', icon: FiGlobe, label: 'Localization' },
            { id: 'security', icon: FiShield, label: 'Security & Access' },
            { id: 'notifications', icon: FiBell, label: 'Notifications' },
            { id: 'changePassword', icon: FiKey, label: 'Change Password' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setFeedback(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'}`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 min-h-[400px]">
          {isFetching ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              {activeTab === 'general' && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Business Information</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Update your business details and contact information.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Name</label>
                      <input value={generalSettings.businessName} onChange={e => setGeneralSettings({...generalSettings, businessName: e.target.value})} type="text" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Email</label>
                      <input value={generalSettings.businessEmail} onChange={e => setGeneralSettings({...generalSettings, businessEmail: e.target.value})} type="email" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Support Phone</label>
                      <input value={generalSettings.supportPhone} onChange={e => setGeneralSettings({...generalSettings, supportPhone: e.target.value})} type="tel" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GST / Tax ID</label>
                      <input value={generalSettings.gst} onChange={e => setGeneralSettings({...generalSettings, gst: e.target.value})} type="text" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Address</label>
                      <textarea value={generalSettings.businessAddress} onChange={e => setGeneralSettings({...generalSettings, businessAddress: e.target.value})} rows="3" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"></textarea>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'localization' && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Regional Settings</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Set your default currency, timezone, and formatting.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default Currency</label>
                      <select value={localization.defaultCurrency} onChange={e => setLocalization({...localization, defaultCurrency: e.target.value})} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                        <option value="INR">Indian Rupee (INR)</option>
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
                      <select value={localization.timezone} onChange={e => setLocalization({...localization, timezone: e.target.value})} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                        <option value="IST">Indian Standard Time (IST)</option>
                        <option value="UTC">Coordinated Universal Time (UTC)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Format</label>
                      <select value={localization.dateFormat} onChange={e => setLocalization({...localization, dateFormat: e.target.value})} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {(activeTab === 'security' || activeTab === 'notifications') && (
                <div className="flex flex-col items-center justify-center h-64 text-center animate-fade-in">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    {activeTab === 'security' ? <FiShield size={24} className="text-gray-400" /> : <FiBell size={24} className="text-gray-400" />}
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Coming Soon</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">This settings section is currently under development and will be available in the next release.</p>
                </div>
              )}

              {activeTab === 'changePassword' && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <FiLock className="text-indigo-600 dark:text-indigo-400" /> Change Account Password
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Ensure your account is secure by setting a strong password.</p>
                  </div>

                  {otpSent && generatedOtp && (
                    <div className="bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 space-y-2 text-indigo-700 dark:text-indigo-300">
                      <div className="flex items-center gap-2"><FiMail size={16} /><span className="text-xs font-bold uppercase tracking-wider">Demo Sandbox</span></div>
                      <p className="text-xs opacity-90">Verification code for local testing:</p>
                      <div className="flex items-center gap-2">
                        <span className="font-mono bg-indigo-500/15 px-3 py-1.5 rounded-lg text-sm font-bold tracking-widest text-indigo-600 dark:text-indigo-400 select-all shadow-sm">{generatedOtp}</span>
                      </div>
                    </div>
                  )}

                  <form onSubmit={otpSent ? handleVerifyOtp : handleGenerateOtp} className="space-y-6 max-w-xl">
                    {!otpSent ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">New Password</label>
                            <div className="relative">
                              <input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 pr-10" />
                              <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><FiEyeOff size={16} /></button>
                            </div>
                          </div>
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
                            <div className="relative">
                              <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 pr-10" />
                              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><FiEyeOff size={16} /></button>
                            </div>
                          </div>
                        </div>
                        <button type="submit" disabled={isSaving} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2">
                          {isSaving ? "Generating OTP..." : "Generate OTP & Continue"}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="max-w-xs">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Verification Code</label>
                          <input type="text" maxLength={4} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} required className="w-full tracking-widest text-center text-lg font-bold rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        </div>
                        <div className="flex gap-3">
                          <button type="submit" disabled={isSaving || otp.length !== 4} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-xl text-sm">Verify & Update</button>
                          <button type="button" onClick={handleCancelPasswordReset} className="px-5 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl text-sm">Go Back</button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
