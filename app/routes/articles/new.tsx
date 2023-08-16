import { Container } from "~/components/container";
import { Breadcrumb, BreadcrumbItem } from "~/components/breadcrumb";
import { json, type ActionArgs, type LoaderArgs, redirect } from "@remix-run/node";
import { prisma } from "~/db.server";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useTransition } from "react";

export async function loader(args: LoaderArgs) {
  const collections = await prisma.collection.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return {
    collections,
  };
}

export default function NewArticle() {
  const { collections } = useLoaderData<typeof loader>();
  const actionData  = useActionData<typeof action>();

  const { state } = useTransition() as any;
  const isLoaded = state === "submitting";

  return (
    <div>
      <Container className="py-10">
        <Breadcrumb>
          <BreadcrumbItem to="/">Página Inicial</BreadcrumbItem>
          <BreadcrumbItem to="/articles/new">Novo Artigo</BreadcrumbItem>
        </Breadcrumb>
      </Container>

      <Container className="prose">
        <h1>Novo Artigo</h1>

        <Form
          method="post"
          className="flex flex-col bg-slate-50 p-6 rounded-md"
        >
          <fieldset disabled={isLoaded} className="space-y-6">
            <input
              type="text"
              name="title"
              placeholder="Título"
              className="block w-full px-4 rounded-md py-3 text-slate-900 bg-white ring-1 ring-slate-200 transition-colors text-lg focus:text-slate-900 focus:outline-none"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="block w-full px-4 rounded-md py-3 text-slate-900 bg-white ring-1 ring-slate-200 transition-colors text-lg focus:text-slate-900 focus:outline-none"
            />
            <textarea
              name="content"
              placeholder="Content"
              className="block w-full px-4 rounded-md py-3 text-slate-900 bg-white ring-1 ring-slate-200 transition-colors text-lg focus:text-slate-900 focus:outline-none"
            />
            <select
              name="collectionId"
              className="block w-full px-4 rounded-md py-3 text-slate-900 bg-white ring-1 ring-slate-200 transition-colors text-lg focus:text-slate-900 focus:outline-none"
            >
              <option value="">Selecione uma collection</option>
              {collections?.map((collection) => (
                <option value={collection.id} key={collection.id}>
                  {collection?.name}
                </option>
              ))}
            </select>

            {actionData?.error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Erro! </strong>
                <span className="block sm:inline">
                  {actionData?.error?.message}
                </span>
              </div>
            )}
      
            <div>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoaded ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </fieldset>
        </Form>
      </Container>
    </div>
  );
}

export async function action({ request }: ActionArgs) {
  const payload = Object.fromEntries(await request.formData());
  const { title, description, content, collectionId } = payload;

  if (!title || !description || !content || !collectionId) {
    return json({
      error: {
        message: "Todos os campos são obrigatórios",
      },
    }, {
      status: 400,
    });
  }

  const { id } = await prisma.article.create({
    data: {
      title: title as string,
      description: description as string,
      content: content as string,
      collectionId: Number(collectionId),
    },
  });

  return redirect(`/articles/${id}`);
}
