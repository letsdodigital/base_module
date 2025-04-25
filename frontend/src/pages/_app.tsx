import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "semantic-ui-css/semantic.min.css"; // Import Semantic UI styles

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
