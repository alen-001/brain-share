import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Home() {
  return (
    <TooltipProvider>
      <Card>Hello</Card>
    </TooltipProvider>
  );
}
