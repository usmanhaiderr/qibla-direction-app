import React, {useEffect, useState} from 'react';
import {Dimensions, Image, ImageBackground, Text, Vibration, View} from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import Geolocation from 'react-native-geolocation-service';

const Compass = () => {
  const [compassHeading, setCompassHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  useEffect(() => {
    geoLocation();
    const degree_update_rate = 1;
    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      setCompassHeading(heading);
    });
    return () => CompassHeading.stop();
  }, []);

  useEffect(() => {
    if (compassHeading > 258 && compassHeading < 264) {
        Vibration.vibrate(150)
    }
  }, [compassHeading]);

  const Calculate = (lat, lng) => {
    const PI = Math.PI;
    let latk = (21.4225 * PI) / 180.0;
    let longk = (39.8264 * PI) / 180.0;
    let phi = (lat * PI) / 180.0;
    let lambda = (lng * PI) / 180.0;
    let qiblaD =
      (180.0 / PI) *
      Math.atan2(
        Math.sin(longk - lambda),
        Math.cos(phi) * Math.tan(latk) -
          Math.sin(phi) * Math.cos(longk - lambda),
      );
    setQiblaDirection(qiblaD);
  };

  const geoLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        Calculate(latitude, longitude);
      },
      error => {
        console.log('Error in Geolocation', error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ImageBackground
        source={require('../assets/compass.png')}
        style={{
          width: '100%',
          flex: 0.5,
          resizeMode: 'contain',
          alignSelf: 'center',
          transform: [{rotate: `${360 - compassHeading}deg`}],
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{rotate: `${qiblaDirection}deg`}],
          }}>
          <Image
            source={require('../assets/kabah.png')}
            style={{marginBottom: '45%', resizeMode: 'contain', flex: 0.7}}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Compass;
