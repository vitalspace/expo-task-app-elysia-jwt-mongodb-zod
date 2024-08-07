import { EditProfile } from "../../components/Edit";
import AuthWrapper from "../../components/AuthWrapper";

export default function editProfileTab() {
  return (
    <AuthWrapper requireAuth>
      <EditProfile />
    </AuthWrapper>
  );
}
