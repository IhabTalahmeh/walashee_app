import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  size?: number;
}

const HomeIconOutline = ({ size = 22, ...props }: Props) => (
  <Svg
    width={size}
    height={(size * 20) / 22}
    viewBox="0 0 24 22"
    fill="none"
    {...props}
  >
    <Path
      d="M11.0032 16.8164V13.8164"
      stroke={props.color}
      strokeOpacity={0.8}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.07319 1.63626L2.14319 7.18626C1.36319 7.80626 0.863195 9.11626 1.03319 10.0963L2.36319 18.0563C2.60319 19.4763 3.96319 20.6263 5.40319 20.6263H16.6032C18.0332 20.6263 19.4032 19.4663 19.6432 18.0563L20.9732 10.0963C21.1332 9.11626 20.6332 7.80626 19.8632 7.18626L12.9332 1.64626C11.8632 0.786255 10.1332 0.786255 9.07319 1.63626Z"
      stroke={props.color}
      strokeOpacity={0.8}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default HomeIconOutline;
