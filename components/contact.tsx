"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Send, Github, Linkedin } from "lucide-react"
import { toast } from "sonner"
import emailjs from '@emailjs/browser'
import { z } from 'zod'

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  title: z.string().min(1, "Subject is required").min(3, "Subject must be at least 3 characters"),
  message: z.string().min(1, "Message is required").min(10, "Message must be at least 10 characters")
})

type ContactFormData = z.infer<typeof contactFormSchema>

emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    title: '',
    message: ''
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = (name: keyof ContactFormData, value: string) => {
    try {
      // Validate single field
      const fieldSchema = contactFormSchema.shape[name]
      fieldSchema.parse(value)

      // Clear error if validation passes
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({
          ...prev,
          [name]: error.errors[0]?.message
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate entire form
      const validatedData = contactFormSchema.parse(formData)

      // Clear any existing errors
      setErrors({})

      const templateParams = {
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        title: validatedData.title,
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams
      )

      toast.success("Message sent successfully!")
      setFormData({ name: '', email: '', title: '', message: '' })
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message
          }
        })
        setErrors(fieldErrors)
        toast.error("Please fix the form errors before submitting")
      } else {
        // Handle email sending errors
        console.error('Error sending email:', error)
        toast.error("Failed to send message", {
          description: "Please try again or email me directly at fahmiramadn@gmail.com",
          duration: 5000,
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Validate field on change (with debouncing for better UX)
    if (value.trim()) {
      validateField(name as keyof ContactFormData, value)
    } else {
      // Clear error when field is empty (will be caught by required validation on submit)
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    validateField(name as keyof ContactFormData, value)
  }

  return (
    <section id="contact" className="mb-8 md:mb-16 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-chart-2/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
              <span className="text-primary font-mono text-sm">Get In Touch</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 retro-text">
              Let&apos;s Work Together
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? I&apos;m always excited to collaborate on innovative ideas
              and challenging problems. Let&apos;s create something amazing together!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`cyber-border ${errors.name ? 'border-destructive focus:border-destructive' : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`cyber-border ${errors.email ? 'border-destructive focus:border-destructive' : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Input
                    name="title"
                    placeholder="Subject"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`cyber-border ${errors.title ? 'border-destructive focus:border-destructive' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.title && (
                    <p className="text-destructive text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`cyber-border resize-none ${errors.message ? 'border-destructive focus:border-destructive' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full cyber-border hover-lift neon-glow hover:cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 cyber-border">
                <h3 className="text-2xl font-bold mb-6 retro-text">Let&apos;s Connect</h3>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center neon-glow">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <a
                        href="mailto:fahmiramadn@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        fahmiramadn@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center neon-glow">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-muted-foreground">Depok, Indonesia</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-primary/20">
                  <p className="text-sm text-muted-foreground mb-4">Find me on social media</p>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon" className="cyber-border glow-on-hover" asChild>
                      <a href="https://github.com/fahmi-ramadhan" target="_blank" rel="noopener noreferrer">
                        <Github className="w-5 h-5" />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" className="cyber-border glow-on-hover" asChild>
                      <a href="https://www.linkedin.com/in/fahmirama/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
