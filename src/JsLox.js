const cc = require("./Console Colours.js");
const Token_Type = require("./Token Types.js");
const Token = require("./Token.js");
const Scanner = require("./Scanner.js");
const Error = require("./Error.js");

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function Lox() {
	
	if(process.argv.length > 3) {
		console.log(`${cc.normal}${cc.code}${cc.normal}${cc.code}${cc.normal}${cc.code}${cc.normal}`,
"Uses: ", "node JsLox {filename}", " for running ", "{filename}", `.
  or: `, "node JsLox", " for REPL mode."
		);
	} else if(process.argv.length == 3) {
		console.log(`${cc.info}${cc.normal}${cc.code}${cc.normal}`, "(i)", " You can use REPL mode by calling ", "node JsLox", " without any arguments.");
		run_file(process.argv[2]);
	} else {
		console.log(`${cc.info}${cc.normal}${cc.code}${cc.normal}${cc.code}${cc.normal}`, "(i)", " You can run files by calling ", "node JsLox {filename}", " to run ", "{filename}", ".");
		run_prompt();
	}
	
}

function run_file(filename) {
	var filecontents;
	fs.readFile(filename, "utf8", (err, data) => {
		if(err) {
			throw err;
		}
		filecontents = data;
		run(filecontents);
	});
	
	if(Error.had_error) {
		process.exit(65);
	}
}

function run_prompt() {
	process.stdout.write(cc.echo);
	rl.on("line", input => {
		run(input);
		process.stdout.write(cc.echo);
	});
	Error.had_error = false;
}

function run(code) {
	var tokens = Scanner.scan_tokens(code);
	console.log(tokens);
}

Lox();