import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data', 'tools.json');

export async function POST(req: NextRequest) {
  const newTool = await req.json();

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const tools = JSON.parse(fileContent);

    tools.push(newTool);
    await fs.writeFile(filePath, JSON.stringify(tools, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'Tool saved.' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to save tool.' }, { status: 500 });
  }
}
