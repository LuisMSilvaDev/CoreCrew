# CoreCrew API

A modern NestJS-based HR application API built for managing human resources operations with comprehensive Swagger documentation.

## 🚀 Features

- RESTful API architecture
- Built with NestJS framework
- TypeScript support
- **Swagger/OpenAPI 3.0 Documentation** - Interactive API documentation
- **Auto-restart on file changes** - Hot reload for development
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
# Development mode with hot reload + Swagger (recommended)
npm run dev

# Alternative development mode
npm run start:dev

# Debug mode with hot reload + Swagger
npm run debug

# Production mode + Swagger
npm run prod

# Alternative production mode
npm run start:prod
```

**All modes include Swagger documentation automatically!**

The API will be available at `http://localhost:3000`

## � API Documentation

### Swagger UI
- **Interactive Documentation**: `http://localhost:3000/api/docs`
- **Test endpoints directly** from the browser
- **Auto-generated** from your code annotations
- **Always up-to-date** with your latest changes

### Generate Documentation
```bash
# Generate Swagger JSON file
npm run swagger:generate

# Export documentation to ./docs/swagger.json
npm run swagger:export
```

## 📊 API Endpoints

### Core Endpoints
- `GET /api` - Welcome message
- `GET /api/health` - Returns API health status

### Documentation
- `GET /api/docs` - Swagger UI interface
- `GET /api/docs-json` - OpenAPI JSON specification

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

## 🔧 Development Features

### Hot Reload
The development server automatically restarts when you save any file:
- **File watching** enabled by default in `npm run start:dev`
- **Instant feedback** for code changes
- **Preserves debugging session**

### Debugging
```bash
# Start in debug mode
npm run start:debug

# Debug with hot reload
npm run start:debug
```

## 📝 Development

This API is built with:
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Swagger** - API documentation and testing
- **Jest** - Testing framework
- **Express** - Web framework (underlying)

## 🚦 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run start:dev`
4. Visit `http://localhost:3000/api` to see the welcome message
5. Check health at `http://localhost:3000/api/health`
6. **Explore API docs** at `http://localhost:3000/api/docs`

## 📦 Project Structure

```
src/
├── app.controller.ts     # Main application controller with Swagger docs
├── app.module.ts         # Root application module
├── app.service.ts        # Main application service
└── main.ts              # Application entry point with Swagger setup

test/
└── app.e2e-spec.ts      # End-to-end tests

docs/
└── swagger.json         # Generated OpenAPI specification

scripts/
└── generate-swagger.ts  # Automatic documentation generator
```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | **RECOMMENDED** - Development with hot reload + Swagger |
| `npm run debug` | Debug mode with hot reload + Swagger |
| `npm run prod` | Production mode + Swagger |
| `npm run build` | Build the application |
| `npm run test` | Run unit tests |
| `npm run swagger:generate` | Generate Swagger JSON documentation |

**🎉 All server commands automatically include Swagger at `/api/docs`**

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Add Swagger decorators to new endpoints
4. Run tests: `npm test`
5. Commit your changes
6. Push to the branch
7. Create a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License.
