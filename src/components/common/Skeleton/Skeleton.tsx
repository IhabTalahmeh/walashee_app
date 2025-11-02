import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, StyleProp, ViewStyle, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface SkeletonProps {
  style?: StyleProp<ViewStyle>;
}

const Skeleton: React.FC<SkeletonProps> = ({ style }) => {
  const screenWidth = Dimensions.get('window').width;
  const animatedValue = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: -1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const flattenStyle = StyleSheet.flatten(style) || {};
  const { height = 20, width = '100%', borderRadius = 4 } = flattenStyle;
  const calculatedWidth = typeof width === 'number' ? width : screenWidth;
  const translateX = animatedValue.interpolate({
    inputRange: [-1, 1],
    outputRange: [-calculatedWidth, calculatedWidth],
  });

  return (
    <View style={[styles.skeletonContainer, { height, width: calculatedWidth, borderRadius }, style]}>
      <View style={[styles.skeleton, { height, width: '100%', borderRadius }]}>
        <Animated.View style={{ ...StyleSheet.absoluteFillObject, transform: [{ translateX }] }}>
          <LinearGradient
            colors={['#cccccc', '#dddddd', '#cccccc']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ width: '150%', height: '100%' }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    overflow: 'hidden',
  },
  skeleton: {
    backgroundColor: '#cccccc',
  },
});

export default Skeleton;
