"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Swords, Trophy, Users, Zap } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const tournaments = [
  { id: "solo-br", name: "Solo Battle Royale", entry: 10, prize: 100, mode: "Free Fire", icon: Zap, img: "match-solo" },
  { id: "cs-rank", name: "CS Rank 4v4", entry: 30, prize: 120, mode: "Free Fire", icon: Users, img: "match-cs" },
  { id: "lone-2v2", name: "Lone Wolf 2v2", entry: 30, prize: 100, mode: "Free Fire", icon: Swords, img: "match-lone" },
  { id: "lone-1v1", name: "Lone Wolf 1v1", entry: 30, prize: 50, mode: "Free Fire", icon: Trophy, img: "match-lone" },
  { id: "lone-last", name: "Lone Wolf Last to Win", entry: 30, prize: 50, mode: "Free Fire", icon: Zap, img: "match-lone" },
];

export function UserDashboard({ userData }: { userData: any }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-primary to-accent border-none shadow-2xl text-primary-foreground overflow-hidden relative">
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <CardContent className="p-6">
          <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Available Balance</p>
          <h2 className="text-4xl font-headline font-bold mt-1">৳ {userData.balance.toFixed(2)}</h2>
          <div className="mt-4 flex gap-2">
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">Verified Player</Badge>
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">LVL 42</Badge>
          </div>
        </CardContent>
      </Card>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-headline font-bold">Active Tournaments</h3>
          <span className="text-xs text-primary font-bold cursor-pointer hover:underline">View All</span>
        </div>

        <div className="grid gap-4">
          {tournaments.map((match) => {
            const Icon = match.icon;
            const placeholder = PlaceHolderImages.find(p => p.id === match.img);
            return (
              <Card key={match.id} className="bg-card border-border overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer">
                <div className="relative h-24 w-full">
                  <Image 
                    src={placeholder?.imageUrl || "https://picsum.photos/seed/zresports/400/200"} 
                    alt={match.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    data-ai-hint={placeholder?.imageHint || "gaming"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <Badge className="absolute top-2 right-2 bg-primary text-white font-bold border-none">
                    {match.mode}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg leading-tight">{match.name}</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Icon className="w-3 h-3 text-primary" />
                          <span>Entry: <span className="text-foreground font-bold">৳{match.entry}</span></span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Trophy className="w-3 h-3 text-yellow-500" />
                          <span>Prize: <span className="text-foreground font-bold">৳{match.prize}</span></span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg shadow-lg active:scale-95 transition-all">
                      <Zap className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
