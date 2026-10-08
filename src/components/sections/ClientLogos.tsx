import Image from "next/image";

type ClientLogoItem = {
  name: string;
  logo?: string;
};

type ClientLogosDict = {
  label: string;
  items: ClientLogoItem[];
};

export default function ClientLogos({ dict }: { dict: ClientLogosDict }) {
  return (
    <section
      aria-label={dict.label}
      className="max-w-6xl w-full mx-auto px-4 sm:px-6 -mt-4 md:-mt-8 mb-12 md:mb-20 overflow-hidden"
    >
      <p className="mx-auto max-w-[20rem] text-center text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-6">
        {dict.label}
      </p>
      <ul
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-6 sm:gap-x-12"
      >
        {dict.items.map((item) => (
          <li
            key={item.name}
            className="flex min-w-0 basis-full items-center justify-center gap-3 text-slate-300 sm:basis-auto"
          >
            {item.logo ? (
              <Image
                src={item.logo}
                alt=""
                aria-hidden="true"
                width={36}
                height={36}
                unoptimized
                className="size-8 shrink-0 object-contain sm:size-9"
              />
            ) : null}
            <span className="text-sm sm:text-lg md:text-xl font-bold tracking-tight break-words [overflow-wrap:anywhere]">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
