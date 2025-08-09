"use client";

import { Button } from '@/components/ui/button';
import { CloudOff } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <CloudOff className="w-24 h-24 text-gray-400 mb-8" />
      
      <h1 className="text-3xl font-bold mb-2">You&apos;re offline</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
        No internet connection found. Check your connection and try again.
      </p>
      
      <div className="space-x-4">
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-blue-500 hover:bg-blue-600"
        >
          Retry Connection
        </Button>
        
        <Link href="/" passHref>
          <Button variant="outline">Back to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}
