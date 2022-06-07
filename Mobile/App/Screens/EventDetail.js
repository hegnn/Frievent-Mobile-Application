import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Divider from '../Components/Divider';
import {getDayName, getMonthName} from '../utility/helper';

const EventDetail = ({route}) => {
  const {item} = route.params;
  console.log('EVENT: ', item);

  const date = new Date(item.date);
  console.log(date.getDate());
  return (
    <ScrollView
      style={{backgroundColor: '#f2f8ff', flex: 1}}
      contentContainerStyle={{padding: 10}}>
      <Text style={{fontSize: 25, fontWeight: 'bold', color: '#4766ff'}}>
        {item.title}
      </Text>

      <View style={{paddingVertical: 20}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#272a31'}}>
          {date.getDate()} {getMonthName(date.getMonth())} {date.getFullYear()}{' '}
          | {getDayName(date.getDay())} {date.getHours()}:
          {String(date.getMinutes()).padStart(2, '0')}
        </Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#272a31'}}>
          {item.location}
        </Text>
      </View>

      <Divider />

      <View style={{paddingVertical: 15}}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 'bold',
            color: '#4766ff',
            marginBottom: 15,
          }}>
          Description
        </Text>
        <Text style={{color: '#272a31', fontSize: 15}}>{item.description}</Text>
      </View>

      <Divider />

      <View style={{paddingVertical: 15}}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 'bold',
            color: '#4766ff',
            marginBottom: 15,
          }}>
          Owner
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: 'black',
              borderRadius: 30,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 10,
              color: '#272a31',
            }}>
            {item.owner.name + ' ' + item.owner.surname}
          </Text>
        </View>
      </View>

      <Divider />

      <View style={{paddingVertical: 15}}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 'bold',
            color: '#4766ff',
            marginBottom: 15,
          }}>
          Participants ({item.participants?.length}){' '}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 50, marginRight: 10}}>
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: 'black',
                borderRadius: 30,
              }}
            />
            <Text style={{fontSize: 13, color: '#272a31'}} numberOfLines={1}>
              Ali Emre Deneri
            </Text>
          </View>
          {/* <View style={{width: 50, marginRight: 10}}>
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: 'black',
                borderRadius: 30,
              }}
            />
            <Text style={{fontSize: 13, color: '#272a31'}} numberOfLines={1}>
              {' '}
              Ali Emre Deneri{' '}
            </Text>
          </View>
          <View style={{width: 50, marginRight: 10}}>
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: 'black',
                borderRadius: 30,
              }}
            />
            <Text style={{fontSize: 13, color: '#272a31'}} numberOfLines={1}>
              {' '}
              Ali Emre Deneri{' '}
            </Text>
          </View> */}
        </View>
      </View>

      <Divider />
    </ScrollView>
  );
};

export default EventDetail;
