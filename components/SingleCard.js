import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import React from 'react';

const SingleCard = ({item, handleChoice, flipped, disabled}) => {
  const windowWidth = Dimensions.get('window').width - 50;

  const rotateToFront = new Animated.Value(0);

  Animated.timing(rotateToFront, {
    toValue: 1,
    duration: 1000,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true, // To make use of native driver for performance
  }).start();

  // // Next, interpolate beginning and end values (in this case 0 and 1)
  const spinToFront = rotateToFront.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const handleClick = () => {
    if (!disabled) handleChoice(item);
  };

  return (
    <View
      key={item.id}
      style={{
        position: 'relative',
        marginTop: 10,
      }}>
      <View
        key={item.id}
        style={{
          width: windowWidth / 4,
          height: windowWidth / 4,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 8,
          marginBottom: 8,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: 'black',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {item.alphabet}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleClick()}
        style={{
          height: windowWidth / 4,
          width: windowWidth / 4,
          backgroundColor: 'black',
          position: 'absolute',
          // transform: [{rotateY: flipped ? spinToFront : '0deg'}],
          transform: [{rotateY: flipped ? '90deg' : '0deg'}],
        }}></TouchableOpacity>
    </View>
  );
};

export default SingleCard;
