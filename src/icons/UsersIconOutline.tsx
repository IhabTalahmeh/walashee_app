import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface UsersIconProps extends SvgProps {
  size?: number;
}

const UsersIconOutline = ({ size = 22, ...props }: UsersIconProps) => (
  <Svg
    width={size}
    height={(size * 20) / 22}
    viewBox="0 0 22 20"
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.842 12.957C11.531 12.957 14.684 13.516 14.684 15.749C14.684 17.982 11.552 18.557 7.842 18.557C4.152 18.557 1 18.003 1 15.769C1 13.535 4.131 12.957 7.842 12.957Z"
      stroke={props.color}
      strokeOpacity={0.7}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.84205 9.77C5.42005 9.77 3.45605 7.807 3.45605 5.385C3.45605 2.963 5.42005 1 7.84205 1C10.2631 1 12.2271 2.963 12.2271 5.385C12.2361 7.798 10.2861 9.761 7.87305 9.77H7.84205Z"
      stroke={props.color}
      strokeOpacity={0.7}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.7334 8.63226C16.3344 8.40726 17.5674 7.03326 17.5704 5.37026C17.5704 3.73126 16.3754 2.37126 14.8084 2.11426"
      stroke={props.color}
      strokeOpacity={0.7}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.8457 12.4824C18.3967 12.7134 19.4797 13.2574 19.4797 14.3774C19.4797 15.1484 18.9697 15.6484 18.1457 15.9614"
      stroke={props.color}
      strokeOpacity={0.7}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default UsersIconOutline;
