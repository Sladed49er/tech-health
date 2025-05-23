import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Info } from "lucide-react";

export default function InfoTip({ text }: { text: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="ml-1 inline-flex h-4 w-4 items-center justify-center text-muted-foreground"
        >
          <Info className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 text-sm">{text}</PopoverContent>
    </Popover>
  );
}
