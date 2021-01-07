import {React, useState} from 'react';

/*--components--*/
import Keyboard from './Keyboard';

const Calculator = () => {
  const [exp, setExp] = useState('');// the expression to be evaluated.

  const operators = ['*','/','+','-'];
  const grouping = ['(',')'];

  // given a roman numeral string return equivalent integer.
  const convertRomanNumeral = (romanNumber) => {
    const romanNumerals = ['CM','M','CD','D','XC','C','XL','L','IX','X','IV','V','I'];
    const romanInt = [900,1000,400,500,90,100,40,50,9,10,4,5,1];
    let index =  0, num = 0;
    for(let rn in romanNumerals){
      index = romanNumber.indexOf(romanNumerals[rn]);
      while(index !== -1){
        num += parseInt(romanInt[rn]);
        romanNumber = romanNumber.replace(romanNumerals[rn],'-');
        index = romanNumber.indexOf(romanNumerals[rn]);
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
        setExp(exp => newExp);
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
