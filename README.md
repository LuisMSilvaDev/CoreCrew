# CoreCrew API

A modern NestJS-based HR application API built for managing human resources operations.

## 🚀 Features

- RESTful API architecture
- Built with NestJS framework
- TypeScript support
- Comprehensive testing setup
- CORS enabled
- Health check endpoint

## 🛠️ Installation

```bash
# Install dependencies
npm install
```

## 🏃‍♂️ Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The API will be available at `http://localhost:3000`

## 📊 API Endpoints

### Health Check
- `GET /api/health` - Returns API health status

### Core
- `GET /api` - Welcome message

## 🧪 Testing

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov

# End-to-end tests
npm run test:e2e

# Watch mode
npm run test:watch
```

## 🏗️ Building

```bash
# Build the application
npm run build
```

## 📝 Development

This API is built with:
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Jest** - Testing framework
- **Express** - Web framework (underlying)

## 🚦 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run start:dev`
4. Visit `http://localhost:3000/api` to see the welcome message
5. Check health at `http://localhost:3000/api/health`

## 📦 Project Structure

```
src/
├── app.controller.ts     # Main application controller
├── app.module.ts         # Root application module
├── app.service.ts        # Main application service
└── main.ts              # Application entry point

test/
└── app.e2e-spec.ts      # End-to-end tests
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License.
