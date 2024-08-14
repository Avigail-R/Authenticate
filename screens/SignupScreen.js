import AuthContent from '../components/Auth/AuthContent';
import {createUser} from "../util/auth";
import {useState} from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {useAuthStore} from "../store/auth-context";
import {Alert} from "react-native";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const {authenticate} = useAuthStore();
  async function signUpHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      console.log("Sign up")
     const token = await createUser(email, password);
      authenticate(token);
    }
    catch (error) {
      console.log(error);
      Alert.alert('Authentication failed',
        'Could not create user. Please check your input or try again later!');
    }
    setIsAuthenticating(false);
  }
  
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..."/>;
  }
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
