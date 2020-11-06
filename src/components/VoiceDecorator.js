import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import useInterval from '@use-it/interval'

import audioRecorder from '../libs/recorder'

function VoiceDecorator({ render, timeout, voiceGetter }) {
  const [recorder, setRecorder] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recorded, setRecorded] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [voiceCounter, setVoiceCounter] = useState(null)

  useEffect(() => {
    return () => {
      setVoiceCounter(null)
    }
  }, [])

  useEffect(() => {
    voiceGetter(() => ({ audio: recorded?.audio, blob: recorded?.dataBlob }))
  }, [recorded])

  const stopRecord = useCallback(async () => {
    try {
      setIsRecording(false)
      const res = await recorder.stop()
      setRecorded(res)
    } catch (_) {
      // nth
    }
  }, [recorder])

  const startRecord = useCallback(async () => {
    if (isRecording) return

    try {
      const rec = await audioRecorder()
      setRecorder(rec)

      setIsRecording(true)
      rec.start()
      const timeoutId = setTimeout(() => {
        stopRecord()
        clearTimeout(timeoutId)
      }, timeout)
    } catch (_) {
      console.error('Cannot record in your device')
    }
  }, [isRecording, timeout, stopRecord])

  const stopPlay = useCallback(() => {
    setIsPlaying(false)
    setVoiceCounter(null)
    recorded.pause()
  }, [recorded])

  const startPlay = useCallback(() => {
    if (!recorded) {
      console.error('There is not any recorded voice to play')
      return
    }
    setIsPlaying(true)
    setVoiceCounter(1000)
    recorded.play()
  }, [recorded])

  useInterval(() => {
    try {
      if (recorded && recorded.isPaused()) {
        setVoiceCounter(null)
        setIsPlaying(false)
      }
    } catch (_) {
      // nth
    }
  }, voiceCounter)

  const props = {
    toggleRecord: () => (isRecording ? stopRecord() : startRecord()),
    togglePlay: () => (isPlaying ? stopPlay() : startPlay()),
    isPlaying,
    isRecording
  }

  return <>{render(props)}</>
}

VoiceDecorator.propTypes = {
  render: PropTypes.func.isRequired,
  timeout: PropTypes.number,
  voiceGetter: PropTypes.func
}

VoiceDecorator.defaultProps = {
  timeout: 120000,
  voiceGetter: () => {}
}

export default VoiceDecorator
