import Toast from "react-native-toast-message";


export const showToast = (key: string, color: string) => {
    Toast.show({
        type: color,
        text1: key,
        visibilityTime: 3000,
        position: 'top',
    });
}