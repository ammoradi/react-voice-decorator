import React from "react"

import VoiceDecorator from "../components/VoiceDecorator"

export default function App() {
  return (
    <div>
      <VoiceDecorator
        render={(props) => (
          <>
            <h1 onClick={props.toggleRecord}>
              {props.isRecording ? "Stop Recording" : "Record"}
            </h1>
            <h1 onClick={props.togglePlay}>
              {props.isPlaying ? "Pause" : "Play"}
            </h1>
          </>
        )}
      />
    </div>
  )
}
