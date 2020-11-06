// Type definitions for react-voice-decorator 1.5.3
// Project: https://github.com/ammoradi/react-voice-decorator
// Definitions by: TingYuLC <https://github.com/ammoradi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.9.6

import { FC, ReactNode } from 'react'

interface IGetterFnResult {
  audio: HTMLAudioElement | null
  blob: Blob | null
}

interface IRenderProps {
  toggleRecord: () => void
  togglePlay: () => void
  isPlaying: boolean
  isRecording: boolean
}

interface VoiceDecoratorProps {
  /** recording time */
  timeout?: number;

  /** render prop */
  render?: (props: IRenderProps) => ReactNode
  voiceGetter?: (getterFn: () => IGetterFnResult) => void
}

declare const VoiceDecorator: FC<VoiceDecoratorProps>

export default VoiceDecorator
