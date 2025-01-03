'use client'

import { useState, useRef, useEffect } from 'react'

export function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showTest, setShowTest] = useState(false)
  const [guess, setGuess] = useState<number | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [videoStatus, setVideoStatus] = useState<string>('Loading...')
  const [isLoaded, setIsLoaded] = useState(false)

  const handleVideoLoaded = () => {
    setIsLoaded(true)
    setVideoStatus('Video loaded')
    console.log('Video dimensions:', {
      width: videoRef.current?.videoWidth,
      height: videoRef.current?.videoHeight
    })
  }

  // Reset loading state when showing test
  useEffect(() => {
    if (showTest) {
      setIsLoaded(false)
      setVideoStatus('Loading...')
    }
  }, [showTest])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const stepFrame = (forward: boolean) => {
    if (videoRef.current) {
      videoRef.current.currentTime += forward ? 0.033 : -0.033 // Approximately 1 frame at 30fps
    }
  }

  const changeSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
      setPlaybackRate(speed)
    }
  }

  const submitGuess = (value: number) => {
    setGuess(value)
    setHasSubmitted(true)
  }

  if (!showTest) {
    return (
      <div className="flex justify-center">
        <button
          onClick={() => setShowTest(true)}
          className="bg-foreground text-background px-6 py-3 rounded-lg hover:opacity-90"
        >
          Start Test
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-border min-h-[300px]">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          onEnded={() => setIsPlaying(false)}
          controls={false}
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoaded}
          onError={(e) => {
            console.error('Video error:', e.currentTarget.error)
            setVideoStatus('Error loading video')
          }}
          style={{ minHeight: '300px' }}
        >
          <source src="/example.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {!isLoaded && (
          <div className="absolute top-2 left-2 text-white bg-black/50 px-2 py-1 rounded">
            {videoStatus}
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-4">
        <button
          onClick={togglePlay}
          className="px-4 py-2 border rounded hover:bg-muted"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <button
          onClick={() => stepFrame(false)}
          className="px-4 py-2 border rounded hover:bg-muted"
        >
          Previous Frame
        </button>
        
        <button
          onClick={() => stepFrame(true)}
          className="px-4 py-2 border rounded hover:bg-muted"
        >
          Next Frame
        </button>
        
        <select
          value={playbackRate}
          onChange={(e) => changeSpeed(Number(e.target.value))}
          className="px-4 py-2 border rounded bg-background"
        >
          <option value={0.25}>0.25x</option>
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={2}>2x</option>
        </select>
      </div>

      {!hasSubmitted ? (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">What number will the die show?</h4>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <button
                key={number}
                onClick={() => submitGuess(number)}
                className="px-6 py-3 border rounded-lg hover:bg-muted"
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 p-4 border rounded-lg bg-muted/50">
          <p>Thank you for participating! Your guess: {guess}</p>
          <p className="text-muted-foreground">
            The actual result will be revealed when you get access to the evaluation set.
          </p>
        </div>
      )}
    </div>
  )
} 