import * as React from "react";
import Svg, { Path, SvgProps, G } from "react-native-svg";

interface Props extends SvgProps {
  size?: number;
}

const UserIconOutline = ({ size = 22, ...props }: Props) => (
  <Svg
    width={size}
    height={(size * 20) / 22}
    viewBox="0 0 22 20"
    fill="none"
    {...props}
  >
    <G transform="translate(2.5, 0)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.17048 13.5312C4.30286 13.5312 1 14.116 1 16.4579C1 18.7998 4.2819 19.4055 8.17048 19.4055C12.0381 19.4055 15.34 18.8198 15.34 16.4789C15.34 14.1379 12.059 13.5312 8.17048 13.5312Z"
        stroke={props.color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.17044 10.1914C10.7085 10.1914 12.7657 8.13333 12.7657 5.59524C12.7657 3.05714 10.7085 1 8.17044 1C5.63234 1 3.57425 3.05714 3.57425 5.59524C3.56567 8.12476 5.60948 10.1829 8.13806 10.1914H8.17044Z"
        stroke={props.color}
        strokeWidth={1.42857}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default UserIconOutline;
