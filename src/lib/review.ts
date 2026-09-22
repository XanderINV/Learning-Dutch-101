export type ReviewRating = 'Again' | 'Hard' | 'Good' | 'Easy';

export type ReviewStatus =
  | 'new'
  | 'learning'
  | 'review'
  | 'mastered'
  | 'missed';

export interface ReviewItem {
  cardId: string;
  ease: number;
  interval: number;
  repetitions: number;
  dueDate: string;
  status: ReviewStatus;
  lastReviewed?: string;
}

const MS_PER_DAY = 86_400_000;

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(from: string, days: number): string {
  const d = new Date(from + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function createReviewItem(cardId: string): ReviewItem {
  return {
    cardId,
    ease: 2.5,
    interval: 0,
    repetitions: 0,
    dueDate: todayIso(),
    status: 'new',
  };
}

export function rateCard(
  item: ReviewItem,
  rating: ReviewRating,
  now = todayIso(),
): ReviewItem {
  const next = { ...item, lastReviewed: now };

  if (rating === 'Again') {
    next.repetitions = 0;
    next.interval = 0;
    next.ease = Math.max(1.3, item.ease - 0.2);
    next.dueDate = addDays(now, 1);
    next.status = 'learning';
    return next;
  }

  if (rating === 'Hard') {
    next.ease = Math.max(1.3, item.ease - 0.15);
    next.repetitions = item.repetitions + 1;
    next.interval = item.interval <= 0 ? 1 : Math.max(1, Math.round(item.interval * 1.2));
    next.dueDate = addDays(now, next.interval);
    next.status = next.interval >= 21 ? 'mastered' : 'review';
    return next;
  }

  if (rating === 'Good') {
    next.repetitions = item.repetitions + 1;
    if (item.repetitions === 0) {
      next.interval = 1;
    } else if (item.repetitions === 1) {
      next.interval = 3;
    } else {
      next.interval = Math.round(item.interval * item.ease);
    }
    next.dueDate = addDays(now, next.interval);
    next.status =
      next.interval >= 21 ? 'mastered' : item.status === 'new' ? 'learning' : 'review';
    return next;
  }

  // Easy
  next.ease = item.ease + 0.15;
  next.repetitions = item.repetitions + 1;
  next.interval =
    item.repetitions === 0
      ? 4
      : Math.round(Math.max(item.interval, 1) * item.ease * 1.3);
  next.dueDate = addDays(now, next.interval);
  next.status = next.interval >= 21 ? 'mastered' : 'review';
  return next;
}

export function getDueItems(items: ReviewItem[], asOf = todayIso()): ReviewItem[] {
  return items.filter((item) => item.dueDate <= asOf);
}

export type StatusCounts = Record<ReviewStatus, number>;

export function getStatusCounts(items: ReviewItem[]): StatusCounts {
  const counts: StatusCounts = {
    new: 0,
    learning: 0,
    review: 0,
    mastered: 0,
    missed: 0,
  };
  for (const item of items) {
    counts[item.status] += 1;
  }
  return counts;
}

export function markMissedIfOverdue(
  items: ReviewItem[],
  asOf = todayIso(),
  graceDays = 3,
): ReviewItem[] {
  return items.map((item) => {
    if (item.status === 'mastered') return item;
    const due = new Date(item.dueDate + 'T12:00:00').getTime();
    const now = new Date(asOf + 'T12:00:00').getTime();
    if (now - due > graceDays * MS_PER_DAY) {
      return { ...item, status: 'missed' as const };
    }
    return item;
  });
}
