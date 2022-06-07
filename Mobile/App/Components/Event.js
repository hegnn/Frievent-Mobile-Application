import {
  Pressable,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../utility/Colors';

const Event = ({item, navigation, user, joinEvent}) => {
  const date = new Date(item.date);
  const fullDate = `${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}`;
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const time = `${date.getHours()}:${minutes}`;

  const isParticipant = item.participants.find(
    innerItem => innerItem.userId == user._id,
  );

  const isCreator = item.ownerId === user._id;
  return (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate('EventDetailScreen', {item: item})}>
      <View
        style={{
          backgroundColor: item.color ? item.color : '#f2f8ff',
          marginVertical: 5,
          padding: 10,
          flexDirection: 'row',
          borderRadius: 10,
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 7,
            }}>
            <Text style={{color: '#141414', fontSize: 13, opacity: 0.7}}>
              {fullDate} | {time}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: '#141414',
                opacity: 0.7,
              }}>
              {item.location}
            </Text>
          </View>
          <View
            style={{
              marginBottom: 7,
            }}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={{fontSize: 20, fontWeight: 'bold', color: '#141414'}}>
              {item.title}
            </Text>
          </View>

          <Text numberOfLines={1} style={{color: '#141414', opacity: 0.6}}>
            {item.description}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View />
            <Pressable
              disabled={isCreator}
              style={[
                styles.joinButton,
                {opacity: isCreator ? 0 : isParticipant ? 0.4 : 1},
              ]}
              onPress={() => joinEvent && joinEvent()}>
              <Text>Join</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Event;

const styles = StyleSheet.create({
  joinButton: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: Colors.whiteBackground,
  },
});
