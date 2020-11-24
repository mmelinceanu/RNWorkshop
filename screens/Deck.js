import React, { memo, useEffect, useState,  } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import Card from '../components/Card';
import { fetchShops } from '../data';
import { getLocation } from '../services';

const Deck = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);
    useEffect(() => {
        setLoading(true)
        getLocation().then(location => fetchShops(location).then(shops => setData(shops)))
        .finally(() => setLoading(false))
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View style={styles.container}>
        {
            loading && <ActivityIndicator color="purple" size="large" /> ||
            (
                data.length === 0 && <View><Text>No coffee shops</Text></View>
                ||
                data.map((item, index) => index < currentIndex && null
                    || <Card key={index} swipeCallback={() => setCurrentIndex(prev => prev + 1)} data={item} animated={index === currentIndex} />
                )
            )
        }
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