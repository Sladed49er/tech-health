"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Step1 from "./wizard/Step1";
import Step2 from "./wizard/Step2";
import Step3 from "./wizard/Step3";

import { schema } from "./wizard/types";
import type { FormData } from "./wizard/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

export default function WizardModal() {
  /* ── dialog state ─────────────────────────── */
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  /* scroll-to-top ref */
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [step]);

  /* ── react-hook-form ──────────────────────── */
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      /* step-1 */
      agencyName: "",
      contactName: "",
      website: "",
      contactEmail: "",
      staffCount: 0,

      /* step-2 */
      officeSuite: "o365",
      officeSuiteOther: "",
      ams: [],
      amsOther: "",
      rater: [],
      raterOther: "",
      itSolution: "msp",
      itProvider: "",

      /* step-3 */
      isp: "",
      ispSecondary: "",
      voip: "none",
      voipOther: "",
      vdi: "none",
      vdiOther: "",
      hardwareAge: "1-2",
      assetPlan: "unknown",
      passwordManager: "none",
      passwordManagerOther: "",
      edr: "crowdstrike",
      edrOther: "",
      perpetuationPlan: "maintain",
      timeline: "",
      files: undefined,
    },
  });

  const step1Ready =
    form.watch("agencyName") &&
    form.watch("contactName") &&
    form.watch("website") &&
    form.watch("contactEmail") &&
    form.watch("staffCount") > 0;

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  async function onSubmit(data: FormData) {
    const body = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (k === "files" && v instanceof FileList) {
        Array.from(v).forEach((f) => body.append("files", f));
      } else {
        body.append(k, JSON.stringify(v));
      }
    });
    const res = await fetch("/api/submit", { method: "POST", body });
    const { pdfUrl } = await res.json();
    window.open(pdfUrl, "_blank");
  }

  /* ── render ───────────────────────────────── */
  return (
    <>
      {/* launch card */}
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl border-2 border-gray-200 bg-white p-8 text-center shadow hover:shadow-lg"
      >
        <div className="mb-3 text-5xl">🛠️</div>
        <h3 className="mb-1 text-xl font-bold">Technology&nbsp;Checkup</h3>
        <p className="text-sm text-gray-600">
          Complimentary audit → instant PDF
        </p>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          ref={contentRef}
          className="max-w-xl max-h-[90vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>
              {["Agency basics", "Systems & compliance", "Connectivity"][step]}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 0 && <Step1 form={form} />}
              {step === 1 && <Step2 form={form} />}
              {step === 2 && <Step3 form={form} />}

              <div className="mt-6 flex justify-between">
                {step > 0 ? (
                  <Button type="button" variant="secondary" onClick={back}>
                    Back
                  </Button>
                ) : (
                  <span />
                )}

                {step < 2 ? (
                  <Button
                    type="button"
                    onClick={next}
                    disabled={step === 0 && !step1Ready}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Submitting…" : "Finish"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
