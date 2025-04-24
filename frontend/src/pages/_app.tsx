// import "@/styles/globals.css"; // Import global CSS (if any)
import type { AppProps } from "next/app";
import "semantic-ui-css/semantic.min.css"; // Import Semantic UI styles

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
