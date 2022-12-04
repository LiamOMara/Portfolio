function getTheme() {
    return sessionStorage.getItem('theme') || 'light';
  }
  function saveTheme(theme) {
    sessionStorage.setItem('theme', theme);
  }
  
  const colorScheme = document.querySelector('meta[name="color-scheme"]');
  function applyTheme(theme) {
    document.body.className = theme;
    colorScheme.content = theme;
  }
  
  function rotateTheme(theme) {
    if (theme === 'light') {
      return 'dark'
    }
    return 'light';
  }
  
  const themeDisplay = document.getElementById('theme');
  const themeToggler = document.getElementById('theme-toggle');
  
  let theme = getTheme();
  applyTheme(theme);
  themeDisplay.innerText = theme;
  
  themeToggler.onclick = () => {
    const newTheme = rotateTheme(theme);
    applyTheme(newTheme);
    themeDisplay.innerText = newTheme;
    saveTheme(newTheme);
  
    theme = newTheme;
  }
