import { Link } from "@remix-run/react";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import { Container } from "./container";
import { Logo } from "./logo";

export function Hero({ showTitle = true }) {
  return (
    <div id="hero" className="bg-slate-50">
      <Container>
        <header>
          <nav aria-label="Top">
            <div className="w-full py-6 flex items-center justify-between border-b border-slate-200 lg:border-none">
              <Link to="/" className="flex items-center">
                <span className="sr-only">Help Center</span>
                <div className="flex items-center gap-1">
                  <p>Help.io</p>
                  <Logo/>
                </div>
                <div className="hidden ml-6 space-x-8 lg:block">
                  <p className="text-lg font-medium">Central de Ajuda</p>
                </div>
              </Link>
              <div className="ml-10 space-x-6 flex items-center">
                <a
                  href="https://github.com/Lucas0019/remix-fundamentals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-primary inline-flex items-center"
                >
                  <ExternalLinkIcon className="mr-2 w-[1rem] h-[1rem]">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </ExternalLinkIcon>
                  Código fonte
                </a>
                <Link
                  to="/articles/new"
                  className="text-sm font-medium hover:text-primary"
                >
                  Novo artigo
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <div className="pb-6">
          {showTitle && (
            <h1 className="text-4xl font-light mb-6 mt-6">
              Principais duvidas respondidas
            </h1>
          )}
        </div>
      </Container>
    </div>
  );
}
