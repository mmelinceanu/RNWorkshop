import faker from 'faker';
import { api } from './services'

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

export const fetchShops = async (location) => {
    const result = await api.get('/businesses/search', {
        params: {
          categories: 'coffee, coffeeroasteries, coffeeshop',
          ...location,
        }
      })
      
      return result.data.businesses
  }