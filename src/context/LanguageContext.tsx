import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { I18nManager, Platform } from 'react-native';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import ar from '../../locales/ar.json';
import en from '../../locales/en.json';

const isIOS = Platform.OS == 'ios';

interface LanguageContextProps {
    language: string;
    changeLanguage: (lng: string) => void;
    isArabic: boolean;
}

export const LanguageContext = createContext<LanguageContextProps>({
    language: 'en',
    changeLanguage: () => { },
    isArabic: false,
});

export const languageResources = {
    en: { translation: en },
    ar: { translation: ar },
    // Add more languages here
};

i18next.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: languageResources,
});

const LANGUAGE_KEY = 'APP_LANGUAGE';

const setLayoutDirection = (language: string) => {
    const isRTL = ['ar'].includes(language);
    I18nManager.allowRTL(false);
    if (isRTL) {
        I18nManager.forceRTL(true);
    } else {
        I18nManager.forceRTL(false);
    }

};

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<string>(i18next.language);

    const isArabic = useMemo(() => {
        return language === 'ar';
    }, [language]);

    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
                if (storedLanguage) {
                    setLanguage(storedLanguage);
                    setLayoutDirection(storedLanguage);
                    i18next.changeLanguage(storedLanguage);
                } else {
                    const lang = 'en';
                    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
                    setLanguage(lang);
                    setLayoutDirection(lang);
                    i18next.changeLanguage(lang);
                }
            } catch (error) {
                console.error('Failed to load language', error);
            }
        };

        loadLanguage();
    }, []);

    const changeLanguage = async (lng: string) => {
        setLayoutDirection(lng);
        await AsyncStorage.setItem(LANGUAGE_KEY, lng);
        if (Platform.OS == 'ios') {
            setLanguage(lng);
            i18next.changeLanguage(lng);
        }
        RNRestart.Restart();
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, isArabic }}>
            {children}
        </LanguageContext.Provider>
    );
};
