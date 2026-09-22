import {
  createReviewItem,
  getDueItems,
  getStatusCounts,
  rateCard,
} from '@/lib/review';

describe('review SM-2 inspired', () => {
  it('schedules again soon on failure', () => {
    const item = createReviewItem('v1');
    const rated = rateCard(item, 'Again', '2025-01-01');
    expect(rated.status).toBe('learning');
    expect(rated.dueDate).toBe('2025-01-02');
  });

  it('counts statuses and finds due items', () => {
    const items = [
      { ...createReviewItem('a'), dueDate: '2025-01-01', status: 'new' as const },
      { ...createReviewItem('b'), dueDate: '2099-01-01', status: 'review' as const },
    ];
    expect(getDueItems(items, '2025-06-01')).toHaveLength(1);
    expect(getStatusCounts(items).new).toBe(1);
  });
});
