import { TouchableOpacityProps } from "react-native";

export interface PrimaryButtonProps extends TouchableOpacityProps {
    text: string;
    textColor?: string;
    variant?: string;
    disabled: boolean;
    isLoading?: boolean;
    bgColor?: string;
    color?: string;
    left?: React.ReactNode;
    right?: React.ReactNode;
}