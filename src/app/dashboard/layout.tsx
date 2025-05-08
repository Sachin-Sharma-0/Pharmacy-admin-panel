"use client";
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout now just passes children through to the root layout
  // to avoid duplicate sidebars and headers
  return (
    <>
      {children}
    </>
  );
}