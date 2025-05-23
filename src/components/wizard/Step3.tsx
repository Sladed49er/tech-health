"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import InfoTip from "./InfoTip";
import { FormData } from "./types";

type P = { form: UseFormReturn<FormData> };

export default function Step3({ form }: P) {
  /* ---------- convenience watches ---------- */
  const vdiOther   = form.watch("vdi")  === "other";
  const voipOther  = form.watch("voip") === "other";
  const pwdOther   = form.watch("passwordManager") === "other";
  const edrOther   = form.watch("edr")  === "other";

  return (
    <>
      {/* ───────── Connectivity ───────── */}
      {[
        ["isp" , "Primary ISP"           , "Main internet provider"],
        ["ispSecondary","Secondary ISP / fail-over","Leave blank if none"]
      ].map(([n,l,h])=>(
        <FormField key={n} control={form.control} name={n as keyof FormData}
          render={({ field })=>(
            <FormItem>
              <FormLabel>{l} <InfoTip text={h}/></FormLabel>
              <Input {...field}/>
              <FormMessage/>
            </FormItem>
          )}/>
      ))}

      {/* VoIP */}
      <FormField control={form.control} name="voip" render={({ field })=>(
        <FormItem>
          <FormLabel>VoIP / phone platform</FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ringcentral">RingCentral</SelectItem>
              <SelectItem value="8x8">8x8</SelectItem>
              <SelectItem value="teams">Microsoft Teams Phone</SelectItem>
              <SelectItem value="none">Other / Unknown</SelectItem>
              <SelectItem value="other">Other (specify)</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage/>
        </FormItem>
      )}/>
      {voipOther && (
        <FormField control={form.control} name="voipOther" render={({ field })=>(
          <FormItem><FormLabel>Platform name</FormLabel><Input {...field}/></FormItem>
        )}/>
      )}

      {/* VDI */}
      <FormField control={form.control} name="vdi" render={({ field })=>(
        <FormItem>
          <FormLabel>
            Virtual desktop / remote-login
            <InfoTip text="e.g. Azure Virtual Desktop, AWS WorkSpaces, on-prem RDP/Citrix" />
          </FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None / Not sure</SelectItem>
              <SelectItem value="azure">Azure Virtual Desktop</SelectItem>
              <SelectItem value="aws">AWS WorkSpaces</SelectItem>
              <SelectItem value="onprem">On-prem RDP / Citrix</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}/>
      {vdiOther && (
        <FormField control={form.control} name="vdiOther" render={({ field })=>(
          <FormItem><FormLabel>Platform name</FormLabel><Input {...field}/></FormItem>
        )}/>
      )}

      {/* Workstation age */}
      <FormField control={form.control} name="hardwareAge" render={({ field })=>(
        <FormItem>
          <FormLabel>Average workstation age</FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="1-2">1-2 years</SelectItem>
              <SelectItem value="3-4">3-4 years</SelectItem>
              <SelectItem value="5+">5 + years</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}/>

      {/* Asset plan */}
      <FormField control={form.control} name="assetPlan" render={({ field })=>(
        <FormItem>
          <FormLabel>
            Asset retirement plan <InfoTip text="Structured = replace PCs on schedule • Break-fix = only when broken" />
          </FormLabel>
          <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-6">
            {["structured","breakfix","unknown"].map(v=>(
              <div key={v} className="flex items-center gap-2">
                <RadioGroupItem value={v} id={v}/>
                <label htmlFor={v} className="capitalize">
                  {v==="unknown"?"Not sure":v}
                </label>
              </div>
            ))}
          </RadioGroup>
        </FormItem>
      )}/>

      {/* Password manager */}
      <FormField control={form.control} name="passwordManager" render={({ field })=>(
        <FormItem>
          <FormLabel>
            Password manager <InfoTip text="Tool staff use to store & share credentials (1Password, LastPass…)"/>
          </FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None / Unknown</SelectItem>
              <SelectItem value="1password">1Password</SelectItem>
              <SelectItem value="lastpass">LastPass</SelectItem>
              <SelectItem value="bitwarden">Bitwarden</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}/>
      {pwdOther && (
        <FormField control={form.control} name="passwordManagerOther" render={({ field })=>(
          <FormItem><FormLabel>Which manager?</FormLabel><Input {...field}/></FormItem>
        )}/>
      )}

      {/* EDR */}
      <FormField control={form.control} name="edr" render={({ field })=>(
        <FormItem>
          <FormLabel>
            Cyber-security / EDR
            <InfoTip text="EDR = Endpoint Detection & Response. Continuously monitors PCs & servers for threats."/>
          </FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="crowdstrike">CrowdStrike</SelectItem>
              <SelectItem value="sentinelone">SentinelOne</SelectItem>
              <SelectItem value="sophos">Sophos Intercept X</SelectItem>
              <SelectItem value="defender">Microsoft Defender</SelectItem>
              <SelectItem value="unknown">Not sure</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}/>
      {edrOther && (
        <FormField control={form.control} name="edrOther" render={({ field })=>(
          <FormItem><FormLabel>EDR product name</FormLabel><Input {...field}/></FormItem>
        )}/>
      )}

      {/* Perpetuation plan */}
      <FormField control={form.control} name="perpetuationPlan" render={({ field })=>(
        <FormItem>
          <FormLabel>
            Perpetuation plan
            <InfoTip text="How you see the agency's ownership evolving over the next 5-10 years."/>
          </FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="acquiring">Actively acquiring agencies</SelectItem>
              <SelectItem value="selling">Looking to sell</SelectItem>
              <SelectItem value="maintain">Maintain / grow organically</SelectItem>
              <SelectItem value="preferno">Prefer not to answer</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}/>

      {/* Upcoming changes */}
      <FormField control={form.control} name="timeline" render={({ field })=>(
        <FormItem>
          <FormLabel>
            Upcoming changes, migrations, or key dates (optional)
          </FormLabel>
          <Input placeholder="e.g. switching VoIP in July, moving office Q4" {...field}/>
        </FormItem>
      )}/>

      {/* Upload */}
      <FormField control={form.control} name="files" render={({ field })=>(
        <FormItem>
          <FormLabel>
            Upload technical bills / contracts (optional)
            <p className="text-xs text-muted-foreground">
              Example: phone, ISP, Microsoft licensing, IT agreements, AMS, texting, AgencyZoom…<br/>
              Files are stored encrypted, never shared or marketed, and used only to build your report.
            </p>
          </FormLabel>
          <Input type="file" multiple onChange={e=>field.onChange(e.target.files)}/>
        </FormItem>
      )}/>
    </>
  );
}
