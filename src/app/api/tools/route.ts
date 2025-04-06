import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

type Tool = {
  name: string;
  slug: string;
  description: string;
};

// Path to the tools.json file
const filePath = path.join(process.cwd(), 'public', 'data', 'tools.json');

// Helper function to read tools.json
async function readToolsFile(): Promise<Tool[]> {
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(file);
  } catch {
    console.warn('tools.json file not found or invalid. Returning an empty array.');
    return [];
  }
}

// Helper function to write to tools.json
async function writeToolsFile(tools: Tool[]): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(tools, null, 2));
  } catch (err) {
    console.error('Error writing to tools.json:', err);
    throw new Error('Failed to write to tools.json');
  }
}

// POST: Add a new tool
export async function POST(req: Request) {
  try {
    const { name, slug, description } = await req.json();

    // Validate the request body
    if (!name || !slug || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing fields. Required: name, slug, description.' },
        { status: 422 }
      );
    }

    // Read existing tools
    const tools = await readToolsFile();

    // Check for duplicate slug
    if (tools.some((tool) => tool.slug === slug.trim())) {
      return NextResponse.json(
        { success: false, error: 'Tool with this slug already exists.' },
        { status: 409 }
      );
    }

    // Add the new tool
    const newTool: Tool = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
    };
    tools.push(newTool);

    // Write updated tools back to the file
    await writeToolsFile(tools);

    return NextResponse.json({ success: true, data: newTool });
  } catch (err) {
    console.error('Error in POST /api/tools:', err); // Log the error for debugging
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

// GET: Fetch all tools
export async function GET() {
  try {
    const tools = await readToolsFile();
    return NextResponse.json({ success: true, data: tools || [] }); // Ensure tools is always an array
  } catch (err) {
    console.error('Error in GET /api/tools:', err); // Log the error for debugging
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tools.', data: [] }, // Return an empty array on error
      { status: 500 }
    );
  }
}