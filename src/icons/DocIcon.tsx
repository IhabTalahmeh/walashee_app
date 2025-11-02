import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
    size?: number;
}

const DocIcon = ({ size = 22, ...props }: Props) => (
    <Svg
        width={size}
        height={size}
        viewBox="2 2 21.33 26.67"
        fill="none"
        {...props}
    >
        <Path
            d="M22 2H3.33333C2.59695 2 2 2.59695 2 3.33333V27.3333C2 28.0697 2.59695 28.6667 3.33333 28.6667H22C22.7364 28.6667 23.3333 28.0697 23.3333 27.3333V3.33333C23.3333 2.59695 22.7364 2 22 2Z"
            fill="transparent"
            fillOpacity={0.15}
            stroke={props.color}
            strokeWidth={2.66667}
            strokeLinejoin="round"
        />
        <Path
            d="M10.6667 8.66602H18.6667"
            stroke={props.color}
            strokeWidth={2.66667}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M10.6667 15.333H18.6667"
            stroke={props.color}
            strokeWidth={2.66667}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M10.6667 22H18.6667"
            stroke={props.color}
            strokeWidth={2.66667}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.66668 9.99967C7.40308 9.99967 8.00001 9.40274 8.00001 8.66634C8.00001 7.92994 7.40308 7.33301 6.66668 7.33301C5.93028 7.33301 5.33334 7.92994 5.33334 8.66634C5.33334 9.40274 5.93028 9.99967 6.66668 9.99967Z"
            fill={props.color}
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.66668 16.6667C7.40308 16.6667 8.00001 16.0697 8.00001 15.3333C8.00001 14.5969 7.40308 14 6.66668 14C5.93028 14 5.33334 14.5969 5.33334 15.3333C5.33334 16.0697 5.93028 16.6667 6.66668 16.6667Z"
            fill={props.color}
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.66668 23.3327C7.40308 23.3327 8.00001 22.7357 8.00001 21.9993C8.00001 21.2629 7.40308 20.666 6.66668 20.666C5.93028 20.666 5.33334 21.2629 5.33334 21.9993C5.33334 22.7357 5.93028 23.3327 6.66668 23.3327Z"
            fill={props.color}
        />
    </Svg>
);
export default DocIcon;
