import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { api, fakeLocation } from './services'
import Deck from './Deck'

const fetchShops = async () => {
  const result = await api.get('/businesses/search', {
    params: {
      categories: 'coffee, coffeeroasteries, coffeeshop',
      ...fakeLocation
    }
  })

  return result.data.businesses
}

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchShops().then(shops => setData(shops))
  }, []);

  console.log(data)

  return (
    <SafeAreaView style={styles.container}>
      <Deck data={data} onSwipeRight={()=> {}} onSwipeLeft={()=> {}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    marginBottom: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
