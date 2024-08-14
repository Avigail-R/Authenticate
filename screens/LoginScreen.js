import AuthContent from '../components/Auth/AuthContent';
import {useState} from "react";
import {createUser, login} from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {Alert} from "react-native";
import {useAuthStore} from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const {authenticate} = useAuthStore();
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      console.debug("Login")
      const token = await login(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert('Authentication failed',
        'Could not log you in. Please check your credentials or try again later!');
    }
    setIsAuthenticating(false);
  }
  if (isAuthenticating){
    return <LoadingOverlay message="login user..."/>;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
