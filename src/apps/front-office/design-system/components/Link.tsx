import type { LinkProps } from "@mongez/react-router";
import { Link } from "@mongez/react-router";

export function UnStyledLink(props: LinkProps) {
  return <Link {...props} />;
}
