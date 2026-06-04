
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Smartphone, CheckCircle, Wallet as WalletIcon, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function WalletSection({ userData, setUserData }: { userData: any, setUserData: any }) {
  const [bkashNumber, setBkashNumber] = useState("01754876018");
  const [nagadNumber, setNagadNumber] = useState("019XXXXXXXX");
  const [minWithdraw, setMinWithdraw] = useState(100);
  const [success, setSuccess] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [depositMethod, setDepositMethod] = useState<"bkash" | "nagad">("bkash");

  useEffect(() => {
    const savedBkash = localStorage.getItem("zresports_bkash_num");
    const savedNagad = localStorage.getItem("zresports_nagad_num");
    const savedMin = localStorage.getItem("zresports_min_withdraw");
    
    if (savedBkash) setBkashNumber(savedBkash);
    if (savedNagad) setNagadNumber(savedNagad);
    else {
        // Default numbers if not found
        setBkashNumber("01754876018");
        setNagadNumber("01754876018");
    }
    if (savedMin) setMinWithdraw(Number(savedMin));
  }, []);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(depositAmount);
    if (isNaN(amount) || amount <= 0) return;

    // Simulate updating balance (Mock logic)
    const newUser = { ...userData, balance: userData.balance + amount };
    setUserData(newUser);
    localStorage.setItem("zresports_user", JSON.stringify(newUser));

    setSuccess(`${depositMethod.toUpperCase()} ডিপোজিট সফল হয়েছে! ৳${amount} আপনার ওয়ালেটে যোগ করা হয়েছে।`);
    setDepositAmount("");
    setTimeout(() => setSuccess(""), 5000);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("উত্তোলনের অনুরোধ পাঠানো হয়েছে! ২৪ ঘণ্টার মধ্যে টাকা পেয়ে যাবেন।");
    setTimeout(() => setSuccess(""), 5000);
  };

  const currentNumber = depositMethod === "bkash" ? bkashNumber : nagadNumber;

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-10">
      <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
        <WalletIcon className="text-primary" /> ওয়ালেট ম্যানেজমেন্ট
      </h2>

      {success && (
        <Alert className="bg-green-500/10 border-green-500 text-green-500">
          <CheckCircle className="w-4 h-4" />
          <AlertTitle>সফল!</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="deposit">
        <TabsList className="grid w-full grid-cols-2 bg-secondary h-12">
          <TabsTrigger value="deposit" className="text-sm font-bold">টাকা জমা দিন</TabsTrigger>
          <TabsTrigger value="withdraw" className="text-sm font-bold">টাকা তুলুন</TabsTrigger>
        </TabsList>

        <TabsContent value="deposit">
          <Card className="bg-card border-border shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="font-headline text-lg">অ্যাড মানি</CardTitle>
              <CardDescription>নিচের যে কোনো একটি মেথড সিলেক্ট করে টাকা পাঠান।</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Method Selector */}
              <div className="flex gap-2">
                <button 
                  onClick={() => setDepositMethod("bkash")}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg border-2 flex items-center justify-center gap-2 transition-all font-bold text-xs uppercase tracking-tighter",
                    depositMethod === "bkash" 
                      ? "border-[#D12053] bg-[#D12053]/10 text-[#D12053]" 
                      : "border-border bg-secondary text-muted-foreground"
                  )}
                >
                  <span className="w-2 h-2 rounded-full bg-[#D12053]" />
                  bKash
                </button>
                <button 
                  onClick={() => setDepositMethod("nagad")}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg border-2 flex items-center justify-center gap-2 transition-all font-bold text-xs uppercase tracking-tighter",
                    depositMethod === "nagad" 
                      ? "border-[#F7941D] bg-[#F7941D]/10 text-[#F7941D]" 
                      : "border-border bg-secondary text-muted-foreground"
                  )}
                >
                  <span className="w-2 h-2 rounded-full bg-[#F7941D]" />
                  Nagad
                </button>
              </div>

              {/* Number Card */}
              <div className={cn(
                "p-4 rounded-lg flex items-center justify-between border-2 transition-all",
                depositMethod === "bkash" ? "bg-[#D12053]/5 border-[#D12053]/20" : "bg-[#F7941D]/5 border-[#F7941D]/20"
              )}>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    depositMethod === "bkash" ? "bg-[#D12053]/20 text-[#D12053]" : "bg-[#F7941D]/20 text-[#F7941D]"
                  )}>
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Send Money (Personal)</p>
                    <p className="font-bold text-xl font-headline">{currentNumber}</p>
                  </div>
                </div>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className={cn(
                    "h-10 w-10",
                    depositMethod === "bkash" ? "hover:bg-[#D12053]/20 text-[#D12053]" : "hover:bg-[#F7941D]/20 text-[#F7941D]"
                  )}
                  onClick={() => {
                    navigator.clipboard.writeText(currentNumber);
                    alert("নাম্বার কপি হয়েছে!");
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <form onSubmit={handleDeposit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dep-amount">টাকার পরিমাণ (৳)</Label>
                  <Input 
                    id="dep-amount" 
                    type="number" 
                    placeholder="মিনিমাম ১০ টাকা" 
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required 
                    className="bg-background h-12 text-lg font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dep-num">আপনার মোবাইল নাম্বার</Label>
                  <Input id="dep-num" placeholder="017XXXXXXXX" required className="bg-background h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dep-trx">ট্রানজেকশন আইডি (TrxID)</Label>
                  <Input id="dep-trx" placeholder="8X23M... (ট্রানজেকশন আইডি দিন)" required className="bg-background h-12 font-mono uppercase" />
                </div>
                <Button 
                  type="submit" 
                  className={cn(
                    "w-full font-bold h-12 text-lg shadow-lg",
                    depositMethod === "bkash" ? "bg-[#D12053] hover:bg-[#D12053]/90" : "bg-[#F7941D] hover:bg-[#F7941D]/90"
                  )}
                >
                  রিকোয়েস্ট পাঠান
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw">
          <Card className="bg-card border-border shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-lg">টাকা উত্তোলন</CardTitle>
              <CardDescription>মিনিমাম উইথড্র ৳{minWithdraw} টাকা।</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-secondary/50 rounded-xl border border-border flex flex-col items-center">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">আপনার ব্যালেন্স</p>
                <p className="text-4xl font-headline font-bold text-primary mt-1">৳ {userData.balance.toFixed(2)}</p>
              </div>

              <form onSubmit={handleWithdraw} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wit-amount">টাকার পরিমাণ (৳)</Label>
                  <Input id="wit-amount" type="number" min={minWithdraw} placeholder={`মিনিমাম ${minWithdraw} টাকা`} required className="bg-background h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wit-num">বিকাশ/নগদ নাম্বার</Label>
                  <Input id="wit-num" placeholder="017XXXXXXXX" required className="bg-background h-12" />
                </div>
                <Button type="submit" className="w-full font-bold h-12 text-lg" variant="secondary" disabled={userData.balance < minWithdraw}>
                  {userData.balance < minWithdraw ? "ব্যালেন্স কম" : "টাকা উত্তোলন করুন"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
