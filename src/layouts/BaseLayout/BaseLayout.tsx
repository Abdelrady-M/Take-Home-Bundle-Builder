import { Toaster } from "@/components/ui/sonner";
import { ToastConfirm } from "design-system/components/toast";
import { type PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * Base layout can be used to wrap all pages
 */
export function BaseLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <ToastConfirm />
      <Toaster />

      <main className="py-4">{children}</main>
      <Footer />
    </>
  );
}
