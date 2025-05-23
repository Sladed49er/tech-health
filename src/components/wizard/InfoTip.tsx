"use client";
import { Info } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { ReactNode } from "react";

export default function InfoTip({ text }: { text: ReactNode }) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Info className="ml-1 inline h-4 w-4 cursor-help text-neutral-500" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={4}
          className="max-w-xs rounded border border-neutral-300 bg-white p-2 text-sm text-black shadow"
        >
          {text}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
