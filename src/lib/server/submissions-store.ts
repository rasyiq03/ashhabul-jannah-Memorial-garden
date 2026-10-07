import { promises as fs } from "node:fs";
import path from "node:path";
import type { SubmissionKind } from "@/lib/submission/types";

export interface StoredSubmission {
  ticket: string;
  kind: SubmissionKind;
  createdAt: string;
  data: Record<string, unknown>;
}

function resolveStorePath(): string {
  if (process.env.SUBMISSIONS_FILE) return path.resolve(process.env.SUBMISSIONS_FILE);
  // Sistem berkas Vercel hanya bisa ditulis di /tmp, dan isinya tidak permanen.
  if (process.env.VERCEL) return "/tmp/submissions.json";
  return path.join(/* turbopackIgnore: true */ process.cwd(), "data", "submissions.json");
}

function isMissingFile(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

async function readSubmissions(file: string): Promise<StoredSubmission[]> {
  let raw: string;
  try {
    raw = await fs.readFile(file, "utf8");
  } catch (error) {
    if (isMissingFile(error)) return [];
    throw error;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as StoredSubmission[];
  } catch {
    // Jatuh ke penanganan berkas rusak di bawah.
  }
  // Berkas rusak tidak dihapus: disimpan dengan nama lain agar datanya masih bisa diselamatkan.
  await fs.rename(file, file.replace(/\.json$/, `.corrupt-${Date.now()}.json`));
  return [];
}

let pendingWrite: Promise<unknown> = Promise.resolve();

/**
 * Menambah satu kiriman ke berkas JSON. Penulisan diantrekan agar dua kiriman yang datang
 * bersamaan tidak saling menimpa, dan ditulis lewat berkas sementara agar tidak setengah jadi.
 */
export function appendSubmission(
  createRecord: (existing: readonly StoredSubmission[]) => StoredSubmission,
): Promise<StoredSubmission> {
  const task = pendingWrite.then(async () => {
    const file = resolveStorePath();
    await fs.mkdir(path.dirname(file), { recursive: true });
    const submissions = await readSubmissions(file);
    const record = createRecord(submissions);
    submissions.push(record);
    const temporaryFile = `${file}.${process.pid}.tmp`;
    await fs.writeFile(temporaryFile, `${JSON.stringify(submissions, null, 2)}\n`, "utf8");
    await fs.rename(temporaryFile, file);
    return record;
  });
  pendingWrite = task.catch(() => undefined);
  return task;
}
