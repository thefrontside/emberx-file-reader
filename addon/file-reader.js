class ProgressEvent {
  constructor(original) {
    this.original = original;
    this.timestamp = new Date();
  }

  get lengthComputable() { return this.original.lengthComputable; }
  get loaded() { return this.original.loaded; }
  get total() { return this.original.total; }

  get ratio() {
    if (this.lengthComputable) {
      return this.loaded / this.total;
    } else {
      return 0;
    }
  }

  get percentage() {
    return Math.floor(this.ratio * 10000) / 100;
  }
}

class FileReaderState {
  constructor() {
    this.detail = this.result = null;
  }
  get ratio() { return this.latest.ratio; }
  get percentage() { return this.latest.percentage; }
  get latest() {
    return this.events[this.events.length - 1];
  }
  get isAborted() { return false; }
  get isErrored() { return false; }
  get isLoadStarted() { return false; }
  get isLoadEnded() { return false; }
}

export default class EmptyFileReader extends FileReaderState {
  constructor() {
    super();
    this.events = [new ProgressEvent({
      lengthComputable: false
    })];
  }
  loadstart(event) {
    return new LoadingFileReader(this, event);
  }

  get readyState() { return 0; }
}

class LoadingFileReader extends FileReaderState {
  constructor(previous, event) {
    super();
    this.events = previous.events.concat(new ProgressEvent(event));
  }

  abort(event = {}) {
    return new AbortedFileReader(event);
  }

  progress(event = {}) {
    return new LoadingFileReader(this, event);
  }

  error(event = {}) {
    return new ErroredFileReader(this, event);
  }

  loadend(event = {}) {
    return new LoadedFileReader(this, event);
  }

  get readyState() { return 1; }

  get isLoadStarted() { return true; }
}

class AbortedFileReader extends FileReaderState {
  constructor(event) {
    super();
    this.abortedAt = new ProgressEvent(event);
  }

  get isAborted() { return true; }
}

class ErroredFileReader extends FileReaderState {
  constructor(previous, event) {
    super();
    this.detail = event;
    this.erroredAt = new ProgressEvent(event);
  }

  get isErrored() { return true; }
}

class LoadedFileReader extends FileReaderState {
  constructor(previous, event) {
    super();
    this.events = previous.events.concat(new ProgressEvent(event));
  }
  get isLoadStarted() { return true; }

  get isLoadEnded() { return true; }
}
