import { redirectTwitterAuth } from "../../../services/auth/TwitterAuthService";

export default function AuthTwitterLoginComponent() {
  return (
    <div className="w-64 flex justify-center items-center flex-col">
      <button
        className="w-64 bg-indigo-200 rounded px-4 py-2 border border-neutral-300"
        onClick={() => {
          redirectTwitterAuth("auth/twitter_redirect_for_login");
        }}
      >
        Twitterでログイン
      </button>
    </div>
  );
}
