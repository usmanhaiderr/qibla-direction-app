import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Ummah</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#34a777',
    height: '8%',
    justifyContent: 'center', alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 5
  },
  text: {
    fontSize: 20,
    color: '#ffffff'
  },
});

export default Header;
