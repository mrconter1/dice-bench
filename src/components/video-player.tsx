'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { TestVideo, testVideos, shuffleVideos } from '@/lib/test-data'

export function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showTest, setShowTest] = useState(false)
  const [videoStatus, setVideoStatus] = useState<string>('Loading...')
  const [isLoaded, setIsLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [shuffledVideos, setShuffledVideos] = useState<TestVideo[]>([])
  const [userGuesses, setUserGuesses] = useState<{[key: number]: number}>({})
  const [showResults, setShowResults] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)

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

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  const stepFrame = useCallback((forward: boolean) => {
    if (videoRef.current) {
      videoRef.current.currentTime += forward ? 0.033 : -0.033
    }
  }, [])

  const changeSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
      setPlaybackRate(speed)
    }
  }

  const submitGuess = (value: number) => {
    setSelectedNumber(value)
  }

  const confirmGuess = () => {
    if (selectedNumber !== null) {
      // Record the guess
      setUserGuesses(prev => ({
        ...prev,
        [shuffledVideos[currentVideoIndex].id]: selectedNumber
      }))
      setSelectedNumber(null)

      // Immediately move to next video
      if (currentVideoIndex < shuffledVideos.length - 1) {
        setCurrentVideoIndex(prev => prev + 1)
        setIsLoaded(false)
        setVideoStatus('Loading...')
        setIsPlaying(false)
        setProgress(0)
      } else {
        setShowResults(true)
      }
    }
  }

  const calculateAccuracy = () => {
    const correct = Object.entries(userGuesses).filter(([videoId, guess]) => {
      const video = testVideos.find(v => v.id === parseInt(videoId))
      return video && guess === video.outcome
    }).length
    return (correct / testVideos.length) * 100
  }

  // Modify video source to use current video
  useEffect(() => {
    if (videoRef.current && shuffledVideos.length > 0) {
      videoRef.current.src = shuffledVideos[currentVideoIndex].path
      videoRef.current.load()
    }
  }, [currentVideoIndex, shuffledVideos])

  // Initialize shuffled videos when test starts
  useEffect(() => {
    if (showTest) {
      setShuffledVideos(shuffleVideos(testVideos))
    }
  }, [showTest])

  // Add keyboard controls
  useEffect(() => {
    if (!showTest) return // Only add listeners after test starts

    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent default behavior for these keys
      if (['Space', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault()
      }

      switch (e.code) {
        case 'Space':
          togglePlay()
          break
        case 'ArrowLeft':
          stepFrame(false)
          break
        case 'ArrowRight':
          stepFrame(true)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showTest, togglePlay, stepFrame]) // Include dependencies

  // Add time update handler
  const handleTimeUpdate = () => {
    if (videoRef.current && !isDraggingRef.current) {
      setProgress(videoRef.current.currentTime)
    }
  }

  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  // Handle click on progress bar
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      const newTime = pos * duration
      videoRef.current.currentTime = newTime
      setProgress(newTime)
    }
  }

  // Handle drag on progress bar
  const handleProgressBarDrag = useCallback((e: MouseEvent) => {
    if (videoRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect()
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const newTime = pos * duration
      videoRef.current.currentTime = newTime
      setProgress(newTime)
    }
  }, [duration])

  const handleDragStart = () => {
    isDraggingRef.current = true
    window.addEventListener('mousemove', handleProgressBarDrag)
    window.addEventListener('mouseup', handleDragEnd)
  }

  const handleDragEnd = useCallback(() => {
    isDraggingRef.current = false
    window.removeEventListener('mousemove', handleProgressBarDrag)
    window.removeEventListener('mouseup', handleDragEnd)
  }, [handleProgressBarDrag])

  // Cleanup drag listeners
  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleProgressBarDrag)
      window.removeEventListener('mouseup', handleDragEnd)
    }
  }, [handleProgressBarDrag, handleDragEnd])

  // Format time as MM:SS.mmm
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const milliseconds = Math.floor((time % 1) * 1000)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`
  }

  if (!showTest) {
    return (
      <div className="not-prose rounded-lg overflow-hidden shadow-xl">
        <div className="aspect-video bg-black/5 rounded-lg border border-border flex flex-col items-center justify-center space-y-4 p-4">
          <p className="text-muted-foreground text-center">
            Ready to test your prediction skills?
          </p>
          <button
            onClick={() => setShowTest(true)}
            className="bg-foreground text-background px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Start Test (10 Videos)
          </button>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="p-8 border-2 rounded-xl bg-secondary/20 space-y-4">
        <h3 className="text-xl font-bold">Test Complete!</h3>
        <p className="text-lg">Your accuracy: {calculateAccuracy().toFixed(1)}%</p>
        <button
          onClick={() => {
            setShowTest(false)
            setCurrentVideoIndex(0)
            setUserGuesses({})
            setShowResults(false)
          }}
          className="mt-4 px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-border">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          controls={false}
          playsInline
          preload="auto"
          muted
          onLoadedData={handleVideoLoaded}
          onError={(e) => {
            console.error('Video error:', e.currentTarget.error)
            setVideoStatus('Error loading video')
          }}
        >
          <source src="/example.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">
              {videoStatus}
            </div>
          </div>
        )}
      </div>
      
      {/* Time slider */}
      <div className="space-y-2">
        <div
          ref={progressBarRef}
          className="h-2 bg-muted rounded-full cursor-pointer relative group"
          onClick={handleProgressBarClick}
          onMouseDown={handleDragStart}
        >
          <div
            className="absolute h-full bg-foreground rounded-full transition-all group-hover:bg-foreground/80"
            style={{ width: `${(progress / duration) * 100}%` }}
          />
          <div
            className="absolute h-4 w-4 bg-foreground rounded-full -top-1 -ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${(progress / duration) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={togglePlay}
          className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
          title="Press Space to play/pause"
        >
          {isPlaying ? (
            <>
              Pause
              <span className="hidden sm:inline"> (Space)</span>
            </>
          ) : (
            <>
              Play
              <span className="hidden sm:inline"> (Space)</span>
            </>
          )}
        </button>
        
        <button
          onClick={() => stepFrame(false)}
          className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
          title="Press Left Arrow to step backward"
        >
          Previous Frame
          <span className="hidden sm:inline"> (←)</span>
        </button>
        
        <button
          onClick={() => stepFrame(true)}
          className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
          title="Press Right Arrow to step forward"
        >
          Next Frame
          <span className="hidden sm:inline"> (→)</span>
        </button>
        
        <select
          value={playbackRate}
          onChange={(e) => changeSpeed(Number(e.target.value))}
          className="px-4 py-2 border rounded-lg bg-background hover:bg-muted transition-colors cursor-pointer"
        >
          <option value={0.25}>0.25x</option>
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={2}>2x</option>
        </select>
      </div>

      {/* Add progress indicator */}
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>Video {currentVideoIndex + 1} of {testVideos.length}</span>
        <div className="flex gap-1">
          {shuffledVideos.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx === currentVideoIndex ? 'bg-accent' :
                idx < currentVideoIndex ? 'bg-foreground' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h4 className="text-lg font-semibold">What number will the die show?</h4>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <button
              key={number}
              onClick={() => submitGuess(number)}
              className={`px-6 py-4 border rounded-lg transition-colors text-lg font-medium
                ${selectedNumber === number 
                  ? 'bg-accent text-accent-foreground border-accent' 
                  : 'hover:bg-muted'
                }`}
            >
              {number}
            </button>
          ))}
        </div>
        {selectedNumber !== null && (
          <div className="flex justify-center mt-4">
            <button
              onClick={confirmGuess}
              className="px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
            >
              {currentVideoIndex < shuffledVideos.length - 1 ? 'Submit and Continue' : 'Submit and See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 