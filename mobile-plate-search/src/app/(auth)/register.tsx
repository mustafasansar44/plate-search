import React, { useState, FormEvent, useRef } from 'react'
import { Alert, StyleSheet, View, AppState, GestureResponderEvent, ScrollView, Text } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { supabase } from '@/lib/supabase'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'
import PhoneInput from 'react-native-phone-input'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

// Type definition for form values
interface RegisterFormValues {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  tcno?: string;
}

// Validation schema
const RegisterSchema = Yup.object().shape({
  first_name: Yup.string()
    .max(16, 'First name must be at most 16 characters')
    .required('First name is required'),
  last_name: Yup.string()
    .max(16, 'Last name must be at most 16 characters')
    .required('Last name is required'),
  username: Yup.string()
    .max(16, 'Username must be at most 16 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email')
    .max(50, 'Email must be at most 50 characters')
    .required('Email is required'),
  password: Yup.string()
    .max(16, 'Password must be at most 16 characters')
    .required('Password is required'),
  phone: Yup.string()
    .required('Phone number is required'),
  tcno: Yup.string() // Optional field
})

export default function RegisterScreen() {
  const [loading, setLoading] = useState<boolean>(false)
  const phoneInputRef = useRef(null)

  const handleSignUp = async (
    values: RegisterFormValues, 
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          first_name: values.first_name,
          last_name: values.last_name,
          username: values.username,
          tcno: values.tcno ?? undefined,
          phone: values.phone
        }
      }
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
    setSubmitting(false)
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <Formik<RegisterFormValues>
          initialValues={{
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            phone: '',
            tcno: ''
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSignUp}
        >
          {(formikProps) => (
            <View>
              <View style={styles.verticallySpaced}>
                <Input
                  label="First Name"
                  leftIcon={{ type: 'font-awesome', name: 'user' }}
                  onChangeText={formikProps.handleChange('first_name')}
                  onBlur={formikProps.handleBlur('first_name')}
                  value={formikProps.values.first_name}
                  placeholder="First Name"
                  errorMessage={formikProps.touched.first_name && formikProps.errors.first_name ? formikProps.errors.first_name : undefined}
                />
              </View>
              <View style={styles.verticallySpaced}>
                <Input
                  label="Last Name"
                  leftIcon={{ type: 'font-awesome', name: 'user' }}
                  onChangeText={formikProps.handleChange('last_name')}
                  onBlur={formikProps.handleBlur('last_name')}
                  value={formikProps.values.last_name}
                  placeholder="Last Name"
                  errorMessage={formikProps.touched.last_name && formikProps.errors.last_name ? formikProps.errors.last_name : undefined}
                />
              </View>
              <View style={styles.verticallySpaced}>
                <Input
                  label="Username"
                  leftIcon={{ type: 'font-awesome', name: 'user' }}
                  onChangeText={formikProps.handleChange('username')}
                  onBlur={formikProps.handleBlur('username')}
                  value={formikProps.values.username}
                  placeholder="Username"
                  errorMessage={formikProps.touched.username && formikProps.errors.username ? formikProps.errors.username : undefined}
                />
              </View>
              <View style={styles.verticallySpaced}>
                <Input
                  label="Email"
                  leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                  onChangeText={formikProps.handleChange('email')}
                  onBlur={formikProps.handleBlur('email')}
                  value={formikProps.values.email}
                  placeholder="email@address.com"
                  autoCapitalize={'none'}
                  errorMessage={formikProps.touched.email && formikProps.errors.email ? formikProps.errors.email : undefined}
                />
              </View>
              <View style={styles.verticallySpaced}>
                <Input
                  label="Password"
                  leftIcon={{ type: 'font-awesome', name: 'lock' }}
                  onChangeText={formikProps.handleChange('password')}
                  onBlur={formikProps.handleBlur('password')}
                  value={formikProps.values.password}
                  secureTextEntry={true}
                  placeholder="Password"
                  autoCapitalize={'none'}
                  errorMessage={formikProps.touched.password && formikProps.errors.password ? formikProps.errors.password : undefined}
                />
              </View>
              <View style={styles.verticallySpaced}>
                <Text style={styles.phoneLabel}>Phone Number</Text>
                <PhoneInput
                  ref={phoneInputRef}
                  initialCountry="tr"
                  style={styles.phoneInput}
                  textStyle={styles.phoneInputText}
                  onChangePhoneNumber={(number) => {
                    formikProps.setFieldValue('phone', number)
                  }}
                />
                {formikProps.touched.phone && formikProps.errors.phone && (
                  <Text style={styles.errorText}>
                    {formikProps.errors.phone}
                  </Text>
                )}
              </View>
              <View style={styles.verticallySpaced}>
                <Input
                  label="TC No (Optional)"
                  leftIcon={{ type: 'font-awesome', name: 'id-card' }}
                  onChangeText={formikProps.handleChange('tcno')}
                  onBlur={formikProps.handleBlur('tcno')}
                  value={formikProps.values.tcno}
                  placeholder="TC No"
                  errorMessage={formikProps.touched.tcno && formikProps.errors.tcno ? formikProps.errors.tcno : undefined}
                />
              </View>
              <View style={styles.verticallySpaced}>
                <Button 
                  title="Sign up" 
                  disabled={loading} 
                  onPress={() => formikProps.handleSubmit()}
                  buttonStyle={{ marginTop: 10 }}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  verticallySpaced: {
    marginBottom: 10
  },
  mt20: {
    marginTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  phoneLabel: {
    marginBottom: 5,
    fontSize: 16,
    color: '#86939e'
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: '#86939e',
    borderRadius: 4,
    height: 50,
    paddingHorizontal: 10
  },
  phoneInputText: {
    fontSize: 16
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5
  }
})