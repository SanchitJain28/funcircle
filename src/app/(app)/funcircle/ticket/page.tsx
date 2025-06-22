import React from 'react';
import { Suspense } from 'react';
import TicketClient from './TicketClient';
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TicketClient/>
    </Suspense>
  );
}