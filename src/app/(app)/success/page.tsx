import TicketConfirmationPage from '@/app/components/SuccessPageComponent'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <TicketConfirmationPage/>
    </Suspense>
  )
}
