'use client';

import React, { ComponentProps, ComponentType } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export function withAuth<T extends ComponentType<any>>(WrappedComponent: T) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const AuthenticatedComponent = (props: ComponentProps<T>) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
      return null; // or a custom "Access Denied" component
    }

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${displayName})`;

  return AuthenticatedComponent;
}