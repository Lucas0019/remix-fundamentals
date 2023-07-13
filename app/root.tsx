import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";

import styles from "~/styles/app.css";
import { Hero } from "~/components/hero";

type DocumentProps = {
  children: React.ReactNode;
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Home | Help.io",
  description: "Welcome to remix!",
  viewport: "width=device-width,initial-scale=1",
});

function Document({children}: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}


export default function App() {

  const location = useLocation();

  return (
    <Document>
      <Hero showTitle={location.pathname === "/"} />
      <main className="h-full flex flex-col">
        <Outlet />
      </main>
    </Document>
  )
}
    
