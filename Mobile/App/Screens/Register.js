import { Formik } from "formik";
import React, { useState } from "react";
import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import FormInput from "../Components/FormInput";
import { connect } from "react-redux";
import { signUp } from "../redux/actions/auth";

const Register = ({ navigation, signUp }) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          repassword: "",
          name: "",
          surname: "",
        }}
        onSubmit={(values) => signUp(values)}
        //onSubmit={values => axios.get("http://172.20.10.2:8080/users")
        //.then(res => console.log(res))
        //.catch(err => console.log("errrrrrrr", err))
        //}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <View style={{ paddingHorizontal: 20 }}>
              <FormInput
                placeholder={"Username / Email"}
                containerStyle={styles.inputContainer}
                value={values.email}
                onChangeText={handleChange("email")}
                inputStyle={styles.input}
              />
              <FormInput
                placeholder={"Name"}
                containerStyle={styles.inputContainer}
                value={values.name}
                onChangeText={handleChange("name")}
                inputStyle={styles.input}
              />
              <FormInput
                placeholder={"Surname"}
                containerStyle={styles.inputContainer}
                value={values.surname}
                onChangeText={handleChange("surname")}
                inputStyle={styles.input}
              />
              <FormInput
                placeholder={"Password"}
                hidePassword={hidePassword}
                setHidePassword={() => setHidePassword(!hidePassword)}
                containerStyle={styles.inputContainer}
                value={values.password}
                onChangeText={handleChange("password")}
                inputStyle={styles.input}
              />
              <FormInput
                placeholder={"Confirm Password"}
                hidePassword={hidePassword}
                setHidePassword={() => setHidePassword(!hidePassword)}
                containerStyle={styles.inputContainer}
                value={values.repassword}
                onChangeText={handleChange("repassword")}
                inputStyle={styles.input}
              />
              <Pressable style={styles.signInButton} onPress={handleSubmit}>
                <Text style={{ color: "#4766ff" }}> REGISTER </Text>
              </Pressable>
              <Pressable
                style={styles.signUpButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={{ color: "#fccc5e" }}> LOGIN </Text>
              </Pressable>
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (payload) => dispatch(signUp(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4766ff",
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#f2f8ff",
  },
  input: { color: "#272a31" },
  signInButton: {
    backgroundColor: "#fccc5e",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    marginVertical: 5,
  },
  signUpButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    marginVertical: 5,
  },
});
