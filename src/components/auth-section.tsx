"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function AuthSection({ onAuthSuccess }: { onAuthSuccess: (user: any) => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      onAuthSuccess({
        name: "Raihan",
        email: "raihan@example.com",
        balance: 10,
        phoneNumber: "01754876018"
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-sm animate-in fade-in zoom-in duration-300">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold text-primary tracking-tighter">ZR ESPORTS</h1>
        <p className="text-muted-foreground mt-2">Level up your earning game</p>
      </div>

      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 bg-secondary">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <Card className="border-border bg-card shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline">Welcome Back</CardTitle>
              <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required className="bg-background" />
                </div>
                <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card className="border-border bg-card shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline">Create Account</CardTitle>
              <CardDescription>Join the elite gaming community today.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Full Name</Label>
                  <Input id="reg-name" placeholder="John Doe" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input id="reg-email" type="email" placeholder="name@example.com" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-pass">Password</Label>
                  <Input id="reg-pass" type="password" required className="bg-background" />
                </div>
                <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Register"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
