import { z } from "zod";

/* Tech-Check wizard master schema
   ---------------------------------------------------------------- */
export const schema = z.object({
  /* STEP-1 */
  agencyName: z.string().min(2),
  contactName: z.string().min(2),
  website:     z.string().url(),
  contactEmail:z.string().email(),
  staffCount:  z.coerce.number().int().min(1),

  /* STEP-2 */
  officeSuite:      z.enum(["o365","gws","other"]),
  officeSuiteOther: z.string().optional(),
  ams:              z.array(z.string()),
  amsOther:         z.string().optional(),
  rater:            z.array(z.string()),
  raterOther:       z.string().optional(),
  itSolution:       z.enum(["msp","internal","hybrid"]),
  itProvider:       z.string().optional(),

  /* STEP-3 */
  isp:           z.string(),
  ispSecondary:  z.string().optional(),

  voip: z.enum(["none","ringcentral","8x8","teams","other"]),
  voipOther: z.string().optional(),

  vdi: z.enum(["none","azure","aws","onprem","other"]),
  vdiOther: z.string().optional(),

  hardwareAge: z.enum(["1-2","3-4","5+"]),
  assetPlan:   z.enum(["structured","breakfix","unknown"]),

  passwordManager:       z.enum(["none","1password","lastpass","bitwarden","other"]),
  passwordManagerOther:  z.string().optional(),

  edr:      z.enum(["crowdstrike","sentinelone","sophos","defender","unknown","other"]),
  edrOther: z.string().optional(),

  perpetuationPlan: z.enum(["acquiring","selling","maintain","preferno"]),

  timeline: z.string().optional(),

  files: z.any().optional(),
});

export type FormData = z.infer<typeof schema>;
