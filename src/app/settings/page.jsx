"use client";
import React, { useState } from 'react';
import { FiSettings, FiSave, FiGlobe, FiShield, FiBell, FiKey, FiLock, FiEye, FiEyeOff, FiMail, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  // Password Reset States
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null); // { type: 'success' | 'error', text: '' }
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateOtp = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setFeedbackMessage({ type: 'error', text: 'Please fill in all password fields!' });
      return;
    }
    if (newPassword.length < 6) {
      setFeedbackMessage({ type: 'error', text: 'Password must be at least 6 characters long!' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setFeedbackMessage({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    setIsLoading(true);
    setFeedbackMessage(null);

    // Mock network request delay
    setTimeout(() => {
      const code = Math.floor(1000 + Math.random() * 9000).toString(); // Generates a random 4 digit number
      setGeneratedOtp(code);
      setOtpSent(true);
      setIsLoading(false);
      setFeedbackMessage({ 
        type: 'success', 
        text: `✨ Security code generated successfully! Enter the verification code sent to your registered email.` 
      });
    }, 800);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp) {
      setFeedbackMessage({ type: 'error', text: 'Please enter the verification code!' });
      return;
    }
    if (otp !== generatedOtp) {
      setFeedbackMessage({ type: 'error', text: '❌ Invalid verification code! Please try again.' });
      return;
    }

    setIsLoading(true);
    setFeedbackMessage(null);

    // Mock network reset delay
    setTimeout(() => {
      setIsLoading(false);
      setFeedbackMessage({ 
        type: 'success', 
        text: '🎉 Password has been updated successfully! Your settings are secured.' 
      });
      // Clear inputs
      setNewPassword('');
      setConfirmPassword('');
      setOtp('');
      setGeneratedOtp('');
      setOtpSent(false);
    }, 1000);
  };

  const handleCancelPasswordReset = () => {
    setNewPassword('');
    setConfirmPassword('');
    setOtp('');
    setGeneratedOtp('');
    setOtpSent(false);
    setFeedbackMessage(null);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FiSettings className="text-indigo-600 dark:text-indigo-400" />
          Tenant Settings
        </h1>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800">
          <FiSave size={16} /> Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation for Settings */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          <button
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'general' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'}`}
          >
            <FiSettings size={18} /> General Settings
          </button>
          <button
            onClick={() => setActiveTab('localization')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'localization' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'}`}
          >
            <FiGlobe size={18} /> Localization
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'}`}
          >
            <FiShield size={18} /> Security & Access
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'}`}
          >
            <FiBell size={18} /> Notifications
          </button>
          <button
            onClick={() => setActiveTab('changePassword')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'changePassword' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'}`}
          >
            <FiKey size={18} /> Change Password
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 min-h-[400px]">
          {activeTab === 'general' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Business Information</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Update your business details and contact information.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Name</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Email</label>
                  <input type="email" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Support Phone</label>
                  <input type="tel" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GST / Tax ID</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Address</label>
                  <textarea rows="3" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-500"></textarea>
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
                  <select className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-500">
                    <option value="INR">Indian Rupee (INR)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
                  <select className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-500">
                    <option value="IST">Indian Standard Time (IST)</option>
                    <option value="UTC">Coordinated Universal Time (UTC)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Format</label>
                  <select className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-500">
                    <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 25/12/2026)</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 12/25/2026)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-12-25)</option>
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
                  <FiLock className="text-indigo-600 dark:text-indigo-400" />
                  Change Account Password
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Ensure your administrative account is secure by setting a strong, unique password.
                </p>
              </div>

              {/* Feedback messages */}
              {feedbackMessage && (
                <div 
                  className={`flex items-start gap-3 p-4 rounded-xl border text-sm transition-all duration-200 ${
                    feedbackMessage.type === 'success' 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {feedbackMessage.type === 'success' ? (
                    <FiCheckCircle size={18} className="shrink-0 mt-0.5" />
                  ) : (
                    <FiAlertCircle size={18} className="shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold">{feedbackMessage.type === 'success' ? 'Success' : 'Attention Required'}</p>
                    <p className="mt-0.5 opacity-90">{feedbackMessage.text}</p>
                  </div>
                </div>
              )}

              {/* OTP Sent Success Block showing mock OTP */}
              {otpSent && generatedOtp && (
                <div className="bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 space-y-2 text-indigo-700 dark:text-indigo-300">
                  <div className="flex items-center gap-2">
                    <FiMail size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Demo Sandbox Assistant</span>
                  </div>
                  <p className="text-xs opacity-90">
                    For local testing, we have printed your verification code below:
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono bg-indigo-500/15 px-3 py-1.5 rounded-lg text-sm font-bold tracking-widest text-indigo-600 dark:text-indigo-400 select-all shadow-sm">
                      {generatedOtp}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 italic">(Copy and enter this code below)</span>
                  </div>
                </div>
              )}

              <form onSubmit={otpSent ? handleVerifyOtp : handleGenerateOtp} className="space-y-6 max-w-xl">
                {!otpSent ? (
                  // Phase 1: Enter new password details
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* New Password */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">New Password</label>
                        <div className="relative">
                          <input 
                            type={showNewPassword ? "text" : "password"} 
                            placeholder="Min 6 characters"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all pr-10" 
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                          >
                            {showNewPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
                        <div className="relative">
                          <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Repeat new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all pr-10" 
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                          >
                            {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition duration-200 active:scale-95 text-sm flex items-center justify-center gap-2"
                    >
                      {isLoading ? "Generating OTP..." : "Generate OTP & Continue"}
                    </button>
                  </div>
                ) : (
                  // Phase 2: Enter and verify OTP
                  <div className="space-y-4">
                    <div className="max-w-xs">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Enter 4-Digit Verification Code</label>
                      <input 
                        type="text" 
                        maxLength={4}
                        placeholder="••••"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // only allow numbers
                        required
                        className="w-full tracking-widest text-center text-lg font-bold rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" 
                      />
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isLoading || otp.length !== 4}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition duration-200 active:scale-95 text-sm flex items-center justify-center"
                      >
                        {isLoading ? "Verifying..." : "Verify OTP & Update Password"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelPasswordReset}
                        className="px-5 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 text-sm"
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
      </div>
      );
}
