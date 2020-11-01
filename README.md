# react-voice-recorder
React voice recorder component using `navigator`'s `mediaDevices` and `MediaRecorder `api that provides record/play/pause functionalities for developers using **render-props** design pattern.

## demo
see **[Demo](https://codesandbox.io/s/react-voice-recorder-demo-9i8ik)** at **[https://codesandbox.io/s/react-voice-recorder-demo-9i8ik](https://codesandbox.io/s/react-voice-recorder-demo-9i8ik)**

## usage
add package using `yarn`

```
    yarn add react-voice-recorder
```

use this render-props component:

```js
import React from 'react'

import VoiceDecorator from 'react-voice-recorder'

export default function App() {
  return (
    <div>
      <VoiceDecorator
        render={(props) => (
          <>
            <h1 onClick={props.toggleRecord}>
              {props.isRecording ? 'Stop Recording' : 'Record'}
            </h1>
            <h1 onClick={props.togglePlay}>
              {props.isPlaying ? 'Pause' : 'Play'}
            </h1>
          </>
        )}
      />
    </div>
  )
}
```

## limitation
_This package doesn't work on Safari with iOS versions lower than 13.4 (for the higher versions it works fine)_