"use client";
import type React from "react";
import { useState } from "react";
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
import { User, Mail, Loader2, ArrowRight, Trophy, Star } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CustomHeader from "../header-footers/CustomHeader";
import KnowYourLevel from "@/app/(app)/funcircle/eventTicket/[group_id]/KnowYourLevel";

export default function CompleteProfile() {
  const queryClient = useQueryClient();
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    usersetlevel: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    usersetlevel: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.usersetlevel.trim()) {
      newErrors.usersetlevel = "Player Level is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.usersetlevel = "Please choose a level";
      isValid = false;
    } else {
      newErrors.usersetlevel = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const createSupabaseUser = async () => {
    try {
      const { data } = await axios.post("/api/create-supabase-guest-user", {
        email: formData.email,
        first_name: formData.name,
        user_id: user?.uid,
        usersetlevel: formData.usersetlevel,
      });
      queryClient.invalidateQueries({ queryKey: ["userExp", user?.uid] });
      return data;
    } catch (error) {
      console.error("Error creating user in database:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await createSupabaseUser();
        toast.success("Profile completed successfully!", {
          position: "bottom-center",
          className: "bg-green-600 text-white",
        });
        if (searchParams.get("redirect")) {
          router.replace(searchParams.get("redirect") ?? "/funcircle");
          return;
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to complete profile. Please try again.", {
          position: "bottom-center",
          className: "bg-red-600 text-white",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <CustomHeader />
      <div>
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-600/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className=" mb-6 px-4">
              <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
                Complete Your Profile
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Just a few more details to personalize your experience and get
                you started on your journey
              </p>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Right Side - Form */}
              <div className="lg:sticky lg:top-8">
                <Card className="bg-gray-900/60 border-gray-700/50 backdrop-blur-sm shadow-2xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-white text-2xl font-semibold">
                      Your Information
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-base">
                      Help us personalize your experience
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Name Field */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="name"
                          className="text-white font-medium text-base"
                        >
                          Full Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-gray-800/50 border-gray-600 text-white pl-12 h-14 text-base focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all rounded-xl"
                            placeholder="Enter your full name"
                            aria-invalid={!!errors.name}
                            aria-describedby={
                              errors.name ? "name-error" : undefined
                            }
                          />
                        </div>
                        {errors.name && (
                          <p
                            id="name-error"
                            className="text-red-400 text-sm font-medium"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="email"
                          className="text-white font-medium text-base"
                        >
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-gray-800/50 border-gray-600 text-white pl-12 h-14 text-base focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all rounded-xl"
                            placeholder="Enter your email address"
                            aria-invalid={!!errors.email}
                            aria-describedby={
                              errors.email ? "email-error" : undefined
                            }
                          />
                        </div>
                        {errors.email && (
                          <p
                            id="email-error"
                            className="text-red-400 text-sm font-medium"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Level Field */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="level"
                          className="text-white font-medium text-base flex items-center justify-between  gap-2"
                        >
                          <div className="flex">
                            <Trophy className="w-5 h-5 text-yellow-400 mx-2" />
                            <p>Your Level</p>
                          </div>

                          <KnowYourLevel fixed={false} className="" />
                        </Label>
                        <div className="flex items-center">
                          <Select
                            value={formData.usersetlevel}
                            onValueChange={(e) => {
                              return setFormData((prev) => ({
                                ...prev,
                                usersetlevel: e,
                              }));
                            }}
                          >
                            <SelectTrigger className="w-full h-14 bg-gray-800/50 text-white border-gray-600 hover:bg-gray-800/70 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-base">
                              <SelectValue placeholder="Choose your level" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600 rounded-xl">
                              <SelectGroup>
                                <SelectLabel className="text-gray-400 font-medium">
                                  Level
                                </SelectLabel>
                                <SelectItem
                                  value="2"
                                  className="text-white hover:bg-gray-700 focus:bg-gray-700 rounded-lg"
                                >
                                  Level 1
                                </SelectItem>
                                <SelectItem
                                  value="4"
                                  className="text-white hover:bg-gray-700 focus:bg-gray-700 rounded-lg"
                                >
                                  Level 2
                                </SelectItem>
                                <SelectItem
                                  value="6"
                                  className="text-white hover:bg-gray-700 focus:bg-gray-700 rounded-lg"
                                >
                                  Level 3
                                </SelectItem>
                                <SelectItem
                                  value="8"
                                  className="text-white hover:bg-gray-700 focus:bg-gray-700 rounded-lg"
                                >
                                  Level 4
                                </SelectItem>
                                <SelectItem
                                  value="10"
                                  className="text-white hover:bg-gray-700 focus:bg-gray-700 rounded-lg"
                                >
                                  Level 5
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        {errors.usersetlevel && (
                          <p className="text-red-400 text-sm font-medium">
                            {errors.usersetlevel}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold text-base transition-all rounded-xl shadow-lg hover:shadow-purple-500/25"
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
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8 px-4">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    What happens next?
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">
                          Personalized Experience
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Your profile helps us tailor games and recommendations
                          just for you
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">
                          Level-Based games
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Get challenges and games that match your skill level
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Star className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">
                          Track Progress
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Monitor your growth and achievements as you advance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
        />
      </div>
    </div>
  );
}
