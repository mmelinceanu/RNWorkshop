import React, { memo, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { fetchShops } from '../data';
import { getLocation } from '../services';

const MapScreen = () => {
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [data, setData] = useState([]);
    useEffect(() => {
        setLoading(true)
        getLocation().then(result => {
            setLocation(result)
            fetchShops(result).then(shops => setData(shops))
        }).finally(() => setLoading(false))
    }, []);
    
    return (
        <View style={{ flex: 1 }}>
        {
            loading && <ActivityIndicator color="purple" size="large" /> ||
            <MapView initialRegion={location} style={styles.mapStyle}>
            {
                data.map((marker, index) =>
                    <Marker
                        key={index}
                        coordinate={marker.coordinates}
                        title={marker.name}
                    >
                        <Callout style={styles.plainView}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ marginBottom: 10 }}>{marker.name}</Text>
                                <Image style={{ width: 100, height: 100 }} source={{ uri: marker.image_url }} />
                            </View>
                        </Callout>
                    </Marker>
                )
            }
            </MapView>
        }
        </View>
    )
}

export default memo(MapScreen)

const styles = StyleSheet.create({
    mapStyle: {
        flex: 1,
    },
});