'use client';

import React, { useState } from 'react';
import { CogIcon, BellIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        {saveMessage && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md flex items-center">
            <span className="mr-2">✓</span>
            {saveMessage}
          </div>
        )}
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('general')}
              className={`${activeTab === 'general' ? 'border-[#41AFFF] text-[#41AFFF]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <CogIcon className="h-5 w-5 mr-2" />
              General
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`${activeTab === 'notifications' ? 'border-[#41AFFF] text-[#41AFFF]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <BellIcon className="h-5 w-5 mr-2" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`${activeTab === 'security' ? 'border-[#41AFFF] text-[#41AFFF]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              Security
            </button>
            
          </nav>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          {/* General Settings Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Store Information</h3>
                <p className="mt-1 text-sm text-gray-500">Update your store details and preferences.</p>
                <div className="mt-5 space-y-4">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="store-name" className="block text-sm font-medium text-gray-700">Store name</label>
                    <input
                      type="text"
                      name="store-name"
                      id="store-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm h-10 px-3"
                      defaultValue="My Store"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="store-email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <input
                      type="email"
                      name="store-email"
                      id="store-email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm h-10 px-3"
                      defaultValue="contact@mystore.com"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="store-phone" className="block text-sm font-medium text-gray-700">Phone number</label>
                    <input
                      type="text"
                      name="store-phone"
                      id="store-phone"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm h-10 px-3"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="store-currency" className="block text-sm font-medium text-gray-700">Currency</label>
                    <select
                      id="store-currency"
                      name="store-currency"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm h-10"
                    >
                      <option>GHS (₵)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>JPY (¥)</option>
                      <option>INR (₹)</option>
                    </select>
                  </div>
                </div>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Appearance</h3>
                <p className="mt-1 text-sm text-gray-500">Customize how your admin panel looks.</p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="compact-view"
                        name="compact-view"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-[#41AFFF] focus:ring-[#41AFFF]"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="compact-view" className="font-medium text-gray-700">Compact view</label>
                      <p className="text-gray-500">Display more content with less spacing.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Preferences</h3>
                <p className="mt-1 text-sm text-gray-500">Decide how and when you want to be notified.</p>
                <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="email-notifications"
                      name="email-notifications"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email-notifications" className="font-medium text-gray-700">Email notifications</label>
                    <p className="text-gray-500">Get notified when a new order is placed.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="sms-notifications"
                      name="sms-notifications"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="sms-notifications" className="font-medium text-gray-700">SMS notifications</label>
                    <p className="text-gray-500">Get notified via SMS when a new order is placed.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="inventory-alerts"
                      name="inventory-alerts"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="inventory-alerts" className="font-medium text-gray-700">Inventory alerts</label>
                    <p className="text-gray-500">Get notified when product inventory is low.</p>
                  </div>
                </div>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Email Digest</h3>
                <p className="mt-1 text-sm text-gray-500">Configure summary emails of activities.</p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="daily-digest"
                        name="daily-digest"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-[#41AFFF] focus:ring-[#41AFFF]"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="daily-digest" className="font-medium text-gray-700">Daily digest</label>
                      <p className="text-gray-500">Receive a summary of the day's activities.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="weekly-digest"
                        name="weekly-digest"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-[#41AFFF] focus:ring-[#41AFFF]"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="weekly-digest" className="font-medium text-gray-700">Weekly digest</label>
                      <p className="text-gray-500">Receive a summary of the week's activities.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Account Security</h3>
                <p className="mt-1 text-sm text-gray-500">Manage your account security settings.</p>
                <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="two-factor-auth"
                      name="two-factor-auth"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="two-factor-auth" className="font-medium text-gray-700">Two-factor authentication</label>
                    <p className="text-gray-500">Add an extra layer of security to your account.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="login-alerts"
                      name="login-alerts"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="login-alerts" className="font-medium text-gray-700">Login alerts</label>
                    <p className="text-gray-500">Get notified when someone logs into your account.</p>
                  </div>
                </div>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Password</h3>
                <p className="mt-1 text-sm text-gray-500">Update your password regularly for better security.</p>
                <div className="mt-4 grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current password</label>
                    <input
                      type="password"
                      name="current-password"
                      id="current-password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#41AFFF] focus:ring-[#41AFFF] sm:text-sm h-10 px-3"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New password</label>
                    <input
                      type="password"
                      name="new-password"
                      id="new-password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#41AFFF] focus:ring-[#41AFFF] sm:text-sm h-10 px-3"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm new password</label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#41AFFF] focus:ring-[#41AFFF] sm:text-sm h-10 px-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Localization Tab */}
          {activeTab === 'localization' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Language & Region</h3>
                <p className="mt-1 text-sm text-gray-500">Set your preferred language and regional settings.</p>
                <div className="mt-4 grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
                    <select
                      id="language"
                      name="language"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#41AFFF] focus:outline-none focus:ring-[#41AFFF] sm:text-sm h-10"
                    >
                      <option>English</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Spanish</option>
                      <option>Chinese</option>
                      <option>Japanese</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Timezone</label>
                    <select
                      id="timezone"
                      name="timezone"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#41AFFF] focus:outline-none focus:ring-[#41AFFF] sm:text-sm h-10"
                    >
                      <option>UTC (GMT+0)</option>
                      <option>Eastern Time (GMT-5)</option>
                      <option>Central Time (GMT-6)</option>
                      <option>Mountain Time (GMT-7)</option>
                      <option>Pacific Time (GMT-8)</option>
                      <option>Japan Standard Time (GMT+9)</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="date-format" className="block text-sm font-medium text-gray-700">Date format</label>
                    <select
                      id="date-format"
                      name="date-format"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#41AFFF] focus:outline-none focus:ring-[#41AFFF] sm:text-sm h-10"
                    >
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
                <p className="mt-1 text-sm text-gray-500">Update your account profile information.</p>
                <div className="mt-4 grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#41AFFF] focus:ring-[#41AFFF] sm:text-sm h-10 px-3"
                      defaultValue="John"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#41AFFF] focus:ring-[#41AFFF] sm:text-sm h-10 px-3"
                      defaultValue="Doe"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#41AFFF] focus:ring-[#41AFFF] sm:text-sm h-10 px-3"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex justify-center rounded-md border border-transparent bg-[#41AFFF] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#2b9fe8] focus:outline-none focus:ring-2 focus:ring-[#41AFFF] focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
