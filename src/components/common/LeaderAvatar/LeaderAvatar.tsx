import { View } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import UserAvatar from '../UserAvatar/UserAvatar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
    uri?: string;
}

export default function LeaderAvatar({ uri }: Props) {
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <UserAvatar size={25} uri={uri} />
            <View style={{ position: 'absolute', bottom: -2, right: -2, borderRadius: 100, backgroundColor: 'white', padding: 1 }}>
                <FontAwesome name='star' color='black' size={10} />
            </View>
        </View>
    )
}