"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Smartphone, CheckCircle, Wallet as WalletIcon } from "lucide-react";

export function WalletSection({ userData, setUserData }: { userData: any, setUserData: any }) {
  const [depositNumber, setDepositNumber] = useState("01754876018");
  const [minWithdraw, setMinWithdraw] = useState(100);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const savedNum = localStorage.getItem("zresports_deposit_num");
    const savedMin = localStorage.getItem("zresports_min_withdraw");
    if (savedNum) setDepositNumber(savedNum);
    if (savedMin) setMinWithdraw(Number(savedMin));
  }, []);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("Deposit request submitted! Admin will verify your transaction ID shortly.");
    setTimeout(() => setSuccess(""), 5000);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("Withdrawal request sent! Funds will be transferred within 24 hours.");
    setTimeout(() => setSuccess(""), 5000);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
        <WalletIcon className="text-primary" /> Wallet Management
      </h2>

      {success && (
        <Alert className="bg-green-500/10 border-green-500 text-green-500">
          <CheckCircle className="w-4 h-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="deposit">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>

        <TabsContent value="deposit">
          <Card className="bg-card border-border shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-lg">Add Money</CardTitle>
              <CardDescription>Send money to the number below via Bkash or Nagad.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-secondary rounded-lg flex items-center justify-between border border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Send Money to</p>
                    <p className="font-bold text-xl">{depositNumber}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(depositNumber)}>Copy</Button>
              </div>

              <form onSubmit={handleDeposit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dep-amount">Amount (TK)</Label>
                  <Input id="dep-amount" type="number" placeholder="Min 10 TK" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dep-num">Your Number</Label>
                  <Input id="dep-num" placeholder="01XXX-XXXXXX" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dep-trx">Transaction ID</Label>
                  <Input id="dep-trx" placeholder="8X23M..." required />
                </div>
                <Button type="submit" className="w-full font-bold">Submit Request</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw">
          <Card className="bg-card border-border shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-lg">Withdraw Funds</CardTitle>
              <CardDescription>Minimum withdrawal amount is ৳{minWithdraw}.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Available to withdraw</p>
                <p className="text-2xl font-bold text-primary">৳ {userData.balance.toFixed(2)}</p>
              </div>

              <form onSubmit={handleWithdraw} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wit-amount">Amount (TK)</Label>
                  <Input id="wit-amount" type="number" min={minWithdraw} placeholder={`Min ${minWithdraw} TK`} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wit-num">Bkash/Nagad Number</Label>
                  <Input id="wit-num" placeholder="01XXX-XXXXXX" required />
                </div>
                <Button type="submit" className="w-full font-bold" variant="secondary" disabled={userData.balance < minWithdraw}>
                  {userData.balance < minWithdraw ? "Insufficient Balance" : "Withdraw Now"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
