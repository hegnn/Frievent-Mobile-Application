import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  Pressable,
  Animated,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getStatusColor} from '../utility/helper';
import {Colors} from '../utility/Colors';
import {connect} from 'react-redux';
import {
  getAppliedEvents,
  getCreatedEvents,
  getPastEvents,
} from '../redux/actions/events';
import {ScreenSize} from '../utility/Consts';
import Tabs from '../Components/Tabs';
import Event from '../Components/Event';
import {hideTabbar} from '../redux/actions/common';
import Loader from '../Components/Loader';

const data = [
  {title: 'Upcoming', ref: createRef()},
  {title: 'Created', ref: createRef()},
  {title: 'Past', ref: createRef()},
];

const Home = ({
  navigation,
  getCreatedEvents,
  createdEvents,
  getAppliedEvents,
  appliedEvents,
  getPastEvents,
  pastEvents,
  user,
  hideTabbar,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef();
  const onItemPress = useCallback(itemIndex => {
    ref?.current?.scrollTo({
      x: itemIndex * ScreenSize.width,
    });
  });

  const [allCreatedEvents, setAllCreatedEvents] = useState([]);
  const [allAppliedEvents, setAllAppliedEvents] = useState([]);
  const [allPastEvents, setAllPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      // await hideTabbar(true);
      const appliedEventList = await getAppliedEvents({offset: 0});
      await setAllAppliedEvents(appliedEventList.data);
      const createdEventList = await getCreatedEvents({offset: 0});
      await setAllCreatedEvents(createdEventList.data);
      const pastEventList = await getPastEvents({offset: 0});
      await setAllPastEvents(pastEventList.data);
      setTimeout(() => {
        setLoading(false);
        hideTabbar(false);
      }, 3000);
    };
    get();
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: Colors.whiteBackground}}
      edges={['top', 'left', 'right']}>
      <>
        <View style={{paddingHorizontal: 20, marginBottom: 30}}>
          <Text style={{fontSize: 18, fontWeight: '500', marginBottom: 18}}>
            Hey, {user.name}!
          </Text>
          <Text style={{fontSize: 22, fontWeight: '600', marginBottom: 5}}>
            Check your
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 22, fontWeight: '700'}}>
              Meetings Details
            </Text>
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: Colors.black,
                borderRadius: 40,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 7,
                paddingHorizontal: 12,
              }}
              onPress={() => navigation.navigate('CreateEvent')}>
              <Text>CREATE</Text>
            </Pressable>
          </View>
        </View>
        <Tabs data={data} scrollX={scrollX} onItemPress={onItemPress} />
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
        ) : (
          <Animated.ScrollView
            ref={ref}
            key={(item, index) => index}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}>
            <View style={{width: ScreenSize.width}}>
              {appliedEvents.data.length > 0 ? (
                <FlatList
                  data={allAppliedEvents}
                  contentContainerStyle={{
                    paddingHorizontal: 15,
                    paddingBottom: 15,
                  }}
                  renderItem={({item}) => (
                    <Event item={item} user={user} navigation={navigation} />
                  )}
                  onEndReached={async () => {
                    const eventList =
                      appliedEvents.hasMore &&
                      (await getAppliedEvents({
                        offset: allAppliedEvents.length,
                      }));
                    eventList &&
                      setAllAppliedEvents([
                        ...allAppliedEvents,
                        ...eventList.data,
                      ]);
                  }}
                />
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text style={{fontSize: 20}}>
                    You don't have applied event.
                  </Text>
                </View>
              )}
            </View>

            <View style={{width: ScreenSize.width}}>
              {createdEvents.data.length > 0 ? (
                <FlatList
                  data={allCreatedEvents}
                  contentContainerStyle={{
                    paddingHorizontal: 15,
                    paddingBottom: 15,
                  }}
                  renderItem={({item}) => (
                    <Event item={item} user={user} navigation={navigation} />
                  )}
                  onEndReached={async () => {
                    const eventList =
                      createdEvents.hasMore &&
                      (await getCreatedEvents({
                        offset: allCreatedEvents.length,
                      }));
                    eventList &&
                      setAllCreatedEvents([
                        ...allCreatedEvents,
                        ...eventList.data,
                      ]);
                  }}
                />
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text style={{fontSize: 20}}>
                    You don't have created event.
                  </Text>
                </View>
              )}
            </View>

            <View style={{width: ScreenSize.width}}>
              {pastEvents.data.length > 0 ? (
                <FlatList
                  data={allPastEvents}
                  contentContainerStyle={{
                    paddingHorizontal: 15,
                    paddingBottom: 15,
                  }}
                  renderItem={({item}) => (
                    <Event item={item} user={user} navigation={navigation} />
                  )}
                  onEndReached={async () => {
                    const eventList =
                      pastEvents.hasMore &&
                      (await getPastEvents({offset: allPastEvents.length}));
                    eventList &&
                      setAllPastEvents([...allPastEvents, ...eventList.data]);
                  }}
                />
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 20}}>You don't have past event.</Text>
                </View>
              )}
            </View>
          </Animated.ScrollView>
        )}
      </>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  user: state.auth.data,
  createdEvents: state.events.createdEvents,
  appliedEvents: state.events.appliedEvents,
  pastEvents: state.events.pastEvents,
});

const mapDispatchToProps = dispatch => ({
  getCreatedEvents: payload => dispatch(getCreatedEvents(payload)),
  getAppliedEvents: payload => dispatch(getAppliedEvents(payload)),
  getPastEvents: payload => dispatch(getPastEvents(payload)),
  hideTabbar: payload => dispatch(hideTabbar(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
