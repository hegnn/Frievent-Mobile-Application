import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import FormInput from '../Components/FormInput';
import {connect} from 'react-redux';
import {signUp} from '../redux/actions/auth';
import {Colors, EventColors} from '../utility/Colors';
import Logo from '../Assets/Logo.png';

const Register = ({navigation, signUp}) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
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
          email: '',
          password: '',
          repassword: '',
          name: '',
          surname: '',
        }}
        onSubmit={values => signUp(values)}>
        {({values, handleChange, handleSubmit}) => {
          return (
            <View style={{paddingHorizontal: 20}}>
              <FormInput
                placeholder={'Username / Email'}
                value={values.email}
                onChangeText={handleChange('email')}
                title="Email"
                autoCapitalize={false}
              />
              <FormInput
                placeholder={'Name'}
                containerStyle={styles.inputContainer}
                value={values.name}
                onChangeText={handleChange('name')}
                inputStyle={styles.input}
                title="Name"
              />
              <FormInput
                placeholder={'Surname'}
                containerStyle={styles.inputContainer}
                value={values.surname}
                onChangeText={handleChange('surname')}
                inputStyle={styles.input}
                title="Surname"
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
              <FormInput
                placeholder={'Confirm Password'}
                hidePassword={hidePassword}
                setHidePassword={() => setHidePassword(!hidePassword)}
                containerStyle={styles.inputContainer}
                value={values.repassword}
                onChangeText={handleChange('repassword')}
                inputStyle={styles.input}
                title="Confirm Password"
                autoCapitalize={false}
              />
              <Pressable style={styles.signInButton} onPress={handleSubmit}>
                <Text style={{color: Colors.whiteBackground}}> REGISTER </Text>
              </Pressable>
              <Pressable
                style={styles.signUpButton}
                onPress={() => navigation.navigate('Login')}>
                <Text style={{color: EventColors.green}}> LOGIN </Text>
              </Pressable>
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  data: state.data,
});

const mapDispatchToProps = dispatch => ({
  signUp: payload => dispatch(signUp(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteBackground,
    flex: 1,
    justifyContent: 'center',
  },
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
