import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentLocaleCode } from "@mongez/localization";
import { changeLocaleCode, routerEvents } from "@mongez/react-router";
import { GlobeIcon } from "lucide-react";
import React, { useEffect } from "react";

function _LanguageSelector() {
  const [currentLanguageName, setCurrentLanguageName] = React.useState(
    getCurrentLocaleCode() === "en" ? "English" : "العربية",
  );

  useEffect(() => {
    const event = routerEvents.onLocaleChanged(localeCode => {
      setCurrentLanguageName(localeCode === "en" ? "English" : "العربية");
    });

    return () => {
      event.unsubscribe();
    };
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center mx-2">
            <GlobeIcon className="h-5 w-5 mx-1" />
            <span className="hidden mx-0 sm:block">{currentLanguageName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => changeLocaleCode("en")}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLocaleCode("ar")}>
            العربية
          </DropdownMenuItem>
          {/* Add more languages as needed */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export const LanguageSelector = React.memo(_LanguageSelector);
