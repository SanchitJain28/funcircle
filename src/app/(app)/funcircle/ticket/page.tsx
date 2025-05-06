import React from 'react';
import SingleTicket from '@/app/components/TIcket';
import { Suspense } from 'react';
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SingleTicket/>
    </Suspense>
  );
}