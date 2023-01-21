// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const jsonDirectory = path.join(process.cwd(), 'json');
    const absences = await fs
      .readFile(jsonDirectory + '/absences.json', 'utf8')
      .then((data) => JSON.parse(data))
      .then((data) => data.payload);

    const types: any[] = [];
    const unique = Array.from(new Set(absences.map((item: any) => item.type)));

    unique.map((absent: any) => {
      types.push({ value: absent, label: absent });
    });

    res.status(200).json(types);
  } catch (error) {
    res.status(404).json({ error: 'List is unavailable!' });
  }
}
