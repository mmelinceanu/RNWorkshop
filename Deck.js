import React, { memo, useRef, useState, useCallback, useMemo } from 'react';
import { StyleSheet, View, Animated, PanResponder, Dimensions } from 'react-native';
import Shop from './Shop'

const SCREEN_WIDTH = Dimensions.get('window').width 
const SWIPE_THRESHOLD = 125;
const DURATION = 500;

const Deck = ({ data, onSwipeRight, onSwipeLeft }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const position = useRef(new Animated.ValueXY()).current

    const swipeCallback = useCallback(() => {
        setCurrentIndex(prev => prev + 1);
        position.setValue({ x: 0, y: 0 });
    }, [position])

    const forceSwipe = useCallback((direction, onSwipeComplete) => {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

        Animated.timing(position, {
            toValue: { x, y: 0 },
            duration: DURATION,
            useNativeDriver: true
        }).start(() => onSwipeComplete(direction))
    }, [position])

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                position.setOffset({
                    x: position.x._value,
                    y: position.y._value,
                })
            },
            onPanResponderMove: (_, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    forceSwipe('right', swipeCallback)
                    console.log('right')
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    forceSwipe('left', swipeCallback)
                    console.log('left')
                } else {
                    Animated.spring(position, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: true
                    }).start(() => position.setValue({ x: 0, y: 0 }))
                }
            },
        })
    ).current

    const cardStyle = useMemo(() => {
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg'],
        })

        return {
            transform: [...position.getTranslateTransform(), { rotate }],
        }
    }, [position])

    return (
        <View style={styles.container}>    
            {data.map((item, index) =>
                index < currentIndex ? null
                :
                index === currentIndex &&
                <Animated.View style={cardStyle} {...panResponder.panHandlers}>
                    <Shop {...item} />
                </Animated.View>
                || <Shop {...item} />
            )}
        </View>
    )
}

export default memo(Deck);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});