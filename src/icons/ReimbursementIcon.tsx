import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface LockIconProps extends SvgProps {
  size?: number;
}

const ReimbursementIcon = ({ size = 16, ...props }: LockIconProps) => (
  <Svg
    width={size}
    height={(size * 20) / 16}
    viewBox="0 0 19 22"
    fill="none"
    {...props}
  >
    <Path
      d="M4.23 18.7C5.05 17.82 6.3 17.89 7.02 18.85L8.03 20.2C8.84 21.27 10.15 21.27 10.96 20.2L11.97 18.85C12.69 17.89 13.94 17.82 14.76 18.7C16.54 20.6 17.99 19.97 17.99 17.31V6.04C18 2.01 17.06 1 13.28 1H5.72C1.94 1 1 2.01 1 6.04V17.3C1 19.97 2.46 20.59 4.23 18.7Z"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.5 6H13.5"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.5 10H12.5"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ReimbursementIcon;
