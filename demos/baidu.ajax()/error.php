<?php
	function HTTPStatus($num) {
	    $http = array(
	        100 => 'HTTP/1.1 100 Continue',
	        101 => 'HTTP/1.1 101 Switching Protocols',
	        200 => 'HTTP/1.1 200 OK',
	        201 => 'HTTP/1.1 201 Created',
	        202 => 'HTTP/1.1 202 Accepted',
	        203 => 'HTTP/1.1 203 Non-Authoritative Information',
	        204 => 'HTTP/1.1 204 No Content',
	        205 => 'HTTP/1.1 205 Reset Content',
	        206 => 'HTTP/1.1 206 Partial Content',
	        300 => 'HTTP/1.1 300 Multiple Choices',
	        301 => 'HTTP/1.1 301 Moved Permanently',
	        302 => 'HTTP/1.1 302 Found',
	        303 => 'HTTP/1.1 303 See Other',
	        304 => 'HTTP/1.1 304 Not Modified',
	        305 => 'HTTP/1.1 305 Use Proxy',
	        307 => 'HTTP/1.1 307 Temporary Redirect',
	        400 => 'HTTP/1.1 400 Bad Request',
	        401 => 'HTTP/1.1 401 Unauthorized',
	        402 => 'HTTP/1.1 402 Payment Required',
	        403 => 'HTTP/1.1 403 Forbidden',
	        404 => 'HTTP/1.1 404 Not Found',
	        405 => 'HTTP/1.1 405 Method Not Allowed',
	        406 => 'HTTP/1.1 406 Not Acceptable',
	        407 => 'HTTP/1.1 407 Proxy Authentication Required',
	        408 => 'HTTP/1.1 408 Request Time-out',
	        409 => 'HTTP/1.1 409 Conflict',
	        410 => 'HTTP/1.1 410 Gone',
	        411 => 'HTTP/1.1 411 Length Required',
	        412 => 'HTTP/1.1 412 Precondition Failed',
	        413 => 'HTTP/1.1 413 Request Entity Too Large',
	        414 => 'HTTP/1.1 414 Request-URI Too Large',
	        415 => 'HTTP/1.1 415 Unsupported Media Type',
	        416 => 'HTTP/1.1 416 Requested Range Not Satisfiable',
	        417 => 'HTTP/1.1 417 Expectation Failed',
	        500 => 'HTTP/1.1 500 Internal Server Error',
	        501 => 'HTTP/1.1 501 Not Implemented',
	        502 => 'HTTP/1.1 502 Bad Gateway',
	        503 => 'HTTP/1.1 503 Service Unavailable',
	        504 => 'HTTP/1.1 504 Gateway Time-out',
	        505 => 'HTTP/1.1 505 HTTP Version Not Supported',
	    );
	 
	    header($http[$num]);
	 
	    return
	        array(
	            'code' => $num,
	            'error' => $http[$num],
	        );
	}
	HTTPStatus($_REQUEST['code']);
?>