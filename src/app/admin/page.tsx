"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Wallet, 
  Settings, 
  PlusCircle, 
  LayoutDashboard, 
  CheckCircle, 
  XCircle, 
  Sparkles,
  ArrowRightLeft
} from "lucide-react";
import { adminTournamentDescriptionGenerator } from "@/ai/flows/admin-tournament-description-generator";
import { adminMatchPrizeOptimizer } from "@/ai/flows/admin-match-prize-optimizer";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stats, setStats] = useState({ users: 154, deposits: 3, withdrawals: 5 });
  const [settings, setSettings] = useState({
    notice: "Welcome to ZR ESPORTS! Send Add Money to 01754876018.",
    depositNum: "01754876018",
    minWithdraw: 100,
    timer: 20,
    reward: 5,
    penalty: 2
  });

  const [matchAIInput, setMatchAIInput] = useState({
    gameName: "Free Fire",
    gameMode: "Solo BR",
    entryFee: 10,
    prizeStructure: "1st: 100, 2nd: 50",
    additionalDetails: ""
  });
  const [aiGeneratedDesc, setAiGeneratedDesc] = useState("");

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Admin Access</CardTitle>
            <CardDescription>Enter admin credentials to proceed.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4">
              <div className="space-y-2">
                <Label>Admin Password</Label>
                <Input type="password" placeholder="••••••••" required />
              </div>
              <Button type="submit" className="w-full font-bold">Login to Panel</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 pb-20 max-w-4xl mx-auto space-y-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary tracking-tighter">ZR ADMIN</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Command Center</p>
        </div>
        <Badge variant="outline" className="border-primary text-primary px-3 py-1">Online</Badge>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={Users} label="Total Users" value={stats.users} />
        <StatCard icon={Wallet} label="Pending Dep" value={stats.deposits} color="text-yellow-500" />
        <StatCard icon={ArrowRightLeft} label="Pending Wit" value={stats.withdrawals} color="text-red-500" />
      </div>

      <Tabs defaultValue="settings">
        <TabsList className="flex overflow-x-auto bg-secondary p-1 h-auto no-scrollbar">
          <TabsTrigger value="settings" className="flex-1 min-w-[100px]"><Settings className="w-4 h-4 mr-2" />Settings</TabsTrigger>
          <TabsTrigger value="users" className="flex-1 min-w-[100px]"><Users className="w-4 h-4 mr-2" />Users</TabsTrigger>
          <TabsTrigger value="transactions" className="flex-1 min-w-[100px]"><Wallet className="w-4 h-4 mr-2" />Trans</TabsTrigger>
          <TabsTrigger value="ai" className="flex-1 min-w-[100px]"><Sparkles className="w-4 h-4 mr-2" />AI Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4 mt-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Global Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Notice Bar Text</Label>
                <Input value={settings.notice} onChange={(e) => setSettings({...settings, notice: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bkash/Nagad No.</Label>
                  <Input value={settings.depositNum} onChange={(e) => setSettings({...settings, depositNum: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Min Withdrawal</Label>
                  <Input type="number" value={settings.minWithdraw} onChange={(e) => setSettings({...settings, minWithdraw: Number(e.target.value)})} />
                </div>
              </div>
              <Button className="w-full font-bold" onClick={() => {
                localStorage.setItem("zresports_notice", settings.notice);
                localStorage.setItem("zresports_deposit_num", settings.depositNum);
                localStorage.setItem("zresports_min_withdraw", settings.minWithdraw.toString());
                alert("Settings Saved!");
              }}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Member Management</CardTitle></CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["Raihan", "Sabbir", "Karim"].map((name) => (
                    <TableRow key={name}>
                      <TableCell className="font-medium text-xs">{name}</TableCell>
                      <TableCell className="text-xs">৳1,250</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="icon" variant="outline" className="h-7 w-7"><PlusCircle className="w-3 h-3" /></Button>
                          <Button size="icon" variant="destructive" className="h-7 w-7"><XCircle className="w-3 h-3" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Pending Requests</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg border border-border flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Withdrawal: ৳500</p>
                  <p className="text-[10px] text-muted-foreground">017XXXXXXXX • Bkash</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8">Pay</Button>
                  <Button size="sm" variant="destructive" className="h-8">Reject</Button>
                </div>
              </div>
              <div className="p-4 bg-secondary rounded-lg border border-border flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Deposit: ৳100</p>
                  <p className="text-[10px] text-muted-foreground">TrxID: 8XF2...9P</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 h-8">Approve</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-6 space-y-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Tournament Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Game Mode</Label>
                <Input value={matchAIInput.gameMode} onChange={(e) => setMatchAIInput({...matchAIInput, gameMode: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Prize Structure</Label>
                <Input value={matchAIInput.prizeStructure} onChange={(e) => setMatchAIInput({...matchAIInput, prizeStructure: e.target.value})} />
              </div>
              <Button className="w-full font-bold" onClick={async () => {
                const res = await adminTournamentDescriptionGenerator(matchAIInput);
                setAiGeneratedDesc(res.description);
              }}>Generate Marketing Copy</Button>
              {aiGeneratedDesc && (
                <div className="p-4 bg-background border border-primary/20 rounded-lg text-sm italic">
                  {aiGeneratedDesc}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: number, color?: string }) {
  return (
    <Card className="bg-card border-border p-3 text-center">
      <div className="flex justify-center mb-1">
        <Icon className={`w-4 h-4 ${color || "text-primary"}`} />
      </div>
      <p className="text-[10px] uppercase font-bold text-muted-foreground">{label}</p>
      <p className="text-lg font-headline font-bold">{value}</p>
    </Card>
  );
}
