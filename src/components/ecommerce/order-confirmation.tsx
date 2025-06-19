import React from "react"

import { CheckCircle2 } from "lucide-react"
import type { UserDetails, PaymentMethod } from "@/components/ecommerce/checkout-page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface OrderConfirmationProps {
  userDetails: UserDetails
  paymentMethod: PaymentMethod
  orderId: string | null
}

export function OrderConfirmation({ userDetails, paymentMethod, orderId }: OrderConfirmationProps) {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
        <CardDescription>
          Thank you for your order. We have received your payment and will process your order shortly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Order Details</h3>
            <div className="rounded-md bg-muted p-4">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-medium">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-medium capitalize">
                  {paymentMethod === "cod" ? "Cash on Delivery" : "Razorpay"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Shipping Information</h3>
            <div className="rounded-md bg-muted p-4">
              <p>{userDetails.fullName}</p>
              <p>{userDetails.address}</p>
              <p>
                {userDetails.city}, {userDetails.state} - {userDetails.pincode}
              </p>
              <p>{userDetails.phone}</p>
              <p>{userDetails.email}</p>
            </div>
          </div>

          <div className="rounded-md border p-4">
            <p className="text-center text-sm text-muted-foreground">
              A confirmation email has been sent to <span className="font-medium">{userDetails.email}</span>
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" className="mr-2">
          Track Order
        </Button>
        <Button>Continue Shopping</Button>
      </CardFooter>
    </Card>
  )
}
