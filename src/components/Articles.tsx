import { articles } from "@/data/portfolioData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, ExternalLink } from "lucide-react";

export function Articles() {
  return (
    <section id="artigos" className="w-full py-20 lg:py-28">
      <div className="container mx-auto px-6 max-w-7xl px-0 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            Artigos
          </Badge>
          <h2 className="text-4xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Artigos & Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Compartilhando conhecimento e experiências sobre QA, automação de testes e qualidade de software
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Article Header */}
              <CardHeader>
                <div className="space-y-3">
                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime} min de leitura</span>
                    </div>
                    <Badge variant="secondary">{article.category}</Badge>
                  </div>

                  {/* Title and Excerpt */}
                  <div>
                    <CardTitle className="text-2xl mb-2">{article.title}</CardTitle>
                    <CardDescription className="text-base">
                      {article.excerpt}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Button - Read on LinkedIn */}
                {article.link && (
                  <div className="pt-4 border-t">
                    <Button
                      asChild
                      variant="default"
                      size="sm"
                      className="gap-2 w-full"
                    >
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ler no LinkedIn
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Em breve, mais artigos serão publicados aqui...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
