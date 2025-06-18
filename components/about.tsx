"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const technologies = [
  { name: "JavaScript", logo: "/tech-logos/javascript.svg" },
  { name: "TypeScript", logo: "/tech-logos/typescript.svg" },
  { name: "Python", logo: "/tech-logos/python.svg" },
  { name: "Java", logo: "/tech-logos/java.svg" },
  { name: "Go", logo: "/tech-logos/go.svg" },
  { name: "Dart", logo: "/tech-logos/dart.svg" },
  { name: "HTML5", logo: "/tech-logos/html5.svg" },
  { name: "CSS3", logo: "/tech-logos/css3.svg" },
  { name: "Tailwind CSS", logo: "/tech-logos/tailwindcss.svg" },
  { name: "React", logo: "/tech-logos/react.svg" },
  { name: "Next.js", logo: "/tech-logos/nextjs.svg" },
  { name: "Flutter", logo: "/tech-logos/flutter.svg" },
  { name: "Django", logo: "/tech-logos/django.svg" },
  { name: "Spring Boot", logo: "/tech-logos/springboot.svg" },
  { name: "Express.js", logo: "/tech-logos/express.svg" },
  { name: "NestJS", logo: "/tech-logos/nestjs.svg" },
  { name: "tRPC", logo: "/tech-logos/trpc.svg" },
  { name: "PostgreSQL", logo: "/tech-logos/postgresql.svg" },
  { name: "Prisma", logo: "/tech-logos/prisma.svg" },
  { name: "SPARQL", logo: "/tech-logos/sparql.svg" },
  { name: "Google Cloud", logo: "/tech-logos/googlecloud.svg" },
  { name: "Neovim", logo: "/tech-logos/neovim.svg" },
  { name: "Git", logo: "/tech-logos/git.svg" },
]

export function About() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hoveredTech, setHoveredTech] = useState<{ name: string; x: number; y: number } | null>(null)
  const [isScrollPaused, setIsScrollPaused] = useState(false)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    // Calculate the width of one set of items (including gaps)
    const itemWidth = 64 + 32 // 16 (w-16) * 4 + 8 (space-x-8) * 4
    const oneSetWidth = technologies.length * itemWidth

    // Set animation duration based on content width
    const animationDuration = Math.max(20, oneSetWidth / 50) // 50px per second

    scrollContainer.style.setProperty('--one-set-width', `${oneSetWidth}px`)
    scrollContainer.style.setProperty('--animation-duration', `${animationDuration}s`)
  }, [])

  const handleMouseEnter = (tech: { name: string }, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setHoveredTech({
      name: tech.name,
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    })
    setIsScrollPaused(true)
  }

  const handleMouseLeave = () => {
    setHoveredTech(null)
    setIsScrollPaused(false)
  }

  return (
    <>
      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--one-set-width)));
          }
        }
        
        .animate-infinite-scroll {
          animation: infinite-scroll var(--animation-duration, 20s) linear infinite;
          animation-play-state: ${isScrollPaused ? 'paused' : 'running'};
        }
      `}</style>

      <section id="about" className="relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-chart-3/10 rounded-full blur-3xl animate-pulse" />

        <div className="container mx-auto sm:px-4 relative z-10">
          <div className="mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-8">
              <span className="text-primary font-mono text-sm">About Me</span>
            </div>

            <p className="text-xl px-4 text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              I&apos;m an undergraduate computer science student at <span className="text-chart-4 font-semibold">Universitas Indonesia</span>,
              passionate about software engineering with a special focus on <span className="text-primary font-semibold">full-stack web development</span>.
              I thrive on building real-world applications that solve actual problems and make a meaningful impact.
              What drives me is <span className="text-foreground font-medium">continuous learning and problem-solving</span> –
              every challenge is an opportunity to grow, and I&apos;m constantly exploring new technologies and methodologies
              to expand my skill set.
            </p>

            {/* Technologies Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-8 retro-text">Technologies & Tools</h3>

              {/* Scrolling Technology Logos */}
              <div className="relative overflow-hidden py-4">
                <div
                  ref={scrollRef}
                  className="flex space-x-8 animate-infinite-scroll"
                >
                  {/* First set */}
                  {technologies.map((tech, index) => (
                    <div
                      key={`first-${index}`}
                      className="flex-shrink-0 w-16 h-16 bg-card rounded-lg border border-primary/20 flex items-center justify-center hover-lift cyber-border group cursor-pointer"
                      onMouseEnter={(e) => handleMouseEnter(tech, e)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = `<span class="text-xs font-mono text-center px-1">${tech.name}</span>`
                          }
                        }}
                      />
                    </div>
                  ))}

                  {/* Second set (duplicate for seamless loop) */}
                  {technologies.map((tech, index) => (
                    <div
                      key={`second-${index}`}
                      className="flex-shrink-0 w-16 h-16 bg-card rounded-lg border border-primary/20 flex items-center justify-center hover-lift cyber-border group cursor-pointer"
                      onMouseEnter={(e) => handleMouseEnter(tech, e)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = `<span class="text-xs font-mono text-center px-1">${tech.name}</span>`
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tooltip */}
        {hoveredTech && (
          <div
            className="fixed z-50 px-3 py-2 bg-black/90 text-white text-sm rounded-lg border border-primary/20 backdrop-blur-sm pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{
              left: hoveredTech.x,
              top: hoveredTech.y,
            }}
          >
            {hoveredTech.name}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
          </div>
        )}
      </section>
    </>
  )
}
