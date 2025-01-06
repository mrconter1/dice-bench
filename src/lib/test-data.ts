export type TestVideo = {
  id: number
  path: string
  outcome: number
}

export const testVideos: TestVideo[] = [
  { id: 1, path: "/dataset/FEA.webm", outcome: 5 },
  { id: 2, path: "/dataset/FEB.webm", outcome: 5 },
  { id: 3, path: "/dataset/FEC.webm", outcome: 5 },
  { id: 4, path: "/dataset/FYA.webm", outcome: 4 },
  { id: 5, path: "/dataset/FYB.webm", outcome: 4 },
  { id: 6, path: "/dataset/FYC.webm", outcome: 4 },
  { id: 7, path: "/dataset/SA.webm", outcome: 6 },
  { id: 8, path: "/dataset/SB.webm", outcome: 6 },
  { id: 9, path: "/dataset/TA.webm", outcome: 3 },
  { id: 10, path: "/dataset/TB.webm", outcome: 3 }
]

export function shuffleVideos(videos: TestVideo[]): TestVideo[] {
  const shuffled = [...videos]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
} 