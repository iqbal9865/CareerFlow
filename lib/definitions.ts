// Shapes returned by the CareerFlow backend (dates arrive as ISO strings over JSON)

export const APPLICATION_STATUSES = ["PENDING", "INTERVIEW", "ACCEPTED", "REJECTED"] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

// Tasks move PENDING -> REVIEW -> DONE; REVIEW can also go back to PENDING. DONE is final.
export const TASK_STATUSES = ["PENDING", "REVIEW", "DONE"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const GENDERS = ["MALE", "FEMALE", "OTHER"] as const;
export type Gender = (typeof GENDERS)[number];

export interface Application {
  id: string;
  companyName: string;
  position: string;
  location: string | null;
  salaryRange: string | null;
  jobUrl: string | null;
  source: string | null;
  notes: string | null;
  appliedAt: string;
  followUpAt: string | null;
  status: ApplicationStatus;
  // Only set while status is REJECTED; the backend clears it when the status changes
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  deadline: string;
  status: TaskStatus;
  completedAt: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStats {
  total: number;
  byStatus: Record<TaskStatus, number>;
  overdue: number;
  completedOnTime: number;
  completedLate: number;
  completionRate: number;
  onTimeRate: number;
}

export interface Profile {
  id: string;
  bio: string | null;
  avatarUrl: string | null;
  phoneNumber: string | null;
  dateOfBirth: string | null;
  gender: Gender | null;
  city: string | null;
  country: string | null;
  portfolioUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  user: { fullName: string; email: string };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// State returned by Server Actions to forms using useActionState
export type FormState = {
  error?: string;
  success?: string;
} | undefined;
