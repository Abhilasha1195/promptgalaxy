import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Correct path to tools.json
const filePath = path.join(process.cwd(), 'public', 'data', 'tools.json');

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the request body
    if (!body.name || !body.slug || !body.description) {
      return NextResponse.json(
        { success: false, message: 'Invalid data. Required fields: name, slug, description.' },
        { status: 400 }
      );
    }

    // Read the existing tools from the file
    const fileData = await fs.readFile(filePath, 'utf-8');
    const tools = JSON.parse(fileData);

    // Check for duplicate slug
    if (tools.some((tool: { slug: string }) => tool.slug === body.slug)) {
      return NextResponse.json(
        { success: false, message: 'A tool with this slug already exists.' },
        { status: 409 }
      );
    }

    // Add the new tool to the list
    tools.push({
      name: body.name.trim(),
      slug: body.slug.trim(),
      description: body.description.trim(),
    });

    // Write the updated tools back to the file
    await fs.writeFile(filePath, JSON.stringify(tools, null, 2));

    return NextResponse.json({ success: true, message: 'Tool added successfully.' });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while processing the request.' },
      { status: 500 }
    );
  }
}