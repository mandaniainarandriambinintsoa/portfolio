import type { SVGProps } from "react";
import UilArrowRight from "@iconscout/react-unicons/icons/uil-arrow-right";
import UilArrowUpRight from "@iconscout/react-unicons/icons/uil-arrow-up-right";
import UilBalanceScale from "@iconscout/react-unicons/icons/uil-balance-scale";
import UilBedDouble from "@iconscout/react-unicons/icons/uil-bed-double";
import UilBrushAlt from "@iconscout/react-unicons/icons/uil-brush-alt";
import UilBookOpen from "@iconscout/react-unicons/icons/uil-book-open";
import UilBolt from "@iconscout/react-unicons/icons/uil-bolt";
import UilBrain from "@iconscout/react-unicons/icons/uil-brain";
import UilBracketsCurly from "@iconscout/react-unicons/icons/uil-brackets-curly";
import UilBuilding from "@iconscout/react-unicons/icons/uil-building";
import UilCalendarAlt from "@iconscout/react-unicons/icons/uil-calendar-alt";
import UilCarSideview from "@iconscout/react-unicons/icons/uil-car-sideview";
import UilChartGrowth from "@iconscout/react-unicons/icons/uil-chart-growth";
import UilCheckCircle from "@iconscout/react-unicons/icons/uil-check-circle";
import UilClipboardNotes from "@iconscout/react-unicons/icons/uil-clipboard-notes";
import UilClock from "@iconscout/react-unicons/icons/uil-clock";
import UilCloudUpload from "@iconscout/react-unicons/icons/uil-cloud-upload";
import UilCodeBranch from "@iconscout/react-unicons/icons/uil-code-branch";
import UilCoins from "@iconscout/react-unicons/icons/uil-coins";
import UilComments from "@iconscout/react-unicons/icons/uil-comments";
import UilCrosshairs from "@iconscout/react-unicons/icons/uil-crosshairs";
import UilCube from "@iconscout/react-unicons/icons/uil-cube";
import UilDatabase from "@iconscout/react-unicons/icons/uil-database";
import UilEnvelope from "@iconscout/react-unicons/icons/uil-envelope";
import UilEstate from "@iconscout/react-unicons/icons/uil-estate";
import UilEye from "@iconscout/react-unicons/icons/uil-eye";
import UilFileAlt from "@iconscout/react-unicons/icons/uil-file-alt";
import UilFileDownload from "@iconscout/react-unicons/icons/uil-file-download";
import UilHeadphones from "@iconscout/react-unicons/icons/uil-headphones";
import UilHome from "@iconscout/react-unicons/icons/uil-home";
import UilImage from "@iconscout/react-unicons/icons/uil-image";
import UilJavaScript from "@iconscout/react-unicons/icons/uil-java-script";
import UilKeySkeleton from "@iconscout/react-unicons/icons/uil-key-skeleton";
import UilLightbulbAlt from "@iconscout/react-unicons/icons/uil-lightbulb-alt";
import UilLink from "@iconscout/react-unicons/icons/uil-link";
import UilLock from "@iconscout/react-unicons/icons/uil-lock";
import UilMapMarker from "@iconscout/react-unicons/icons/uil-map-marker";
import UilMegaphone from "@iconscout/react-unicons/icons/uil-megaphone";
import UilMoneyBill from "@iconscout/react-unicons/icons/uil-money-bill";
import UilPhone from "@iconscout/react-unicons/icons/uil-phone";
import UilPlaneDeparture from "@iconscout/react-unicons/icons/uil-plane-departure";
import UilProcess from "@iconscout/react-unicons/icons/uil-process";
import UilPlus from "@iconscout/react-unicons/icons/uil-plus";
import UilRobot from "@iconscout/react-unicons/icons/uil-robot";
import UilRestaurant from "@iconscout/react-unicons/icons/uil-restaurant";
import UilRocket from "@iconscout/react-unicons/icons/uil-rocket";
import UilSearch from "@iconscout/react-unicons/icons/uil-search";
import UilServerNetwork from "@iconscout/react-unicons/icons/uil-server-network";
import UilShieldCheck from "@iconscout/react-unicons/icons/uil-shield-check";
import UilSpinnerAlt from "@iconscout/react-unicons/icons/uil-spinner-alt";
import UilSync from "@iconscout/react-unicons/icons/uil-sync";
import UilUser from "@iconscout/react-unicons/icons/uil-user";
import UilWrench from "@iconscout/react-unicons/icons/uil-wrench";
import UilWindowGrid from "@iconscout/react-unicons/icons/uil-window-grid";

const ICONS = {
  ai: UilBrain,
  arrowRight: UilArrowRight,
  arrowUpRight: UilArrowUpRight,
  automation: UilProcess,
  balance: UilBalanceScale,
  beauty: UilBrushAlt,
  bed: UilBedDouble,
  book: UilBookOpen,
  bolt: UilBolt,
  building: UilBuilding,
  calendar: UilCalendarAlt,
  car: UilCarSideview,
  call: UilPhone,
  check: UilCheckCircle,
  chat: UilComments,
  clock: UilClock,
  cloudUpload: UilCloudUpload,
  code: UilBracketsCurly,
  codeBranch: UilCodeBranch,
  coins: UilCoins,
  crosshair: UilCrosshairs,
  data: UilDatabase,
  document: UilFileAlt,
  download: UilFileDownload,
  envelope: UilEnvelope,
  estate: UilEstate,
  eye: UilEye,
  growth: UilChartGrowth,
  headphones: UilHeadphones,
  home: UilHome,
  image: UilImage,
  interface: UilWindowGrid,
  javascript: UilJavaScript,
  key: UilKeySkeleton,
  lightbulb: UilLightbulbAlt,
  link: UilLink,
  location: UilMapMarker,
  lock: UilLock,
  megaphone: UilMegaphone,
  money: UilMoneyBill,
  product: UilCube,
  restaurant: UilRestaurant,
  plus: UilPlus,
  quiz: UilClipboardNotes,
  robot: UilRobot,
  rocket: UilRocket,
  search: UilSearch,
  server: UilServerNetwork,
  shield: UilShieldCheck,
  spinner: UilSpinnerAlt,
  sync: UilSync,
  travel: UilPlaneDeparture,
  user: UilUser,
  wrench: UilWrench,
} as const;

export type IconScoutName = keyof typeof ICONS;

type IconScoutIconProps = Omit<SVGProps<SVGSVGElement>, "color" | "name"> & {
  name: IconScoutName;
  size?: number;
};

const LEGACY_ICON_MAP: Record<string, IconScoutName> = {
  account_tree: "codeBranch",
  all_inclusive: "sync",
  api: "code",
  architecture: "codeBranch",
  arrow_forward: "arrowRight",
  auto_awesome: "lightbulb",
  autorenew: "sync",
  balance: "balance",
  bolt: "bolt",
  business: "building",
  calendar_today: "calendar",
  call: "call",
  campaign: "megaphone",
  chat: "chat",
  check_circle: "check",
  cloud_upload: "cloudUpload",
  code: "code",
  code_blocks: "code",
  database: "data",
  deployed_code: "product",
  description: "document",
  dns: "server",
  emoji_objects: "lightbulb",
  forum: "chat",
  home: "home",
  hub: "automation",
  image: "image",
  javascript: "javascript",
  key: "key",
  link: "link",
  location_on: "location",
  lock: "lock",
  mail: "envelope",
  manage_search: "search",
  monitoring: "growth",
  north_east: "arrowUpRight",
  payments: "money",
  person: "user",
  precision_manufacturing: "robot",
  progress_activity: "spinner",
  psychology: "ai",
  rocket_launch: "rocket",
  savings: "coins",
  schedule: "clock",
  search: "search",
  shield: "shield",
  smart_toy: "robot",
  speed: "bolt",
  support_agent: "headphones",
  sync: "sync",
  target: "crosshair",
  terminal: "code",
  timer: "clock",
  travel_explore: "location",
  trending_up: "growth",
  verified: "check",
  visibility: "eye",
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

export function LegacyIconScoutIcon({
  name,
  ...props
}: Omit<IconScoutIconProps, "name"> & { name: string }) {
  return <IconScoutIcon name={LEGACY_ICON_MAP[name] ?? "code"} {...props} />;
}
