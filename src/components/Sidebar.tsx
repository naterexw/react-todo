import AddTodoForm from "./AddTodoForm";
import Button from "./Button";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function Sidebar() {
  const { logout, login, register, isAuthenticated, user, isLoading } =
    useKindeAuth();

  return (
    <section className="flex flex-col col-[2/3] row-[2/3] bg-[#fffcf9] border-l border-black/[0.08] px-[25px] pt-[18px] pb-[28px]">
      <AddTodoForm />
      <div className="flex flex-col mt-auto space-y-2">
        {isLoading ? null : isAuthenticated ? (
          <>
            <p className="text-sm mx-auto">Logged in as {user?.email}</p>

            <Button buttonType="secondary" onClick={logout}>
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button buttonType="secondary" onClick={login}>
              Log in
            </Button>
            <Button buttonType="secondary" onClick={register}>
              Register
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
