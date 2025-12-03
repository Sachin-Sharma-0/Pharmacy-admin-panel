"use client";
import React from 'react';
import UserProfile from '@/components/auth/UserProfile';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
      <UserProfile />
    </div>
  );
}