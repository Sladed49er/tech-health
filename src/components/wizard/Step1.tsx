"use client";

import { UseFormReturn } from "react-hook-form";
import { FormItem, FormLabel, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormData } from "./types";

type Props = { form: UseFormReturn<FormData>; };

export default function Step1({ form }: Props) {
  const fields: [keyof FormData,string,string?][] = [
    ["agencyName","Agency name"],
    ["contactName","Contact name"],
    ["website","Website"],
    ["contactEmail","Contact e-mail"],
    ["staffCount","Staff count","number"],
  ];
  return (
    <>
      {fields.map(([name,label,type])=>(
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field })=>(
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <Input id={name} type={type??"text"} {...field}/>
              <FormMessage/>
            </FormItem>
          )}
        />
      ))}
    </>
  );
}

