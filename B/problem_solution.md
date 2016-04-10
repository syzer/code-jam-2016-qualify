 In the small case we have a stack of at most 10 pancakes. The total number of possible different states we can get by performing any number of flips is thus 210 = 1024. As this is a small number of states, we can solve the small test case by performing a breadth first search over this state space. For N pancakes, this can be implemented to complete within O(N 2N) time.

The large case requires a much more efficient solution. Imagine a large stack of pancakes, starting with a few happy side up, then a few blank side up, a few more happy side up, and so on. Intuitively it seems like a good idea to avoid flipping between two pancakes facing the same direction and instead try and make larger groups of pancakes facing the same direction. Define the "grouped height" of a prefix of the stack of pancakes (possibly the entire stack) to be the number of groups of contiguous pancakes facing the same direction. The goal state has a grouped height of 1. We can consider how various flips affect the grouped height of a stack of pancakes:

    If we flip a group of pancakes that has an even grouped height, then the stack's grouped height will be unchanged.
    If we flip a group of pancakes that has an odd grouped height, then the stack's grouped height will
        increase by 1 if we flip between two pancakes facing the same direction.
        decrease by 1 if we flip between two pancakes facing opposite directions.
        be unchanged if we flip the entire stack.

Since the above statements categorize all possible flips, a flip can reduce the grouped height of a stack by at most 1. As the goal state has a grouped height of 1, a stack with grouped height of H requires at least H-1 flips to reach the goal state. Considering simple cases, for example those in the sample input, we can see that H-1 flips is not necessarily sufficient. A stack consisting only of blank side up pancakes has H = 1 but we need to flip the entire stack to make the pancakes happy side up. Given a stack where the bottom pancake is blank side up, we need to flip the entire stack at least once as the bottom pancake is only flipped when we flip the entire stack. Flipping the entire stack does not affect the grouped height of a stack so this gives us a stricter lower bound of either H-1 flips if the bottom pancake is happy side up or H flips if the bottom pancake is blank side up.

For a stack with H > 1, we can always flip the topmost group of pancakes facing the same direction to decrease the grouped height by 1. Thus the stricter lower bound is a sufficient number of flips as the following greedy strategy takes exactly that many moves: repeatedly flip the topmost group of pancakes facing in the same direction (reducing the grouped height by 1 each flip) until the grouped height is 1 and then flip the entire stack once if needed.

The problem only asks for the minimum number of flips and not which flips to make. As argued above, this is 1 less than the grouped height if the bottom pancake is happy side up and exactly the grouped height if the bottom pancake is blank side up. A sample implementation in Python is provided below, using the fact that the grouped height is one more than the number of times the string changes from + to - or vice versa.

```
    def minimumFlips(pancakes):
      groupedHeight = 1 + pancakes.count('-+') + pancakes.count('+-')
      if pancakes.endswith('-'):
        return groupedHeight
      else:
        return groupedHeight - 1
```