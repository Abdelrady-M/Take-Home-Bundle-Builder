import { Button } from "@/components/ui/button";
import { trans } from "@mongez/localization";
import { PrimaryLink } from "design-system/components/Link";
import { URLS } from "shared/urls";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-black shadow-md dark:shadow-none dark:border-b dark:border-b-gray-900">
      <div className="flex items-center">
        <PrimaryLink to="https://mentoor.io" newTab>
          <img
            src="https://mentoor.io/logo.png"
            alt="mentoor.io"
            title="mentoor.io"
            className="h-8 w-8"
          />
        </PrimaryLink>
        {/* Adjust the path to your logo */}
        <PrimaryLink to={URLS.home}>
          <h1 className="text-xl mx-3 font-semibold text-gray-900 dark:text-white">
            Logo
          </h1>
        </PrimaryLink>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-2 mx-6">
        <PrimaryLink href={URLS.home}>{trans("home")}</PrimaryLink>
        <PrimaryLink href={URLS.contactUs}>{trans("contactUs")}</PrimaryLink>
      </nav>

      {/* Right Side - Actions */}
      <div className="flex items-center mx-4">
        {/* Language Dropdown */}
        <LanguageSelector />

        <div className="flex gap-2">
          {/* Login & Sign Up Buttons */}
          <PrimaryLink to={URLS.auth.login}>
            <Button variant="outline" className="hidden sm:block">
              {trans("login")}
            </Button>
          </PrimaryLink>
          <PrimaryLink to={URLS.auth.register}>
            <Button variant="secondary" className="hidden sm:block">
              {trans("createAccount")}
            </Button>
          </PrimaryLink>

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
