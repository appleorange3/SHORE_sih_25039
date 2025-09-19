"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type Language, translations, getNestedTranslation } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem("shore-language") as Language
    if (savedLanguage && savedLanguage in translations) {
      setLanguage(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0] as Language
      if (browserLang in translations) {
        setLanguage(browserLang)
      }
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("shore-language", lang)
  }

  const t = (key: string): string => {
    const translation = translations[language]
    return getNestedTranslation(translation, key)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
