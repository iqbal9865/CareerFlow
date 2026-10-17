"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { createTask, deleteTask, updateTask, updateTaskStatus } from "@/app/actions/tasks";
import { Field, FormMessage, SubmitButton, TextArea, useFormAction } from "@/components/ui";
import type { FormState, Task, TaskStatus } from "@/lib/definitions";
import { formatDate, toDateInputValue } from "@/lib/form";

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  PENDING: "To do",
  REVIEW: "In review",
  DONE: "Done",
};

const TASK_STATUS_STYLES: Record<TaskStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  REVIEW: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  DONE: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
};

// Mirrors the backend's allowed transitions; DONE is final
const NEXT_STEPS: Record<TaskStatus, { status: TaskStatus; label: string }[]> = {
  PENDING: [{ status: "REVIEW", label: "Mark complete" }],
  REVIEW: [
    { status: "DONE", label: "Approve" },
    { status: "PENDING", label: "Reopen" },
  ],
  DONE: [],
};

const secondaryButton =
  "rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800";

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${TASK_STATUS_STYLES[status]}`}>
      {TASK_STATUS_LABELS[status]}
    </span>
  );
}

// Shared by create (no task) and edit. Calls onSaved after a successful save.
export function TaskForm({ task, onSaved, onCancel }: { task?: Task; onSaved?: () => void; onCancel?: () => void }) {
  const action = task ? updateTask.bind(null, task.id) : createTask;
  const { state, pending, onSubmit } = useFormAction(action);
  const formRef = useRef<HTMLFormElement>(null);
  const idPrefix = task ? `task-${task.id}-` : "new-task-";

  useEffect(() => {
    if (!state?.success) return;
    if (!task) formRef.current?.reset();
    onSaved?.();
  }, [state, task, onSaved]);

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-[1fr_12rem]">
        <Field
          label="Title"
          name="title"
          id={`${idPrefix}title`}
          required
          minLength={2}
          defaultValue={task?.title}
          placeholder="e.g. Follow up with Acme recruiter"
        />
        <Field
          label="Deadline"
          name="deadline"
          id={`${idPrefix}deadline`}
          type="date"
          required
          defaultValue={toDateInputValue(task?.deadline)}
        />
      </div>
      <TextArea
        label="Description"
        name="description"
        id={`${idPrefix}description`}
        rows={2}
        defaultValue={task?.description ?? ""}
        placeholder="Optional details"
      />
      {/* The edit form closes on success, so only errors need showing there */}
      {(state?.error || !task) && <FormMessage state={state} />}
      <div className="flex items-center gap-2">
        <SubmitButton pending={pending}>{task ? "Save task" : "Add task"}</SubmitButton>
        {onCancel && (
          <button type="button" onClick={onCancel} className={secondaryButton}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export function NewTaskPanel() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
      >
        + New task
      </button>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <TaskForm onCancel={() => setOpen(false)} />
    </div>
  );
}

export function TaskItem({ task, overdue }: { task: Task; overdue: boolean }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<FormState>();

  const run = (action: () => Promise<FormState>) =>
    startTransition(async () => {
      setResult(await action());
    });

  if (editing) {
    return (
      <li className="p-4">
        <TaskForm task={task} onSaved={() => setEditing(false)} onCancel={() => setEditing(false)} />
      </li>
    );
  }

  return (
    <li className="flex flex-wrap items-start justify-between gap-3 p-4">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={`font-medium ${
              task.status === "DONE" ? "text-zinc-500 line-through" : "text-zinc-900 dark:text-white"
            }`}
          >
            {task.title}
          </p>
          <TaskStatusBadge status={task.status} />
          {overdue && (
            <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
              Overdue
            </span>
          )}
        </div>
        {task.description && (
          <p className="mt-1 whitespace-pre-line text-sm text-zinc-600 dark:text-zinc-400">{task.description}</p>
        )}
        <p className="mt-1 text-xs text-zinc-500">
          Due {formatDate(task.deadline)}
          {task.completedAt && ` · Completed ${formatDate(task.completedAt)}`}
        </p>
        {result?.error && (
          <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
            {result.error}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {NEXT_STEPS[task.status].map((step) => (
          <button
            key={step.status}
            type="button"
            disabled={pending}
            onClick={() => run(() => updateTaskStatus(task.id, step.status))}
            className={secondaryButton}
          >
            {step.label}
          </button>
        ))}
        {task.status !== "DONE" && (
          <button type="button" disabled={pending} onClick={() => setEditing(true)} className={secondaryButton}>
            Edit
          </button>
        )}
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            if (confirm(`Delete the task "${task.title}"? This cannot be undone.`)) run(() => deleteTask(task.id));
          }}
          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60 dark:border-red-900 dark:hover:bg-red-950/40"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
