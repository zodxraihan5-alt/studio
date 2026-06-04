"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, LogOut, Shield, Settings, Info, Share2 } from "lucide-react";

export function ProfileSection({ userData, onLogout }: { userData: any, onLogout: () => void }) {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <Avatar className="w-24 h-24 border-4 border-primary shadow-2xl">
            <AvatarImage src={`https://picsum.photos/seed/${userData.name}/200`} />
            <AvatarFallback>{userData.name[0]}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-full border-2 border-background">
            <Shield className="w-4 h-4 fill-current" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-headline font-bold">{userData.name}</h2>
          <p className="text-muted-foreground text-sm">{userData.email}</p>
          <p className="text-primary font-bold text-xs mt-1 uppercase tracking-widest">Premium Member</p>
        </div>
      </div>

      <div className="grid gap-4">
        <Card className="bg-card border-border hover:border-primary/30 transition-all">
          <CardContent className="p-0">
            <div className="flex flex-col divide-y divide-border">
              <ProfileItem icon={User} label="Personal Details" value={userData.phoneNumber || "Not Set"} />
              <ProfileItem icon={Settings} label="App Settings" />
              <ProfileItem icon={Share2} label="Refer & Earn" />
              <ProfileItem icon={Info} label="Support & Help" />
            </div>
          </CardContent>
        </Card>

        <Button 
          variant="destructive" 
          className="w-full flex items-center gap-2 h-12 font-bold" 
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>

      <p className="text-center text-[10px] text-muted-foreground opacity-50 uppercase tracking-[0.2em]">
        ZR ESPORTS v1.0.4 PRODUCTION
      </p>
    </div>
  );
}

function ProfileItem({ icon: Icon, label, value }: { icon: any, label: string, value?: string }) {
  return (
    <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-secondary/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="bg-secondary p-2 rounded-lg">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <p className="font-medium text-sm">{label}</p>
      </div>
      {value && <p className="text-xs text-muted-foreground font-mono">{value}</p>}
    </div>
  );
}
