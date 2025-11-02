import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  size?: number;
}

const ExperienceIcon = ({ size = 22, ...props }: Props) => (
  <Svg
    width={size}
    height={(size * 20) / 22}
    viewBox="0 0 16 22"
    fill='none'
    {...props}
  >
    <Path
      d="M6.8672 12.7934L4.10742 13.1725L6.1079 14.953L5.62794 17.4917L8.10742 16.2929L10.5869 17.4927L10.1069 14.9539L12.1074 13.1735L9.34764 12.7943L8.10742 10.4927L6.8672 12.7934Z"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.1168 6.87884C7.18522 6.87051 6.26122 7.0468 5.39815 7.39753C4.53508 7.74827 3.75003 8.26649 3.08834 8.92229C2.42665 9.57809 1.90142 10.3585 1.54298 11.2184C1.18455 12.0783 1 13.0007 1 13.9323C1 14.8639 1.18455 15.7863 1.54298 16.6462C1.90142 17.5061 2.42665 18.2865 3.08834 18.9423C3.75003 19.5981 4.53508 20.1163 5.39815 20.467C6.26122 20.8177 7.18522 20.994 8.1168 20.9857C9.97656 20.9691 11.7545 20.2186 13.0637 18.8976C14.3729 17.5767 15.1074 15.7921 15.1074 13.9323C15.1074 12.0724 14.3729 10.2879 13.0637 8.9669C11.7545 7.64594 9.97656 6.89548 8.1168 6.87884ZM8.1168 6.87884C9.35562 6.88096 10.572 7.20873 11.6437 7.83025V1H4.58995V7.83025C5.66157 7.20873 6.87798 6.88096 8.1168 6.87884Z"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ExperienceIcon;
