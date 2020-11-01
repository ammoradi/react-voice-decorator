let checked = false

// Older browsers might not implement mediaDevices at all, so we set an empty object first
if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {}
}

// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = constraints => {
    // First get ahold of the legacy getUserMedia, if present
    const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia

    // Some browsers just don't implement it - return a rejected promise with an error
    // to keep a consistent interface
    if (!getUserMedia) {
      if (!checked) console.error('Cannot record in iOS devices with versions lower than 13.4')
      checked = true
      return Promise.reject('getUserMedia is not implemented in this browser')
    }

    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject)
    })
  }
}

const recorder = () => {
  return new Promise(async resolve => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream)
      let src = ''

      mediaRecorder.addEventListener('dataavailable', event => {
        src = URL.createObjectURL(event.data)
      })

      const start = () => {
        src = ''
        mediaRecorder.start()
      }

      const stop = () =>
        new Promise(rsv => {
          mediaRecorder.addEventListener('stop', () => {
            const audio = new Audio(src)
            const play = () => audio.play()
            const pause = () => {
              audio.pause()
              audio.currentTime = 0
            }
            const isPaused = () => audio.paused

            rsv({ play, pause, ...audio, isPaused })
          })

          mediaRecorder.stop()
          mediaRecorder.stream.getTracks().forEach(i => i.stop())
        })

      resolve({ start, stop })
    })
  })
}

export default recorder
