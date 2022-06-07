import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import {connect} from 'react-redux';
import {Colors, EventColors} from '../utility/Colors';

const Profile = ({user}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.whiteBackground,
        justifyContent: 'space-evenly',
      }}
      edges={['top', 'left', 'right']}>
      <View>
        <View
          style={{
            borderWidth: 2,
            width: '18%',
            aspectRatio: 1,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginVertical: 20,
            backgroundColor: EventColors.green,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 21, color: Colors.black}}>
            {user.name.charAt(0)}
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginHorizontal: 15}}>
          <View
            style={[
              styles.counterContainer,
              {
                marginRight: 15,
              },
            ]}>
            <Text style={styles.number}>5</Text>
            <Text style={styles.title}>Created Events</Text>
          </View>
          <View style={styles.counterContainer}>
            <Text style={styles.number}>11</Text>
            <Text style={styles.title}>Applied Events</Text>
          </View>
        </View>
      </View>

      <View>
        <View style={styles.view}>
          <Text style={styles.title}>Name: </Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.title}>Surname: </Text>
          <Text style={styles.value}>{user.surname}</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.title}>Email: </Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.title}>Password: </Text>
          <Text style={styles.value}>**********</Text>
        </View>
      </View>
      <Pressable style={styles.button}>
        <Text
          style={{
            fontWeight: 'bold',
            color: Colors.whiteBackground,
            fontSize: 18,
          }}>
          LOGOUT
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  counterContainer: {flex: 1, alignItems: 'center', marginBottom: 20},
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 5,
    backgroundColor: '#e6f0fc',
  },
  title: {
    fontSize: 20,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  number: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: EventColors.pink,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 15,
  },
});

const mapStateToProps = state => ({
  user: state.auth.data,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
