"use client"
import React from "react"

import { useState } from "react"
import { UserDetailsForm } from "@/components/user-details-form"
import { PaymentOptions } from "@/components/payment-options"
import { OrderConfirmation } from "@/components/order-confirmation"
import { Steps } from "@/components/steps"

export type UserDetails = {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

export type PaymentMethod = "razorpay" | "cod" | null

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [userDetails, setUserDetails] = useState<UserDetails>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  const handleUserDetailsSubmit = (details: UserDetails) => {
    setUserDetails(details)
    setStep(2)
  }

  const handlePaymentMethodSelect = async (method: PaymentMethod) => {
    setPaymentMethod(method)

    // In a real application, you would create an order on your backend
    // and get an order ID back
    const mockOrderId = `ORD-${Math.floor(Math.random() * 1000000)}`
    setOrderId(mockOrderId)

    if (method === "cod") {
      // For COD, we can directly move to confirmation
      setStep(3)
    } else if (method === "razorpay") {
      // For Razorpay, we would normally open the payment modal
      // This is a mock implementation
      setTimeout(() => {
        // Simulate successful payment
        setStep(3)
      }, 1000)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Steps currentStep={step} />

      <div className="mt-8">
        {step === 1 && <UserDetailsForm initialValues={userDetails} onSubmit={handleUserDetailsSubmit} />}

        {step === 2 && <PaymentOptions userDetails={userDetails} onSelectPaymentMethod={handlePaymentMethodSelect} />}

        {step === 3 && <OrderConfirmation userDetails={userDetails} paymentMethod={paymentMethod} orderId={orderId} />}
      </div>
    </div>
  )
}
