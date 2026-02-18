declare namespace JSX {
  interface IntrinsicElements {
    "n8n-demo": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        workflow?: string;
        frame?: boolean | "";
        theme?: "dark" | "light";
        clicktointeract?: boolean | "";
        collapseformobile?: boolean | "";
      },
      HTMLElement
    >;
  }
}
