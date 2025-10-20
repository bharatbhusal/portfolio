"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ComingSoon = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[90%] w-full">
      <h1 className="text-6xl font-bold mb-4">Coming Soon</h1>
      <p className="text-2xl text-muted-foreground mb-8">
        I am working hard to bring you something amazing on this website. Stay
        tuned!
      </p>
      <Button
        variant="default"
        size="lg"
        className="font-semibold"
        onClick={() => router.push("/")}
      >
        Go Home
      </Button>
    </div>
  );
};

export default ComingSoon;
