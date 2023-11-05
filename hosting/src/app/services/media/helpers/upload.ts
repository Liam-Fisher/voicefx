export async function uploadFile(fileIndex: number) {
    if (fileIndex > this.recordedFiles.length) {
      throw new Error(`file index ${fileIndex} out of range. only ${this.recordedFiles.length} files recorded}`);
    }
    console.log(`uploading filename ${this.filename}`);
    const file = this.recordedFiles[fileIndex];
    this.isAudioFileUploadActive.next(true);
    await this.db.uploadFile(file as File, `user_recordings/public/${this.filename}`);
    this.isAudioFileUploadActive.next(false);
  }