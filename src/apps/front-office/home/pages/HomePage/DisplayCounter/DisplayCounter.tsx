import { Link } from "@mongez/react-router";
import { counterAtom } from "apps/front-office/home/atoms/counter-atom";

export default function DisplayCounter() {
  const count = counterAtom.useValue(); // get current value and re-render when it changes
  return (
    <h1>
      <button className="mx-auto block my-5">{count}</button>
      <small>
        This component will be the only component that will be rendered <br />{" "}
        when the counter button is clicked. <br />
        For more checkout the
        <Link
          newTab
          className="link"
          href="https://github.com/hassanzohdy/mongez-react-atom">
          React Atom Docs
        </Link>
      </small>
    </h1>
  );
}
