"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

type N8nWorkflowViewerProps = {
  workflow: object;
  height?: number;
};

export default function N8nWorkflowViewer({
  workflow,
  height = 500,
}: N8nWorkflowViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptsReady, setScriptsReady] = useState(0);
  const loaded = scriptsReady >= 3;

  useEffect(() => {
    if (scriptsReady < 3 || !containerRef.current) return;

    containerRef.current.innerHTML = "";

    const el = document.createElement("n8n-demo");
    el.setAttribute("workflow", JSON.stringify(workflow));
    el.setAttribute("theme", "dark");
    el.setAttribute("frame", "");
    el.setAttribute("clicktointeract", "");
    el.setAttribute("collapseformobile", "");
    containerRef.current.appendChild(el);
  }, [scriptsReady, workflow]);

  const onScriptLoad = () => setScriptsReady((prev) => prev + 1);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.0/webcomponents-loader.js"
        strategy="lazyOnload"
        onLoad={onScriptLoad}
      />
      <Script
        src="https://www.unpkg.com/lit@2.0.0-rc.2/polyfill-support.js"
        strategy="lazyOnload"
        onLoad={onScriptLoad}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/@n8n_io/n8n-demo-component/n8n-demo.bundled.js"
        type="module"
        strategy="lazyOnload"
        onLoad={onScriptLoad}
      />

      <div className="relative w-full rounded-2xl overflow-hidden border border-white/10">
        {!loaded && (
          <div
            className="glass-card animate-pulse flex items-center justify-center"
            style={{ height }}
          >
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-slate-400">
                Chargement du workflow...
              </p>
            </div>
          </div>
        )}
        <div
          ref={containerRef}
          style={{ height, display: loaded ? "block" : "none" }}
        />
      </div>
    </>
  );
}
