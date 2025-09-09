import React, { useState, useEffect, ReactNode, JSX, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  User,
  Mail,
  Shield,
  Settings,
  LucideIcon,
} from "lucide-react";
import { useAuth } from "./useAuth";
import { useToast } from "@/app/Contexts/ToastContext";
import axios, { AxiosError } from "axios";
import { ApiError } from "./useChat";
import { useQueryClient } from "@tanstack/react-query";
import { useCheckProfile } from "./useProfile";

// Types
type ProfileField = "first_name" | "email" | "usersetlevel" | "adminsetlevel";
type FieldsToCheck = Array<ProfileField | "all">;
type UserLevel = "beginner" | "intermediate" | "advanced" | "expert";

interface ProfileData {
  first_name?: string | null;
  email?: string | null;
  usersetlevel?: UserLevel | string | null;
  adminsetlevel?: UserLevel | string | null;
}

interface FormData {
  first_name: string;
  email: string;
  usersetlevel: string;
  adminsetlevel: string;
}

interface UseCheckEmptyProfileProps {
  fieldsToCheck?: FieldsToCheck;
  profileData?: ProfileData;
  onSave?: (data: FormData) => void;
  triggerComponent?: ReactNode;
}

interface FieldConfig {
  label: string;
  icon: LucideIcon;
  type: "text" | "email" | "select";
  placeholder: string;
  options?: { value: string; label: string }[];
}

const CheckEmptyProfile: React.FC<UseCheckEmptyProfileProps> = ({
  fieldsToCheck = ["all"],
  triggerComponent = null,
}) => {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useAuth();
  const { data: profile, isPending, isError } = useCheckProfile(user?.uid ?? "");
  const [submitting, setSubmitting] = useState(false);

  // Add a ref to track if we just successfully saved
  const justSavedRef = useRef(false);

  const { showToast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    email: "b@gmail.com",
    usersetlevel: "",
    adminsetlevel: "",
  });
  const [emptyFields, setEmptyFields] = useState<ProfileField[]>([]);

  const allFields: ProfileField[] = [
    "first_name",
    "email",
    "usersetlevel",
    "adminsetlevel",
  ];

  const fieldConfig: Record<ProfileField, FieldConfig> = {
    first_name: {
      label: "Full Name",
      icon: User,
      type: "text",
      placeholder: "Enter your full name",
    },
    email: {
      label: "Email Address",
      icon: Mail,
      type: "email",
      placeholder: "Enter your email address",
    },
    usersetlevel: {
      label: "User Level",
      icon: Shield,
      type: "select",
      placeholder: "Select user level",
      options: [
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
        { value: "advanced", label: "Advanced" },
        { value: "expert", label: "Expert" },
      ],
    },
    adminsetlevel: {
      label: "Admin Level",
      icon: Settings,
      type: "select",
      placeholder: "Select admin level",
      options: [
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
        { value: "advanced", label: "Advanced" },
        { value: "expert", label: "Expert" },
      ],
    },
  };

  // Check for empty fields
  useEffect(() => {
    if (!isPending && !isError && profile) {
      const fieldsToValidate: ProfileField[] = fieldsToCheck.includes("all")
        ? allFields
        : fieldsToCheck.filter(
            (field): field is ProfileField => field !== "all"
          );

      const empty = fieldsToValidate.filter((field: ProfileField) => {
        const value = profile[field];
        return !value || value.toString().trim() === "";
      });

      setEmptyFields(empty);

      if (empty.length > 0 && !isOpen && !justSavedRef.current) {
        setIsOpen(true);
      }

      // Reset the flag after checking
      if (justSavedRef.current) {
        justSavedRef.current = false;
      }
    }
  }, [profile, isPending, isError, fieldsToCheck, isOpen]);

  useEffect(() => {
    if (profile) {
      console.log("PROFILE IS");
      setFormData({
        first_name: profile.first_name || "",
        email: profile.email || "",
        usersetlevel: profile.usersetlevel || "",
        adminsetlevel: profile.adminsetlevel || "",
      });
    }
  }, [profile]);

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSubmitting(true);
    // Validate required fields
    const hasEmptyRequired = emptyFields.some(
      (field: ProfileField) => !formData[field]?.trim()
    );

    if (hasEmptyRequired) {
      showToast({
        variant: "warning",
        message: "Please fill all the required fields before saving.",
      });
      setSubmitting(false);
      return; // Don't close if required fields are still empty
    }

    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(
        ([, value]) => value !== "" && value !== null && value !== undefined
      )
    );

    try {
      await axios.post("/api/profile/update", {
        user_id: user?.uid,
        formData:filteredFormData,
      });

      // ✅ Set flag to prevent automatic reopening
      justSavedRef.current = true;

      queryClient.invalidateQueries({
        queryKey: ["profile-details", user?.uid],
      });
      setIsOpen(false); // ✅ close after success

      showToast({
        variant: "success",
        message: "Profile updated successfully!",
      });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        showToast({
          variant: "danger",
          message: "Error updating the profile " + axiosError.message,
        });
      } else {
        showToast({
          variant: "danger",
          message: "Error updating the profile : Unexpected Error Occurred",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (fieldName: ProfileField): JSX.Element => {
    const config = fieldConfig[fieldName];
    const isRequired = emptyFields.includes(fieldName);

    const borderColor =
      isRequired && !formData[fieldName] ? "#E74C3C" : "#B58CF4"; // Red for error, secondary for normal
    const bgColor = "#000000"; // Dark input background
    const textColor = "#F9F9F9"; // Light text

    return (
      <div key={fieldName} className="space-y-2">
        {config.type === "select" ? (
          <Select
            value={formData[fieldName]}
            onValueChange={(value: string) =>
              handleInputChange(fieldName, value)
            }
          >
            <SelectTrigger
              className="w-full"
              style={{
                border: `2px solid ${borderColor}`,
                backgroundColor: bgColor,
                color: textColor,
              }}
            >
              <SelectValue placeholder={config.placeholder} />
            </SelectTrigger>
            <SelectContent
              style={{ backgroundColor: bgColor, color: textColor }}
            >
              {config.options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  style={{ color: textColor }}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id={fieldName}
            type={config.type}
            value={formData[fieldName]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(fieldName, e.target.value)
            }
            placeholder={config.placeholder}
            style={{
              border: `2px solid ${borderColor}`,
              backgroundColor: bgColor,
              color: textColor,
            }}
            className="focus:outline-none"
          />
        )}

        {isRequired && !formData[fieldName] && (
          <p
            className="text-xs flex items-center gap-1"
            style={{ color: "#E74C3C" }}
          >
            <AlertCircle size={12} />
            This field is required
          </p>
        )}
      </div>
    );
  };

  const fieldsToRender: ProfileField[] = fieldsToCheck.includes("all")
    ? allFields
    : fieldsToCheck.filter((field): field is ProfileField => field !== "all");

  // Show loading state
  if (isPending) {
    return (
      <div
        className="fixed bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg border-l-4"
        style={{ borderLeftColor: "#8A36EB" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="animate-spin rounded-full h-5 w-5 border-b-2"
            style={{ borderColor: "#8A36EB" }}
          ></div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              Loading Profile...
            </p>
            <p className="text-xs text-gray-600">Please wait</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div
        className="fixed bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg border-l-4"
        style={{ borderLeftColor: "#E74C3C" }}
      >
        <div className="flex items-center gap-2">
          <AlertCircle style={{ color: "#E74C3C" }} size={20} />
          <div>
            <p className="text-sm font-medium text-gray-900">Profile Error</p>
            <p className="text-xs text-gray-600">Failed to load profile data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {triggerComponent && (
          <SheetTrigger asChild>{triggerComponent}</SheetTrigger>
        )}

        <SheetContent
          side="bottom"
          className="h-[80vh] overflow-y-auto border-t border-orange-600"
          style={{ backgroundColor: "#000000" }} // Neutral background
        >
          <SheetHeader className="pb-6">
            <SheetTitle
              className="flex items-center gap-2 text-xl font-bold"
              style={{ color: "#F9F9F9" }} // Text color
            >
              <User style={{ color: "#F26610" }} size={24} />{" "}
              {/* Primary highlight */}
              Complete Your Profile
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6 pb-6">
            {/* Form fields */}
            <div className="rounded-lg ">{fieldsToRender.map(renderField)}</div>
          </div>

          {/* Action buttons */}
          <div className="sticky bottom-0 bg-[#000000] border-t p-4 flex gap-3">
            <Button
              onClick={handleSave}
              className="flex-1 text-white font-medium"
              style={{
                backgroundColor: "#F26610", // Primary CTA
              }}
              disabled={
                submitting ||
                emptyFields.some(
                  (field: ProfileField) => !formData[field]?.trim()
                )
              }
            >
              {submitting ? "Updating Profile..." : "Update Profile"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Optional: Show completion status when not in sheet */}
      {!isOpen && emptyFields.length > 0 && (
        <div
          className="fixed bottom-4 right-4 bg-[#1a1a1a] p-3 rounded-lg shadow-lg border-l-4 cursor-pointer hover:shadow-xl transition-shadow"
          style={{ borderLeftColor: "#F1C40F" }} // Warning color
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center gap-2">
            <AlertCircle style={{ color: "#F1C40F" }} size={20} />
            <div>
              <p className="text-sm font-medium text-[#F9F9F9]">
                Profile Incomplete
              </p>
              <p className="text-xs text-[#B58CF4]">
                {emptyFields.length} field{emptyFields.length > 1 ? "s" : ""}{" "}
                missing
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckEmptyProfile;
