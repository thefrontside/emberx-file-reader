import { describe, beforeEach, it } from 'mocha';
import { expect } from 'chai';

import FileReader from 'emberx-file-reader/file-reader';

console.log("FileReader = ", FileReader);

describe("FileReader", function() {
  beforeEach(function() {
    this.reader = new FileReader();
  });
  it("has an empty ready state", function() {
    expect(this.reader.readyState).to.equal(0);
  });
  it("has a null error", function() {
    expect(this.reader.detail).to.equal(null);
  });
  it("has a null result", function() {
    expect(this.reader.result).to.equal(null);
  });
  it("has 0 as a progress ratio", function() {
    expect(this.reader.ratio).to.equal(0);
  });
  it("has 0 as a progress percentage", function() {
    expect(this.reader.ratio).to.equal(0);
  });

  describe("reading as a URL", function() {
    beforeEach(function() {
      this.started = this.reader.loadstart({
        lengthComputable: true,
        loaded: 1,
        total: 100
      });
    });
    it("returns a different state", function() {
      expect(this.started).to.be.instanceOf(Object);
      expect(this.started).to.not.equal(this.reader);
    });
    it("has a loading reday state", function() {
      expect(this.started.readyState).to.equal(1);
    });
    it("has 0.01 progress ratio", function() {
      expect(this.started.ratio).to.equal(0.01);
    });
    it("has a 1% progress", function() {
      expect(this.started.percentage).to.equal(1);
    });

    describe("aborting the read request", function() {
      beforeEach(function() {
        this.aborted = this.started.abort();
      });
      it("is aborted", function() {
        expect(this.aborted.isAborted).to.equal(true);
      });
      it("has an abortion date", function() {
        expect(this.aborted.abortedAt.timestamp).to.be.instanceOf(Date);
      });
    });

    describe("reporting progress", function() {
      beforeEach(function() {
        this.progress = this.started.progress({
          lengthComputable: true,
          loaded: 50,
          total: 100
        });
      });
      it("returns a different state", function() {
        expect(this.progress).to.not.equal(this.started);
      });
      it("contains progress", function() {
        expect(this.progress.ratio).to.equal(0.5);
        expect(this.progress.percentage).to.equal(50);
      });
    });

    describe("reporting errors", function() {
      beforeEach(function() {
        this.errored = this.started.error('boom!');
      });
      it("returns a different state", function() {
        expect(this.errored).not.to.equal(this.started);
      });
      it("captures the error", function() {
        expect(this.errored.detail).to.equal('boom!');
      });
      it("is errored", function() {
        expect(this.errored.isErrored).to.equal(true);
      });
    });

    describe("completing the load", function() {
      beforeEach(function() {
        this.ended = this.started.loadend({
          lengthComputable: true,
          loaded: 100,
          total: 100
        });
      });
      it("returns a new state", function() {
        expect(this.ended).to.not.equal(this.started);
      });
      it("is ended", function() {
        expect(this.ended.isLoadEnded).to.equal(true);
      });
      it("contains the progress properties", function() {
        expect(this.ended.ratio).to.equal(1);
        expect(this.ended.percentage).to.equal(100);
      });
    });
  });
});
