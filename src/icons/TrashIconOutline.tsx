import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  size?: number;
}

const TrashIconOutline = ({ size = 22, ...props }: Props) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 22 20"
    fill="none"
    {...props}
  >
    <Path
      d="M16.5 3.98405C13.725 3.70905 10.9333 3.56738 8.15 3.56738C6.5 3.56738 4.85 3.65072 3.2 3.81738L1.5 3.98405"
      stroke={props.color}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.08301 3.14199L6.26634 2.05033C6.39967 1.25866 6.49967 0.666992 7.90801 0.666992H10.0913C11.4997 0.666992 11.608 1.29199 11.733 2.05866L11.9163 3.14199"
      stroke={props.color}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.7082 6.61621L14.1665 15.0079C14.0748 16.3162 13.9998 17.3329 11.6748 17.3329H6.32484C3.99984 17.3329 3.92484 16.3162 3.83317 15.0079L3.2915 6.61621"
      stroke={props.color}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.6084 12.75H10.3834"
      stroke={props.color}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.9165 9.41699H11.0832"
      stroke={props.color}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default TrashIconOutline;
