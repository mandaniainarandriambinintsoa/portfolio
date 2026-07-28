declare module "@iconscout/react-unicons/icons/*" {
  import type { ComponentType, SVGProps } from "react";

  type UniconProps = Omit<SVGProps<SVGSVGElement>, "color"> & {
    color?: string;
    size?: number | string;
  };

  const Unicon: ComponentType<UniconProps>;
  export default Unicon;
}
