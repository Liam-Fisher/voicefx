// src_id, src_outlet, tgt_id, tgt_inlet
///type NodeConnection =  [number, number, number, number]

/*
type SourceNode =
  | OscillatorNode
  | AudioBufferSourceNode
  | MediaElementAudioSourceNode
  | MediaStreamAudioSourceNode;
type SinkNode =
  | AnalyserNode
  | AudioDestinationNode
  | MediaStreamAudioDestinationNode;
type FilterNode =
  | BiquadFilterNode
  | ConvolverNode
  | DelayNode
  | DynamicsCompressorNode
  | WaveShaperNode
  | IIRFilterNode
  | PannerNode;
*/

type connection = Record<string, [number?, number?]>;
interface ConnectionMap {
  sourceMap?: connection; // ID, output, input
  sinkMap?: connection;
}