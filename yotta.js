
function __yotta_append_nodes(tag, ...nodes) {
  for (const node of nodes) {
    if (typeof node === 'string') {
      tag.appendChild(document.createTextNode(node));
    } else {
      tag.appendChild(node);
    }
  }
}

function __yotta_tag(tagName, ...nodes) {
  const tag = document.createElement(tagName.toLowerCase());

  __yotta_append_nodes(tag, ...nodes);

  // YOTTA TAG METHODS

  tag.Click = function (onclick) {
    this.onclick = onclick;
    return this;
  }

  tag.Press = function(onmousedown) {
    this.onmousedown = onmousedown;
    return this;
  };

  tag.Att = function (attName, value) {
    this.setAttribute(attName, value);
    return this;
  }

  tag.Id = function (identifier) {
    this.setAttribute('id', identifier);
    return this;
  }

  tag.Class = function (classes) {
    this.setAttribute('class', classes);
    return this;
  }

  return tag;
}

// YOTTA TAGS

window['Yotta'] = (...tags) => {
  const frag = document.createDocumentFragment();
  __yotta_append_nodes(frag, ...tags);
  return frag;
}

const __YOTTA_HTML_TAGS = [
  'Aside', 'Article', 'Button', 'Canvas', 'Code', 'Div', 'Fieldset', 'Figure', 'Figcaption', 
  'Footer', 'Form', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Header', 'Legend', 'Li', 
  'Main', 'Nav', 'Ol', 'Option', 'Optgroup', 'P', 'Pre', 'Section', 'Select', 'Span', 'Table', 
  'Tbody', 'Td', 'Textarea', 'Th', 'Thead', 'Tfoot', 'Tr', 'Ul',
];


for (const htag of __YOTTA_HTML_TAGS) {
  window[htag] = (...tags) => __yotta_tag(htag, ...tags);
}

window.Br = function Br() {
  return __yotta_tag('Br');
}

window.Hr = function Hr() {
  return __yotta_tag('Hr');
}

window.B = function B(text) {
  return __yotta_tag('B', text);
}

window.I = function I(text) {
  return __yotta_tag('I', text);
}

window.Img = function Img(src) {
  return __yotta_tag('Img').Att('src', src);
}

window.Source = function Source(src) {
  return __yotta_tag('Source').Att('src', src);
}

window.Track = function Track(src) {
  return __yotta_tag('Track').Att('src', src);
}

window.Iframe = function Iframe(src) {
  return __yotta_tag('Iframe').Att('src', src);
}

window.Label = function Label(For, ...tags) {
  return __yotta_tag('Label', ...tags).Att('for', For);
}

window.A = function A(href = '#', ...tags) {
  return __yotta_tag('a', ...tags).Att('href', href);
}

window.Audio = function Audio(src, ...tags) {
  return __yotta_tag('Audio', ...tags).Att('src', src);
}

window.Video = function Video(src, ...tags) {
  return __yotta_tag('Video', ...tags).Att('src', src);
}

window.Script = function Script(src, type = 'text/javascript') {
  return __yotta_tag('Script', ...tags).Att('src', src).Att('type', type);
}

window.Link = function Link(href, rel = 'stylesheet') {
  return __yotta_tag('Link').Att('href', href).Att('rel', rel);
}

window.Input = function Input(type = 'text', value = '') {
  return __yotta_tag('Input').Att('type', type).Att('value', value);
}
