"use client";

import BackgroundComponents from "./BackgroundComponents";
import AIAssistant from "./components/AIAssistant/AIAssistant";

export default function ClientProviders({ children }) {
  return (
    <>
      {children}
      <BackgroundComponents />
      {/* AI Portfolio Assistant — floating widget, client-only, loaded after page content */}
      <AIAssistant />
    </>
  );
}
