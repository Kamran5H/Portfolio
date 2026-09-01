import { NextResponse } from "next/server";

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  projectType?: unknown;
  budget?: unknown;
  message?: unknown;
};

const lastSubmissionByIp = new Map<string, number>();

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function normalizeIp(reqHeaders: Headers): string {
  const xff = reqHeaders.get("x-forwarded-for");
  if (xff) {
    // X-Forwarded-For can contain multiple IPs.
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }

  const xrip = reqHeaders.get("x-real-ip");
  if (xrip) return xrip;

  return "unknown";
}

export async function POST(req: Request) {
  const ip = normalizeIp(req.headers);
  const now = Date.now();

  const last = lastSubmissionByIp.get(ip);
  if (last != null && now - last < 60_000) {
    return NextResponse.json(
      { success: false, error: "Rate limited. Please try again in 60 seconds." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const payload = body as ContactRequest;
  const name = isNonEmptyString(payload.name) ? payload.name.trim() : null;
  const email = isNonEmptyString(payload.email) ? payload.email.trim() : null;
  const company = isNonEmptyString(payload.company) ? payload.company.trim() : "";
  const projectType = isNonEmptyString(payload.projectType) ? payload.projectType.trim() : null;
  const budget = isNonEmptyString(payload.budget) ? payload.budget.trim() : null;
  const message = isNonEmptyString(payload.message) ? payload.message.trim() : null;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !projectType || !budget || !message) {
    return NextResponse.json(
      { success: false, error: "Missing required fields: name, email, projectType, budget, message." },
      { status: 400 }
    );
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json({ success: false, error: "Invalid email address." }, { status: 400 });
  }

  lastSubmissionByIp.set(ip, now);

  // eslint-disable-next-line no-console
  console.log("contact form submission:", { name, email, company, projectType, budget, message });

  return NextResponse.json({ success: true });
}

