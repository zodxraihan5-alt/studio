"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, TrendingUp, TrendingDown, Clock } from "lucide-react";

const mockHistory = [
  { id: 1, type: "Withdraw", amount: 500, status: "Approved", time: "2 hours ago", user: "Player***72" },
  { id: 2, type: "Deposit", amount: 100, status: "Success", time: "4 hours ago", user: "Me" },
  { id: 3, type: "Withdraw", amount: 250, status: "Approved", time: "5 hours ago", user: "User***09" },
  { id: 4, type: "Match Reward", amount: 100, status: "Success", time: "Yesterday", user: "Me" },
  { id: 5, type: "Withdraw", amount: 1000, status: "Approved", time: "Yesterday", user: "TopG***1" },
];

export function HistorySection() {
  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
      <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
        <History className="text-primary" /> Global Activity
      </h2>

      <div className="grid gap-3">
        {mockHistory.map((item) => (
          <Card key={item.id} className="bg-card border-border overflow-hidden">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.type === "Deposit" || item.type === "Match Reward" ? "bg-green-500/10" : "bg-red-500/10"}`}>
                  {item.type === "Deposit" || item.type === "Match Reward" ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm">{item.user === "Me" ? "Personal" : item.user}</p>
                    <Badge variant="outline" className="text-[10px] h-4 py-0 font-normal opacity-70">{item.type}</Badge>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${item.type === "Deposit" || item.type === "Match Reward" ? "text-green-500" : "text-red-500"}`}>
                  {item.type === "Deposit" || item.type === "Match Reward" ? "+" : "-"} ৳{item.amount}
                </p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">{item.status}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
