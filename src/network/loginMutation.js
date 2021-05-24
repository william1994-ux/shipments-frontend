import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useAuthToken } from "../config/auth";

 

export const loginMutationGQL = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      access_token
    }
  }
`;

export const useLoginMutation = () => {
  const [_, setAuthToken, removeAuthtoken] = useAuthToken();

  const [mutation, mutationResults] = useMutation(loginMutationGQL, {
    onCompleted: (data) => {
      setAuthToken(data.login.access_token);
    },
  });

  // full login function
  const login = (user, password) => {
    removeAuthtoken();
    return mutation({
      variables: {
        username: user,
        password,
      },
    });
  }
  return [login, mutationResults]
};