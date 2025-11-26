"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "RELIC - Repository of Early Literary and Indigenous Codices",
    description: "A digital platform preserving Indonesia's cultural heritage, developed in collaboration with UI's Faculty of Cultural Sciences. The platform introduces younger generations to ancient manuscripts from East Java using modern web technologies.",
    images: ["/projects/relic.png", "/projects/relic-2.png", "/projects/relic-3.png", "/projects/relic-4.png", "/projects/relic-5.png"],
    url: "https://relic.up.railway.app",
    github: null,
    technologies: ["Next.js", "NextAuth", "TypeScript", "tRPC", "PostgreSQL", "Prisma", "Tailwind CSS"],
  },
  {
    title: "Temanusa - Temu Manuskrip Nusantara",
    description: "A powerful search engine designed to help users easily find information about Indonesia's ancient manuscripts from various collections, featuring robust ElasticSearch capabilities.",
    images: ["/projects/temanusa.png", "/projects/temanusa-2.png"],
    url: "https://temanusa.com",
    github: null,
    technologies: ["Next.js", "ElasticSearch", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Mutari - Travel Planning Platform",
    description: "A comprehensive travel planning platform that helps users create, customize, and share itineraries with friends and family. Features tour booking, itinerary customization, and AI-powered suggestions.",
    images: ["/projects/mutari.png", "/projects/mutari-2.png", "/projects/mutari-3.png", "/projects/mutari-4.png"],
    url: "https://mutari.id",
    github: "https://github.com/Mutari-App",
    technologies: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Google Maps API", "Gemini AI", "MeiliSearch"]
  },
  {
    title: "RasaNusa - Indonesian Recipe Search Engine",
    description: "A specialized search engine for Indonesian cuisine recipes with 15,000+ recipes. Features AI-powered assistance and modern search capabilities powered by Elasticsearch.",
    images: ["/projects/rasanusa.png", "/projects/rasanusa-2.png", "/projects/rasanusa-3.png", "/projects/rasanusa-4.png"],
    url: "https://rasanusa.vercel.app",
    github: "https://github.com/rasanusa/rasanusa-web",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "tRPC", "Elasticsearch", "Llama-3.1", "GCP"]
  },
  {
    title: "COMPFEST 2024 - Indonesia's Biggest Student Held IT Event",
    description: "Contributed to Indonesia's largest student-run IT event website as a Software Engineering staff member. Built main landing pages, backend APIs, and dynamic event sections serving 102k+ visitors.",
    images: ["/projects/compfest.png"],
    url: "https://compfest.id",
    github: null,
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"]
  },
  {
    title: "OKK UI 2024 - Campus Orientation Website",
    description: "Co-led development of Universitas Indonesia's campus life orientation website, providing information about activities, group assignments, and mission submissions for new students.",
    images: ["/projects/okkui.png", "/projects/okkui-2.png", "/projects/okkui-3.png"],
    url: "https://okk-ui-2024.up.railway.app/",
    github: null,
    technologies: ["Next.js", "TypeScript", "Supabase"]
  },
  {
    title: "Food Recipe Knowledge Graph",
    description: "A recipe search application utilizing Knowledge Graph technology for Indonesian and international cuisines. Features RDF graph implementation and SPARQL queries for enhanced search capabilities.",
    images: ["/projects/foodrecipe.png"],
    url: null,
    github: "https://github.com/fahmi-ramadhan/food-recipe",
    technologies: ["Django", "Python", "JavaScript", "GraphDB", "SPARQL", "OpenRefine"]
  },
  {
    title: "ReadMe - Literacy Enhancement Platform",
    description: "A comprehensive platform (Web and Mobile) designed to boost literacy rates in Indonesia featuring book reviews, social posting, quotes sharing, loyalty points system, and an integrated bookstore.",
    images: ["/projects/readme.png"],
    url: null,
    github: "https://github.com/PeBePe/readme",
    technologies: ["Django", "Python", "JavaScript", "SQLite", "Flutter", "Dart"]
  },
  {
    title: "SnackVenture - Subscription Box Service",
    description: "A web application for international snack subscription boxes featuring country-specific snack collections. Built with microservice architecture for scalability and performance.",
    images: ["/projects/snackventure.png"],
    url: null,
    github: "https://github.com/orgs/advpro-a12/repositories",
    technologies: ["Spring Boot", "Java", "Microservices", "Next.js", "TypeScript", "PostgreSQL"]
  }
]

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-4">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <span className="text-primary font-mono text-sm">Featured Projects</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="cyber-border hover-lift group overflow-hidden h-full flex flex-col">
              <div className="relative h-48 md:h-56 xl:h-60 overflow-hidden">
                {project.images.length === 1 ? (
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <Carousel
                    className="w-full h-full"
                    opts={{
                      align: "start",
                      loop: false,
                      duration: 20,
                      dragFree: false
                    }}
                  >
                    <CarouselContent className="-ml-0 transition-transform duration-300 ease-out">
                      {project.images.map((image, imageIndex) => (
                        <CarouselItem key={imageIndex} className="pl-0">
                          <div className="relative h-48 md:h-56 xl:h-60 w-full">
                            <Image
                              src={image}
                              alt={`${project.title} - Image ${imageIndex + 1}`}
                              fill
                              className="object-cover object-top"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hover:cursor-pointer left-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm border-white/20 text-white hover:text-white transition-all duration-200" />
                    <CarouselNext className="hover:cursor-pointer right-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm border-white/20 text-white hover:text-white transition-all duration-200" />
                  </Carousel>
                )}
              </div>

              <CardHeader>
                <CardTitle className="text-lg font-bold leading-tight">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 mt-auto">
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  {project.url && (
                    <Button
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button
                      size="sm"
                      variant="outline"
                      className={project.url ? "flex-1" : "w-full"}
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="cyber-border hover-lift" asChild>
            <a href="https://github.com/fahmi-ramadhan" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
