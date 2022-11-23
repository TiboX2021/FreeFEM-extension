/**
 * Returns true if c is an alphanumeric character (a-z & 0-9)
 */
export function isAlphaNumeric(c: string | undefined): boolean {
    if (c === undefined) return false;
    return /^[a-z0-9]+$/i.test(c);
}

/**
 * Parse the full alphanumeric word at the position 'position' in the string 's'
 */
export function parseWord(s: string, position: number): string {
    let start = position;
    let end = position;

    while (start > 0 && isAlphaNumeric(s.at(start - 1))) start--;
    while (end < s.length && isAlphaNumeric(s.at(end))) end++;

    return s.slice(start, end);
}
