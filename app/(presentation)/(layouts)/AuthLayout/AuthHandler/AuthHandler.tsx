import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext, IAuthContext } from "../context/AuthContext";

export default function AuthHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state, actions, dispatch } = useContext<IAuthContext>(AuthContext);
  const { getUserAuthenticated } = actions;
  const { data, loading, error, successful } = state.getUserAuthenticated;

  const loadUser = () => {
    getUserAuthenticated()(dispatch);
  };

  const onHandleAuth = () => {
    //if (data.userId) redirect("/dashboard");
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (successful) onHandleAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  if (loading || data?.userId) return <div />;

  if (loading && !data?.userId) return <div />;

  return <div>{children}</div>;
}
