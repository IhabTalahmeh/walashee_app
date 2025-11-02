import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  size?: number;
}

const RVUsIconOutline = ({ size = 16, ...props }: Props) => (
  <Svg
    width={size}
    height={(size * 20) / 22}
    viewBox="0 0 22 20"
    fill="none"
    {...props}
  >
    <Path
      d="M1 20H21"
      stroke={props.color}
      strokeOpacity={0.8}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.75 3V20H13.25V3C13.25 1.9 12.8 1 11.45 1H10.55C9.2 1 8.75 1.9 8.75 3Z"
      stroke={props.color}
      strokeOpacity={0.8}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 9V20H6V9C6 7.9 5.6 7 4.4 7H3.6C2.4 7 2 7.9 2 9Z"
      stroke={props.color}
      strokeOpacity={0.8}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 14V20H20V14C20 12.9 19.6 12 18.4 12H17.6C16.4 12 16 12.9 16 14Z"
      stroke={props.color}
      strokeOpacity={0.8}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default RVUsIconOutline;
