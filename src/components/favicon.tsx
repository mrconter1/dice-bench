'use client'

const Favicon = () => {
  return (
    <>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='black' width='100' height='100' rx='20'/><circle fill='white' cx='50' cy='50' r='8'/></svg>" />
      <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='white' width='100' height='100' rx='20'/><circle fill='black' cx='50' cy='50' r='8'/></svg>" media="(prefers-color-scheme: dark)" />
    </>
  )
}

export default Favicon 