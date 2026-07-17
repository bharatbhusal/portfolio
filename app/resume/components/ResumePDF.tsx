"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Link as PdfLink,
  Font,
} from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import type { ResumeData } from "@/types/resume";

Font.register({
  family: "Helvetica",
  fonts: [{ src: "Helvetica" }, { src: "Helvetica-Bold", fontWeight: "bold" }],
});

const GREEN = "#16a34a";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingBottom: 56,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    fontSize: 8,
    color: "#999",
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 6,
  },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  contactCol: {
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 2,
  },
  contactRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 4,
    color: "#555",
    fontSize: 9,
  },
  contactLink: { color: GREEN, textDecoration: "none" },
  summary: { marginBottom: 12, lineHeight: 1.5, fontSize: 10, color: "#333" },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: GREEN,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 3,
    marginBottom: 8,
    marginTop: 14,
  },
  row: { marginBottom: 10 },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  bold: { fontWeight: "bold", fontSize: 10 },
  italic: { fontStyle: "italic", color: "#555", fontSize: 9 },
  date: { fontSize: 9, color: "#666" },
  bulletRow: { flexDirection: "row", marginBottom: 2 },
  bullet: { width: 12, fontSize: 10 },
  bulletText: { flex: 1, fontSize: 9.5, lineHeight: 1.4 },
  skillRow: { marginBottom: 3 },
  skillCategory: { fontWeight: "bold", fontSize: 9.5 },
  skillKeywords: { fontSize: 9.5, color: "#333" },
  projectTech: { fontSize: 8.5, color: "#666", marginTop: 2 },
  projectLink: { fontSize: 8.5, color: GREEN, marginTop: 2 },
});

function ResumeDoc({ data, createdAt }: { data: ResumeData; createdAt?: string }) {
  const { basics, work, education, skills, projects } = data;
  const generatedLine = createdAt
    ? `Generated from bharatbhusal.com · ${new Date(createdAt).toLocaleString(
        "en-US",
        { dateStyle: "medium", timeStyle: "short" },
      )}`
    : "Generated from bharatbhusal.com";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.name}>{basics.name}</Text>
          <View style={styles.contactCol}>
            {basics.email && (
              <PdfLink
                href={`mailto:${basics.email}`}
                style={styles.contactLink}
              >
                {basics.email}
              </PdfLink>
            )}
            {basics.phone && (
              <PdfLink href={`tel:${basics.phone}`} style={styles.contactLink}>
                {basics.phone}
              </PdfLink>
            )}
            {basics.url && (
              <PdfLink href={basics.url} style={styles.contactLink}>
                {basics.url.replace(/^https?:\/\//, "")}
              </PdfLink>
            )}
          </View>
        </View>
        {basics.summary && <Text style={styles.summary}>{basics.summary}</Text>}

        {/* Skills */}
        {skills.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Skills</Text>
            {skills.map((s, i) => (
              <View key={i} style={styles.skillRow}>
                <Text>
                  <Text style={styles.skillCategory}>{s.category}: </Text>
                  <Text style={styles.skillKeywords}>
                    {s.keywords.join(", ")}
                  </Text>
                </Text>
              </View>
            ))}
          </>
        )}

        {/* Work */}
        {work.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Experience</Text>
            {work.map((w, i) => (
              <View key={i} style={styles.row}>
                <View style={styles.rowHeader}>
                  <Text style={styles.bold}>{w.position}</Text>
                  <Text style={styles.date}>
                    {w.startDate} – {w.endDate || "Present"}
                  </Text>
                </View>
                <Text style={styles.italic}>
                  {w.company}
                  {w.location ? ` · ${w.location}` : ""}
                </Text>
                {w.highlights.map((h, j) => (
                  <View key={j} style={styles.bulletRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{h}</Text>
                  </View>
                ))}
              </View>
            ))}
          </>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((p, i) => (
              <View key={i} style={styles.row}>
                <Text style={styles.bold}>{p.name}</Text>
                {p.highlights.map((h, j) => (
                  <View key={j} style={styles.bulletRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{h}</Text>
                  </View>
                ))}
                {p.techStack.length > 0 && (
                  <Text style={styles.projectTech}>
                    {p.techStack.join(" · ")}
                  </Text>
                )}
                {p.url && (
                  <PdfLink href={p.url} style={styles.projectLink}>
                    {p.url.replace(/^https?:\/\//, "")}
                  </PdfLink>
                )}
              </View>
            ))}
          </>
        )}

        {/* Education */}
        {education.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((e, i) => (
              <View key={i} style={styles.row}>
                <View style={styles.rowHeader}>
                  <Text style={styles.bold}>{e.degree}</Text>
                  <Text style={styles.date}>
                    {e.startDate} – {e.endDate || ""}
                  </Text>
                </View>
                <Text style={styles.italic}>{e.institution}</Text>
                {e.area && (
                  <Text style={{ fontSize: 9, color: "#666" }}>{e.area}</Text>
                )}
                {e.gpa && (
                  <Text style={{ fontSize: 9, color: "#666" }}>
                    GPA: {e.gpa}
                  </Text>
                )}
              </View>
            ))}
          </>
        )}

        <Text style={styles.footer} fixed>
          {generatedLine}
        </Text>
      </Page>
    </Document>
  );
}

export function ResumePDFLink({
  data,
  createdAt,
  minimal,
  id,
}: {
  data: ResumeData | null;
  createdAt?: string;
  minimal?: boolean;
  id?: string;
}) {
  if (minimal && id) {
    return <MinimalDownloadButton id={id} />;
  }

  if (!data) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium cursor-not-allowed opacity-50"
      >
        <Download className="h-4 w-4" />
        Download PDF
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<ResumeDoc data={data} createdAt={createdAt} />}
      fileName={`${data.basics.name.replace(/\s+/g, "_")}_Resume.pdf`}
      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
    >
      {({ loading }) => (
        <>
          <Download className="h-4 w-4" />
          {loading ? "Generating PDF..." : "Download PDF"}
        </>
      )}
    </PDFDownloadLink>
  );
}

function MinimalDownloadButton({ id }: { id: string }) {
  const [data, setData] = useState<ResumeData | null>(null);
  const [createdAt, setCreatedAt] = useState<string | undefined>();

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/resume/${id}`)
      .then((r) => r.json())
      .then((json: { success: boolean; data: any }) => {
        if (json.success && !cancelled) {
          setData({
            basics: json.data.basics,
            work: json.data.work,
            education: json.data.education,
            skills: json.data.skills,
            projects: json.data.projects,
          });
          setCreatedAt(json.data.createdAt);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!data) {
    return (
      <span
        className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        title="Download PDF"
      >
        <Download className="h-4 w-4" />
      </span>
    );
  }

  return (
    <PDFDownloadLink
      document={<ResumeDoc data={data} createdAt={createdAt} />}
      fileName={`${data.basics.name.replace(/\s+/g, "_")}_Resume.pdf`}
      className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      title="Download PDF"
    >
      <Download className="h-4 w-4" />
    </PDFDownloadLink>
  );
}
