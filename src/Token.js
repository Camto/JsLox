const Token_Type = require("./Token Types.js");

function Token(type, lexeme, literal, line) {
	this.type = type;
	this.lexeme = lexeme;
	this.literal = literal;
	this.line = line;
}

Token.prototype = {
	toString() {
		return `${this.type} ${this.lexeme} ${this.literal}`;
	}
}

module.exports = Token;