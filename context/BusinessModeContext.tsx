"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type BusinessMode = "b2b" | "b2c"

interface BusinessModeContextType {
    mode: BusinessMode
    setMode: (mode: BusinessMode) => void
    toggleMode: () => void
}

const BusinessModeContext = createContext<BusinessModeContextType | undefined>(undefined)

export function BusinessModeProvider({ children }: { children: ReactNode }) {
    const [mode, setModeState] = useState<BusinessMode>("b2b")

    useEffect(() => {
        const saved = localStorage.getItem("admin_business_mode") as BusinessMode
        if (saved === "b2b" || saved === "b2c") {
            setModeState(saved)
        }
    }, [])

    const setMode = (newMode: BusinessMode) => {
        setModeState(newMode)
        localStorage.setItem("admin_business_mode", newMode)
    }

    const toggleMode = () => {
        const newMode = mode === "b2b" ? "b2c" : "b2b"
        setMode(newMode)
    }

    return (
        <BusinessModeContext.Provider value={{ mode, setMode, toggleMode }}>
            {children}
        </BusinessModeContext.Provider>
    )
}

export function useBusinessMode() {
    const context = useContext(BusinessModeContext)
    if (!context) {
        throw new Error("useBusinessMode must be used within a BusinessModeProvider")
    }
    return context
}
