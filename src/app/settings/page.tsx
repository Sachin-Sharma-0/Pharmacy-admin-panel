import React from 'react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">General Settings</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Configure your admin panel preferences.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="space-y-6">
            {/* Store Information */}
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Store Information</h3>
              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="store-name" className="block text-sm font-medium text-gray-700">Store name</label>
                    <input
                      type="text"
                      name="store-name"
                      id="store-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      defaultValue="My Store"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="store-email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <input
                      type="email"
                      name="store-email"
                      id="store-email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      defaultValue="contact@mystore.com"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="store-phone" className="block text-sm font-medium text-gray-700">Phone number</label>
                    <input
                      type="text"
                      name="store-phone"
                      id="store-phone"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="store-currency" className="block text-sm font-medium text-gray-700">Currency</label>
                    <select
                      id="store-currency"
                      name="store-currency"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    >
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

            {/* Notification Settings */}
            <div className="pt-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Settings</h3>
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

            {/* Security Settings */}
            <div className="pt-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Security Settings</h3>
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
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}