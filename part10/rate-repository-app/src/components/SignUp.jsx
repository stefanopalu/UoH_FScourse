import Text from './Text';
import { TextInput, StyleSheet, Pressable, View } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import useSignUp from '../hooks/useSignUp'
import * as yup from 'yup';
import theme from '../theme';

const initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, 'Username must have at least 5 characters')
      .max(30, 'Username must have at max 30 characters')
      .required('Username is required'),
    password: yup
      .string()
      .min(5, 'Password must have at least 5 characters')
      .max(50, 'Password must have at max 50 characters')
      .required('Password is required'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null])
      .required('Password confirm is required'),
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
  
export const SignUpContainer = ({ navigate, signUp }) => {

    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
      console.log('Form submitted with:', values);
      const {username, password} = values;

      try {
        const data = await signUp({username, password})
        console.log('Signed up:',data);
        navigate('/')
      } catch (e) {
        console.log(e)
      }
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
          <TextInput
            placeholder="Password confirmation"
            secureTextEntry={true}
            value={formik.values.passwordConfirm}
            onChangeText={formik.handleChange('passwordConfirm')}
            style={[styles.input, formik.touched.passwordConfirm && formik.errors.passwordConfirm && { borderColor: theme.colors.error }]}
          />
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
            <Text style={{ color: theme.colors.error , marginBottom: 12 }}>{formik.errors.passwordConfirm}</Text>
          )}
          <Pressable style={styles.buttonShape} onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
    );
  };

const SignUp = () => {
  const navigate = useNavigate()
  const [signUp] = useSignUp();

  return <SignUpContainer navigate={navigate} signUp={signUp}/>;
};

export default SignUp;