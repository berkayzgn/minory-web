import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'open-brave',
      configureServer(server) {
        server.httpServer?.once('listening', () => {
          const port = server.config.server.port ?? 5173
          const url = `http://localhost:${port}`
          try {
            if (process.platform === 'darwin') {
              execSync(`open -a "Brave Browser" "${url}"`)
            } else if (process.platform === 'win32') {
              execSync(`start brave "${url}"`)
            } else {
              execSync(`xdg-open "${url}"`)
            }
          } catch {
            // Brave bulunamazsa sessizce geç
          }
        })
      },
    },
  ],
})
