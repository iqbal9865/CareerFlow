import type { Metadata } from "next";
import { StatCard } from "@/components/stat-card";
import { NewTaskPanel, TaskItem, TASK_STATUS_LABELS } from "@/components/tasks";
import { getTaskStats, getTasks } from "@/lib/dal";
import { TASK_STATUSES, type Task, type TaskStatus } from "@/lib/definitions";

export const metadata: Metadata = { title: "Tasks" };

function isTaskStatus(value: string | undefined): value is TaskStatus {
  return TASK_STATUSES.includes(value as TaskStatus);
}

function isOverdue(task: Task) {
  return task.status === "PENDING" && new Date(task.deadline).getTime() < Date.now();
}

export default async function TasksPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const [tasks, stats] = await Promise.all([getTasks(), getTaskStats()]);

  const groups = (isTaskStatus(status) ? [status] : TASK_STATUSES)
    .map((s) => ({ status: s, items: tasks.filter((t) => t.status === s) }))
    .filter((g) => g.items.length > 0);
  const filterHref = (s?: TaskStatus) => (s ? `/tasks?status=${s}` : "/tasks");

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">Tasks</h1>
          <p className="text-sm text-zinc-500">
            Track follow-ups, prep and everything else your search needs.
            {stats.total > 0 && ` ${stats.completionRate}% done · ${stats.onTimeRate}% finished on time`}
          </p>
        </div>
        <NewTaskPanel />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <StatCard label="All tasks" value={stats.total} href={filterHref()} active={!isTaskStatus(status)} />
        {TASK_STATUSES.map((s) => (
          <StatCard
            key={s}
            label={TASK_STATUS_LABELS[s]}
            value={stats.byStatus[s]}
            href={filterHref(s)}
            active={status === s}
          />
        ))}
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Overdue</p>
          <p
            className={`mt-1 text-2xl font-semibold ${
              stats.overdue > 0 ? "text-red-600 dark:text-red-400" : "text-zinc-900 dark:text-white"
            }`}
          >
            {stats.overdue}
          </p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white py-16 text-center dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">No tasks yet</h2>
          <p className="mt-1 text-sm text-zinc-500">Add a task to plan your next steps.</p>
        </div>
      ) : groups.length === 0 ? (
        <p className="py-12 text-center text-sm text-zinc-500">No tasks with this status.</p>
      ) : (
        <div className="space-y-8">
          {groups.map((g) => (
            <section key={g.status} aria-labelledby={`tasks-${g.status}`} className="space-y-3">
              <h2
                id={`tasks-${g.status}`}
                className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white"
              >
                {TASK_STATUS_LABELS[g.status]}
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {g.items.length}
                </span>
              </h2>
              <ul className="divide-y divide-zinc-100 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
                {g.items.map((t) => (
                  <TaskItem key={t.id} task={t} overdue={isOverdue(t)} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
