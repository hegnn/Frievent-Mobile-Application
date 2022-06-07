import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {connect} from 'react-redux';
import Event from '../Components/Event';
import {getEvents, joinEvent} from '../redux/actions/events';
import {Colors, EventColors} from '../utility/Colors';
import BottomSheet from '@gorhom/bottom-sheet';

const Events = ({navigation, getEvents, events, user, joinEvent}) => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState('date');
  const [sortValue, setSortValue] = useState(-1);
  const sortArray = [
    {key: '_id', value: 1},
    {key: '_id', value: -1},
    {key: 'date', value: 1},
    {key: 'date', value: -1},
  ];

  const sortingSheetRef = useRef(null);
  const filterSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['40%'], []);

  useEffect(() => {
    const get = async () => {
      const eventList = await getEvents({offset: 0, sortKey, sortValue});
      await setAllEvents(eventList.data);
      await setLoading(false);
    };
    get();
  }, []);

  const getSortText = item => {
    switch (true) {
      case item.key == '_id' && item.value == 1:
        return 'By Creation Date (Newest First)';
      case item.key == '_id' && item.value == -1:
        return 'By Creation Date (Oldest First)';
      case item.key == 'date' && item.value == 1:
        return 'By Date (Newest First)';
      case item.key == 'date' && item.value == -1:
        return 'By Date (Oldest First)';
    }
  };

  const renderItem = ({item}) => {
    const isParticipant = item.participants.find(
      innerItem => innerItem.userId == user._id,
    );

    const isCreator = item.ownerId === user._id;

    const join = async () => {
      if (!isCreator && !isParticipant) {
        setLoading(true);
        await joinEvent({eventId: item._id, user: user._id});
        const newEvents =
          !events.joinEvent.error &&
          (await getEvents({offset: 0, sortKey, sortValue}));
        newEvents && setAllEvents(newEvents.data);
        setLoading(false);
      }
    };

    return (
      <Event item={item} navigation={navigation} user={user} joinEvent={join} />
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.whiteBackground}}>
      <BottomSheet
        ref={sortingSheetRef}
        index={-1}
        enablePanDownToClose
        containerStyle={{
          zIndex: 99999,
        }}
        backgroundStyle={{
          backgroundColor: '#F0F0F0',
        }}
        snapPoints={snapPoints}>
        <ScrollView>
          {sortArray.map(item => (
            <>
              <Pressable
                style={{
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                  backgroundColor:
                    sortKey === item.key && sortValue === item.value
                      ? EventColors.green
                      : '#F0F0F0',
                }}
                onPress={async () => {
                  await setSortKey(item.key);
                  await setSortValue(item.value);
                  await setLoading(true);
                  await sortingSheetRef?.current?.close();
                  await setAllEvents([]);
                  const eventList = await getEvents({
                    offset: 0,
                    sortKey: item.key,
                    sortValue: item.value,
                  });
                  await setAllEvents(eventList.data);
                  await setLoading(false);
                }}>
                <Text>{getSortText(item)}</Text>
              </Pressable>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 1,
                  backgroundColor: 'white',
                  paddingHorizontal: 20,
                }}
              />
            </>
          ))}
        </ScrollView>
      </BottomSheet>
      <BottomSheet
        ref={filterSheetRef}
        index={-1}
        enablePanDownToClose
        containerStyle={{
          zIndex: 99999,
        }}
        backgroundStyle={{
          backgroundColor: '#F0F0F0',
        }}
        snapPoints={snapPoints}>
        <View></View>
      </BottomSheet>

      {loading ? (
        <View style={{flex: 1, backgroundColor: 'red'}}>
          <Text>LOADING</Text>
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 15,
            }}>
            <Pressable
              style={[
                styles.sortAndFilterButton,
                {
                  marginRight: 15,
                },
              ]}
              onPress={() => sortingSheetRef.current?.snapToIndex(0)}>
              <Text style={styles.sortAndFilterTitle}> SORT </Text>
            </Pressable>
            <Pressable
              style={styles.sortAndFilterButton}
              onPress={() => filterSheetRef.current?.snapToIndex(0)}>
              <Text style={styles.sortAndFilterTitle}> FILTER </Text>
            </Pressable>
          </View>
          <FlatList
            data={allEvents}
            renderItem={renderItem}
            contentContainerStyle={{padding: 15}}
            onEndReached={async () => {
              const eventList =
                events.events.hasMore &&
                (await getEvents({
                  offset: allEvents.length,
                  sortKey,
                  sortValue,
                }));
              eventList && setAllEvents([...allEvents, ...eventList.data]);
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sortAndFilterButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  sortAndFilterTitle: {
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 2,
  },
});

const mapStateToProps = state => ({
  user: state.auth.data,
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  getEvents: payload => dispatch(getEvents(payload)),
  joinEvent: payload => dispatch(joinEvent(payload)),
  getCategories: () => dispatch(getCategories()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Events);
