// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { days_between } from 'utils/days_between';
import { absent_status } from 'utils/absent_status';

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
            userId: member.userId,
            name: member.name,
            type: absent.type,
            period:
              days_between(
                new Date(absent.startDate),
                new Date(absent.endDate)
              ) + ' days',
            memberNote: absent.memberNote,
            status: absent_status(
              absent.createdAt,
              absent.confirmedAt,
              absent.rejectedAt
            ),
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
