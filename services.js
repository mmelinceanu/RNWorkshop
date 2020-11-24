import Constants from 'expo-constants';
import axios from 'axios';
import * as Location from 'expo-location';

const locationDelta = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export const api = axios.create({
    baseURL: 'https://api.yelp.com/v3',
    headers: {
      Authorization: `Bearer ${Constants.manifest.extra.yelpApiKey}`
    }
})

export const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync()
    if (status !== 'granted') {
      return new Promise.reject('Permission to access location was denied')
    }

    let { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    })

    return ({ ...coords, ...locationDelta })
}