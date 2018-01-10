module.exports = {
	reset: "\x1b[0m",
	set_info: "\x1b[34m",
	set_code: "\x1b[47m\x1b[30m",
	set_echo: "\x1b[36m",
	set_error: "\x1b[1;31m",
	
	normal: "\x1b[0m%s",
	info: "\x1b[0m\x1b[1;34m%s",
	code: "\x1b[0m\x1b[47m\x1b[30m%s",
	error: "\x1b[1;31m%s",
	
	echo: "\x1b[36mJsLox> \x1b[0m"
}