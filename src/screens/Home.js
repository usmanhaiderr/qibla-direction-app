import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Compass from '../components/Compass';
import Header from '../components/Header';

const Home = () => {
  return (
    <View style={styles.contianer}>
      <Header  />
      <Compass />
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default Home;
