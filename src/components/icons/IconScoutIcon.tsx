import type { SVGProps } from "react";
import UilArrowRight from "@iconscout/react-unicons/icons/uil-arrow-right";
import UilArrowUpRight from "@iconscout/react-unicons/icons/uil-arrow-up-right";
import UilBookOpen from "@iconscout/react-unicons/icons/uil-book-open";
import UilBrain from "@iconscout/react-unicons/icons/uil-brain";
import UilBracketsCurly from "@iconscout/react-unicons/icons/uil-brackets-curly";
import UilChartGrowth from "@iconscout/react-unicons/icons/uil-chart-growth";
import UilCheckCircle from "@iconscout/react-unicons/icons/uil-check-circle";
import UilClipboardNotes from "@iconscout/react-unicons/icons/uil-clipboard-notes";
import UilCube from "@iconscout/react-unicons/icons/uil-cube";
import UilDatabase from "@iconscout/react-unicons/icons/uil-database";
import UilFileAlt from "@iconscout/react-unicons/icons/uil-file-alt";
import UilFileDownload from "@iconscout/react-unicons/icons/uil-file-download";
import UilProcess from "@iconscout/react-unicons/icons/uil-process";
import UilPlus from "@iconscout/react-unicons/icons/uil-plus";
import UilWindowGrid from "@iconscout/react-unicons/icons/uil-window-grid";

const ICONS = {
  ai: UilBrain,
  arrowRight: UilArrowRight,
  arrowUpRight: UilArrowUpRight,
  automation: UilProcess,
  book: UilBookOpen,
  check: UilCheckCircle,
  code: UilBracketsCurly,
  data: UilDatabase,
  document: UilFileAlt,
  download: UilFileDownload,
  growth: UilChartGrowth,
  interface: UilWindowGrid,
  product: UilCube,
  plus: UilPlus,
  quiz: UilClipboardNotes,
} as const;

export type IconScoutName = keyof typeof ICONS;

type IconScoutIconProps = Omit<SVGProps<SVGSVGElement>, "color" | "name"> & {
  name: IconScoutName;
  size?: number;
};

export default function IconScoutIcon({
  name,
  size = 24,
  ...props
}: IconScoutIconProps) {
  const Icon = ICONS[name];

  return (
    <Icon
      aria-hidden="true"
      color="currentColor"
      focusable="false"
      size={size}
      {...props}
    />
  );
}
