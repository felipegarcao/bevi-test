export function calculateExpirationTime(milliseconds: number): Date {
  const today = new Date();
  const expirationTime = new Date(today.getTime() + milliseconds * 1000);
  return expirationTime;
}

export function verifyExpiresToken(expirationDate: Date): boolean {
  const currentDate = new Date();
  return currentDate > expirationDate;
}

