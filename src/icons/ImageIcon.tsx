import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  size?: number;
}

const ImageIcon = ({ size = 22, ...props }: Props) => (
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
      d="M19.21 5.899V14.05C19.21 17.07 17.32 19.2 14.3 19.2H5.65C2.63 19.2 0.75 17.07 0.75 14.05V5.899C0.75 2.879 2.64 0.75 5.65 0.75H14.3C17.32 0.75 19.21 2.879 19.21 5.899Z"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.28125 14.4313L4.80925 12.8183C5.34025 12.2553 6.22525 12.2283 6.78925 12.7583C6.80625 12.7753 7.72625 13.7103 7.72625 13.7103C8.28125 14.2753 9.18825 14.2843 9.75325 13.7303C9.79025 13.6943 12.0872 10.9083 12.0872 10.9083C12.6792 10.1893 13.7422 10.0863 14.4622 10.6793C14.5102 10.7193 16.6803 12.9463 16.6803 12.9463"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.31269 7.13291C8.31269 8.10191 7.52769 8.88691 6.55869 8.88691C5.58969 8.88691 4.80469 8.10191 4.80469 7.13291C4.80469 6.16391 5.58969 5.37891 6.55869 5.37891C7.52769 5.37991 8.31269 6.16391 8.31269 7.13291Z"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ImageIcon;
