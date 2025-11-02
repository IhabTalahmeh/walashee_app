import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
    size?: number;
}

const CalcIcon = ({ size = 22, ...props }: Props) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        {...props}
    >
        <Path
            d="M15.8571 1V30.7143M1 15.8571H30.7143M5.57143 8.42857H11.2857M21 8.42857H25.5714M21 21H25.5714M21 25.5714H25.5714M8.42857 5.57143V11.2857M6.00571 20.8629L10.8514 25.7086M10.8514 20.8629L6.00571 25.7086M26.1429 1H5.57143C4.35901 1 3.19625 1.48163 2.33894 2.33894C1.48163 3.19625 1 4.35901 1 5.57143V26.1429C1 27.3553 1.48163 28.518 2.33894 29.3753C3.19625 30.2327 4.35901 30.7143 5.57143 30.7143H26.1429C27.3553 30.7143 28.518 30.2327 29.3753 29.3753C30.2327 28.518 30.7143 27.3553 30.7143 26.1429V5.57143C30.7143 4.35901 30.2327 3.19625 29.3753 2.33894C28.518 1.48163 27.3553 1 26.1429 1Z"
            stroke={props.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
export default CalcIcon;
