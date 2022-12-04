// Saved mode
type Mode = "light" | "dark" | "system";
// Visual themes
type Theme = "light" | "dark";
const ThemeContext = React.createContext<{
  mode: Mode;
  theme: Theme;
  setMode: (mode: Mode) => void;
}>({
  mode: "system",
  theme: "light",
  setMode: () => {}
});
const [mode, setMode] = React.useState<Mode>(() => {
  const initialMode =
    (localStorage.getItem(localStorageKey) as Mode | undefined) || "system";
  return initialMode;
});
// This will only get called during the 1st render
React.useState(() => {
  getMode().then(setMode);
});
React.useEffect(() => {
  localStorage.setItem(localStorageKey, mode);
  saveMode(mode); // database
}, [mode]);
const [theme, setTheme] = React.useState<Theme>(() => {
  if (mode !== "system") {
    return mode;
  }
  const isSystemInDarkMode = matchMedia("(prefers-color-scheme: dark)")
    .matches;
  return isSystemInDarkMode ? "dark" : "light";
});
React.useEffect(() => {
  if (mode !== "system") {
    setTheme(mode);
    return;
  }

  const isSystemInDarkMode = matchMedia("(prefers-color-scheme: dark)");
  // If system mode, immediately change theme according to the current system value
  setTheme(isSystemInDarkMode.matches ? "dark" : "light");

  // As the system value can change, we define an event listener when in system mode
  // to track down its changes
  const listener = (event: MediaQueryListEvent) => {
    setTheme(event.matches ? "dark" : "light");
  };
  isSystemInDarkMode.addListener(listener);
  return () => {
    isSystemInDarkMode.removeListener(listener);
  };
}, [mode]);
React.useEffect(() => {
  // Clear previous classNames on the body and add the new one
  document.body.classList.remove("light");
  document.body.classList.remove("dark");
  document.body.classList.add(theme);

  // change <meta name="color-scheme"> for native inputs
  (document.getElementById("colorScheme") as HTMLMetaElement).content = theme;
}, [theme]);
<ThemeContext.Provider value={{ theme, mode, setMode }}>
  {children}
</ThemeContext.Provider>
const { theme, mode, setMode } = React.useContext(ThemeContext);