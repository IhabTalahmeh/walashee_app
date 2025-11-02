import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  size?: number;
}

const TagIconOutline = ({ size = 22, ...props }: Props) => (
  <Svg
    width={size}
    height={(size * 20) / 22}
    viewBox="0 0 21 21"
    fill="none"
    {...props}
  >
    <Path
      d="M2.40476 13.5264L6.93476 18.0564C8.79476 19.9164 11.8148 19.9164 13.6848 18.0564L18.0748 13.6664C19.9348 11.8064 19.9348 8.78637 18.0748 6.91637L13.5348 2.39637C12.5848 1.44637 11.2748 0.936367 9.93476 1.00637L4.93476 1.24637C2.93476 1.33637 1.34476 2.92637 1.24476 4.91637L1.00476 9.91637C0.944756 11.2664 1.45476 12.5764 2.40476 13.5264Z"
      stroke="#198CFF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.73486 10.2266C9.11558 10.2266 10.2349 9.10727 10.2349 7.72656C10.2349 6.34585 9.11558 5.22656 7.73486 5.22656C6.35415 5.22656 5.23486 6.34585 5.23486 7.72656C5.23486 9.10727 6.35415 10.2266 7.73486 10.2266Z"
      stroke="#198CFF"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);
export default TagIconOutline;
