import { ImageResponse } from "next/og";

export const alt =
  "Dicky Alfian Irvansyah — Industrial Engineering & Systems Optimization";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          color: "#EAF0FF",
          backgroundColor: "#070A12",
          backgroundImage:
            "radial-gradient(ellipse at 82% 10%, rgba(63, 111, 168, 0.4), transparent 42%)",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            color: "#E0A95A",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.12em",
          }}
        >
          DICKYAI
          <span
            style={{
              width: 54,
              height: 2,
              backgroundColor: "#E0A95A",
            }}
          />
          PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              color: "#E0A95A",
              fontSize: 22,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Industrial Engineering
          </div>
          <div
            style={{
              maxWidth: 1000,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.08,
            }}
          >
            Systems Optimization & Workflow Automation
          </div>
          <div style={{ color: "#9AA6C4", fontSize: 28 }}>
            Dicky Alfian Irvansyah
          </div>
        </div>
        <div
          style={{
            color: "#9AA6C4",
            fontSize: 18,
            letterSpacing: "0.08em",
          }}
        >
          DATA-BACKED OPERATIONAL DECISIONS
        </div>
      </div>
    ),
    size,
  );
}
