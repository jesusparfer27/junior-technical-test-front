import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import React from 'react';
import router from './lib/Routes'
import { IterativeProvider } from './context/IterativeContext'; // Verifica esta ruta

// Asegúrate de que el elemento 'root' exista en tu archivo HTML
const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <IterativeProvider>
        <RouterProvider router={router} />
      </IterativeProvider>
    </React.StrictMode>
  );
} else {
  console.error("Elemento con ID 'root' no encontrado en el DOM.");
}
