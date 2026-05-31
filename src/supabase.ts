import type { InformationGap } from "./data";

const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env || {};

const SUPABASE_URL = (env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const SUPABASE_KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_ANON_KEY || "";

export interface PublicComment {
  id: string;
  cardId: string;
  nickname: string;
  content: string;
  createdAt: string;
}

interface SupabaseCommentRow {
  id: string;
  card_id: string;
  nickname: string | null;
  content: string;
  created_at: string;
}

interface SubmissionPayload {
  type: "submission" | "correction";
  title: string;
  content: string;
  sourceUrl?: string;
  contact?: string;
}

interface SupabaseCardRow {
  id: string;
  data: InformationGap;
  status: "published" | "draft" | "archived";
  updated_at: string;
}

const supabaseHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

const toPublicComment = (row: SupabaseCommentRow): PublicComment => ({
  id: row.id,
  cardId: row.card_id,
  nickname: row.nickname || "匿名用户",
  content: row.content,
  createdAt: row.created_at,
});

const toPublicCard = (row: SupabaseCardRow): InformationGap => ({
  ...row.data,
  id: row.id || row.data.id,
});

const requestSupabase = async <T>(path: string, init?: RequestInit): Promise<T> => {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase is not configured.");
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      ...supabaseHeaders,
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const responseText = await response.text();
  if (!responseText) {
    return undefined as T;
  }

  return JSON.parse(responseText) as T;
};

export const isSupabaseConfigured = () => Boolean(SUPABASE_URL && SUPABASE_KEY);

export const fetchPublicCards = async (): Promise<InformationGap[]> => {
  const query = new URLSearchParams({
    select: "id,data,status,updated_at",
    status: "eq.published",
    order: "updated_at.desc",
  });

  const rows = await requestSupabase<SupabaseCardRow[]>(`cards?${query.toString()}`);
  return rows.map(toPublicCard).filter((card) => Boolean(card.id && card.title));
};

export const fetchPublicComments = async (cardId: string): Promise<PublicComment[]> => {
  const query = new URLSearchParams({
    select: "id,card_id,nickname,content,created_at",
    card_id: `eq.${cardId}`,
    order: "created_at.desc",
  });
  const rows = await requestSupabase<SupabaseCommentRow[]>(`comments?${query.toString()}`);
  return rows.map(toPublicComment);
};

export const createPublicComment = async (payload: {
  cardId: string;
  nickname?: string;
  content: string;
}): Promise<PublicComment> => {
  const rows = await requestSupabase<SupabaseCommentRow[]>("comments", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      card_id: payload.cardId,
      nickname: payload.nickname?.trim() || "匿名用户",
      content: payload.content.trim(),
    }),
  });
  return toPublicComment(rows[0]);
};

export const createPublicSubmission = async (payload: SubmissionPayload) => {
  await requestSupabase<void>("submissions", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      type: payload.type,
      title: payload.title.trim(),
      content: payload.content.trim(),
      source_url: payload.sourceUrl?.trim() || null,
      contact: payload.contact?.trim() || null,
      status: "pending",
    }),
  });
};
