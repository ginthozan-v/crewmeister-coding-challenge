// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { daysBetween } from 'utils/daysBetween';
import { absentStatus } from 'utils/absentStatus';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const jsonDirectory = path.join(process.cwd(), 'json');
    const absences = await fs
      .readFile(jsonDirectory + '/absences.json', 'utf8')
      .then((data) => JSON.parse(data));

    const members = await fs
      .readFile(jsonDirectory + '/members.json', 'utf8')
      .then((data) => JSON.parse(data));

    if (absences.message !== 'Success' || members.message !== 'Success') {
      throw Error();
    } else {
      const filtered: any[] = [];
      members.payload.map((member: any) =>
        absences.payload.map((absent: any, i: number) => {
          if (member.userId === absent.userId) {
            filtered.push({
              id: member.id,
              userId: member.userId,
              name: member.name,
              type: absent.type,
              period:
                daysBetween(
                  new Date(absent.startDate),
                  new Date(absent.endDate)
                ) + ' days',
              memberNote: absent.memberNote,
              status: absentStatus(
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
    }
  } catch (error) {
    res.status(404).json({ error: 'List is unavailable!' });
  }
}
