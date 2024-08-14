// src/components/auth/AuthLayout.tsx
import { ReactNode } from 'react';
import { Shield } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Column */}
      <div className="hidden w-1/2 bg-slate-800 lg:block">
        <div className="flex flex-col justify-between h-full p-8">
          <div className="flex items-center">
            <Shield size={40} className="text-white mr-2" />
            <span className="text-2xl font-bold text-white">CTS Lost & Found</span>
          </div>
          <div className="text-white">
            <blockquote className="text-2xl font-light italic">
              &quot;Safeguarding credentials, reuniting communities.&quot;
            </blockquote>
            <p className="mt-4 font-semibold">CTS Lost & Found Platform</p>
          </div>
        </div>
      </div>
      
      {/* Right Column */}
      <div className="w-full lg:w-1/2">
        <div className="flex items-center justify-center min-h-screen p-8">
          {children}
        </div>
      </div>
    </div>
  );
}