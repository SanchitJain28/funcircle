"use client"
import React, { createContext, useContext, useState, type ReactNode } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

// Define modal types
export type ModalType = "signin" | "signup" | "gohome" | null

// Define context interface
interface ModalContextType {
  currentModal: ModalType
  showModal: (type: ModalType) => void
  hideModal: () => void
  isModalOpen: boolean
}

// Create context with default values
const ModalContext = createContext<ModalContextType>({
  currentModal: null,
  showModal: () => {},
  hideModal: () => {},
  isModalOpen: false,
})

// Custom hook to use the modal context
export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}

// Modal Provider Component
export function ModalProvider({ children }: { children: ReactNode }) {
  const [currentModal, setCurrentModal] = useState<ModalType>(null)

  const showModal = (type: ModalType) => {
    setCurrentModal(type)
  }

  const hideModal = () => {
    setCurrentModal(null)
  }

  const isModalOpen = currentModal !== null

  const value: ModalContextType = {
    currentModal,
    showModal,
    hideModal,
    isModalOpen,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export const SignInModal = () => {
  const router = useRouter()
  const { hideModal } = useModal()

  const handleSignIn = () => {
    hideModal()
    router.push("/sign-in")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#F9F9F9]">Welcome Back</h2>
        <p className="text-[#F9F9F9]/70">Ready to sign in to your account?</p>
      </div>

      <Button
        onClick={handleSignIn}
        className="w-full bg-[#F26610] hover:bg-[#F26610]/90 text-white font-medium py-2.5 transition-all duration-200 hover:scale-[1.02]"
      >
        Go to Sign In
      </Button>
    </motion.div>
  )
}

export const SignUpModal = () => {
  const router = useRouter()
  const { hideModal } = useModal()

  const handleSignUp = () => {
    hideModal()
    router.push("/sign-up")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#F9F9F9]">Create Account</h2>
        <p className="text-[#F9F9F9]/70">Ready to join us and get started?</p>
      </div>

      <Button
        onClick={handleSignUp}
        className="w-full bg-[#F26610] hover:bg-[#F26610]/90 text-white font-medium py-2.5 transition-all duration-200 hover:scale-[1.02]"
      >
        Go to Sign Up
      </Button>
    </motion.div>
  )
}

export const GoHomeModal = () => {
  const router = useRouter()
  const { hideModal } = useModal()

  const handleGoHome = () => {
    hideModal()
    router.push("/")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6 text-center"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[#F9F9F9]">Navigate Home</h2>
        <p className="text-[#F9F9F9]/70">Ready to go back to the home page?</p>
      </div>

      <Button
        onClick={handleGoHome}
        className="w-full bg-[#F26610] hover:bg-[#F26610]/90 text-white font-medium py-2.5 transition-all duration-200 hover:scale-[1.02]"
      >
        Go Home
      </Button>
    </motion.div>
  )
}

export const ModalContainer = () => {
  const { currentModal, hideModal } = useModal()

//   const getModalTitle = () => {
//     switch (currentModal) {
//       case "signin":
//         return "Sign In"
//       case "signup":
//         return "Sign Up"
//       case "gohome":
//         return "Navigate"
//       default:
//         return ""
//     }
//   }

  const renderModal = () => {
    switch (currentModal) {
      case "signin":
        return <SignInModal />
      case "signup":
        return <SignUpModal />
      case "gohome":
        return <GoHomeModal />
      default:
        return null
    }
  }

  return (
    <Dialog open={!!currentModal} onOpenChange={(open) => !open && hideModal()}>
      <DialogContent className="sm:max-w-md w-[95vw] max-w-[425px] bg-[#000000] border border-[#8A36EB]/20 text-[#F9F9F9] p-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative"
        >
          {/* Custom close button */}
          <button
            onClick={hideModal}
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-[#F9F9F9]/70 hover:text-[#F9F9F9] hover:bg-[#8A36EB]/10 transition-all duration-200 hover:scale-110"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="p-6 pt-12">
            <AnimatePresence mode="wait">{renderModal()}</AnimatePresence>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
