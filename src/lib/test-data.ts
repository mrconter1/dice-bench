export type TestVideo = {
  id: number
  path: string
  outcome: number
}

export const testVideos: TestVideo[] = [
  { id: 1, path: "/example.webm", outcome: 4 },
  { id: 2, path: "/example.webm", outcome: 4 },
  { id: 3, path: "/example.webm", outcome: 4 },
  { id: 4, path: "/example.webm", outcome: 4 },
  { id: 5, path: "/example.webm", outcome: 4 }
]

export function shuffleVideos(videos: TestVideo[]): TestVideo[] {
  const shuffled = [...videos]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
} 