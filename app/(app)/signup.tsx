import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as yup from 'yup';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

const signUpValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function SignUpScreen() {
  const router = useRouter();

  const handleSignUp = async (values, { setSubmitting, setErrors }) => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, values.email.trim(), values.password.trim());
      Alert.alert('Success', 'Account created!');
      router.replace('/');
    } catch (error) {
      console.error(error);
      setErrors({ email: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up to Warima</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={signUpValidationSchema}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <>
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={!isValid}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.signInLink}>
                Already have an account? <Text style={{ color: '#007AFF'}}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 10 },
  icon: { marginRight: 10 },
  input: { flex: 1, height: 40 },
  errorText: { color: 'red', marginBottom: 10 },
  buttton: { backgroundColor: 'brown', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'green', fontWeight: 'bold' },
  signInLink: { marginTop: 20, textAlign: 'center' },
});
