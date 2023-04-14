from ..modules.fibonacci import fib_func

def test_fibonacci_len_4():
	assert list(fib_func(4)) == [0, 1, 1, 2, 3]

def test_fibonacci_len_1000():
	assert [i for i in fib_func(1000)] == [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987]
