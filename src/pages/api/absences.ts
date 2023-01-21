// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

function days_between(startDate: Date, endDate: Date) {
  const msInDay = 24 * 60 * 60 * 1000;
  return (
    Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay) + 1
  );
}

function absent_status(
  createdAt: string,
  confirmedAt: string,
  rejectedAt: string
) {
  if (createdAt && !confirmedAt && !rejectedAt) {
    return 'Requested';
  } else if (confirmedAt && !rejectedAt) {
    return 'Confirmed';
  } else if (!confirmedAt && rejectedAt) {
    return 'Rejected';
  }
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
