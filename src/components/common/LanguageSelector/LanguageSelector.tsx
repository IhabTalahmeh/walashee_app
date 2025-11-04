import { useContext } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { LanguageContext } from "src/context/LanguageContext";

export const LanguageSelector: React.FC = () => {
    const { changeLanguage } = useContext(LanguageContext);
  
    return (
        <View style={{ flexDirection: 'row', margin: 20 }}>
            <TouchableOpacity onPress={() => changeLanguage('ar')} style={{ marginHorizontal: 10 }}>
                <Text>العربية</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguage('en')} style={{ marginHorizontal: 10 }}>
                <Text>English</Text>
            </TouchableOpacity>
        </View>
    );
  };
  