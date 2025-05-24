"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function BotifyMainPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome to Botify</CardTitle>
          <p className="text-muted-foreground">
            Select a chatbot to view its conversations and manage integrations
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => router.push("/Chatbots")}
            className="w-full"
            size="lg"
          >
            View My Chatbots
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Choose a chatbot from your list to access its dashboard
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
