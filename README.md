# Urban Dictionary MCP Server

MCP server exposing Urban Dictionary slang definitions for agentic systems (Claude Desktop & other MCP clients).

[![NPM Version](https://img.shields.io/npm/v/urban-dictionary-mcp.svg)](https://www.npmjs.com/package/urban-dictionary-mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install & Run

Requires Node 20+.

Quick test:

```bash
npx urban-dictionary-mcp
```

Global install:

```bash
npm install -g urban-dictionary-mcp
urban-dictionary-mcp
```

## Claude Desktop Configuration

Add to config file (`macOS: ~/Library/Application Support/Claude/claude_desktop_config.json`, `Windows: %APPDATA%\Claude\claude_desktop_config.json`):

Using npx (recommended):

```json
{
  "mcpServers": {
    "urbandictionary": { "command": "npx", "args": ["urban-dictionary-mcp"] }
  }
}
```

Global installation:

```json
{
  "mcpServers": {
    "urbandictionary": { "command": "urban-dictionary-mcp" }
  }
}
```

Restart Claude Desktop after changes.

## Tools

`define_slang` – lookup definitions.

Parameters:

```text
term (string, required)
limit (number, optional, default 3, max 10)
```

`random_word` – random slang + definition (no parameters).

## Example Interaction

```text
You: What does "rizz" mean?
You: Give me a random slang word
```

## Links & License

GitHub: [harshit-kushwaha/urban-dictionary-mcp](https://github.com/harshit-kushwaha/urban-dictionary-mcp)
Issues: [Report Issues](https://github.com/harshit-kushwaha/urban-dictionary-mcp/issues)

MIT License. Urban Dictionary community content may contain profanity or offensive material.
