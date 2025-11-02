import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  size?: number;
}

const SearchIconOutline = ({ size = 22, ...props }: Props) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <Path
      d="M10.5 20C15.7467 20 20 15.7467 20 10.5C20 5.25329 15.7467 1 10.5 1C5.25329 1 1 5.25329 1 10.5C1 15.7467 5.25329 20 10.5 20Z"
      stroke={props.color}
      strokeOpacity={0.8}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 21L19 19"
      stroke={props.color}
      strokeOpacity={0.8}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SearchIconOutline;
