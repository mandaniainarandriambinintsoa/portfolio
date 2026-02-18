import type { Locale } from "@/i18n/config";
import { navItems } from "@/lib/data/navigation";
import HeaderClient from "./HeaderClient";

export default function Header({ locale }: { locale: Locale }) {
  const navLinks = navItems.map((item) => ({
    label: item.label[locale],
    href: item.href[locale],
  }));

  const contactLabel = locale === "fr" ? "Contact" : "Contact";
  const contactHref = locale === "fr" ? "/contact" : "/en/contact";

  return <HeaderClient locale={locale} navLinks={navLinks} contactLabel={contactLabel} contactHref={contactHref} />;
}
