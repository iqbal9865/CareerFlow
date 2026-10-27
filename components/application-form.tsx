"use client";

import Link from "next/link";
import { useState } from "react";
import { Field, FormMessage, Select, SubmitButton, TextArea, useFormAction } from "@/components/ui";
import { STATUS_LABELS } from "@/components/status-badge";
import { APPLICATION_STATUSES, type Application, type ApplicationStatus, type FormState } from "@/lib/definitions";
import { toDateInputValue } from "@/lib/form";

const statusOptions = APPLICATION_STATUSES.map((s) => ({ value: s, label: STATUS_LABELS[s] }));

export function ApplicationForm({
  action,
  application,
  cancelHref,
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  application?: Application;
  cancelHref: string;
}) {
  const { state, pending, onSubmit } = useFormAction(action);
  const today = new Date().toISOString().slice(0, 10);
  // Controlled so the rejection reason field can follow the selected status
  const [status, setStatus] = useState<ApplicationStatus>(application?.status ?? "PENDING");

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FormMessage state={state} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company" name="companyName" required minLength={2} defaultValue={application?.companyName} />
        <Field label="Position" name="position" required minLength={2} defaultValue={application?.position} />
        <Field label="Location" name="location" placeholder="Remote, Berlin…" defaultValue={application?.location ?? ""} />
        <Field label="Salary range" name="salaryRange" placeholder="$80k – $100k" defaultValue={application?.salaryRange ?? ""} />
        <Field label="Job URL" name="jobUrl" type="url" placeholder="https://" defaultValue={application?.jobUrl ?? ""} />
        <Field label="Source" name="source" placeholder="LinkedIn, referral…" defaultValue={application?.source ?? ""} />
        <Field
          label="Applied on"
          name="appliedAt"
          type="date"
          defaultValue={application ? toDateInputValue(application.appliedAt) : today}
        />
        <Field label="Follow up on" name="followUpAt" type="date" defaultValue={toDateInputValue(application?.followUpAt)} />
        <Select
          label="Status"
          name="status"
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
        />
      </div>

      {status === "REJECTED" && (
        <TextArea
          label="Rejection reason"
          name="rejectionReason"
          rows={3}
          placeholder="Went with a more senior candidate…"
          defaultValue={application?.rejectionReason ?? ""}
        />
      )}

      <TextArea label="Notes" name="notes" defaultValue={application?.notes ?? ""} />

      <div className="flex items-center gap-3">
        <SubmitButton pending={pending}>{application ? "Save changes" : "Add application"}</SubmitButton>
        <Link href={cancelHref} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
          Cancel
        </Link>
      </div>
    </form>
  );
}
