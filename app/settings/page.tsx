import { auth, signOut } from "@/auth";
import UserProfile from "@/components/auth/userProfile";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit" className="p-2 border bg-slate-300">
          Sign Out
        </button>
      </form>
      <UserProfile />
    </div>
  );
};

export default SettingsPage;
