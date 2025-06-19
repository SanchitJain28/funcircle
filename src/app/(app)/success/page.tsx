import TicketConfirmationPage from '@/components/Sucess-page/SuccessPageComponent'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <TicketConfirmationPage/>
    </Suspense>
  )
}
