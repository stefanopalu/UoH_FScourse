import Text from './Text';
import { TextInput, StyleSheet, Pressable, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';

const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(8, 'Username must have at least 8 characters')
      .required('Username is required'),
    password: yup
      .string()
      .min(8, 'Password must have at least 8 characters')
      .required('Password is required'),
  });
  
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: 'white',
      borderRadius: 8,
      marginBottom: 3,
    },
    input: {
      marginBottom: 12, 
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
    },
    buttonShape: {
      paddingVertical: 10,
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: theme.fontSizes.body,
      fontWeight: theme.fontWeights.bold,
      textAlign: 'center',
    },
  });
  
  const SignIn = ({ onSubmit }) => {
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });
  
    return (
      <View style={styles.container}>
          <TextInput
            placeholder="Username"
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            style={[styles.input, formik.touched.username && formik.errors.username && { borderColor: theme.colors.error }]}
          />
          {formik.touched.username && formik.errors.username && (
            <Text style={{ color: theme.colors.error, marginBottom: 12 }}>{formik.errors.username}</Text>
          )}
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            style={[styles.input, formik.touched.password && formik.errors.password && { borderColor: theme.colors.error }]}
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={{ color: theme.colors.error , marginBottom: 12 }}>{formik.errors.password}</Text>
          )}
          <Pressable style={styles.buttonShape} onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        </View>
    );
  };

  export default SignIn;