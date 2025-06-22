import SignUpComponent from '@/components/sign-up/SignUpComponent'
import React, { Suspense } from 'react'
export default function CompleteProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpComponent/>
    </Suspense>
  )
}
