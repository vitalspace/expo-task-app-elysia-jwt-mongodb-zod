import AuthWrapper from "../../components/AuthWrapper";
import { Profile } from "../../components/Profile";

export default function profileTab() {
  return (
    <AuthWrapper requireAuth>
      <Profile/>
    </AuthWrapper>
  );
}
