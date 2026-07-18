import { ImageResponse } from "next/og";
import { getPersonalInfo } from "@/models/personal-info";

export const size = { width: 32, height: 32 };

export async function GET() {
  let initials = "NN";
  try {
    const info = await getPersonalInfo();
    if (info?.name) {
      const first = info.name.first?.charAt(0) ?? "";
      const last = info.name.last?.charAt(0) ?? "";
      const derived = (first + last).toUpperCase();
      if (derived) initials = derived;
    }
  } catch {
    initials = "NN";
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "linear-gradient(135deg, #16a34a, #22c55e)",
          width: "100%",
          height: "100%",
          padding: 0,
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
          fontWeight: 700,
        }}
      >
        {initials}
      </div>
    ),
    { ...size },
  );
}
