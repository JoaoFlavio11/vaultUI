/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from "react";
import { ThemeContext, type Theme } from "../components/ThemeProvider";

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  // Função auxiliar para alternar entre claro e escuro (útil para botões de toggle simples)
  const toggleTheme = () => {
    context.setTheme(context.theme === "dark" ? "light" : "dark");
  };

  return { 
    theme: context.theme, 
    setTheme: context.setTheme,
    toggleTheme 
  };
}