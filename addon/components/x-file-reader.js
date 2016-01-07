import Ember from 'ember';
import layout from '../templates/components/x-file-reader';

import State from '../file-reader';

export default Ember.Component.extend({
  layout: layout,
  classNames: ["spec-file-reader"],
  file: null,
  model: new State(),
  method: "readAsDataURL",

  init() {
    this._super.apply(this, arguments);
    let reader = this.reader = new FileReader();
    reader.onloadstart = Ember.run.bind(this, function(event) {
      this.set('model', this.get('model').loadstart(event));
    });
    reader.onprogress = Ember.run.bind(this, function(event) {
      this.set('model', this.get('model').progress(event));
    });
    reader.onloadend = Ember.run.bind(this, function(event) {
      this.set('model', this.get('model').loadend(event));
    });
    reader.onabort = Ember.run.bind(this, function(event) {
      this.set('model', this.get('model').abort(event));
    });
    reader.onerror = Ember.run.bind(this, function(event) {
      this.set('model', this.get('model').error(event));
    });
  },

  readFile: Ember.observer('file', 'method', function() {
    let file = this.get('file');
    let method = this.get('method');
    this.reader[method].call(this.reader, file);
  }),

  destroy() {
    let r = this.reader;
    r.onloadstart = r.onprogress = r.onloadend = r.onabort = r.onerror = null;
    this._super.apply(this, arguments);
  },

  methods: Ember.computed(function() {
    let reader = this.reader;
    return {
      abort() {
        reader.abort();
      },
      readAsArrayBuffer(blob) {
        return reader.readAsArrayBuffer(blob);
      },
      readAsBinaryString(blob) {
        return reader.readAsBinaryString(blob);
      },
      readAsDataURL(blob) {
        return reader.readAsDataURL(blob);
      },
      readAsText(blob) {
        return reader.readAsText(blob);
      }
    };
  })
});
