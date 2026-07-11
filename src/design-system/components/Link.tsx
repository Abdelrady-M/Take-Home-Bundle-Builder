import type { LinkProps } from "@mongez/react-router";
import { Link } from "@mongez/react-router";

export function PrimaryLink({ className, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      className={`text-gray-600 dark:text-gray-400 hover:underline ${className}`}
    />
  );
}
