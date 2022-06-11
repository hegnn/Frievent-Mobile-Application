import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import FormInput from '../Components/FormInput';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import {getDayName, getMonthName} from '../utility/helper';
import {connect} from 'react-redux';
import {createEvent} from '../redux/actions/events';
import {getCategories} from '../redux/actions/category';
import {Colors, EventColors} from '../utility/Colors';

const CreateEvent = ({
  navigation,
  createEvent,
  user,
  getCategories,
  categories,
}) => {
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await getCategories();
      setLoading(false);
    };
    getData();
  }, []);

  const Divider = () => (
    <View
      style={{
        width: '100%',
        height: 1,
        opacity: 0.1,
        backgroundColor: 'gray',
        marginBottom: 20,
      }}
    />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.whiteBackground}}>
      <Formik
        initialValues={{
          title: '',
          categoryId: '',
          description: '',
          date: new Date(),
          limit: 0,
          location: '',
          color: '',
        }}
        onSubmit={async values => {
          await createEvent({...values, ownerId: user._id});
          await navigation.navigate('HomeScreen');
        }}>
        {({handleSubmit, values, handleChange, setFieldValue}) => {
          return (
            <View style={{paddingHorizontal: 20, flex: 1}}>
              {loading ? (
                <Text> LOADING </Text>
              ) : (
                <>
                  <ScrollView style={{flex: 1}}>
                    <Text style={{opacity: 0.3, marginBottom: 7}}>Title</Text>
                    <TextInput
                      placeholder={'Enter Title'}
                      placeholderTextColor={'black'}
                      style={{
                        backgroundColor: Colors.whiteBackground,
                        flexDirection: 'row',
                        alignItems: 'center',
                        fontSize: 17,
                        flex: 1,
                        height: 40,
                        fontWeight: 'bold',
                      }}
                      value={values.title}
                      onChangeText={handleChange('title')}
                    />
                    <Divider />

                    <Text style={{opacity: 0.3, marginBottom: 7}}>
                      Category
                    </Text>
                    <SelectDropdown
                      data={categories}
                      onSelect={(selectedItem, index) => {
                        setFieldValue('categoryId', selectedItem._id);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.name;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item.name;
                      }}
                      buttonStyle={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: Colors.whiteBackground,
                        height: 40,
                        fontWeight: 'bold',
                        paddingLeft: 0,
                      }}
                      buttonTextStyle={{
                        fontSize: 17,
                        textAlign: 'left',
                        marginLeft: 0,
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                    />
                    <Divider />

                    <Text style={{opacity: 0.3, marginBottom: 7}}>
                      Description
                    </Text>
                    <TextInput
                      placeholder={'Enter Description'}
                      placeholderTextColor={'black'}
                      style={{
                        backgroundColor: Colors.whiteBackground,
                        flexDirection: 'row',
                        alignItems: 'center',
                        fontSize: 17,
                        flex: 1,
                        height: 40,
                        fontWeight: 'bold',
                      }}
                      value={values.description}
                      onChangeText={handleChange('description')}
                    />
                    <Divider />

                    <Text style={{opacity: 0.3, marginBottom: 7}}>
                      Participants Limit
                    </Text>
                    <TextInput
                      placeholder={'Enter Participants Limit'}
                      placeholderTextColor={'black'}
                      style={{
                        backgroundColor: Colors.whiteBackground,
                        flexDirection: 'row',
                        alignItems: 'center',
                        fontSize: 17,
                        flex: 1,
                        height: 40,
                        fontWeight: 'bold',
                      }}
                      keyboardType="numeric"
                      value={values.limit}
                      onChangeText={handleChange('limit')}
                    />
                    <Divider />

                    <Text style={{opacity: 0.3, marginBottom: 7}}>
                      Location
                    </Text>
                    <TextInput
                      placeholder={'Enter Location'}
                      placeholderTextColor={'black'}
                      style={{
                        backgroundColor: Colors.whiteBackground,
                        flexDirection: 'row',
                        alignItems: 'center',
                        fontSize: 17,
                        flex: 1,
                        height: 40,
                        fontWeight: 'bold',
                      }}
                      value={values.location}
                      onChangeText={handleChange('location')}
                    />
                    <Divider />

                    <Text style={{opacity: 0.3, marginBottom: 7}}>
                      Date and Time
                    </Text>
                    <Pressable
                      onPress={() => setDateOpen(true)}
                      style={{
                        height: 40,
                        flex: 1,
                        width: '100%',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        {`${values.date.getDate()} ${getMonthName(
                          values.date.getMonth(),
                        )} ${values.date.getFullYear()} ${getDayName(
                          values.date.getDay(),
                        )}, ${values.date.getHours()}:${values.date.getMinutes()}`}
                      </Text>
                    </Pressable>
                    <Divider />

                    <DatePicker
                      modal
                      minimumDate={new Date()}
                      mode="date"
                      open={dateOpen}
                      date={values.date}
                      onConfirm={async date => {
                        await setFieldValue('date', date);
                        await setDateOpen(false);
                        await setTimeOpen(true);
                      }}
                      onCancel={() => {
                        setDateOpen(false);
                      }}
                    />
                    <DatePicker
                      modal
                      mode="time"
                      open={timeOpen}
                      date={values.date}
                      onConfirm={date => {
                        setTimeOpen(false);
                        setFieldValue('date', date);
                      }}
                      onCancel={() => {
                        setTimeOpen(false);
                      }}
                    />

                    <Text style={{opacity: 0.3, marginBottom: 7}}>
                      Pick Color For Meeting
                    </Text>
                    <ScrollView
                      horizontal
                      contentContainerStyle={{
                        alignItems: 'center',
                        height: 40,
                        flex: 1,
                        width: '100%',
                      }}>
                      {Object.keys(EventColors).map((item, index) => (
                        <Pressable
                          style={{
                            height: 30,
                            aspectRatio: 1,
                            borderRadius: 15,
                            backgroundColor: EventColors[item],
                            marginLeft: index == 0 ? 0 : 5,
                            marginRight:
                              index == Object.keys(EventColors).length - 1
                                ? 0
                                : 5,
                            borderWidth:
                              values.color === EventColors[item] ? 2 : 0,
                          }}
                          onPress={() =>
                            setFieldValue('color', EventColors[item])
                          }
                        />
                      ))}
                    </ScrollView>
                  </ScrollView>
                  <Pressable
                    style={styles.button}
                    onPress={() => handleSubmit()}>
                    <Text
                      style={{
                        color: Colors.whiteBackground,
                        fontWeight: 'bold',
                      }}>
                      Create
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  user: state.auth.data,
  categories: state.categories.data,
});

const mapDispatchToProps = dispatch => ({
  createEvent: payload => dispatch(createEvent(payload)),
  getCategories: () => dispatch(getCategories()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#f2f8ff',
  },
  input: {color: '#272a31'},
  button: {
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginVertical: 5,
  },
});
