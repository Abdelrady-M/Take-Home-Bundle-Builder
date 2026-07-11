import { trans } from "@mongez/localization";
import Helmet from "@mongez/react-helmet";
import { Link } from "@mongez/react-router";
import reactLogo from "assets/images/react.svg";
import DisplayCounter from "./DisplayCounter";
import "./HomePage.css";
import UpdateCounterButton from "./UpdateCounterButton";

export default function HomePage() {
  return (
    <>
      <Helmet title={trans("home")} appendAppName={false} />
      <div className="App">
        <div className="flex mb-10 gap-10">
          <Link href="https://reactjs.org" newTab>
            <img src={reactLogo} className="logo react" alt="React logo" />
          </Link>
          <Link href="https://vitejs.dev" newTab>
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </Link>
          <Link
            href="https://tailwindcss.com"
            newTab
            className="logo mr-3 flex-none w-[4.0625rem] overflow-hidden md:w-auto">
            <svg
              viewBox="158.156 165.703 119.955 93.719"
              width="119.955"
              height="93.719"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 218.135 165.703 C 202.139 165.703 192.145 176.117 188.144 196.945 C 194.143 186.531 201.14 182.626 209.137 185.228 C 213.699 186.712 216.962 191.023 220.57 195.796 C 226.451 203.568 233.258 212.563 248.123 212.563 C 264.116 212.563 274.113 202.149 278.111 181.324 C 272.115 191.738 265.118 195.642 257.121 193.037 C 252.556 191.553 249.294 187.242 245.686 182.472 C 239.805 174.694 233 165.703 218.135 165.703 Z M 188.144 212.563 C 172.151 212.563 162.154 222.976 158.156 243.804 C 164.155 233.39 171.152 229.486 179.146 232.088 C 183.711 233.572 186.974 237.883 190.582 242.656 C 196.463 250.428 203.268 259.422 218.135 259.422 C 234.128 259.422 244.125 249.011 248.123 228.183 C 242.124 238.597 235.127 242.502 227.13 239.9 C 222.568 238.413 219.305 234.102 215.697 229.332 C 209.816 221.56 203.009 212.563 188.144 212.563 Z"
                fill="#38bdf8"
                transform="matrix(1.0000000000000002, 0, 0, 1.0000000000000002, 0, 7.105427357601002e-15)"
              />
            </svg>
          </Link>
        </div>
        <h1>
          Powered By
          <br />
          <Link className="link" newTab href="https://github.com/hassanzohdy">
            Mongez Ecosystem
          </Link>
        </h1>
        <br />
        <UpdateCounterButton />
        <DisplayCounter />
      </div>
    </>
  );
}
