import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import FormInput from '../Components/FormInput';
import Loader from '../Components/Loader';
import {signIn} from '../redux/actions/auth';

const Login = ({navigation, auth, signIn}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      {error && (
        <View
          style={{
            backgroundColor: 'red',
            position: 'absolute',
            width: 100,
            height: 50,
            zIndex: 999,
          }}>
          <Text>Hata</Text>
          <Pressable onPress={() => setError(false)}>
            <Text> OK</Text>
          </Pressable>
        </View>
      )}
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
            <View style={{paddingHorizontal: 20}}>
              <FormInput
                placeholder={'Username / Email'}
                containerStyle={styles.inputContainer}
                value={values.email}
                onChangeText={handleChange('email')}
                inputStyle={styles.input}
              />
              <FormInput
                placeholder={'Password'}
                hidePassword={hidePassword}
                setHidePassword={() => setHidePassword(!hidePassword)}
                containerStyle={styles.inputContainer}
                value={values.password}
                onChangeText={handleChange('password')}
                inputStyle={styles.input}
              />
              <Pressable
                style={styles.signInButton}
                onPress={() => {
                  handleSubmit();
                }}>
                <Text style={{color: '#4766ff'}}> SIGN IN </Text>
              </Pressable>
              <Pressable
                style={styles.signUpButton}
                onPress={() => navigation.navigate('Register')}>
                <Text style={{color: '#fccc5e'}}> SIGN UP </Text>
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
    backgroundColor: '#4766ff',
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
    backgroundColor: '#fccc5e',
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
