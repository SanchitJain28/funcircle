import SingleTicket from '@/components/singleTicket/TIcket';
import React from 'react';
import { Suspense } from 'react';
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SingleTicket/>
    </Suspense>
  );
}