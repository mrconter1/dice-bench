'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { TestVideo, testVideos, shuffleVideos } from '@/lib/test-data'

export function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showTest, setShowTest] = useState(false)
  const [videoStatus, setVideoStatus] = useState<string>('Loading...')
  const [isLoaded, setIsLoaded] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [shuffledVideos, setShuffledVideos] = useState<TestVideo[]>([])
  const [userGuesses, setUserGuesses] = useState<{[key: number]: number}>({})
  const [showResults, setShowResults] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [scale, setScale] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const lastDistance = useRef<number | null>(null)

  const getRelativePosition = (e: WheelEvent | TouchEvent | MouseEvent) => {
    if (!containerRef.current) return { x: 0.5, y: 0.5 }
    
    const rect = containerRef.current.getBoundingClientRect()
    let x, y
    
    if ('touches' in e && e.touches.length === 2) {
      // For pinch zoom
      x = ((e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left) / rect.width
      y = ((e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top) / rect.height
    } else if ('clientX' in e) {
      // For mouse wheel
      x = (e.clientX - rect.left) / rect.width
      y = (e.clientY - rect.top) / rect.height
    } else {
      // Fallback to center
      x = 0.5
      y = 0.5
    }
    
    // Ensure values are within bounds
    return {
      x: Math.max(0, Math.min(1, x)),
      y: Math.max(0, Math.min(1, y))
    }
  }

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      if (videoRef.current.readyState > 0) {
        setIsLoaded(true)
        setVideoStatus('')
        setDuration(videoRef.current.duration)
      }
    }
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

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    if (!containerRef.current) return

    const delta = -e.deltaY
    const zoomFactor = 0.1
    const newScale = Math.max(1, Math.min(4, scale + (delta > 0 ? zoomFactor : -zoomFactor)))
    
    if (newScale !== scale) {
      const { x: relativeX, y: relativeY } = getRelativePosition(e)
      const containerWidth = containerRef.current.offsetWidth
      const containerHeight = containerRef.current.offsetHeight
      
      // Calculate how much the scale is changing
      const scaleDiff = newScale - scale
      
      // Calculate new position to keep the cursor point fixed
      const newPosition = {
        x: position.x - (scaleDiff * containerWidth * relativeX),
        y: position.y - (scaleDiff * containerHeight * relativeY)
      }
      
      // Apply bounds
      const boundedPosition = {
        x: Math.min(Math.max(newPosition.x, (1 - newScale) * containerWidth), 0),
        y: Math.min(Math.max(newPosition.y, (1 - newScale) * containerHeight), 0)
      }
      
      setPosition(boundedPosition)
      setScale(newScale)
    }
  }

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      lastDistance.current = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2 && lastDistance.current !== null) {
      e.preventDefault()
      if (!containerRef.current) return

      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const newDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      
      const delta = newDistance - lastDistance.current
      const zoomFactor = 0.01
      const newScale = Math.max(1, Math.min(4, scale + delta * zoomFactor))
      
      if (newScale !== scale) {
        const { x: relativeX, y: relativeY } = getRelativePosition(e)
        const containerWidth = containerRef.current.offsetWidth
        const containerHeight = containerRef.current.offsetHeight
        
        // Calculate how much the scale is changing
        const scaleDiff = newScale - scale
        
        // Calculate new position to keep the pinch center fixed
        const newPosition = {
          x: position.x - (scaleDiff * containerWidth * relativeX),
          y: position.y - (scaleDiff * containerHeight * relativeY)
        }
        
        // Apply bounds
        const boundedPosition = {
          x: Math.min(Math.max(newPosition.x, (1 - newScale) * containerWidth), 0),
          y: Math.min(Math.max(newPosition.y, (1 - newScale) * containerHeight), 0)
        }
        
        setPosition(boundedPosition)
        setScale(newScale)
      }
      
      lastDistance.current = newDistance
    }
  }

  const handleTouchEnd = () => {
    lastDistance.current = null
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      container.addEventListener('touchstart', handleTouchStart, { passive: false })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
      container.addEventListener('touchend', handleTouchEnd)
      
      return () => {
        container.removeEventListener('wheel', handleWheel)
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [scale])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && scale > 1) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      
      // Calculate bounds to prevent dragging outside visible area
      const bounds = {
        x: Math.min(Math.max(newX, (1 - scale) * containerRef.current!.offsetWidth), 0),
        y: Math.min(Math.max(newY, (1 - scale) * containerRef.current!.offsetHeight), 0)
      }
      
      setPosition(bounds)
    }
  }, [isDragging, scale, dragStart])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Add this useEffect for mouse move/up listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const resetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  // Add useEffect to handle initial video loading
  useEffect(() => {
    if (videoRef.current) {
      // If video already has data when mounted, mark as loaded
      if (videoRef.current.readyState > 0) {
        setIsLoaded(true)
        setVideoStatus('')
        setDuration(videoRef.current.duration)
      } else {
        // Only show loading if video actually needs to load
        setIsLoaded(false)
        setVideoStatus('Loading...')
      }
    }
  }, [])

  if (!showTest) {
    return (
      <div className="space-y-4">
        <div 
          ref={containerRef}
          className="relative aspect-video bg-black rounded-lg overflow-hidden border border-border"
        >
          <div 
            className="absolute inset-0 transition-transform duration-100 ease-out"
            style={{ 
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              transformOrigin: '0 0'
            }}
            onMouseDown={handleMouseDown}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              onEnded={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onLoadedData={handleVideoLoaded}
              onCanPlay={handleVideoLoaded}
              onCanPlayThrough={() => {
                setIsLoaded(true)
                setVideoStatus('')
              }}
              controls={false}
              playsInline
              preload="auto"
              muted
              onError={(e) => {
                console.error('Video error:', e.currentTarget.error)
                setVideoStatus('Error loading video')
              }}
            >
              <source src="/example.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
          {!isLoaded && videoStatus && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">
                {videoStatus}
              </div>
            </div>
          )}
          {scale > 1 && (
            <button
              onClick={resetZoom}
              className="absolute top-2 right-2 px-2 py-1 bg-background/80 backdrop-blur-sm text-foreground text-sm rounded hover:bg-background/90 transition-colors"
            >
              Reset Zoom
            </button>
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
            <option value={0.1}>0.1x</option>
            <option value={0.25}>0.25x</option>
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
          </select>
        </div>

        <div className="mt-8 p-6 border border-border rounded-lg bg-secondary/5 space-y-4">
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-medium text-primary">Ready to Test Your Prediction Skills?</h3>
            <p className="text-sm text-muted-foreground">
              Try to predict the final number shown on the die in 10 different videos. 
              Use the controls above to analyze each throw carefully.
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setShowTest(true)}
              className="bg-foreground text-background px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Start Test (10 Videos)
            </button>
          </div>
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
      <div 
        ref={containerRef}
        className="relative aspect-video bg-black rounded-lg overflow-hidden border border-border"
      >
        <div 
          className="absolute inset-0 transition-transform duration-100 ease-out"
          style={{ 
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            transformOrigin: '0 0'
          }}
          onMouseDown={handleMouseDown}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            onEnded={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onLoadedData={handleVideoLoaded}
            onCanPlay={handleVideoLoaded}
            onCanPlayThrough={() => {
              setIsLoaded(true)
              setVideoStatus('')
            }}
            controls={false}
            playsInline
            preload="auto"
            muted
            onError={(e) => {
              console.error('Video error:', e.currentTarget.error)
              setVideoStatus('Error loading video')
            }}
          >
            <source src="/example.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        {!isLoaded && videoStatus && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">
              {videoStatus}
            </div>
          </div>
        )}
        {scale > 1 && (
          <button
            onClick={resetZoom}
            className="absolute top-2 right-2 px-2 py-1 bg-background/80 backdrop-blur-sm text-foreground text-sm rounded hover:bg-background/90 transition-colors"
          >
            Reset Zoom
          </button>
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
          <option value={0.1}>0.1x</option>
          <option value={0.25}>0.25x</option>
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
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