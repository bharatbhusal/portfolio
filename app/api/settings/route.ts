import { NextRequest, NextResponse } from "next/server";
import { getAllSettings, setSetting } from "@/models/settings";

export async function GET() {
  try {
    const settings = await getAllSettings();
    const masked = settings.map((s) => ({
      key: s.key,
      value:
        s.key === "github_token" && s.value
          ? "••••" + s.value.slice(-4)
          : s.value,
    }));
    return NextResponse.json({ success: true, data: masked });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { key, value } = (await req.json()) as {
      key: string;
      value: string;
    };

    if (!key || typeof value !== "string") {
      return NextResponse.json(
        { error: "key and value are required" },
        { status: 400 },
      );
    }

    const allowedKeys = ["github_username", "github_token"];
    if (!allowedKeys.includes(key)) {
      return NextResponse.json({ error: "Invalid key" }, { status: 400 });
    }

    await setSetting(key, value);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
