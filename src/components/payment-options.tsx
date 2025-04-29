"use client"
import React from "react"

import { useState } from "react"
import { CreditCard, Truck } from "lucide-react"
import type { UserDetails, PaymentMethod } from "@/components/checkout-page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface PaymentOptionsProps {
  userDetails: UserDetails
  onSelectPaymentMethod: (method: PaymentMethod) => void
}

export function PaymentOptions({ userDetails, onSelectPaymentMethod }: PaymentOptionsProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePaymentSelect = (method: PaymentMethod) => {
    setSelectedMethod(method)
  }

  const handleSubmit = async () => {
    if (!selectedMethod) return

    setIsProcessing(true)

    try {
      // In a real application, you would initiate the payment process here
      await onSelectPaymentMethod(selectedMethod)
    } catch (error) {
      console.error("Payment error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Mock order summary data
  const orderSummary = {
    subtotal: 1299,
    shipping: 49,
    tax: 130,
    total: 1478,
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose how you would like to pay for your order.</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedMethod || ""}
              onValueChange={(value) => handlePaymentSelect(value as PaymentMethod)}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="razorpay" id="razorpay" />
                  <Label htmlFor="razorpay" className="flex flex-1 items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Razorpay</p>
                        <p className="text-sm text-muted-foreground">Pay securely with credit/debit card or UPI</p>
                      </div>
                    </div>
                    <img src="/placeholder.svg?height=30&width=80" alt="Razorpay" className="h-8" />
                  </Label>
                </div>

                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex flex-1 items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Truck className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">Pay when your order is delivered</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} disabled={!selectedMethod || isProcessing} className="w-full">
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>₹{orderSummary.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>₹{orderSummary.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{orderSummary.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Shipping to:</h3>
              <p className="text-sm">{userDetails.fullName}</p>
              <p className="text-sm">{userDetails.address}</p>
              <p className="text-sm">
                {userDetails.city}, {userDetails.state} - {userDetails.pincode}
              </p>
              <p className="text-sm">{userDetails.phone}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
