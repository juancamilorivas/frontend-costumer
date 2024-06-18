import { View, Text } from 'react-native';
import React from 'react';

const ConsolidateScreen = ({ route }) => {
  const { uid } = route.params; 

  return (
    <View>
      <Text>ConsolidateScreen</Text>
      <Text>UID: {uid}</Text> 
    </View>
  );
}

export default ConsolidateScreen;
