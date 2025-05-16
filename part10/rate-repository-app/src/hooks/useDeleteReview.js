import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { GET_CURRENT_USER } from "../graphql/queries";

const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW, {
        refetchQueries: [{ query: GET_CURRENT_USER }],
    });

    const deleteReview = async ({id}) => {
        const { data } = await mutate({
            variables: { id }
        });
        return data.deleteReview;
    }
    return [deleteReview, result];
};

export default useDeleteReview;