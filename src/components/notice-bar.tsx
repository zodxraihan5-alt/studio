"use client";

import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";

export function NoticeBar() {
  const [notice, setNotice] = useState("Welcome to ZR ESPORTS! Send Add Money to 01754876018 (Bkash/Nagad). Solo BR Entry: 10 TK. Enjoy your game!");

  useEffect(() => {
    const savedNotice = localStorage.getItem("zresports_notice");
    if (savedNotice) setNotice(savedNotice);
  }, []);

  return (
    <div className="bg-primary/10 border-b border-primary/20 py-2 flex items-center overflow-hidden">
      <div className="px-3 bg-background z-10 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider border-r border-primary/20 shadow-[4px_0_10px_rgba(0,0,0,0.3)]">
        <Megaphone className="w-3 h-3" />
        <span>Update</span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="animate-marquee inline-block whitespace-nowrap py-0.5 text-sm font-medium">
          {notice}
        </div>
      </div>
    </div>
  );
}
