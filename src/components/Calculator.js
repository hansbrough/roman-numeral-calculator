import {React, useState} from 'react';

/*--components--*/
import Keyboard from './Keyboard';

const Calculator = () => {
  const [exp, setExp] = useState('');

  const operators = ['*','/','+','-'];
  const grouping = ['(',')'];

  const convertRomanNumeral = (numeralExp) => {
    const romanNumeralDict = {
      'CM':900,'M':1000,'CD':400,'D':500,'XC':90,'C':100,'XL':40,'L':50,'IX':9,'X':10,'IV':4,'V':5,'I':1
    }
    const numerals = Object.keys(romanNumeralDict);
    const ints = Object.values(romanNumeralDict);
    let index = 0, num = 0;
    for(let rn in numerals) {
      index = numeralExp.indexOf(numerals[rn]);
      while(index !== -1) {
        num += parseInt(ints[rn]);
        numeralExp = numeralExp.replace(numerals[rn],'-');
        index = numeralExp.indexOf(numerals[rn]);
      }
    }
    return num;
  };

  // dictionary of operator functions
  const calculateOperation = {
    '*': (a, b) => parseInt(a, 10) * parseInt(b, 10),
    '/': (a, b) => parseInt(a, 10) / parseInt(b, 10),
    '+': (a, b) => parseInt(a, 10) + parseInt(b, 10),
    '-': (a, b) => parseInt(a, 10) - parseInt(b, 10)
  };

  // recursively look for nested expressions and replace with their parsed value.
  const findGroups = (expr) => {
    const groupRegex = /\(([\dIVXCDLM\+\*\/\- ]*)\)/gm;
    const match = expr.match(groupRegex);
    let newExpr = expr;
    if(match){
      let group = match[0].replace(/[()]/g,'').trim();
      group = parse(group);
      newExpr = expr.replace(` ${match[0]} `,group);
      return findGroups(newExpr);//recurse until nested expressions no longer found.
    }
    return newExpr;
  };

  // given an expression str return a result.
  const parse = (expr) => {
    // break apart string and change roman numerals to integers
    let parts = expr.split(' ').map(x => {
      return convertRomanNumeral(x) || x
    })
    // in order of precedence look for operator strings and invoke corresponding method
    // replace operator and operand strings with the result.
    while(parts.length > 1) {
      operators.forEach(op => {
        if(parts.includes(op)) {
          const idx = parts.indexOf(op);
          const result = calculateOperation[op](parts[idx-1], parts[idx+1])
          parts.splice(idx-1, 3, result);
        }
      });
    }
    return parts[0];
  };

  // handle UI events
  const handleKeyPress = (key) => {
    switch(key) {
      case '=':
        const expr = parse(findGroups(exp));
        setExp(expr);
        break;
      case 'AC':
        setExp('')
        break;
      case '\u232b':
        setExp(exp => (exp && `${exp}`.slice(0, -1)) || '');
        break;
      default:
        const newExp = (operators.concat(grouping).includes(key)) ? `${exp} ${key} ` : `${exp}${key}`;
        setExp(newExp);
        break;
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-display">
        {exp}
      </div>
      <Keyboard setKey={handleKeyPress}/>
    </div>
  )
}

export default Calculator
