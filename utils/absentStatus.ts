export function absentStatus(
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
