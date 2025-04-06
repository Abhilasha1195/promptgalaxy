import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'tools.json');

// Handle POST requests (add a tool)
export async function POST(request: Request) {
  try {
    const newTool = await request.json();

    const fileData = await readFile(filePath, 'utf-8');
    const tools = JSON.parse(fileData);

    tools.push(newTool);

    await writeFile(filePath, JSON.stringify(tools, null, 2));

    return NextResponse.json({ message: 'Tool added successfully' });
  } catch (error) {
    console.error('Error saving tool:', error);
    return NextResponse.json({ message: 'Failed to save tool' }, { status: 500 });
  }
}

// Handle GET requests (return all tools)
export async function GET() {
  try {
    const fileData = await readFile(filePath, 'utf-8');
    const tools = JSON.parse(fileData);
    return NextResponse.json(tools);
  } catch (error) {
    console.error('Error reading tools file:', error);
    return NextResponse.json({ message: 'Failed to read tools' }, { status: 500 });
  }
}
