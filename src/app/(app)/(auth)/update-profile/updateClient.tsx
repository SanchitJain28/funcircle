"use client";
import type React from "react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { User, Mail, Loader2, ArrowRight } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import CustomHeader from "@/components/header-footers/CustomHeader";

interface FormData {
  first_name: string;
  email: string;
}

interface FormErrors {
  first_name: string;
  email: string;
}

export default function UpdateClient() {
  const queryClient = useQueryClient();
  const { user, authLoading, profile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    first_name: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const redirectUrl = useMemo(() => {
    return searchParams?.get("redirect") || null;
  }, [searchParams]);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {
      first_name: "",
      email: "",
    };
    let isValid = true;

    // Name validation with better trimming
    const trimmedName = formData.first_name.trim();
    if (!trimmedName) {
      newErrors.first_name = "Name is required";
      isValid = false;
    } else if (trimmedName.length < 2) {
      newErrors.first_name = "Name must be at least 2 characters";
      isValid = false;
    } else if (trimmedName.length > 50) {
      newErrors.first_name = "Name must be less than 50 characters";
      isValid = false;
    }

    // Email validation with better regex
    const trimmedEmail = formData.email.trim().toLowerCase();
    if (!trimmedEmail) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)
    ) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    } else if (trimmedEmail.length > 254) {
      newErrors.email = "Email address is too long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData.first_name, formData.email]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error when user starts typing
    setErrors((prev) => {
      if (prev[name as keyof FormErrors]) {
        return { ...prev, [name]: "" };
      }
      return prev;
    });
  }, []);

  const updateSupabaseUser = useCallback(async () => {
    if (!user?.uid) {
      throw new Error("User not authenticated");
    }

    const sanitizedData = {
      first_name: formData.first_name.trim(),
      email: formData.email.trim().toLowerCase(),
    };

    console.log("Updating user with data:", sanitizedData);

    try {
      const { data } = await axios.post("/api/update-supabase-user", {
        user_id: user.uid,
        data: sanitizedData,
      });

      // Invalidate relevant queries
      await queryClient.invalidateQueries({ queryKey: ["userExp", user.uid] });
      await queryClient.invalidateQueries({ queryKey: ["profile", user.uid] });

      return data;
    } catch (error) {
      console.error("Error updating user in database:", error);
      throw error;
    }
  }, [formData, user?.uid, queryClient]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (isSubmitting) return; // Prevent double submission

      if (!validateForm()) {
        toast.error("Please fix the errors below", {
          position: "bottom-center",
          className: "bg-red-600 text-white",
        });
        return;
      }

      setIsSubmitting(true);

      try {
        await updateSupabaseUser();

        toast.success("Profile updated successfully!", {
          position: "bottom-center",
          className: "bg-green-600 text-white",
        });

        // Small delay to show success message before redirect
        setTimeout(() => {
          if (redirectUrl) {
            router.replace(
              `/assign-level?redirect=${encodeURIComponent(redirectUrl)}`
            );
          } else {
            router.replace("/funcircle");
          }
        }, 1000);
      } catch (error) {
        console.error("Profile update error:", error);
        const errorMessage = "Failed to complete profile. Please try again.";

        toast.error(errorMessage, {
          position: "bottom-center",
          className: "bg-red-600 text-white",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, validateForm, updateSupabaseUser, redirectUrl, router]
  );

  // Initialize form data from profile with proper dependency management
  useEffect(() => {
    if (profile?.profile && !isInitialized) {
      const newFormData: FormData = {
        first_name: profile.profile.first_name?.trim() || "",
        email: profile.profile.email?.trim() || "",
      };
      setFormData(newFormData);
      setIsInitialized(true);
    }
  }, [profile?.profile, isInitialized]);

  // Check if user is authenticated after auth loading completes
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  const isFormValid = useMemo(() => {
    return (
      formData.first_name.trim().length >= 2 &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email.trim()
      )
    );
  }, [formData.first_name, formData.email]);

  // Loading state
  if (authLoading || !isInitialized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if form is valid for submit button state
  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <CustomHeader/>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Right Side - Form */}
          <div>
            <Card className="bg-gray-900/80 border border-gray-800 shadow-xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-white text-xl font-semibold flex items-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  Your Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Fill in your details below to continue
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Name Field */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="first_name"
                      className="text-white font-medium text-sm"
                    >
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-4 top-4 h-4 w-4 text-gray-400 pointer-events-none" />
                      <Input
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="bg-black border border-gray-700 text-white pl-12 h-14 text-base focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all hover:border-gray-600 rounded-lg"
                        placeholder="Enter your full name"
                        aria-invalid={!!errors.first_name}
                        aria-describedby={
                          errors.first_name ? "name-error" : undefined
                        }
                        maxLength={50}
                        autoComplete="given-name"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.first_name && (
                      <p
                        id="name-error"
                        className="text-red-400 text-sm flex items-center mt-2"
                        role="alert"
                      >
                        <div className="w-1 h-1 bg-red-400 rounded-full mr-2"></div>
                        {errors.first_name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-white font-medium text-sm"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 h-4 w-4 text-gray-400 pointer-events-none" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-black border border-gray-700 text-white pl-12 h-14 text-base focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all hover:border-gray-600 rounded-lg"
                        placeholder="Enter your email address"
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        maxLength={254}
                        autoComplete="email"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.email && (
                      <p
                        id="email-error"
                        className="text-red-400 text-sm flex items-center mt-2"
                        role="alert"
                      >
                        <div className="w-1 h-1 bg-red-400 rounded-full mr-2"></div>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !isFormValid}
                      className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-base transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 rounded-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                          Completing Profile...
                        </>
                      ) : (
                        <>
                          Complete Profile
                          <ArrowRight className="ml-3 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Left Side - Information */}
          <div className="space-y-8 px-4">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Why do we need this information?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">
                      Personalization:
                    </span>{" "}
                    Help us customize your experience based on your preferences
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">
                      Communication:
                    </span>{" "}
                    Send you important updates and notifications
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Security:</span>{" "}
                    Verify your identity and protect your account
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Privacy & Security
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your information is encrypted and stored securely. We never
                share your personal data with third parties without your
                explicit consent.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={3}
      />
    </div>
  );
}
