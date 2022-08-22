import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type ColorScheme = "dark" | "light";

type ThemeContextType = {
  colorScheme: ColorScheme;
  setColorScheme: (value: ColorScheme) => void;
  toggleColorScheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

type Props = {
  children: ReactNode;
  defaultScheme?: ColorScheme;
};

const ThemeProvider = (props: Props) => {
  const { children, defaultScheme = "dark" } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultScheme);

  const toggleColorScheme = () => {
    setColorScheme((oldScheme) => {
      switch (oldScheme) {
        case "dark":
          return "light";
        case "light":
          return "dark";
        default:
          return "dark";
      }
    });
  };

  useEffect(() => {
    const isDark = colorScheme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
  }, [colorScheme]);

  const contextValue: ThemeContextType = {
    colorScheme,
    setColorScheme,
    toggleColorScheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw Error("useTheme must use inside ThemeProvider");
  }
  return context;
};
