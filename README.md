# Promasidor Knowledge Assistant

A specialized Vue 3 TypeScript web application with a modern UI/UX chatbot designed to provide information about Promasidor, its products, and company policies.

## Features

- 🌓 Dark and light mode support
- 📱 Responsive design for mobile and desktop
- 💬 Modern chatbot interface for Promasidor information
- 🔄 Integration with n8n workflows for accurate company knowledge
- 🚀 Built with Vue 3, TypeScript, and Tailwind CSS

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- n8n running locally or remotely with a webhook endpoint

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd ai-knowledge-base
```

2. Install dependencies:

```bash
npm install
```

3. Configure the n8n webhook:

The application is pre-configured to use the webhook URL: `http://localhost:5678/webhook/6c734b78-3882-42eb-b583-fe0b589333ce`

If you need to use a different webhook URL, update the URL in `src/views/Chat.vue`.

4. Start the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## n8n Setup

1. Ensure your n8n instance is running
2. Create a workflow with a webhook node as the trigger
3. Use the webhook URL in this application
4. The webhook should expect a POST request with a `message` field
5. Your n8n workflow should return a JSON response with a `response` field containing the assistant's reply

## Mobile Access Setup

If you want to access the application from mobile devices on your local network:

1. Find your computer's IP address:
   - Windows: Open Command Prompt and type `ipconfig`
   - Mac: Open System Preferences > Network or type `ifconfig` in Terminal
   - Linux: Open Terminal and type `hostname -I`

2. Update the IP address in `src/services/n8nService.ts`:
   ```javascript
   // Change this line with your computer's actual IP address
   const localNetworkIp = 'http://192.168.1.100:5678'; // Example - Change to your actual IP
   ```

3. Make sure both your computer and mobile device are connected to the same WiFi network

4. Access the application from your mobile device by navigating to:
   ```
   http://YOUR_COMPUTER_IP:YOUR_DEV_SERVER_PORT
   ```
   For example: `http://192.168.1.100:3000` (if using Vite's default port)

5. If you're still encountering connection issues:
   - Ensure your computer's firewall allows incoming connections on the n8n port (5678)
   - Check if your n8n server is accessible from other devices on the network
   - Try accessing the n8n URL directly from your mobile browser to verify connectivity

## Project Structure

- `src/components/` - Reusable Vue components
- `src/views/` - Page components for each route
- `src/stores/` - Pinia stores (e.g., theme management)
- `src/router/` - Vue Router configuration
- `src/assets/` - Static assets and CSS

## License

MIT
# ai-knowledge-base
