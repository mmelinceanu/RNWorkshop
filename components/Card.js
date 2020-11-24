import React, { memo, useRef, useCallback, useMemo } from 'react'
import { Animated, PanResponder, Dimensions } from 'react-native';
import Shop from './Shop'

const SCREEN_WIDTH = Dimensions.get('window').width 
const SWIPE_THRESHOLD = 125;
const DURATION = 500;

const Card = ({ animated = false, data, swipeCallback }) => {
    const position = useRef(new Animated.ValueXY()).current

    const swipeReset = useCallback(() => {
        position.setValue({ x: 0, y: 0 });
        swipeCallback();
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
                    forceSwipe('right', swipeReset)
                    console.log('right')
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    forceSwipe('left', swipeReset)
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
        <Animated.View style={animated && cardStyle} {...(animated && panResponder.panHandlers || {})}>
            <Shop {...data} />
        </Animated.View>
    )
}

export default memo(Card)