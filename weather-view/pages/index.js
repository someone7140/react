import TopComponent from "../components/TopComponent";
import { AuthProvider } from "../components/auth/AuthProvider";

export default function Index() {
  return (
    <>
      <AuthProvider>
        <TopComponent />
      </AuthProvider>
    </>
  );
}
