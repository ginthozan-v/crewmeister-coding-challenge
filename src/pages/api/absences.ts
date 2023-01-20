// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export function days_between(date1: any, date2: any) {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const differenceMs = Math.abs(date1 - date2);
  return Math.round(differenceMs / ONE_DAY);
}

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
    const members = await fs
      .readFile(jsonDirectory + '/members.json', 'utf8')
      .then((data) => JSON.parse(data))
      .then((data) => data.payload);

    const filtered: any[] = [];

    members.map((member: any) =>
      absences.map((absent: any, i: number) => {
        if (member.userId === absent.userId) {
          filtered.push({
            id: member.id,
            name: member.name,
            type: absent.type,
            period: days_between(absent.startDate, absent.endDate) + ' days',
            memberNote: absent.memberNote,
            status: 'Requested',
            admitterNote: absent.admitterNote,
            startDate: absent.startDate,
            endDate: absent.endDate,
          });
        }
      })
    );

    res.status(200).json(filtered);
  } catch (error) {
    res.status(404).json({ error: 'List is unavailable!' });
  }
}
