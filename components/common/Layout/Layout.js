import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

export function Layout({ children }) {
  return (
    <div className="w-full min-h-screen dark:bg-gray-700 dark:text-white">
      <div className="max-w-screen-sm px-4 py-12 mx-auto antialiased font-body">
        <Header />
        <main>{children}</main>
        {/* <footer className="text-lg font-light">
          © {new Date().getFullYear()}, Tom DeHart{" "}
        </footer> */}
      </div>
    </div>
  );
}

const Header = () => {
  const { pathname } = useRouter();

  const isRoot = pathname === "/";

  return (
    <header
      className={clsx("flex items-center justify-between ", {
        "mb-8": isRoot,
        "mb-2": !isRoot,
      })}
    >
      <div className={"max-w-md"}>
        {isRoot ? <LargeTitle /> : <SmallTitle />}
      </div>
    </header>
  );
};

const LargeTitle = () => (
  <h1>
    <Link href="/">
      <a
        className={clsx(
          "text-3xl font-black leading-none text-black no-underline font-display",
          "sm:text-5xl",
          "dark:text-white"
        )}
      >
        tomdeh.art
      </a>
    </Link>
  </h1>
);

const SmallTitle = () => (
  <h1>
    <Link href="/">
      <a
        className={clsx(
          "text-2xl font-black text-black no-underline font-display",
          "dark:text-white"
        )}
      >
        tomdeh.art
      </a>
    </Link>
  </h1>
);
