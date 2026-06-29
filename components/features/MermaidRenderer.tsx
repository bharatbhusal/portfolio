"use client";

import React, { useEffect, useRef, useState } from "react";

interface MermaidRendererProps {
  chart: string;
}

export default function MermaidRenderer({ chart }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const elementId = `mermaid-${Math.floor(Math.random() * 1000000)}`;

    const renderChart = async () => {
      try {
        // Dynamically import mermaid only in the browser environment
        const mermaid = (await import("mermaid")).default;
        
        // Initialize mermaid with settings
        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          securityLevel: "loose",
        });

        // Clear any previous error and render
        const { svg: renderedSvg } = await mermaid.render(elementId, chart);
        if (isMounted) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err: any) {
        console.error("Mermaid diagram rendering error:", err);
        if (isMounted) {
          setError("Failed to compile diagram view");
        }
        // Clean up elements inserted by mermaid on compilation error
        const badElement = document.getElementById(elementId);
        if (badElement) {
          badElement.remove();
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-mono text-red-500 overflow-x-auto my-4">
        <code>{chart}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center p-8 bg-muted/30 border border-dashed rounded-xl animate-pulse text-xs text-muted-foreground my-4 font-sans">
        Compiling diagram visual...
      </div>
    );
  }

  return (
    <div 
      className="flex justify-center overflow-x-auto my-6 p-6 bg-card/60 border border-border/60 rounded-xl shadow-inner max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
