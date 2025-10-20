/**
 * ToggleProfileQR Component
 * Interactive profile/QR code toggle with vCard support
 * Enables direct contact saving on iOS and Android devices
 */
"use client";

import React, { useState } from "react";
import { QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToggleProfileQRProps {
  profileUrl: string;
  qrValue: string;
  name?: string;
}

const ToggleProfileQR: React.FC<ToggleProfileQRProps> = ({
  profileUrl,
  qrValue,
  name = "Profile",
}) => {
  const [showQR, setShowQR] = useState<boolean>(false);

  const toggleQR = () => setShowQR((prev) => !prev);

  return (
    <div className="relative inline-block w-[260px] h-[260px] mb-5">
      {/* Main display area */}
      <div className="w-full h-full flex items-center justify-center rounded-full mx-auto relative">
        {/* Profile Image */}
        <div
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            showQR
              ? "opacity-0 scale-90 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
        >
          <Avatar className="w-full h-full border-4 border-primary/30 shadow-xl hover:border-primary/50 transition-all duration-300">
            <AvatarImage src={profileUrl} alt={name} className="object-cover" />
            <AvatarFallback className="text-6xl bg-muted">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* QR Code */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
            showQR
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          <div className="bg-white p-4 rounded-2xl shadow-2xl border-4 border-primary/30 hover:border-primary/50 transition-all duration-300">
            <QRCodeSVG
              value={qrValue}
              size={220}
              level="H"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleQR}
              className="absolute bottom-0 right-0 rounded-full w-14 h-14 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-primary/30 hover:border-primary/50 bg-background"
              aria-label={showQR ? "Show profile" : "Show QR code"}
            >
              {showQR ? (
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={profileUrl}
                    alt={name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-sm">
                    {name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <QrCode className="w-6 h-6 transition-transform duration-300" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {showQR ? "Show profile picture" : "Show QR code to save contact"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ToggleProfileQR;
