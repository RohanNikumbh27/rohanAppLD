import { withLDProvider } from "launchdarkly-react-client-sdk";

export default function LaunchDarklyProvider({ children, user }) {
  const LDProvider = withLDProvider({
    clientSideID: import.meta.env.VITE_LD_CLIENT_ID,  // Ensure this is in .env
    context: {
      kind: "user",
      key: user?.email,
    },
  })(() => children);

  return <LDProvider />;
}
