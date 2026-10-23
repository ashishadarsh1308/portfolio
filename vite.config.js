import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'
import chatHandler from './api/chat.js'

function localChatApi() {
  return {
    name: 'local-chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (request, response, next) => {
        if (request.method !== 'POST') {
          response.statusCode = 405
          response.setHeader('Allow', 'POST')
          response.end()
          return
        }

        try {
          let body = ''
          for await (const chunk of request) {
            body += chunk
            if (body.length > 100_000) {
              response.statusCode = 413
              response.end()
              return
            }
          }

          request.body = JSON.parse(body)
          response.status = (statusCode) => {
            response.statusCode = statusCode
            return response
          }
          response.json = (payload) => {
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify(payload))
            return response
          }

          await chatHandler(request, response)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.GROQ_API_KEY ||= env.GROQ_API_KEY || env.VITE_GROQ_API_KEY || ''

  return {
    plugins: [react(), localChatApi()],
  }
})
