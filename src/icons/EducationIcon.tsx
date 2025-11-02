import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  size?: number;
}

const EducationIcon = ({ size = 22, ...props }: Props) => (
  <Svg
    width={size}
    height={(size * 20) / 22}
    viewBox="0 0 22 16"
    fill='none'
    {...props}
  >
    <Path
      d="M21 5L11 1L1 5L11 9L21 5ZM21 5V11"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 6.6001V12.0001C5 12.7957 5.63214 13.5588 6.75736 14.1214C7.88258 14.684 9.4087 15.0001 11 15.0001C12.5913 15.0001 14.1174 14.684 15.2426 14.1214C16.3679 13.5588 17 12.7957 17 12.0001V6.6001"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default EducationIcon;
