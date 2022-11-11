const RESERVED_KEYS = [
  'CREATE', 'ALTER', 'DROP',
  'RENAME', 'TO', 'TABLE',
  'ADD', 'COLUMN', 'SET',
  'INSERT', 'UPDATE', 'DELETE',
  'SELECT', 'FROM', 'WHERE',
  'VALUES', 'INTO', 'TEXT',
  'INTEGER', 'FOAT', 'PRIMARY',
  'KEY', 'NOT', 'NULL'
];

const NUMBER = '[0-9]+';
const FLOATING_POINT = '[0-9]+\.[0-9]*';

const STRING = '\"[\\w\\s]*\"';

const rules = [
  {
    regex: new RegExp(STRING + '|' + NUMBER + '|' + FLOATING_POINT, 'g'),
    color: '#0d6efd'
  },
  {
    regex: new RegExp(STRING, 'g'),
    color: '#ff8500'
  },
  {
    regex: new RegExp(RESERVED_KEYS.map(islandRegexMatch).join('|'), 'gi'),
    color: '#d63384'
  },
];

function highlight(syntax) {
  let highlighted = syntax;
  for (const rule of rules) {
    highlighted = highlighted.replace(rule.regex, match => format(match, rule.color));
  }

  return highlighted;
}

function format(term, color) {
  return `<span style='color: ${color}'>${term}</span>`;
}

function islandRegexMatch(stringRegex) {
  return `([\\s]*|^)${stringRegex}([\\s]*|$)`;
}
