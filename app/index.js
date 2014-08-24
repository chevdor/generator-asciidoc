'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var AsciidocGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the tiptop Asciidoc generator!'
    ));

    var prompts = [
    {
      type: 'input',
      name: 'docAuthor',
      message: 'Let´s start with your name?'
    },
    {
      type: 'input',
      name: 'docAuthorEmail',
      message: 'What about your email?'
    },
    {
      type: 'list',
      choices: ['Article','Book', 'Manpage'],
      name: 'docType',
      message: 'What kind of package are you making?',
      default: 'Book'
    },
    {
      type: 'input',
      name: 'docTitle',
      message: 'What is the title of your document?',
      default: this.appname
    },
    {
      type: 'input',
      name: 'docVersion',
      message: 'You may specify a default version?',
      default: '0.1.0'
    }


    ];

    this.prompt(prompts, function (props) {
      this.docAuthor      = props.docAuthor;
      this.docAuthorEmail = props.docAuthorEmail;
      this.docType        = props.docType;
      this.docTitle       = props.docTitle;
      this.docVersion     = props.docVersion;
      this.docCreated     = props.docCreated;
      this.docFileName    = props.docTitle.replace(/ /g, '-')+'.adoc';

      var now = new Date();
      this.docCreated     = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate();

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.template('_BOOK.adoc', this.docFileName);
      this.src.copy('include.adoc','include.adoc');
    },

    // projectfiles: function () {
    //   this.src.copy('editorconfig', '.editorconfig');
    //   this.src.copy('jshintrc', '.jshintrc');
    // }
  },

  end: function () {
    // nothing to do here yet
  }
});

module.exports = AsciidocGenerator;
