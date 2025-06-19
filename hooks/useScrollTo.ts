import { useCallback } from 'react'

export const useScrollTo = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const elementPosition = element.offsetTop - 80
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      })
    }
  }, [])

  return scrollToSection
}
