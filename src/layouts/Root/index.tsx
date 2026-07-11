import { type PropsWithChildren } from "react";
import { ThemeProvider } from "../../components/theme-provider";

export default function Root({ children }: PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
