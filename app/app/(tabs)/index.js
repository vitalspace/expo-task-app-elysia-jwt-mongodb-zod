import AuthWrapper from "../../components/AuthWrapper";
import Tasks from "../../components/Tasks";

export default function indexTab() {
  return (
    <AuthWrapper requireAuth>
      <Tasks />
    </AuthWrapper>
  );
}
