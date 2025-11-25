// Theme script - carrega antes do React para evitar flash
(function() {
  try {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (e) {
    // Fallback silencioso se localStorage não disponível
  }
})()

