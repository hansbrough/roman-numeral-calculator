import {React} from 'react';
/*--components--*/
import Key from './Key';

const Keyboard = ({setKey}) => {
  // key values
  const funcs = ['AC','\u232b'];
  const numbers = ['I','V','IV','IX','X','L','C','D','M'];
  const operators = ['+','-','*','/','='];
  const more = ['(',')'];

   return (
     <div className="calculator-keyboard">
       <div className="funcs-pad">
         {funcs.map(item => <Key key={item} name={item} setKey={setKey} /> )}
       </div>
       <div className="operator-pad">
         {operators.map(item => <Key key={item} name={item} setKey={setKey} /> )}
       </div>
       <div className="number-pad">
         {numbers.map(item => <Key key={item} name={item} setKey={setKey} /> )}
       </div>
       <div className="more-pad">
          {more.map(item => <Key key={item} name={item} setKey={setKey} /> )}
       </div>
     </div>
   )
};

export default Keyboard;
