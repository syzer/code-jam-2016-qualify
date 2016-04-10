import itertools
n= 6
# lst = [reduce(add,(i)) for i in itertools.product([0, 1], repeat=n)]

print(["".join(seq) for seq in itertools.product("01", repeat=32)])

# def dec2bin(n):
#     if not n:
#         return ''
#     else:
#         return dec2bin(n/2) + str(n%2)
#
# def pad(p, s):
#     return "0"*(p-len(s))+s
#
# def combos(n):
#     for i in range(2**n):
#         print pad(n, dec2bin(i))