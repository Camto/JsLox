const Token_Type = require("./Token Types.js");
const Token = require("./Token.js");
const Error = require("./Error.js");

const no_literal = {};

var code;
var tokens;

var start;
var current;
var line;

function scan_tokens(given_code) {
	
	code = given_code;
	tokens = [];
	
	start = 0;
	current = 0;
	line = 1;
	
	while(!is_at_end()) {
		start = current;
		scan_token();
	}
	
	tokens.push(new Token(Token_Type.eof, "", no_literal, line));
	
	return tokens;
	
}

function is_at_end() {
	return current >= code.length;
}

function scan_token() {
	var character = advance();
	switch(character) {
		
		// Symbol tokens.
		case "(": add_token(Token_Type.parens_l); break;
		case ")": add_token(Token_Type.parens_r); break;
		case "{": add_token(Token_Type.curly_l); break;
		case "}": add_token(Token_Type.curly_r); break;
		case ";": add_token(Token_Type.semicolon); break;
		case ".": add_token(Token_Type.dot); break;
		case ",": add_token(Token_Type.comma); break;
		case "=": add_token(!match("=") ? Token_Type.defined_as : Token_Type.equal); break;
		case "+": add_token(Token_Type.plus); break;
		case "-": add_token(Token_Type.minus); break;
		case "*": add_token(Token_Type.times); break;
		case "/":
			if(!match("/")) {
				add_token(Token_Type.divide);
			} else {
				while(peek() != "\n" && !is_at_end()) {
					advance();
				}
			}
			break;
		case "!": add_token(!match("=") ? Token_Type.not : Token_Type.not_equal); break;
		case ">": add_token(!match("=") ? Token_Type.greater_t :Token_Type.greater_e); break;
		case "<": add_token(!match("=") ? Token_Type.less_t : Token_Type.less_e); break;
		
		case '"': string(); break;
		
		// Skip whitespace.
		case " ":
		case "\t":
		case "\r":
			break;
		
		case "\n":
			line++;
			break;
		
		// If all else fails.
		default:
			if(is_digit(character)) {
				number();
			} else if(is_alpha(character)) {
				identifier();
			} else {
				Error.error(line, "Unexpected character.");
			}
			break;
		
	}
}

function advance() {
	current++;
	return code[current - 1];
}

function match(expected) {
	
	if(is_at_end()) {
		return false;
	}
	if(code[current] != expected) {
		return false;
	}
	
	current++;
	return true;
	
}

function peek() {
	if(is_at_end()) {
		return "\0";
	}
	return code[current];
}

function double_peek() {
	if(current + 1 >= code.length) {
		return "\0";
	}
	return code[current + 1];
}


function is_digit(character) {
	return /\d/.test(character);
}

function is_alpha(character) {
	return /[A-Za-z_]/.test(character)
}

function is_alphanumeric(character) {
	return is_alpha(character) || is_digit(character);
}

function add_token(type, given_literal) {
	
	let literal;
	
	if(typeof given_literal == "undefined") {
		literal = no_literal;
	} else {
		literal = given_literal;
	}
	
	let token_text = code.substring(start, current);
	
	tokens.push(new Token(type, token_text, literal, line));
	
}

function string() {
	
	while(peek() != '"' && !is_at_end()) {
		if(peek() == "\n") {
			line++;
		}
		advance();
	}
	
	if(is_at_end()) {
		Error.error(line, "Unfinished string.");
	}
	
	advance();
	
	raw = code.substring(start + 1, current - 1);
	add_token(Token_Type.string, raw);
	
}

function number() {
	
	while(is_digit(peek())) {
		advance();
	}
	
	if(peek() == "." && is_digit(double_peek())) {
		advance();
		while(is_digit(peek())) {
			advance();
		}
	}
	
	add_token(Token_Type.number, parseFloat(code.substring(start, current)));
	
}

function identifier() {
	while(is_alphanumeric(peek())) {
		advance();
	}
	add_token(Token_Type.identifier);
}

module.exports = {scan_tokens};