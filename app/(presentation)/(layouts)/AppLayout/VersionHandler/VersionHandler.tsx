import { useEffect } from "react";

export default function VersionHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const handlerLocalStorage = () => {
    localStorage.removeItem("prosit.storage.medical-record-create");
  };

  const handleDiferrentVersion = () => {
    handlerLocalStorage();
  };

  const getCurrentVersion = () => {
    const appConf = localStorage.getItem("prosit.storage.app-config");

    if (!appConf) {
      const config = {
        version: process.env.NEXT_PUBLIC_APP_VERSION,
      };

      handleDiferrentVersion();

      localStorage.setItem("prosit.storage.app-config", JSON.stringify(config));
      return;
    }

    const appConfJSON = JSON.parse(appConf);

    if (
      appConfJSON?.version &&
      appConfJSON.version !== process.env.NEXT_PUBLIC_APP_VERSION
    ) {
      handleDiferrentVersion();

      appConfJSON.version = process.env.NEXT_PUBLIC_APP_VERSION;

      localStorage.setItem(
        "prosit.storage.app-config",
        JSON.stringify(appConfJSON)
      );
    }
  };

  useEffect(() => {
    getCurrentVersion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{children}</div>;
}
