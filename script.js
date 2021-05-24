/*
Copyright © Arjun Ramakrishnan 2021
GNU Public License 3.0 (https://www.gnu.org/licenses/gpl-3.0.en.html)
*/

window.onload=function() {
	var answerSpan = document.getElementById('answer');
	var answerMathField = MQ.MathField(answerSpan, {
		autoCommands: 'pi Pi theta sqrt infty alpha beta gamma Gamma phi Phi mu nthroot int iint partial sum',
		autoOperatorNames: 'sin cos tan arcsin arccos arctan log ln max min lim',
		sumStartsWithNEquals: true,
		supSubsRequireOperand: true,
		handlers: {
		  edit: function() {
			var enteredMath = answerMathField.latex(); // Get entered math in LaTeX format
			document.getElementById('equation').src = "https://latex.codecogs.com/png.image?" + enteredMath;
			document.getElementById('equation').style.marginTop = "15px";
			chrome.storage.local.set({'LaTeX': enteredMath}, function() {
				
			});
		  },
		  enter: function() {
			 chrome.storage.local.get(['LaTeX'], function(result) {
				answerMathField.focus();
				answerMathField.keystroke('End Shift-Home Del');
				
				answerMathField.write(result.LaTeX);
			});
		  }
		}
	});
}
