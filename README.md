# Urban Dictionary MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io) server that provides access to Urban Dictionary's slang definitions through a chat-based interface with Claude.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

## Features

- 🔍 **Define Slang Terms** - Look up definitions for any slang term or phrase
- 🎲 **Random Words** - Discover new slang with random word lookup
- 👍 **Popularity Sorted** - Definitions sorted by community votes
- 📝 **Rich Formatting** - Clean, readable output with examples and metadata
- ⚡ **Fast & Reliable** - Built with TypeScript and proper error handling

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Claude Desktop App

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/urban-dictionary-mcp.git
cd urban-dictionary-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Configuration

### Claude Desktop

Add the server to your Claude Desktop configuration:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "urbandictionary": {
      "command": "node",
      "args": [
        "/absolute/path/to/urban-dictionary-mcp/dist/index.js"
      ]
    }
  }
}
```

Replace `/absolute/path/to/urban-dictionary-mcp` with the actual path to your installation.

### Restart Claude Desktop

After updating the configuration, completely restart Claude Desktop for the changes to take effect.

## Usage

Once configured, you can use the MCP server through Claude with natural language:

```
You: What does "rizz" mean?
Claude: [Uses define_slang tool to fetch definitions]

You: Give me a random slang word
Claude: [Uses random_word tool to get a random term]

You: Look up "ghosting" and show me 5 definitions
Claude: [Fetches 5 definitions for "ghosting"]
```

## Available Tools

### `define_slang`

Look up definitions for a slang term or phrase.

**Parameters:**
- `term` (string, required): The slang term to look up
- `limit` (number, optional): Maximum number of definitions to return (default: 3, max: 10)

**Example:**
```typescript
{
  "term": "bussin",
  "limit": 5
}
```

### `random_word`

Get a random slang word and its definition.

**Parameters:** None

## Project Structure

```
urban-dictionary-mcp/
├── src/
│   ├── index.ts              # Main entry point
│   ├── server.ts             # Server initialization
│   ├── tools/
│   │   ├── index.ts          # Tool exports
│   │   ├── definitions.ts    # Tool definitions
│   │   └── handlers.ts       # Tool request handlers
│   ├── services/
│   │   └── urbanDictionary.ts # API service layer
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   └── utils/
│       └── formatters.ts     # Formatting utilities
├── dist/                     # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## Development

### Building

```bash
npm run build
```

### Watch Mode

For development with auto-rebuild:

```bash
npm run watch
```

### Code Organization

The codebase follows a modular architecture:

- **`tools/`** - MCP tool definitions and handlers
- **`services/`** - External API interactions
- **`types/`** - TypeScript interfaces and types
- **`utils/`** - Utility functions and formatters
- **`server.ts`** - MCP server setup and configuration
- **`index.ts`** - Application entry point

## Error Handling

The server includes comprehensive error handling:

- API request failures with timeout protection
- Input validation
- Graceful degradation for missing data
- Detailed error messages for debugging

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with the [Model Context Protocol SDK](https://github.com/modelcontextprotocol)
- Data provided by [Urban Dictionary API](https://urbandictionary.com)
- Created as a learning project for MCP server development

## Disclaimer

This project is not affiliated with or endorsed by Urban Dictionary. Content is provided by the Urban Dictionary community and may contain profanity or offensive material.

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Note**: Urban Dictionary content is user-generated and may not always be accurate or appropriate. Use discretion when relying on definitions.