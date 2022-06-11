import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  LogBox,
  Image,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import FormInput from '../Components/FormInput';
import Loader from '../Components/Loader';
import {signIn} from '../redux/actions/auth';
import {Colors, EventColors} from '../utility/Colors';
import Logo from '../Assets/Logo.png';
import {ScreenSize} from '../utility/Consts';

const Login = ({navigation, auth, signIn}) => {
  LogBox.ignoreAllLogs();
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      {error && (
        <>
          <View
            style={{
              position: 'absolute',
              width: ScreenSize.width,
              height: ScreenSize.height,
              backgroundColor: 'black',
              opacity: 0.6,
              zIndex: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <View
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              zIndex: 3,
              alignSelf: 'center',
              width: '60%',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <Text> Bir Hata Oluştu. </Text>
            <Text> Lütfen Tekrar Deneyin! </Text>
            <Pressable
              onPress={() => setError(false)}
              style={{
                backgroundColor: Colors.black,
                marginTop: 20,
                width: '100%',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
              }}>
              <Text style={{color: Colors.whiteBackground}}>OK</Text>
            </Pressable>
          </View>
        </>
      )}
      <Image
        source={Logo}
        style={{
          height: 200,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <Formik
        initialValues={{
          email: 'hegonen@gmail.com',
          password: '12345678',
        }}
        onSubmit={async values => {
          await setLoading(true);
          await signIn(values);
          await setLoading(false);
          (await auth.error) && setError(true);
        }}>
        {({values, handleChange, handleSubmit}) => {
          return (
            <View
              style={{
                paddingHorizontal: 20,
                flex: 1,
                paddingTop: 50,
              }}>
              <FormInput
                placeholder={'Email'}
                value={values.email}
                onChangeText={handleChange('email')}
                title="Email"
                autoCapitalize={false}
              />

              <FormInput
                placeholder={'Password'}
                hidePassword={hidePassword}
                setHidePassword={() => setHidePassword(!hidePassword)}
                containerStyle={styles.inputContainer}
                value={values.password}
                onChangeText={handleChange('password')}
                inputStyle={styles.input}
                title="Password"
                autoCapitalize={false}
              />
              <Pressable
                style={styles.signInButton}
                onPress={() => {
                  handleSubmit();
                }}>
                <Text style={{color: Colors.whiteBackground}}> SIGN IN </Text>
              </Pressable>
              <Pressable
                style={styles.signUpButton}
                onPress={() => navigation.navigate('Register')}>
                <Text style={{color: EventColors.green}}> SIGN UP </Text>
              </Pressable>
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  signIn: payload => dispatch(signIn(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteBackground,
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#f2f8ff',
  },
  input: {color: '#272a31'},
  signInButton: {
    backgroundColor: EventColors.green,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginVertical: 5,
  },
  signUpButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginVertical: 5,
  },
});
