import { CheckCircle2 } from "lucide-react"
import React from "react"

interface StepsProps {
  currentStep: number
}

export function Steps({ currentStep }: StepsProps) {
  const steps = [
    { id: 1, name: "User Details" },
    { id: 2, name: "Payment Method" },
    { id: 3, name: "Confirmation" },
  ]

  return (
    <div className="w-full">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={`relative flex-1 ${stepIdx === steps.length - 1 ? "" : "pr-8"}`}>
              {step.id < currentStep ? (
                <div className="group">
                  <span className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                      <CheckCircle2 className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                    <span className="ml-3 text-sm font-medium text-primary">{step.name}</span>
                  </span>
                </div>
              ) : step.id === currentStep ? (
                <div className="flex items-center" aria-current="step">
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  </span>
                  <span className="ml-3 text-sm font-medium text-primary">{step.name}</span>
                </div>
              ) : (
                <div className="group">
                  <span className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-500">{step.name}</span>
                  </span>
                </div>
              )}

              {stepIdx !== steps.length - 1 && (
                <div
                  className={`absolute right-0 top-4 w-5 h-0.5 ${step.id < currentStep ? "bg-primary" : "bg-gray-300"}`}
                />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
