import faker from 'faker';
import Constants from 'expo-constants';
import axios from 'axios';

export const fakeCoffeeShops = (() => {
    let data = [];

    for(let i=0; i<=12; i++) {
        data.push({
            id: faker.random.uuid(),
            image_url: faker.image.imageUrl(),
            name: faker.company.companyName()
        });
    }

    return data;
})();

export const fakeLocation = {
    latitude: '37.786882',
    longitude: '-122.399972'
}

export const api = axios.create({
    baseURL: 'https://api.yelp.com/v3',
    headers: {
      Authorization: `Bearer ${Constants.manifest.extra.yelpApiKey}`
    }
})