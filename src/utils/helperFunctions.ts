interface Expense {
  id: string;
  amount: number;
  category:
    | 'Food'
    | 'Salary'
    | 'Entertainment'
    | 'Transport'
    | 'Shopping'
    | 'Coffee'
    | 'Freelance'
    | 'Utilities'
    | 'Snacks';
  paymentType: 'Cash' | 'Card' | 'UPI';
  date: string;
}

export const calculateIncomeAndSpent = (expenses: Expense[]) => {
  let income = 0;
  let spent = 0;

  expenses.forEach(expense => {
    if (expense.category === 'Salary' || expense.category === 'Freelance') {
      income += expense.amount;
    } else {
      spent += expense.amount;
    }
  });

  return {
    income,
    spent,
  };
};

export function generatePastelColor(num: number) {
  const hue = hashToHue(num);
  const saturation = 40;
  const lightness = 85;

  return hslToHex(hue, saturation, lightness);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

function hashToHue(num: number) {
  let hash = num;
  hash = ((hash >> 16) ^ hash) * 0x45d9f3b;
  hash = ((hash >> 16) ^ hash) * 0x45d9f3b;
  hash = (hash >> 16) ^ hash;
  return hash % 360;
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const r = Math.round(255 * f(0));
  const g = Math.round(255 * f(8));
  const b = Math.round(255 * f(4));

  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}
