'use client'

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useMemo } from "react"

export function Hero() {
  const titles = useMemo(() => ["Software Engineer", "Full Stack Web Developer", "Problem Solver"], [])
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typeSpeed, setTypeSpeed] = useState(100)

  useEffect(() => {
    const handleTyping = () => {
      const currentTitle = titles[currentTitleIndex]

      if (isDeleting) {
        setCurrentText(currentTitle.substring(0, currentText.length - 1))
        setTypeSpeed(50)
      } else {
        setCurrentText(currentTitle.substring(0, currentText.length + 1))
        setTypeSpeed(100)
      }

      // If word is complete
      if (!isDeleting && currentText === currentTitle) {
        setTimeout(() => setIsDeleting(true), 1500)
      }
      // If word is completely deleted
      else if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
      }
    }

    const timer = setTimeout(handleTyping, typeSpeed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentTitleIndex, typeSpeed, titles])

  return (
    <section className="min-h-screen flex items-center justify-center pt-18 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 retro-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary via-chart-2 to-chart-3 p-1 neon-glow">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                  <div className="w-44 h-44 rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                    <Image
                      src={"/profile-photo.jpg"}
                      alt="Fahmi Ramadhan Profile Photo"
                      width={176}
                      height={176}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl md:text-7xl font-bold leading-tight">
              <span className="block">Hello, I&apos;m</span>
              <span className="retro-text text-5xl md:text-8xl">Fahmi Ramadhan</span>
            </h1>

            <div className="h-12 md:h-14 flex items-center justify-center">
              <p className="text-2xl md:text-3xl font-semibold text-muted-foreground">
                {currentText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="cyber-border hover-lift neon-glow group text-lg px-8 py-6 hover:cursor-pointer">
              <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              View Resume
            </Button>
            <Button variant="outline" size="lg" className="cyber-border hover-lift text-lg px-8 py-6 hover:cursor-pointer">
              View My Projects
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <Button variant="ghost" size="icon" className="w-14 h-14 rounded-full cyber-border hover-lift glow-on-hover" asChild>
              <a href="https://github.com/fahmi-ramadhan" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="w-14 h-14 rounded-full cyber-border hover-lift glow-on-hover" asChild>
              <a href="https://www.linkedin.com/in/fahmirama/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="w-14 h-14 rounded-full cyber-border hover-lift glow-on-hover" asChild>
              <a href="mailto:fahmiramadn@gmail.com">
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
