var quiz = {
"JS": [
{
"id": 1,
"question": "Subtract 2x³ – 4x² + 3x + 5 from 4x³ + x² + x + 6",
"options": [
{
"a": "2x³ + 5x⁴ – 2x + 1",
"b": "2x³ + 5x² – 2x",
"c": "-2x³ - 5x² – 2x + 1",
"d": "2x³ + 5x² – 2x + 1"
}
],
"answer": "2x³ + 5x² – 2x + 1",
"score": 0,
"status": ""
},
{
"id": 2,
"question": "Add 2/3a, 3/5a, -6/5a",
"options": [
{
"a": "2a/21",
"b": "a/30",
"c": "a/15",
"d": "15/a"
}
],
"answer": "a/15",
"score": 0,
"status": "3"
},
{
"id": 3,
"question": "Subtract 2/3y³ – 2/7y² – 5 from 1/3y³ + 5/7y² + y – 2",
"options": [
{
"a": "-1/3y³ + y² + y + 3",
"b": "-1/2x³ – 1/2x + 3/2",
"c": "2/y³ + y⁷ + y + 2",
"d": "-2/y³ + y⁴ + y - 2"
}
],
"answer": "-1/3y3 + y2 + y + 3",
"score": 0,
"status": ""
},
{
"id": 4,
"question": "Simplify x² – 3x + 5 – 1/2(3x² – 5x + 7)",
"options": [
{
"a": "1/2x² – 1/2x + 3/2",
"b": "-1/2x² + 1/2x - 3/2",
"c": "-1/x² – 1/3x + 3/2",
"d": "-1/2x² – 1/2x + 3/2"
}
],
"answer": "-1/2x² – 1/2x + 3/2",
"score": 0,
"status": ""
},
{
"id": 5,
"question": "3/2a – 5/4b + 2/5c, 2/3a – 7/2b + 7/2c, 5/3a + 5/2b – 5/4c",
"options": [
{
"a": "23a/6 + 9b/4 - 53c/20",
"b": "23b/6 – 9a/4 + 53c/20",
"c": "13a/6 – 9b/4 + 43c/20",
"d": "23a/6 – 9b/4 + 53c/20"
}
],
"answer": "23a/6 – 9b/4 + 53c/20",
"score": 0,
"status": ""
},
]
}
var quizApp = function () {
this.score = 0;
this.qno = 1;
this.currentque = 0;
var totalque = quiz.JS.length;
this.displayQuiz = function (cque) {
this.currentque = cque;
if (this.currentque < totalque) {
$("#tque").html(totalque);
$("#previous").attr("disabled", false);
$("#next").attr("disabled", false);
$("#qid").html(quiz.JS[this.currentque].id + '.');
$("#question").html(quiz.JS[this.currentque].question);
$("#question-options").html("");
for (var key in quiz.JS[this.currentque].options[0]) {
if (quiz.JS[this.currentque].options[0].hasOwnProperty(key)) {
$("#question-options").append(
"<div class='form-check option-block'>" +
"<label class='form-check-label'>" +
"<input type='radio' class='form-check-input' name='option' id='q" + key + "' value='" + quiz.JS[this.currentque].options[0][key] + "'><span id='optionval'>" +
quiz.JS[this.currentque].options[0][key] +
"</span></label>"
);
}
}
}
if (this.currentque <= 0) {
$("#previous").attr("disabled", true);
}
if (this.currentque >= totalque) {
$('#next').attr('disabled', true);
for (var i = 0; i < totalque; i++) {
this.score = this.score + quiz.JS[i].score;
}
return this.showResult(this.score);
}
}
this.showResult = function (scr) {
$("#result").addClass('result');
$("#result").html("<h1 class='res-header'>Total Score: &nbsp;" + scr + '/' + totalque + "</h1>");
for (var j = 0; j < totalque; j++) {
var res;
if (quiz.JS[j].score == 0) {
res = '<span class="wrong">' + quiz.JS[j].score + '</span><i class="fa fa-remove c-wrong"></i>';
} else {
res = '<span class="correct">' + quiz.JS[j].score + '</span><i class="fa fa-check c-correct"></i>';
}
$("#result").append(
'<div class="result-question"><span>Q ' + quiz.JS[j].id + '</span> &nbsp;' + quiz.JS[j].question + '</div>' +
'<div><b>Correct answer:</b> &nbsp;' + quiz.JS[j].answer + '</div>' +
'<div class="last-row"><b>Score:</b> &nbsp;' + res +
'</div>'
);
}
}
this.checkAnswer = function (option) {
var answer = quiz.JS[this.currentque].answer;
option = option.replace(/</g, "&lt;") //for <
option = option.replace(/>/g, "&gt;") //for >
option = option.replace(/"/g, "&quot;")
if (option == quiz.JS[this.currentque].answer) {
if (quiz.JS[this.currentque].score == "") {
quiz.JS[this.currentque].score = 1;
quiz.JS[this.currentque].status = "correct";
}
} else {
quiz.JS[this.currentque].status = "wrong";
}
}
this.changeQuestion = function (cque) {
this.currentque = this.currentque + cque;
this.displayQuiz(this.currentque);
}
}
var jsq = new quizApp();
var selectedopt;
$(document).ready(function () {
jsq.displayQuiz(0);
$('#question-options').on('change', 'input[type=radio][name=option]', function (e) {
//var radio = $(this).find('input:radio');
$(this).prop("checked", true);
selectedopt = $(this).val();
});
});
$('#next').click(function (e) {
e.preventDefault();
if (selectedopt) {
jsq.checkAnswer(selectedopt);
}
jsq.changeQuestion(1);
});
$('#previous').click(function (e) {
e.preventDefault();
if (selectedopt) {
jsq.checkAnswer(selectedopt);
}
jsq.changeQuestion(-1);
});
