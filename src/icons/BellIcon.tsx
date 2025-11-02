import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  size?: number;
}

const BellIcon = ({ size = 22, ...props }: Props) => (
  <Svg
    width={size}
    height={(size * 20) / 22}
    viewBox="0 0 22 20"
    fill="none"
    {...props}
  >
    <Path
      d="M10 5.44043V8.77043"
      stroke={props.color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <Path
      d="M10.0199 1C6.3399 1 3.3599 3.98 3.3599 7.66V9.76C3.3599 10.44 3.0799 11.46 2.7299 12.04L1.4599 14.16C0.679898 15.47 1.2199 16.93 2.6599 17.41C7.4399 19 12.6099 19 17.3899 17.41C18.7399 16.96 19.3199 15.38 18.5899 14.16L17.3199 12.04C16.9699 11.46 16.6899 10.43 16.6899 9.76V7.66C16.6799 4 13.6799 1 10.0199 1Z"
      stroke={props.color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <Path
      d="M13.3299 17.8203C13.3299 19.6503 11.8299 21.1503 9.99992 21.1503C9.08992 21.1503 8.24992 20.7703 7.64992 20.1703C7.04992 19.5703 6.66992 18.7303 6.66992 17.8203"
      stroke={props.color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default BellIcon;
