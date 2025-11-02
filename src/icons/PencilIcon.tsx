import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  size?: number;
}

const PencilIcon = ({ size = 22, ...props }: Props) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 17 17"
    fill="none"
    {...props}
  >
    <Path
      d="M9.95605 15.5355H15.9999"
      stroke={props.color}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.14952 1.66233C9.79589 0.889822 10.9578 0.776546 11.7464 1.40978C11.79 1.44413 13.1907 2.53232 13.1907 2.53232C14.057 3.05599 14.3262 4.16925 13.7907 5.01882C13.7622 5.06432 5.8428 14.9704 5.8428 14.9704C5.57932 15.2991 5.17937 15.4931 4.75193 15.4978L1.71912 15.5358L1.03579 12.6436C0.940064 12.2369 1.03579 11.8098 1.29926 11.4811L9.14952 1.66233Z"
      stroke={props.color}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.68359 3.50098L12.2271 6.99025"
      stroke={props.color}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default PencilIcon;
