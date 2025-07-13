"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DuoRequiredModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DuoRequiredModal({
  isOpen,
  onOpenChange,
}: DuoRequiredModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Duo Required</DialogTitle>
          <DialogDescription>
            You need to form a duo before you can create a squad. Please create
            or join a duo first.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Got It</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
