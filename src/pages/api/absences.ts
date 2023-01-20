// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const absences = await fs
    .readFile(jsonDirectory + '/absences.json', 'utf8')
    .then((data) => JSON.parse(data))
    .then((data) => data.payload);
  const members = await fs
    .readFile(jsonDirectory + '/members.json', 'utf8')
    .then((data) => JSON.parse(data))
    .then((data) => data.payload);

  const filtered = members?.filter((m: any) =>
    absences?.some((a: any) => a.userId === m.userId)
  );

  res.status(200).json(filtered);
}
