import { useState } from "react";
import { projects } from "@/data/portfolioData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, X } from "lucide-react";

export function Projects() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <section id="projetos" className="w-full py-20 lg:py-28">
      <div className="container mx-auto px-6 max-w-7xl px-0 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            Projetos
          </Badge>
          <h2 className="text-4xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Meus Projetos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explorando automação de testes e qualidade de software através de projetos práticos
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedProjectId(project.id)}
            >
              {/* Project Image */}
              {project.image && (
                <div className="w-full h-48 bg-muted overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Project Header */}
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription className="mt-2 text-base">
                      {project.description}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      project.status === "completed"
                        ? "default"
                        : project.status === "in-progress"
                          ? "secondary"
                          : "outline"
                    }
                    className="flex-shrink-0"
                  >
                    {project.status === "completed"
                      ? "Concluído"
                      : project.status === "in-progress"
                        ? "Em Progresso"
                        : "Planejado"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                    Tecnologias
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Highlights Preview */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground mb-2">Destaques:</p>
                    <ul className="space-y-1">
                      {project.highlights.slice(0, 2).map((highlight, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-primary">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                      {project.highlights.length > 2 && (
                        <li className="text-primary font-semibold">
                          +{project.highlights.length - 2} mais...
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                <p className="text-xs text-muted-foreground italic pt-2">
                  Clique para ver mais detalhes
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Em breve, mais projetos serão adicionados aqui...
            </p>
          </div>
        )}
      </div>

      {/* Modal de Detalhes */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProjectId(null)}
        >
          <Card
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-background/95 backdrop-blur-sm">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {selectedProject.title}
                </h2>
                <Badge
                  variant={
                    selectedProject.status === "completed"
                      ? "default"
                      : selectedProject.status === "in-progress"
                        ? "secondary"
                        : "outline"
                  }
                  className="mt-2"
                >
                  {selectedProject.status === "completed"
                    ? "Concluído"
                    : selectedProject.status === "in-progress"
                      ? "Em Progresso"
                      : "Planejado"}
                </Badge>
              </div>
              <button
                onClick={() => setSelectedProjectId(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Image */}
              {selectedProject.image && (
                <div className="w-full h-80 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Descrição</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Tecnologias</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Destaques</h3>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-primary font-bold flex-shrink-0">✓</span>
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Links */}
              {(selectedProject.github || selectedProject.link) && (
                <div className="space-y-3 pt-4 border-t">
                  <h3 className="text-lg font-semibold text-foreground">Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.github && (
                      <Button variant="outline" asChild className="gap-2">
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {selectedProject.link && (
                      <Button variant="outline" asChild className="gap-2">
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visitar
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 p-6 border-t bg-background/95 backdrop-blur-sm">
              <Button
                variant="outline"
                onClick={() => setSelectedProjectId(null)}
                className="w-full"
              >
                Fechar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </section>
  );
}
