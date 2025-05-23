"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import InfoTip from "./InfoTip";
import { Controller, UseFormReturn } from "react-hook-form";
import { FormData } from "./types";

type Props = { form: UseFormReturn<FormData> };

export default function Step2({ form }: Props) {
  return (
    <>
      {/* Office suite */}
      <FormField
        control={form.control}
        name="officeSuite"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Office suite{" "}
              <InfoTip text="Where your e-mail and documents live." />
            </FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="o365">Microsoft 365 / Office 365</SelectItem>
                <SelectItem value="gws">Google Workspace / Gmail</SelectItem>
                <SelectItem value="other">Other / Mixed</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      {form.watch("officeSuite") === "other" && (
        <FormField
          control={form.control}
          name="officeSuiteOther"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Which suite?</FormLabel>
              <Input {...field} />
            </FormItem>
          )}
        />
      )}

      {/* AMS / CRM multiselect */}
      <FormField
        control={form.control}
        name="ams"
        render={() => (
          <FormItem>
            <FormLabel>AMS / CRM platforms</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              {["AMS360", "Applied Epic", "EZLynx", "Hawksoft"].map((v) => {
                return (
                  <Controller
                    key={v}
                    name="ams"
                    control={form.control}
                    render={({ field }) => {
                      const checked = field.value?.includes(v) ?? false;
                      return (
                        <Label
                          htmlFor={`ams-${v}`}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={`ams-${v}`}
                            checked={checked}
                            onCheckedChange={(c: boolean) => {
                              const s = new Set(field.value);
                              c ? s.add(v) : s.delete(v);
                              field.onChange(Array.from(s));
                            }}
                          />
                          {v}
                        </Label>
                      );
                    }}
                  />
                );
              })}
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="amsOther"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Other AMS / CRM</FormLabel>
            <Input {...field} />
          </FormItem>
        )}
      />

      {/* Comparative rater */}
      <FormField
        control={form.control}
        name="rater"
        render={() => (
          <FormItem>
            <FormLabel>Comparative rater</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              {[
                "EZLynx",
                "Applied Rater",
                "ITC TurboRater",
                "Vertafore PL Rating",
              ].map((v) => {
                return (
                  <Controller
                    key={v}
                    name="rater"
                    control={form.control}
                    render={({ field }) => {
                      const checked = field.value?.includes(v) ?? false;
                      return (
                        <Label
                          htmlFor={`r-${v}`}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={`r-${v}`}
                            checked={checked}
                            onCheckedChange={(c: boolean) => {
                              const s = new Set(field.value);
                              c ? s.add(v) : s.delete(v);
                              field.onChange(Array.from(s));
                            }}
                          />
                          {v}
                        </Label>
                      );
                    }}
                  />
                );
              })}
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="raterOther"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Other rater</FormLabel>
            <Input {...field} />
          </FormItem>
        )}
      />

      {/* IT solution */}
      <FormField
        control={form.control}
        name="itSolution"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              IT solution{" "}
              <InfoTip text="Who takes care of your computers and cybersecurity?" />
            </FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="msp">3rd-party MSP / MSSP</SelectItem>
                <SelectItem value="internal">Internal IT staff</SelectItem>
                <SelectItem value="hybrid">Hybrid mix</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      {["msp", "hybrid"].includes(form.watch("itSolution")) && (
        <FormField
          control={form.control}
          name="itProvider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>3rd-party provider name</FormLabel>
              <Input {...field} />
            </FormItem>
          )}
        />
      )}
    </>
  );
}
