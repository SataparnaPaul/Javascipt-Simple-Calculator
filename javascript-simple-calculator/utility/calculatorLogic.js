import { operationButtons, symbolButtons } from './constants.js';

export function evaluateExpression(btn) {
  if (symbolButtons.indexOf(btn) > -1) {
    return '0';
  }
  let existing = getExistingExpr();
  if (btn === '=') {
    return eval(existing);
  }
  let final_text = existing + btn;
  return sanitizer(final_text, operationButtons);
}

export function onBtnClick(btn) {
  let expr = evaluateExpression(btn);
  updateTextElement(expr);
}

function getExistingExpr() {
  return document.getElementById('textElement').textContent;
}

function updateTextElement(expr) {
  document.getElementById('textElement').textContent = expr;
}

function _checkMultipleDecimals(expr) {
  return (expr.match(/\./g) || []).length >= 2;
}

function _removeMultipleDecimals(expr) {
  let curr_expr = expr;
  let li = expr.lastIndexOf('.');
  curr_expr =
    curr_expr.slice(0, li) + curr_expr.slice(li + 1, curr_expr.length);
  return curr_expr;
}

function sanitizer(expression, operations) {
  if (operations.length === 0) {
    let sanitizedExpression = expression;
    if (expression === '.') expression = '0.';
    if (expression[expression.length - 1] === '.') {
      if (_checkMultipleDecimals(expression)) {
        sanitizedExpression = _removeMultipleDecimals(sanitizedExpression);
        let trailing = sanitizedExpression.split('.')[1];
        if (Number(trailing) !== 0) {
          sanitizedExpression = Number(sanitizedExpression);
        }
      } else {
        sanitizedExpression = Number(expression).toString();
        sanitizedExpression += '.';
      }
    }
    return sanitizedExpression;
  }
  let expression_split = expression.split(operations[0]);
  let sliced_op = operations.slice(1, operations.length);
  let sanitized_op = [];
  for (let i = 0; i < expression_split.length; i++) {
    sanitized_op.push(sanitizer(expression_split[i], sliced_op));
  }
  return sanitized_op.join(operations[0]);
}
