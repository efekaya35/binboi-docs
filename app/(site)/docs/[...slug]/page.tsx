/**
 * Dynamic docs article page backed by the structured article content model.
 */
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { DOCS_ARTICLES } from "@/constants";
import { createMetadata } from "@/lib/metadata";

type DocsArticlePageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

function getArticle(slug: string) {
  return DOCS_ARTICLES.find((article) => article.slug === slug);
}

function getNeighbors(slug: string) {
  const index = DOCS_ARTICLES.findIndex((article) => article.slug === slug);

  return {
    previous: index > 0 ? DOCS_ARTICLES[index - 1] : null,
    next: index >= 0 && index < DOCS_ARTICLES.length - 1 ? DOCS_ARTICLES[index + 1] : null,
  };
}

export async function generateMetadata({ params }: DocsArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug[0] ?? "");

  if (!article) {
    return createMetadata({
      title: "Docs",
      path: "/docs",
    });
  }

  return createMetadata({
    title: article.title,
    description: article.description,
    path: `/docs/${article.slug}`,
  });
}

export default async function DocsArticlePage({ params }: DocsArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug[0] ?? "");

  if (!article) {
    notFound();
  }

  const neighbors = getNeighbors(article.slug);

  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <Badge>{article.section}</Badge>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            {article.title}
          </h1>
          <p className="max-w-3xl text-base leading-8 text-foreground/68">
            {article.description}
          </p>
          <p className="text-sm text-foreground/45">{article.readingTime}</p>
        </div>
      </header>

      <div className="space-y-6">
        {article.blocks.map((block) => (
          <Panel key={block.heading} className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {block.heading}
            </h2>
            <p className="text-sm leading-8 text-foreground/66">{block.body}</p>
            {block.bullets ? (
              <ul className="space-y-3 text-sm leading-7 text-foreground/66">
                {block.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {block.code ? (
              <pre className="overflow-x-auto rounded-[24px] border border-white/8 bg-black/40 p-4 text-sm text-foreground/82">
                <code>{block.code.snippet}</code>
              </pre>
            ) : null}
          </Panel>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {neighbors.previous ? (
          <Link
            href={`/docs/${neighbors.previous.slug}`}
            className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5 text-sm text-foreground/68 transition-colors hover:text-foreground"
          >
            Previous: {neighbors.previous.title}
          </Link>
        ) : (
          <div />
        )}
        {neighbors.next ? (
          <Link
            href={`/docs/${neighbors.next.slug}`}
            className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5 text-right text-sm text-foreground/68 transition-colors hover:text-foreground"
          >
            Next: {neighbors.next.title}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
