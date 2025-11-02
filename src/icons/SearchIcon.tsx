import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";


interface Props extends SvgProps {
  size?: number;
}

const SearchIcon = ({ size = 22, ...props }: Props) => (
  <Svg
    width={size}
    height={(size * 20) / 22}
    viewBox="0 0 22 20"
    fill="none"
    {...props}
  >
    <Path
      d="M9.5 19C14.7467 19 19 14.7467 19 9.5C19 4.25329 14.7467 0 9.5 0C4.25329 0 0 4.25329 0 9.5C0 14.7467 4.25329 19 9.5 19Z"
      fill={props.color}
    />
    <Path
      d="M19.3001 19.9996C19.1201 19.9996 18.9401 19.9296 18.8101 19.7996L16.9501 17.9396C16.6801 17.6696 16.6801 17.2296 16.9501 16.9496C17.2201 16.6796 17.6601 16.6796 17.9401 16.9496L19.8001 18.8096C20.0701 19.0796 20.0701 19.5196 19.8001 19.7996C19.6601 19.9296 19.4801 19.9996 19.3001 19.9996Z"
      fill={props.color}
    />
  </Svg>
);
export default SearchIcon;
