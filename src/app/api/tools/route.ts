import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

type Tool = {
  name: string;
  slug: string;
  description: string;
};

// Path to the tools.json file
const filePath = path.join(process.cwd(), 'tools.json');

export async function POST(req: Request) {
  try {
    // Parse the request body
    const data = await req.json();
    const { name, slug, description } = data;

    // Validate the request body
    if (!name || !slug || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing fields. Required: name, slug, description.' },
        { status: 422 }
      );
    }

    // Read the existing tools from the file
    let tools: Tool[] = [];
    try {
      const file = await fs.readFile(filePath, 'utf-8');
      tools = JSON.parse(file);
    } catch (error) {
      console.warn('tools.json file not found or invalid. Creating a new one.');
    }

    // Check for duplicate slug
    const exists = tools.find((t) => t.slug === slug.trim());
    if (exists) {
      return NextResponse.json(
        { success: false, error: 'Tool with this slug already exists.' },
        { status: 409 }
      );
    }

    // Sanitize and add the new tool
    const newTool = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
    };
    tools.push(newTool);

    // Write the updated tools back to the file
    await fs.writeFile(filePath, JSON.stringify(tools, null, 2));

    return NextResponse.json({ success: true, data: newTool });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Read the tools.json file
    const file = await fs.readFile(filePath, 'utf-8');
    const tools: Tool[] = JSON.parse(file);

    return NextResponse.json({ success: true, data: tools });
  } catch (error) {
    console.error('Error reading tools.json:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tools.' },
      { status: 500 }
    );
  }
}