import { Layout } from "@/components/layout/Layout";
import "@/styles/globals.css";
import { ContextReducer } from "@/utlis/ContextReducer";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }) {
  return (
    <ContextReducer>
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
    </ContextReducer>
  );
}
