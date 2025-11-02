import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  size?: number;
}

const ContactIconOutline = ({ size = 22, ...props }: Props) => (
  <Svg
    width={size}
    height={(size * 20) / 22}
    viewBox="0 0 22 20"
    fill="none"
    {...props}
  >
    <Path
      d="M1.19971 10C1.19971 11.1819 1.4325 12.3522 1.88479 13.4442C2.33708 14.5361 3.00002 15.5282 3.83575 16.364C4.67147 17.1997 5.66363 17.8626 6.75556 18.3149C7.84749 18.7672 9.01781 19 10.1997 19C11.3816 19 12.5519 18.7672 13.6439 18.3149C14.7358 17.8626 15.7279 17.1997 16.5637 16.364C17.3994 15.5282 18.0623 14.5361 18.5146 13.4442C18.9669 12.3522 19.1997 11.1819 19.1997 10C19.1997 7.61305 18.2515 5.32387 16.5637 3.63604C14.8758 1.94821 12.5867 1 10.1997 1C7.81276 1 5.52357 1.94821 3.83575 3.63604C2.14792 5.32387 1.19971 7.61305 1.19971 10Z"
      stroke={props.color}
      strokeOpacity={0.7}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.1997 14V14.01"
      stroke={props.color}
      strokeOpacity={0.7}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.1997 10.9998C10.6495 11.0011 11.0865 10.8508 11.4404 10.5732C11.7942 10.2956 12.0441 9.90676 12.1498 9.46959C12.2554 9.03242 12.2106 8.57241 12.0226 8.16382C11.8347 7.75524 11.5144 7.42195 11.1137 7.21776C10.7159 7.01397 10.2608 6.95079 9.82252 7.03848C9.38422 7.12618 8.98849 7.3596 8.69971 7.70076"
      stroke={props.color}
      strokeOpacity={0.7}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ContactIconOutline;
