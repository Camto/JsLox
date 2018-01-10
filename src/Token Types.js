var Token_Type = [
	
	// Symbol tokens.
	"parens_l", "parens_r", "curly_l", "curly_r",
	"semicolon", "dot", "comma", "defined_as",
	"plus", "minus", "times", "divide", "not",
	"not", "and", "or", "equal", "not_equal", "greater_t", "less_t", "greater_e", "less_e",
	
	// Literals.
	"number", "string", "identifier",
	
	// Keywords.
	"print", "var",
	"true", "false", "nil",
	"if", "else",
	"while", "for",
	"fun", "return",
	"class", "super", "this",
	
	// Just EOF.
	"eof"
	
];

var Token_Type_Enum = {};
for(let cou = 0; cou < Token_Type.length; cou++) {
	Token_Type_Enum[Token_Type[cou]] = cou;
}

module.exports = Token_Type_Enum;