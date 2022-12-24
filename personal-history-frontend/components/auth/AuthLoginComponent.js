import AuthEmailLoginComponent from "./loginMethod/AuthEmailLoginComponent";
import AuthGmailLoginComponent from "./loginMethod/AuthGmailLoginComponent";
import AuthTwitterLoginComponent from "./loginMethod/AuthTwitterLoginComponent";

export default function AuthLoginComponent() {
  return (
    <div className="w-screen flex justify-center items-center flex-col">
      <div className="mb-4">
        <AuthGmailLoginComponent />
      </div>
      <div className="mb-8">
        <AuthTwitterLoginComponent />
      </div>
      <div>
        <AuthEmailLoginComponent />
      </div>
    </div>
  );
}
