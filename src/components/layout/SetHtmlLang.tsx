// Server component — injects inline script that runs synchronously at parse time
// Sets <html lang> before Lighthouse/crawlers evaluate the DOM
export default function SetHtmlLang({ locale }: { locale: string }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang="${locale}"`,
      }}
    />
  );
}
