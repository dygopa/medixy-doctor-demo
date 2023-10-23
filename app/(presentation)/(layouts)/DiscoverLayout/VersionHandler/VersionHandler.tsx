import { APP_VERSION } from "(presentation)/(config)/versions/versions";
import { useEffect } from "react";

export default function VersionHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const handlerLocalStorage = () => {
    localStorage.removeItem("noodus.storage.medical-record-create");
  };

  const handleDiferrentVersion = () => {
    handlerLocalStorage();
  };

  const getCurrentVersion = () => {
    const appConf = localStorage.getItem("noodus.storage.app-config");

    if (!appConf) {
      const config = {
        version: APP_VERSION,
      };

      handleDiferrentVersion();

      localStorage.setItem("noodus.storage.app-config", JSON.stringify(config));
      return;
    }

    const appConfJSON = JSON.parse(appConf);

    if (appConfJSON?.version && appConfJSON.version !== APP_VERSION) {
      handleDiferrentVersion();

      appConfJSON.version = APP_VERSION;

      localStorage.setItem(
        "noodus.storage.app-config",
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
