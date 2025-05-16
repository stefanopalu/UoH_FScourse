import Text from './Text';
import { TextInput, StyleSheet, Pressable, View } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../hooks/useCreateReview';
import * as yup from 'yup';
import theme from '../theme';

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .min(2, 'Username must have at least 2 characters')
      .required('Repository owner name is required'),
    repositoryName: yup
      .string()
      .min(5, 'Repository Name must have at least 5 characters')
      .required('Repository Name is required'),
    rating: yup
      .number()
      .min(0, 'Rating must be at least 0')
      .max(100, 'Rating must be at most 100')
      .required('Rating is required'),
    text: yup
      .string()
      .min(10, 'Review must have at least 5 characters')
      .required('Review is required'),
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
  
export const ReviewFormContainer = ({ navigate, createReview }) => {

    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
      console.log('Form submitted with:', values);
      const {ownerName, repositoryName, rating, text} = values;

      try {
        const data = await createReview({ownerName, repositoryName, rating, text})
        console.log('New review:', data);
        navigate(`/repositories/${data.repositoryId}`)
      } catch (e) {
        console.log(e)
      }
    },
    });

    return (
      <View style={styles.container}>
          <TextInput
            placeholder="Repository owner name"
            value={formik.values.ownerName}
            onChangeText={formik.handleChange('ownerName')}
            style={[styles.input, formik.touched.ownerName && formik.errors.ownerName && { borderColor: theme.colors.error }]}
          />
          {formik.touched.ownerName && formik.errors.ownerName && (
            <Text style={{ color: theme.colors.error, marginBottom: 12 }}>{formik.errors.ownerName}</Text>
          )}
          <TextInput
            placeholder="Repository name"
            value={formik.values.repositoryName}
            onChangeText={formik.handleChange('repositoryName')}
            style={[styles.input, formik.touched.repositoryName && formik.errors.repositoryName && { borderColor: theme.colors.error }]}
          />
          {formik.touched.repositoryName && formik.errors.repositoryName && (
            <Text style={{ color: theme.colors.error , marginBottom: 12 }}>{formik.errors.repositoryName}</Text>
          )}
          <TextInput
            placeholder="Rating between 0 and 100"
            value={formik.values.rating}
            onChangeText={formik.handleChange('rating')}
            style={[styles.input, formik.touched.rating && formik.errors.rating && { borderColor: theme.colors.error }]}
          />
          {formik.touched.rating && formik.errors.rating && (
            <Text style={{ color: theme.colors.error , marginBottom: 12 }}>{formik.errors.rating}</Text>
          )}
          <TextInput
            placeholder="Review"
            value={formik.values.text}
            multiline={true} 
            onChangeText={formik.handleChange('text')}
            style={[styles.input, formik.touched.text && formik.errors.text && { borderColor: theme.colors.error }]}
          />
          {formik.touched.text && formik.errors.text && (
            <Text style={{ color: theme.colors.error , marginBottom: 12 }}>{formik.errors.text}</Text>
          )}
          <Pressable style={styles.buttonShape} onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>Create a review</Text>
          </Pressable>
        </View>
    );
  };

const ReviewForm = () => {
  const navigate = useNavigate()
  const [createReview] = useCreateReview();

  return <ReviewFormContainer navigate={navigate} createReview={createReview}/>;
};

export default ReviewForm;