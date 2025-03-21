
import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";

import { Button } from "@/components/ui/button";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
export function Hero() {
  return (
    <div className="relative flex h-[40rem] w-full flex-col overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-40 sm:pt-60 max-sm:pt-80 ">
        <h1 className="bg-opacity-50 bg-gradient-to-b font-mono from-neutral-50 to-neutral-400 bg-clip-text text-center text-5xl font-extralight text-transparent md:text-7xl">
        Never let an idea slip away
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
            Build your second brain,
            experience a custom editor and anonymous sharing like never before.
        </p>
        <div className="flex gap-4 items-center justify-center mt-7">
            <Link href='/home'>
            <Button variant="default">Get Started</Button>
            </Link>
            <a href='https://github.com/alen-001/brain-share'>
            <Button variant="outline"><GitHubLogoIcon/><span>Github</span></Button>
            </a>
            {/* <ShinyButton className="flex"><GitHubLogoIcon/><span>Github</span></ShinyButton> */}
        </div>
      </div>
    </div>
  );
}
