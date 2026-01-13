import type { RequestHandler } from 'express';

const scriptHandler: RequestHandler = async (_, res) => {
  const script = `
    async function handleFormSubmit(e) {
      e.preventDefault();
      e.stopPropagation();

      const form = document.getElementById('grandsprix-update');
      const loading = document.createElement('div');
      loading.textContent = '🤔';
      loading.style.position = 'absolute';
      loading.style.top = 'calc(50% - 1.5rem)';
      loading.style.left = 'calc(50% - 1.5rem)';
      loading.style.fontSize = '3rem';

      // Lock the form
      form.appendChild(loading);
      form.style.opacity = '0.25';
      form.style.pointerEvents = 'none';
      form.style.cursor = 'wait';

      try {
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        const req = await fetch('/gps', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!req.ok) {
          throw new Error(\`\${req.status}: \${req.statusText}\`);
        }

        alert('Grand Prix data updated successfully!');
        window.location.reload();
      } catch (error) {
        alert(\`Error: \${error.message}\`);
      }

      // Restore form state
      form.style.opacity = '';
      form.style.pointerEvents = '';
      form.style.cursor = '';
      form.removeChild(loading);
    }
      
    document.addEventListener('DOMContentLoaded', () => {
      const currentPath = window.location.pathname;
      const links = document.querySelectorAll('nav a');

      links.forEach(link => {
        const linkPath = new URL(link.href).pathname;

        if (linkPath === currentPath) {
          // disable navigation
          link.addEventListener('click', e => e.preventDefault());

          // visual + semantic feedback 💕
          link.classList.add('active');
          link.querySelector('button').disabled = true;
        }
      });
    });`;

  res.setHeader('Content-Type', 'application/javascript');
  res.end(script);
};

export default scriptHandler;
