from typing import Generator

def fib_func(len: int) -> Generator[int, None, None]:
	a = 0
	b = 1
	# for i in range(len):
	while a < len:
		yield a
		a, b = b, a + b

#return the nth number in the sequence
# def stateful_function(func):
# 	cache = {}
# 	def inner(*args, **kwargs):
# 		key = str(args) + str(kwargs)
# 		if key not in cache:
# 			cache[key] = func(*args, **kwargs)
# 		return cache[key]
# 	return inner

# @stateful_function
# def fibonacci(n):
# 	if n <= 0:
# 		return 0
# 	elif n == 1:
# 		return 1
# 	else:
# 		return fibonacci(n-1) + fibonacci(n-2)

# fibonacci(1000)
#43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875
