# 🚀 Development Quick Start Guide

## Auto-Restart Development Setup

Your CoreCrew API now has **multiple ways** to automatically restart when you save files:

### 📝 **Best Development Commands:**

```bash
# 🔥 RECOMMENDED: NestJS native hot reload (fastest)
npm run dev

# 🔧 Alternative: Nodemon-based restart
npm run dev:nodemon

# 🐛 Debug mode with hot reload
npm run debug

# 🐛 Debug with nodemon
npm run debug:nodemon
```

### 🎯 **How Auto-Restart Works:**

1. **File Watching**: Monitors all `.ts` files in the `src/` directory
2. **Instant Compilation**: TypeScript compiles changes automatically  
3. **Server Restart**: Restarts the API server when files change
4. **Preserve Console**: Keeps console output clean and readable

### 🛠️ **Development Workflow:**

1. Start development server:
   ```bash
   npm run dev
   ```

2. Make changes to any file in `src/`

3. **Save the file** (Ctrl+S)

4. **API automatically restarts** within 1-2 seconds

5. Test your changes at `http://localhost:3000`

### 🔍 **Debugging Setup:**

For **VS Code debugging**:

1. Press `F5` or go to Run & Debug
2. Select "Debug NestJS" configuration
3. Sets breakpoints in your code
4. Debug with full hot reload support

### 🎨 **VS Code Extensions (Recommended):**

- **NestJS Files** - Quick file generation
- **REST Client** - Test APIs directly in VS Code
- **Thunder Client** - Alternative API testing
- **TypeScript Importer** - Auto-import assistance

### ⚡ **Performance Tips:**

- Use `npm run dev` for fastest restart times
- Use `npm run debug` when you need to debug
- Test files (`.spec.ts`) are ignored during watch
- Clean build with `npm run clean` if needed

### 🚨 **Troubleshooting:**

If auto-restart isn't working:

1. Check if port 3000 is available
2. Try: `npm run clean && npm run build`
3. Restart VS Code terminal
4. Use `npm run dev:nodemon` as alternative

### 📚 **Next Steps:**

- Add new endpoints to `src/app.controller.ts`
- View auto-updated Swagger docs at `/api/docs`
- Write tests in `.spec.ts` files
- All changes auto-restart the server!

**Happy coding! 🎉**
