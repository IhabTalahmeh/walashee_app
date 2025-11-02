import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";


interface Props extends SvgProps {
  size?: number;
}

const RVUsIcon = ({ size = 16, ...props }: Props) => (
  <Svg
    width={size}
    height={(size * 20) / 22}
    viewBox="0 0 22 20"
    fill="none"
    {...props}
  >
    <Path
      d="M20.75 20H0.75C0.34 20 0 19.66 0 19.25C0 18.84 0.34 18.5 0.75 18.5H20.75C21.16 18.5 21.5 18.84 21.5 19.25C21.5 19.66 21.16 20 20.75 20Z"
      fill={props.color}
    />
    <Path
      d="M8.5 2V20H13V2C13 0.9 12.55 0 11.2 0H10.3C8.95 0 8.5 0.9 8.5 2Z"
      fill={props.color}
    />
    <Path
      d="M1.75 8V20H5.75V8C5.75 6.9 5.35 6 4.15 6H3.35C2.15 6 1.75 6.9 1.75 8Z"
      fill={props.color}
    />
    <Path
      d="M15.75 13V20H19.75V13C19.75 11.9 19.35 11 18.15 11H17.35C16.15 11 15.75 11.9 15.75 13Z"
      fill={props.color}
    />
  </Svg>
);
export default RVUsIcon;
