import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

type Tool = {
  name: string;
  slug: string;
  description: string;
};

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
    const file = await fs.readFile(filePath, 'utf-8');
    const tools: Tool[] = JSON.parse(file);

    // Check for duplicate slug
    const exists = tools.find((t) => t.slug === slug);
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