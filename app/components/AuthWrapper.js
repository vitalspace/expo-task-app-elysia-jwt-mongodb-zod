import { useEffect } from "react";
import { Redirect } from "expo-router";
import useAuthStore from "../stores/store";

const AuthWrapper = ({ children, requireAuth }) => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (requireAuth && !isAuthenticated) {
    return <Redirect href="/signin" />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Redirect href="/profile" />;
  }

  return children;
};

export default AuthWrapper;
