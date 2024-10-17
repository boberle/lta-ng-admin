type AppConfig = {
  backendURL: string;
  projectId: string;
  authEmulatorURL?: string;
  firebaseAPIKey: string;
};

const _buildAppConfig = (): AppConfig => {
  const _backendURL: string | undefined = import.meta.env.VITE_BACKEND_URL;
  const _authEmulatorURL: string | undefined = import.meta.env
    .VITE_AUTH_EMULATOR_URL;
  const _projectId: string | undefined = import.meta.env.VITE_PROJECT_ID;
  const _firebaseAPIKey: string | undefined = import.meta.env
    .VITE_FIREBASE_API_KEY;

  if (!_backendURL) {
    throw new Error("Missing VITE_BACKEND_URL environment variable");
  }

  if (!_projectId) {
    throw new Error("Missing VITE_PROJECT_NAME environment variable");
  }

  if (!_firebaseAPIKey) {
    throw new Error("Missing VITE_FIREBASE_API_KEY environment variable");
  }

  return {
    backendURL: _backendURL,
    authEmulatorURL: _authEmulatorURL || undefined,
    projectId: _projectId,
    firebaseAPIKey: _firebaseAPIKey,
  };
};

const appConfig: AppConfig = _buildAppConfig();

export default appConfig;
