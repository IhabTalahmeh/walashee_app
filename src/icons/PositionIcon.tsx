import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  size?: number;
}

const PositionIcon = ({ size = 22, ...props }: Props) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <Path
      d="M6.7508 21H14.7508C18.7708 21 19.4908 19.39 19.7008 17.43L20.4508 9.43C20.7208 6.99 20.0208 5 15.7508 5H5.7508C1.4808 5 0.780803 6.99 1.0508 9.43L1.8008 17.43C2.0108 19.39 2.7308 21 6.7508 21Z"
      stroke={props.color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.75098 5V4.2C6.75098 2.43 6.75098 1 9.95098 1H11.551C14.751 1 14.751 2.43 14.751 4.2V5"
      stroke={props.color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.751 12V13C12.751 13.01 12.751 13.01 12.751 13.02C12.751 14.11 12.741 15 10.751 15C8.77098 15 8.75098 14.12 8.75098 13.03V12C8.75098 11 8.75098 11 9.75098 11H11.751C12.751 11 12.751 11 12.751 12Z"
      stroke={props.color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.401 10C18.091 11.68 15.451 12.68 12.751 13.02"
      stroke={props.color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1.37109 10.2695C3.62109 11.8095 6.16109 12.7395 8.75109 13.0295"
      stroke={props.color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default PositionIcon;
