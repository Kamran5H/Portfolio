import Script from "next/script";
import { SITE } from "@/lib/site";

export default function GoogleAnalytics() {
  const gaId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
    (SITE as { analytics?: { googleMeasurementId?: string } }).analytics
      ?.googleMeasurementId;

  // Do not load unless a valid Measurement ID starting with "G-" is provided
  if (!gaId || gaId === "G-XXXXXXXXXX" || !gaId.startsWith("G-")) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
