import Ember from 'ember';
import layout from '../templates/components/x-image-uploader';

export default Ember.Component.extend({
  classNames: ["spec-image-input"],
  layout: layout,
  fileList: [],
  file: Ember.computed('fileList', function() {
    return this.get('fileList')[0];
  }),
  isImage: Ember.computed('fileList', function () {
    let re = new RegExp('image/*');
    return re.test(this.get('fileList')[0].type);
  }),
  errors: Ember.computed('fileList', 'isImage', function() {
    // TODO: WRITE ERROR HANDLING
  }),

  actions: {
    didSelectImage(fileList) {
      this.set('fileList', fileList);
    }
  }
});
