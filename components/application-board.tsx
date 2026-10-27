"use client";

import Link from "next/link";
import { useEffect, useOptimistic, useRef, useState, useTransition } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { updateApplicationStatus } from "@/app/actions/applications";
import { STATUS_LABELS } from "@/components/status-badge";
import { inputClass } from "@/components/ui";
import { APPLICATION_STATUSES, type Application, type ApplicationStatus } from "@/lib/definitions";
import { formatDate } from "@/lib/form";

const COLUMN_ACCENTS: Record<ApplicationStatus, string> = {
  PENDING: "bg-amber-400",
  INTERVIEW: "bg-sky-400",
  ACCEPTED: "bg-emerald-400",
  REJECTED: "bg-zinc-400",
};

type Move = { id: string; status: ApplicationStatus };

export function ApplicationBoard({ applications }: { applications: Application[] }) {
  // Cards jump to their new column immediately; the server refresh then confirms (or reverts) the move
  const [optimistic, applyMove] = useOptimistic(applications, (current, move: Move) =>
    current.map((a) => (a.id === move.id ? { ...a, status: move.status } : a))
  );
  const [, startTransition] = useTransition();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState<Application | null>(null);
  const [error, setError] = useState<string>();

  const sensors = useSensors(
    // A small distance threshold keeps plain clicks working as links
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    // Press-and-hold on touch so the board can still be scrolled
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } }),
    useSensor(KeyboardSensor)
  );

  const move = (application: Application, status: ApplicationStatus, rejectionReason?: string) => {
    setError(undefined);
    startTransition(async () => {
      applyMove({ id: application.id, status });
      const result = await updateApplicationStatus(application, status, rejectionReason);
      if (result?.error) setError(`Couldn't move ${application.companyName}: ${result.error}`);
    });
  };

  const onDragStart = ({ active }: DragStartEvent) => setActiveId(String(active.id));

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    const application = optimistic.find((a) => a.id === active.id);
    const status = over?.id as ApplicationStatus | undefined;
    if (!application || !status || application.status === status) return;
    // Rejections can carry a reason, so ask for it before moving the card
    if (status === "REJECTED") setRejecting(application);
    else move(application, status);
  };

  const activeApplication = optimistic.find((a) => a.id === activeId);

  return (
    <div className="space-y-3">
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </p>
      )}
      <DndContext
        id="application-board"
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {APPLICATION_STATUSES.map((status) => (
            <Column key={status} status={status} applications={optimistic.filter((a) => a.status === status)} />
          ))}
        </div>
        <DragOverlay>{activeApplication && <CardBody application={activeApplication} dragging />}</DragOverlay>
      </DndContext>
      <RejectDialog
        application={rejecting}
        onCancel={() => setRejecting(null)}
        onConfirm={(reason) => {
          if (rejecting) move(rejecting, "REJECTED", reason);
          setRejecting(null);
        }}
      />
    </div>
  );
}

function Column({ status, applications }: { status: ApplicationStatus; applications: Application[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <section
      ref={setNodeRef}
      aria-label={STATUS_LABELS[status]}
      className={`flex min-h-48 flex-col rounded-2xl border p-3 transition ${
        isOver
          ? "border-indigo-400 bg-indigo-50/70 dark:border-indigo-500 dark:bg-indigo-950/30"
          : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
      }`}
    >
      <header className="mb-3 flex items-center gap-2 px-1">
        <span className={`h-2 w-2 rounded-full ${COLUMN_ACCENTS[status]}`} />
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">{STATUS_LABELS[status]}</h2>
        <span className="ml-auto rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {applications.length}
        </span>
      </header>
      <ul className="flex flex-1 flex-col gap-2">
        {applications.map((a) => (
          <Card key={a.id} application={a} />
        ))}
        {applications.length === 0 && (
          <li className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-zinc-300 py-8 text-xs text-zinc-400 dark:border-zinc-700">
            Drop here
          </li>
        )}
      </ul>
    </section>
  );
}

function Card({ application }: { application: Application }) {
  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({ id: application.id });

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      aria-roledescription="Draggable application"
      className={`touch-manipulation outline-none focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <CardBody application={application} />
    </li>
  );
}

function CardBody({ application: a, dragging = false }: { application: Application; dragging?: boolean }) {
  return (
    <div
      className={`relative rounded-xl border border-zinc-200 bg-white p-3 shadow-sm transition dark:border-zinc-800 dark:bg-zinc-900 ${
        dragging ? "cursor-grabbing rotate-2 shadow-lg ring-2 ring-indigo-500/30" : "cursor-grab hover:border-indigo-300"
      }`}
    >
      <Link
        href={`/applications/${a.id}`}
        draggable={false}
        className="font-medium text-zinc-900 after:absolute after:inset-0 dark:text-white"
      >
        {a.companyName}
      </Link>
      <p className="text-sm text-zinc-600 dark:text-zinc-300">{a.position}</p>
      <p className="mt-2 text-xs text-zinc-500">
        {a.location ? `${a.location} · ` : ""}Applied {formatDate(a.appliedAt)}
      </p>
      {a.status === "REJECTED" && a.rejectionReason && (
        <p className="mt-2 line-clamp-2 text-xs italic text-zinc-500">{a.rejectionReason}</p>
      )}
    </div>
  );
}

function RejectDialog({
  application,
  onCancel,
  onConfirm,
}: {
  application: Application | null;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (application && !dialog.open) {
      setReason("");
      dialog.showModal();
    } else if (!application && dialog.open) {
      dialog.close();
    }
  }, [application]);

  return (
    <dialog
      ref={ref}
      onCancel={onCancel}
      className="m-auto w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-0 text-zinc-900 shadow-xl backdrop:bg-zinc-900/40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
    >
      <form
        method="dialog"
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm(reason);
        }}
        className="space-y-4 p-5"
      >
        <div>
          <h2 className="text-lg font-semibold">Move to Rejected</h2>
          <p className="text-sm text-zinc-500">
            {application?.companyName} — {application?.position}
          </p>
        </div>
        <div>
          <label htmlFor="board-rejection-reason" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Rejection reason <span className="font-normal text-zinc-400">(optional)</span>
          </label>
          <textarea
            id="board-rejection-reason"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Went with a more senior candidate…"
            className={inputClass}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
            Move card
          </button>
        </div>
      </form>
    </dialog>
  );
}
