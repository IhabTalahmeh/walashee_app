import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetProps } from 'src/types/props/BottomSheetProps';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';

// Define the component with memo and forwardRef
const CustomBottomSheet = forwardRef(({
    snapPoints,
    content,
    startIndex,
    panDownToClose = true,
    showIndicator = true,
    title,
    curvey = true,
    backgroundColor = 'white',
}: BottomSheetProps, ref: any) => {

    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);

    // Memoize the backdrop render function
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );

    return (
        <BottomSheetModal
            handleComponent={showIndicator ? undefined : null}
            backgroundStyle={[
                curvey === false ? { 
                    borderTopRightRadius: 0, 
                    borderTopLeftRadius: 0,
                    backgroundColor: backgroundColor,
                } : {
                    backgroundColor: backgroundColor,
                }
            ]}
            ref={ref}
            index={startIndex}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose={panDownToClose}
        >
            {title && <View style={styles.titleContainer}><Text style={styles.titleText}>{title}</Text></View>}
            {content}
        </BottomSheetModal>
    );
});

// Styles for the component
const styles = StyleSheet.create({

});

// Memoize the component for better performance
export default memo(CustomBottomSheet);
