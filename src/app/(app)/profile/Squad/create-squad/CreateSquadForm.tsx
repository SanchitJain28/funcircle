"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import CustomHeader from "@/components/header-footers/CustomHeader";
import { toast } from "react-toastify";

// Define the Zod schema for a single squad member
const SquadMemberSchema = z.object({
  member_id: z.string().min(1, "Member ID is required"),
  member_name: z.string().min(1, "Member name is required"),
});

// Define the Zod schema for the entire squad form
const SquadFormSchema = z.object({
  squad_name: z.string().min(3, "Squad name must be at least 3 characters."),
  squad_members: z
    .array(SquadMemberSchema)
    .min(2, "A squad must have at least 2 members.")
    .max(8, "A squad can have at most 8 members."),
});

type SquadFormValues = z.infer<typeof SquadFormSchema>;

interface RecentMember {
  member_id: string;
  member_name: string;
}

export default function CreateSquadForm() {
  const { profile, user } = useAuth();
  const [recentMembers, setRecentMembers] = useState<RecentMember[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SquadFormValues>({
    resolver: zodResolver(SquadFormSchema),
    defaultValues: {
      squad_name: "",
      squad_members: [
        { member_id: "", member_name: "" },
        { member_id: "", member_name: "" },
      ], // Start with 2 members
    },
  });

  // Update form values after component mounts
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "squad_members",
  });

  async function onSubmit(values: SquadFormValues) {
    if (!user) {
      toast("Please login to create a squad");
      return;
    }
    console.log("Squad Form Submitted:", values);
    setIsSubmitting(true);
    try {
      const { data } = await axios.post("/api/create-squad", {
        squad_name: values.squad_name,
        squad_members: values.squad_members,
        user_id: user.uid,
      });
      console.log(data);
      toast("Squad Created Successfully !! 😀😀");
    } catch (error) {
      console.log(error);
      toast("Squad cannot be created , Error occured");
    } finally {
      setIsSubmitting(false);
    }
    // Here you would typically send this data to your backend
  }

  const fetchRecentMembers = async () => {
    try {
      const { data } = await axios.post("/api/fetch-recent-members", {
        userId: profile?.profile.user_id,
      });
      setRecentMembers(data);
    } catch (error) {
      console.error("Error fetching recent members:", error);
    }
  };

  useEffect(() => {
    fetchRecentMembers();
    if (
      profile?.profile &&
      profile.current_duo &&
      profile.current_duo.other_user
    ) {
      form.setValue("squad_name", "");

      // Ensure member names are never null/undefined by providing proper fallbacks
      const currentUserName =
        profile.profile.first_name ||
        profile.profile.first_name ||
        "Current User";
      const otherUserName =
        profile.current_duo.other_user.first_name ||
        profile.current_duo.other_user.first_name ||
        "Team Member";

      form.setValue("squad_members", [
        {
          member_id: profile.profile.user_id,
          member_name: currentUserName,
        },
        {
          member_id: profile.current_duo.other_user.user_id || "",
          member_name: otherUserName,
        },
      ]);
    }
  }, [profile, form]);

  const handleAddRecentMember = (member: RecentMember) => {
    // Check if member already exists in the form to prevent duplicates
    const isDuplicate = fields.some(
      (field) => field.member_id === member.member_id
    );
    if (!isDuplicate) {
      append(member);
      setIsDialogOpen(false); // Close dialog after adding
    } else {
      // Optionally, show a toast or message that the member is already added
      console.log("Member already added to the squad.");
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-neutral-900 to-neutral-800">
        <Card className="w-full max-w-md bg-neutral-900/90 border-neutral-700">
          <CardContent className="p-8 text-center">
            <Users className="h-16 w-16 mx-auto mb-4 text-neutral-400" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Login Required
            </h3>
            <p className="text-neutral-400">
              Please login or create your profile to continue.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  if (!profile.current_duo) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-neutral-900 to-neutral-800">
        <Card className="w-full max-w-md bg-neutral-900/90 border-neutral-700">
          <CardContent className="p-8 text-center">
            <Users className="h-16 w-16 mx-auto mb-4 text-neutral-400" />
            <h3 className="text-xl font-semibold text-white mb-2">
              You do not have a duo
            </h3>
            <p className="text-neutral-400">
              Please Make a duo with someone else ,minimum member for squads : 2
              - 8
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-screen  bg-neutral-900/95">
      <CustomHeader />

      <div className="w-full max-w-4xl mx-auto py-12">
        <div className="bg-neutral-900/95 backdrop-blur-sm lg:border lg:my-4 mb-2 lg:border-zinc-600 rounded-2xl">
          <div className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-700">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Create Your Squad
            </div>
            <p className="text-neutral-400 mt-2">
              Build your team with 2-8 members
            </p>
          </div>
          <div className="p-6 sm:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Squad Name Section */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="squad_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-neutral-200">
                          Squad Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., The Champions"
                            {...field}
                            className="h-10 text-base bg-neutral-800/50 border-neutral-600 text-white placeholder:text-neutral-500 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Squad Members Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-200">
                      Squad Members ({fields.length}/8)
                    </h3>
                    <div className="text-sm text-neutral-400">
                      {fields.length < 2
                        ? "Add more members"
                        : `${8 - fields.length} slots remaining`}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {fields.map((item, index) => (
                      <Card
                        key={item.id}
                        className="bg-neutral-800/30 border-neutral-700 p-3 sm:p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium text-neutral-300">
                              Member {index + 1}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-neutral-500">
                                ID:
                              </span>
                              <code className="px-2 py-1 text-xs bg-neutral-700/50 text-neutral-400 rounded font-mono">
                                {item.member_id.slice(0, 25) || "Not set"}
                              </code>
                            </div>
                          </div>
                          {fields.length > 2 &&
                            item.member_id !== profile.profile.user_id &&
                            item.member_id !==
                              profile.current_duo.other_user.user_id && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => remove(index)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2"
                              >
                                <MinusCircle className="h-4 w-4" />
                              </Button>
                            )}
                        </div>

                        {/* Hidden member_id field for form validation */}
                        <FormField
                          control={form.control}
                          name={`squad_members.${index}.member_id`}
                          render={({ field }) => (
                            <FormItem className="hidden">
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* Member Name Field */}
                        {item.member_id === profile.profile.user_id ||
                        item.member_id ===
                          profile.current_duo.other_user.user_id ? (
                          <div className="text-sm text-neutral-400">
                            {item.member_id === profile.profile.user_id
                              ? profile.profile.first_name || "Current User"
                              : item.member_id ===
                                  profile.current_duo.other_user.user_id
                                ? profile.current_duo.other_user.first_name ||
                                  profile.current_duo.other_user.first_name ||
                                  "Team Member"
                                : "Team Member"}
                          </div>
                        ) : (
                          <FormField
                            control={form.control}
                            disabled={
                              item.member_id === profile.profile.user_id ||
                              item.member_id ===
                                profile.current_duo.other_user.user_id
                            }
                            name={`squad_members.${index}.member_name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-neutral-400 text-sm">
                                  Member Name
                                </FormLabel>
                                {(item.member_id === profile.profile.user_id ||
                                  item.member_id ===
                                    profile.current_duo.other_user.user_id) && (
                                  <span className="px-2 py-1 text-xs mx-2 bg-purple-600/20 text-purple-400 rounded-full">
                                    Auto-added
                                  </span>
                                )}
                                <FormControl>
                                  <Input
                                    placeholder="Enter member name"
                                    {...field}
                                    value={field.value || ""}
                                    className="bg-neutral-800/50 border-neutral-600 text-white placeholder:text-neutral-500 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-400 text-xs" />
                              </FormItem>
                            )}
                          />
                        )}
                      </Card>
                    ))}
                  </div>

                  {/* Add Member Button */}
                  {fields.length < 8 && (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full h-16 border-2 border-dashed border-neutral-600 text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300 hover:border-purple-500/50 transition-all duration-200 bg-transparent"
                        >
                          <PlusCircle className="mr-2 h-5 w-5" />
                          Add Squad Member
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[95vw] max-w-md max-h-[80vh] bg-neutral-900 text-white border-neutral-700 overflow-hidden">
                        <DialogHeader className="pb-4">
                          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                            Add Recent Members
                          </DialogTitle>
                          <DialogDescription className="text-neutral-400">
                            Select members from your recent activities to
                            quickly add them to your squad.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="overflow-y-auto max-h-[50vh] pr-2">
                          <div className="space-y-3">
                            {recentMembers.length > 0 ? (
                              recentMembers.map((member) => (
                                <div
                                  key={member.member_id}
                                  className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors duration-200 border border-neutral-700"
                                >
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-neutral-200 truncate">
                                      {member.member_name}
                                    </p>
                                    <p className="text-xs text-neutral-500 truncate">
                                      ID: {member.member_id}
                                    </p>
                                  </div>
                                  <Button
                                    type="button"
                                    size="sm"
                                    onClick={() =>
                                      handleAddRecentMember(member)
                                    }
                                    className="ml-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg transition-all duration-200"
                                  >
                                    Add
                                  </Button>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-8">
                                <Users className="h-12 w-12 mx-auto mb-3 text-neutral-500" />
                                <p className="text-neutral-500 font-medium">
                                  No recent members found
                                </p>
                                <p className="text-sm text-neutral-600 mt-1">
                                  Add members manually using their ID and name
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Create Squad
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
