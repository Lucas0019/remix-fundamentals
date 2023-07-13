import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Breadcrumb, BreadcrumbItem } from "~/components/breadcrumb";
import { Container } from "~/components/container";
import { prisma } from "~/db.server";

export async function loader({ params } : LoaderArgs) {
 
  const collection = await prisma.collection.findUnique({
    where: {
      id: Number(params.collectionId)
    },
    select: {
      id: true,
      name: true,
      articles: {
        select: {
          id: true,
          title: true,
          description: true,
        }
      }
    }
  });

  return {
    collection,
  }
}


export default function Collections() {

  const { collection } = useLoaderData<typeof loader>();

  return (
    <div>
      <Container className="py-10 space-y-8">
        <Breadcrumb>
          <BreadcrumbItem to="/">Página Inicial</BreadcrumbItem>
          <BreadcrumbItem to={`/collections/${collection?.id}`}>
            {collection?.name}
          </BreadcrumbItem>
        </Breadcrumb>

        {collection?.articles?.map((article, index) => (
          <Link
            to={`/articles/${article.id}`}
            className="w-full bg-slate-50 shadow rounded-sm p-6 block"
            key={article.id}
          >
            <h2 className="text-xl text-slate-900">
              {article?.title}
            </h2>
            <p className="text-slate-400 mt-1">
              {article?.description}
            </p>
          </Link>
        ))}
      </Container>
    </div>
  );
}
