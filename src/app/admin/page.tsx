
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Wallet, 
  Settings, 
  PlusCircle, 
  LayoutDashboard, 
  CheckCircle, 
  XCircle, 
  Sparkles,
  ArrowRightLeft,
  Search,
  Trophy,
  Gamepad2,
  TrendingUp,
  Trash2,
  DollarSign
} from "lucide-react";
import { adminTournamentDescriptionGenerator } from "@/ai/flows/admin-tournament-description-generator";
import { adminMatchPrizeOptimizer, type AdminMatchPrizeOptimizerOutput } from "@/ai/flows/admin-match-prize-optimizer";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<AdminMatchPrizeOptimizerOutput | null>(null);

  // Stats
  const [stats] = useState({
    users: 154,
    pendingDeposits: 3,
    pendingWithdrawals: 5,
    totalEarnings: 15420,
    activeMatches: 8
  });

  // Settings State
  const [settings, setSettings] = useState({
    notice: "Welcome to ZR ESPORTS! Send Add Money to 01754876018.",
    bkashNum: "01754876018",
    nagadNum: "01827364510",
    minWithdraw: 100,
  });

  // Match Management State
  const [matches, setMatches] = useState([
    { id: 1, name: "Solo Battle Royale", entry: 10, prize: 100, mode: "Free Fire" },
    { id: 2, name: "CS Rank 4v4", entry: 30, prize: 120, mode: "Free Fire" },
  ]);

  const [newMatch, setNewMatch] = useState({
    name: "",
    entry: 0,
    prize: 0,
    mode: "Free Fire"
  });

  // AI Tools State
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
        <Card className="w-full max-w-sm border-primary/20 shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
              <Shield className="text-primary w-6 h-6" />
            </div>
            <CardTitle className="font-headline text-2xl text-primary tracking-tighter">ZR ADMIN LOGIN</CardTitle>
            <CardDescription>Authorized Personnel Only</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4">
              <div className="space-y-2">
                <Label>Admin Password</Label>
                <Input type="password" placeholder="••••••••" required className="bg-secondary/50" />
              </div>
              <Button type="submit" className="w-full font-bold h-12">Verify Identity</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleRunOptimizer = async () => {
    setIsOptimizing(true);
    try {
      // Mock historical data for optimization
      const historicalData = [
        { tournamentName: "Solo BR Classic", date: "2023-10-01", entryFee: 10, winningPrice: 100, participants: 45, playerEngagementScore: 8, profitMargin: 0.15 },
        { tournamentName: "CS Rank Pro", date: "2023-10-05", entryFee: 50, winningPrice: 400, participants: 12, playerEngagementScore: 6, profitMargin: 0.05 },
      ];
      const result = await adminMatchPrizeOptimizer({ historicalTournaments: historicalData });
      setOptimizationResult(result);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-20 max-w-5xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-headline font-bold text-primary tracking-tighter">ADMIN PANEL</h1>
          <p className="text-muted-foreground text-xs uppercase tracking-[0.3em] font-bold">ZR ESPORTS Operations Group</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 px-4 py-1.5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            SYSTEM ONLINE
          </Badge>
          <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(false)} className="text-muted-foreground hover:text-destructive">
            Logout
          </Button>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Players" value={stats.users} />
        <StatCard icon={Gamepad2} label="Active Matches" value={stats.activeMatches} color="text-blue-500" />
        <StatCard icon={DollarSign} label="Total Revenue" value={`৳${stats.totalEarnings}`} color="text-green-500" />
        <StatCard icon={ArrowRightLeft} label="Pending Tx" value={stats.pendingDeposits + stats.pendingWithdrawals} color="text-orange-500" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-secondary grid grid-cols-3 md:grid-cols-6 h-auto p-1">
          <TabsTrigger value="dashboard"><LayoutDashboard className="w-4 h-4 mr-2 hidden md:block" />Home</TabsTrigger>
          <TabsTrigger value="matches"><Gamepad2 className="w-4 h-4 mr-2 hidden md:block" />Matches</TabsTrigger>
          <TabsTrigger value="users"><Users className="w-4 h-4 mr-2 hidden md:block" />Users</TabsTrigger>
          <TabsTrigger value="transactions"><Wallet className="w-4 h-4 mr-2 hidden md:block" />Finances</TabsTrigger>
          <TabsTrigger value="ai"><Sparkles className="w-4 h-4 mr-2 hidden md:block" />AI Tools</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2 hidden md:block" />Config</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
           <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2"><Trophy className="text-primary" /> Recent Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg border">
                      <span className="text-sm font-medium">New User Signups</span>
                      <Badge>+12 Today</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg border">
                      <span className="text-sm font-medium">Tournament Completions</span>
                      <Badge variant="secondary">5 Matches</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-xl">Quick Notice</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    placeholder="Update home screen notice..." 
                    value={settings.notice}
                    onChange={(e) => setSettings({...settings, notice: e.target.value})}
                    className="min-h-[100px]"
                  />
                  <Button className="w-full" onClick={() => alert("Notice Updated")}>Push Notification</Button>
                </CardContent>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Match Management</CardTitle>
                <CardDescription>Create or remove active tournaments</CardDescription>
              </div>
              <Button size="sm" onClick={() => setActiveTab("ai")} className="gap-2">
                <Sparkles className="w-4 h-4" /> AI Suggestion
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4 p-4 bg-secondary/50 rounded-xl border border-dashed">
                <div className="space-y-2">
                  <Label>Match Name</Label>
                  <Input placeholder="e.g. Pro Solo BR" value={newMatch.name} onChange={(e) => setNewMatch({...newMatch, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Entry Fee</Label>
                  <Input type="number" placeholder="10" value={newMatch.entry} onChange={(e) => setNewMatch({...newMatch, entry: Number(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <Label>Prize Pool</Label>
                  <Input type="number" placeholder="100" value={newMatch.prize} onChange={(e) => setNewMatch({...newMatch, prize: Number(e.target.value)})} />
                </div>
                <div className="flex items-end">
                  <Button className="w-full gap-2" onClick={() => {
                    if (newMatch.name) {
                      setMatches([...matches, { ...newMatch, id: Date.now() }]);
                      setNewMatch({ name: "", entry: 0, prize: 0, mode: "Free Fire" });
                    }
                  }}>
                    <PlusCircle className="w-4 h-4" /> Add Match
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Match Name</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Entry/Prize</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matches.map((match) => (
                    <TableRow key={match.id}>
                      <TableCell className="font-bold">{match.name}</TableCell>
                      <TableCell><Badge variant="outline">{match.mode}</Badge></TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Entry: ৳{match.entry}</span>
                          <span className="text-sm font-bold text-green-500">Prize: ৳{match.prize}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setMatches(matches.filter(m => m.id !== match.id))}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Player Directory</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-9" placeholder="Search by name or number..." />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Current Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Quick Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Raihan", phone: "01754876018", balance: 1250 },
                    { name: "Sabbir", phone: "01827364510", balance: 50 },
                    { name: "Karim", phone: "01928374650", balance: 0 },
                  ].map((user) => (
                    <TableRow key={user.phone}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-headline font-bold">৳{user.balance}</TableCell>
                      <TableCell><Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge></TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" className="h-8">Add ৳</Button>
                        <Button size="sm" variant="destructive" className="h-8">Ban</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Pending Deposits</CardTitle>
                <Badge variant="outline">{stats.pendingDeposits}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4 border rounded-lg bg-secondary/30 flex items-center justify-between">
                    <div>
                      <p className="font-bold">৳500 • Bkash</p>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase">TrxID: 8XF2...9P</p>
                    </div>
                    <Button size="sm" className="h-8">Approve</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Pending Withdrawals</CardTitle>
                <Badge variant="destructive">{stats.pendingWithdrawals}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4 border rounded-lg bg-secondary/30 flex items-center justify-between">
                    <div>
                      <p className="font-bold">৳1000 • Nagad</p>
                      <p className="text-[10px] text-muted-foreground">017XXXXXXXX</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8 border-green-500 text-green-500">Paid</Button>
                      <Button size="sm" variant="destructive" className="h-8">Reject</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary/20 bg-primary/5 shadow-inner">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary w-5 h-5" /> Prize Optimizer</CardTitle>
                <CardDescription>Analyze history to recommend best pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Click to run AI analysis on past 30 days tournament performance.</p>
                <Button className="w-full font-bold h-12" onClick={handleRunOptimizer} disabled={isOptimizing}>
                  {isOptimizing ? "Analyzing Data..." : "Run AI Analysis"}
                </Button>
                {optimizationResult && (
                  <div className="p-4 bg-background border border-primary/20 rounded-lg space-y-3 text-sm animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 font-bold text-primary">
                      <TrendingUp className="w-4 h-4" /> Optimization Insight
                    </div>
                    <p className="italic text-muted-foreground">"{optimizationResult.overallAnalysis}"</p>
                    <div className="pt-2 border-t">
                      <p className="font-bold mb-1">General Tip:</p>
                      <p className="text-xs">{optimizationResult.generalSuggestions}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="text-accent w-5 h-5" /> Marketing Generator</CardTitle>
                <CardDescription>Generate catchy match descriptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase">Game Mode</Label>
                    <Input className="h-8 text-xs" value={matchAIInput.gameMode} onChange={(e) => setMatchAIInput({...matchAIInput, gameMode: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase">Entry Fee</Label>
                    <Input type="number" className="h-8 text-xs" value={matchAIInput.entryFee} onChange={(e) => setMatchAIInput({...matchAIInput, entryFee: Number(e.target.value)})} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase">Prize Structure</Label>
                  <Input className="h-8 text-xs" value={matchAIInput.prizeStructure} onChange={(e) => setMatchAIInput({...matchAIInput, prizeStructure: e.target.value})} />
                </div>
                <Button className="w-full font-bold h-12 bg-accent hover:bg-accent/90" onClick={async () => {
                   const res = await adminTournamentDescriptionGenerator(matchAIInput);
                   setAiGeneratedDesc(res.description);
                }}>Generate Copy</Button>
                {aiGeneratedDesc && (
                  <div className="p-4 bg-background border border-accent/20 rounded-lg text-xs italic leading-relaxed">
                    {aiGeneratedDesc}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader><CardTitle className="text-xl">System Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>bKash Personal Number</Label>
                    <Input value={settings.bkashNum} onChange={(e) => setSettings({...settings, bkashNum: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Nagad Personal Number</Label>
                    <Input value={settings.nagadNum} onChange={(e) => setSettings({...settings, nagadNum: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Minimum Withdrawal (৳)</Label>
                    <Input type="number" value={settings.minWithdraw} onChange={(e) => setSettings({...settings, minWithdraw: Number(e.target.value)})} />
                  </div>
                  <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                    <p className="text-sm font-bold text-destructive flex items-center gap-2">
                      <XCircle className="w-4 h-4" /> Dangerous Area
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">Resetting all match data will affect current user registrations.</p>
                    <Button variant="destructive" className="w-full mt-3 h-8 text-xs">Purge Match Cache</Button>
                  </div>
                </div>
              </div>
              <Button className="w-full font-bold h-12" onClick={() => {
                localStorage.setItem("zresports_notice", settings.notice);
                localStorage.setItem("zresports_bkash_num", settings.bkashNum);
                localStorage.setItem("zresports_nagad_num", settings.nagadNum);
                localStorage.setItem("zresports_min_withdraw", settings.minWithdraw.toString());
                alert("Settings Synchronized Successfully");
              }}>Update Master Config</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: number | string, color?: string }) {
  return (
    <Card className="bg-card border-border p-4 relative overflow-hidden group hover:border-primary/50 transition-all">
      <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-16 h-16" />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1.5 rounded-lg bg-secondary ${color || "text-primary"}`}>
          <Icon className="w-4 h-4" />
        </div>
        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{label}</p>
      </div>
      <p className="text-2xl font-headline font-bold">{value}</p>
    </Card>
  );
}

function Shield(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}
