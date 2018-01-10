const cc = require("./Console Colours.js");

var had_error = false;

function error(line, message) {
	report(line, "", message);
}

function report(line, where, message) {
	console.error(`${cc.set_error}[line ${line}] Error${where != "" ? " " : ""}${where}: ${message}${cc.reset}`);
	had_error = true;
}

module.exports = {had_error, error, report}