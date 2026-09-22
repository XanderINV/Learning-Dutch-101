const CURLY_APOSTROPHE = /\u2019|\u2018/g;
const TRAILING_PUNCT = /[.,!?;:]+$/;

export type NormalizeOptions = {
  lowercase?: boolean;
  stripTrailingPunctuation?: boolean;
};

export function normalizeAnswer(
  input: string,
  options: NormalizeOptions = {},
): string {
  const { lowercase = true, stripTrailingPunctuation = true } = options;
  let value = input.trim().replace(CURLY_APOSTROPHE, "'");
  value = value.replace(/\s+/g, ' ');
  if (stripTrailingPunctuation) {
    value = value.replace(TRAILING_PUNCT, '');
  }
  if (lowercase) {
    value = value.toLocaleLowerCase('nl-NL');
  }
  return value;
}

export type CheckAnswerOptions = NormalizeOptions & {
  /** Allow user answer to match if it equals an accepted answer after normalization */
};

export function checkAnswer(
  userInput: string,
  acceptedAnswers: string[],
  options: CheckAnswerOptions = {},
): boolean {
  if (acceptedAnswers.length === 0) return false;
  const normalizedUser = normalizeAnswer(userInput, options);
  return acceptedAnswers.some(
    (accepted) => normalizeAnswer(accepted, options) === normalizedUser,
  );
}

/** Compare ordered lists (e.g. sentence order) */
export function checkOrderedAnswer(
  userItems: string[],
  acceptedAnswers: string[],
  options: CheckAnswerOptions = {},
): boolean {
  const userJoined = normalizeAnswer(userItems.join(' '), options);
  return acceptedAnswers.some((accepted) => {
    const parts = accepted.split(/\s*\|\s*|\s*\/\s*/);
    if (parts.length > 1) {
      return (
        normalizeAnswer(parts.join(' '), options) === userJoined ||
        parts.map((p) => normalizeAnswer(p, options)).join('|') ===
          userItems.map((p) => normalizeAnswer(p, options)).join('|')
      );
    }
    return normalizeAnswer(accepted, options) === userJoined;
  });
}

/** Matching pairs: acceptedAnswers entries like "left=right" or "left::right" (optionally joined with |) */
export function checkMatchingAnswer(
  pairs: { left: string; right: string }[],
  acceptedAnswers: string[],
  options: CheckAnswerOptions = {},
): boolean {
  const normalizePairKey = (left: string, right: string) =>
    `${normalizeAnswer(left, options)}=${normalizeAnswer(right, options)}`;

  const canonical = pairs
    .map((p) => normalizePairKey(p.left, p.right))
    .sort()
    .join('|');

  // Prefer comparing against the full set of expected pairs when provided one-per-entry
  if (acceptedAnswers.length === pairs.length) {
    const expected = acceptedAnswers
      .map((accepted) => {
        const part = accepted.includes('::')
          ? accepted.replace('::', '=')
          : accepted;
        const [l, r] = part.split('=');
        return normalizePairKey(l ?? '', r ?? '');
      })
      .sort()
      .join('|');
    if (expected === canonical) return true;
  }

  return acceptedAnswers.some((accepted) => {
    const normalized = accepted
      .split('|')
      .map((part) => {
        const cleaned = part.includes('::') ? part.replace('::', '=') : part;
        const [l, r] = cleaned.split('=');
        return normalizePairKey(l ?? '', r ?? '');
      })
      .sort()
      .join('|');
    return normalized === canonical;
  });
}
