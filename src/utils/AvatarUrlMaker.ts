type Provider = 'ui-avatars' | 'dicebear';
type Opts = { size?: number; rounded?: boolean; provider?: Provider; color?: string };

export function generateAvatarUrl(name: string, options: Opts = {}): string {
  if (!name || typeof name !== 'string') {name="U"}
  const { size = 128, rounded = true, provider = 'ui-avatars', color } = options;

  const words = name.trim().split(/\s+/).slice(0, 2);
  const safeName = words.join(' ');
  const initials = words.map(w => (w[0] || '').toUpperCase()).join('') || '?';

  const nameToHex = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    let col = '';
    for (let i = 0; i < 3; i++) {
      const val = (hash >> (i * 8)) & 0xff;
      col += ('00' + val.toString(16)).slice(-2);
    }
    return col.slice(0, 6);
  };

  const bg = nameToHex(safeName);
  const textColor = color || 'ffffff';

  if (provider === 'dicebear') {
    return `https://avatars.dicebear.com/api/initials/${encodeURIComponent(safeName)}.svg?background=%23${bg}&size=${size}`;
  }

  const params = new URLSearchParams({
    name: safeName,
    size: String(size),
    background: bg,
    color: textColor,
    rounded: rounded ? 'true' : 'false',
    length: String(initials.length),
  });

  return `https://ui-avatars.com/api/?${params.toString()}`;
}
