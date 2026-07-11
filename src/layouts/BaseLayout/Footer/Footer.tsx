import { trans } from "@mongez/localization";
import { PrimaryLink } from "design-system/components/Link";
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa"; // Using react-icons for social media icons
import { URLS } from "shared/urls";

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-black py-8 px-4 mt-12 shadow-inner dark:shadow-none dark:border-t dark:border-b-gray-900">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* General Documentation Links Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Documentation Links
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <PrimaryLink
                to="https://reactjs.org/docs/getting-started.html"
                newTab>
                React JS
              </PrimaryLink>
            </li>
            <li>
              <PrimaryLink to="https://www.typescriptlang.org/docs/" newTab>
                TypeScript
              </PrimaryLink>
            </li>
            <li>
              <PrimaryLink to="https://ui.shadcn.dev/docs" newTab>
                Shadcn
              </PrimaryLink>
            </li>
            <li>
              <PrimaryLink to="https://tailwindcss.com/docs" newTab>
                Tailwind CSS
              </PrimaryLink>
            </li>
          </ul>
        </div>

        {/* Mongez Documentation Links Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Mongez Documentation
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <PrimaryLink
                to="https://hassanzohdy.github.io/mongez/react/atom"
                newTab>
                Mongez React Atom
              </PrimaryLink>
            </li>
            <li>
              <PrimaryLink
                to="https://hassanzohdy.github.io/mongez/cache"
                newTab>
                Mongez Cache
              </PrimaryLink>
            </li>
            <li>
              <PrimaryLink
                to="https://hassanzohdy.github.io/mongez/react/form"
                newTab>
                Mongez React Form
              </PrimaryLink>
            </li>
            <li>
              <PrimaryLink
                to="https://hassanzohdy.github.io/mongez/http"
                newTab>
                Mongez Http
              </PrimaryLink>
            </li>
            <li>
              <PrimaryLink
                to="https://hassanzohdy.github.io/mongez/react/router"
                newTab>
                Mongez React Router
              </PrimaryLink>
            </li>
            <li>
              <PrimaryLink
                to="https://hassanzohdy.github.io/mongez/localization"
                newTab>
                Mongez Localization
              </PrimaryLink>
            </li>
            <li>
              <PrimaryLink
                to="https://hassanzohdy.github.io/mongez/events"
                newTab>
                Mongez Events
              </PrimaryLink>
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <PrimaryLink to={URLS.home}>{trans("home")}</PrimaryLink>
            </li>
            <li>
              <PrimaryLink to={URLS.contactUs}>
                {trans("contactUs")}
              </PrimaryLink>
            </li>
            <li>
              <PrimaryLink to="https://mentoor.io" newTab>
                Mentoor.io
              </PrimaryLink>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Follow Us
          </h2>
          <ul className="flex space-x-4 text-sm">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                <FaFacebook size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-400">
                <FaTwitter size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-red-600">
                <FaYoutube size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-700">
                <FaLinkedin size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-500">
                <FaDiscord size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-700">
                <FaGithub size={24} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Powered By Section */}
      <div className="text-center mt-8">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Powered by{" "}
          <a
            href="https://mentoor.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline">
            mentoor.io
          </a>
        </p>
      </div>
    </footer>
  );
}
