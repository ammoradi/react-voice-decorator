// Type definitions for react-voice-decorator 1.1.0
// Project: https://github.com/ammoradi/react-voice-decorator
// Definitions by: TingYuLC <https://github.com/ammoradi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.9.6

import { FC, ReactNode } from 'react'

interface IVoice {
  play: () => void
  pause: () => void
  isPaused: () => boolean
}

interface IRenderProps {
  toggleRecord: () => void
  togglePlay: () => void
  isPlaying: boolean
  isRecording: boolean
  voice: IVoice
}

interface VoiceDecoratorProps {
  /** recording time */
  timeout?: number;

  /** render prop */
  render?: (props: IRenderProps) => ReactNode
}

declare class VoiceDecorator extends FC<VoiceDecoratorProps> {}

export default VoiceDecorator
