export function testSound<T extends AudioNode>(tgt?: T) {
    console.log(`testing sound`);
    this.defaultSource ??= createBoopBuffer.call(this);
    let testNoise = this.ctx.createBufferSource();
    testNoise.buffer = this.defaultSource;
    testNoise.connect(tgt ?? this.ctx.destination);
    console.log(`beginning sound test`);
    testNoise.start();
    testNoise.onended = () => {
      console.log(`sound test complete`);
    };
  }

  function createBoopBuffer(frameCount: number = 2048) {
    const myArrayBuffer = this.ctx.createBuffer(1, frameCount, this.ctx.sampleRate);
    const nowBuffering = myArrayBuffer.getChannelData(0);
      for (let i = 0; i < frameCount; i++) {
        nowBuffering[i] = Math.sin(Math.PI * (i / frameCount)*55)*0.2;
      }
    return myArrayBuffer;
  }