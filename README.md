# react-voice-decorator
React voice recorder component using `navigator`'s `mediaDevices` and `MediaRecorder `api that provides record/play/pause functionalities for developers using **render-props** design pattern.

## demo
see **[Demo](https://codesandbox.io/s/react-voice-recorder-demo-9i8ik)** at **[https://codesandbox.io/s/react-voice-recorder-demo-9i8ik](https://codesandbox.io/s/react-voice-recorder-demo-9i8ik)**

## usage
* add package using `yarn`

```
    yarn add react-voice-decorator
```

* use the render-props component:

```js
import React, { useCallback, useRef } from 'react'

import VoiceDecorator from 'react-voice-decorator'

export default function App() {
  const voiceRef = useRef(null)

    const getVoice = useCallback((getterFn) => {
    voiceRef.current = getterFn()
  }, [])

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
        voiceGetter={getVoice}
      />
    </div>
  )
}
```

* available props:

| prop key | type |
|  :---:  | :-: |
| toggleRecord | function |
| togglePlay | function |
| isPlaying | boolean |
| isRecording | boolean |
| voiceGetter | function |

## ref
You can get recorded voice as an audio object using react ref

## limitation
_This package doesn't work on Safari with iOS versions lower than 13.4 (for the higher versions it works fine)_