+++
title = 'Python'
BookCollapseSection = true
+++

# Methods
## String

- `str(123)` -> `'123'` Convert to string
- `'   a b c  '.strip()` -> `'a b c'` Remove leading and trailing whitespace
- `'abc'.capitalize()` -> `'Abc'` Capitalize the first character of the string
- `'ab bc cd'.title()` -> `'Ab Bc Cd'` Capitalize the first character of each word
- `'a b c'.split('')` -> `['a','b','c']` Split the string into a list of substrings

## String Formatting


- `f"{z:,}` Format a number with commas
- `f"{z:.2f}"` Format a number with 2 decimal places


## Integer

- `int()` Convert to integer

## Float

- `float()` Convert to float
- `round()` Round to the nearest integer
- `round(x, 2)` Round to 2 decimal places

# Conditionals

- `True if x > 0 else False` Ternary operator
- Match statement (Python 3.10+):
    ```python
    match name:
        case "Harry" | "Hermione" | "Ron":
            print("Gryffindor")
        case "Draco":
            print("Slytherin")
        case _:
            print("Other")
    ```
# Ranges
- `range(10)` Create a range from 0 to 9
- `range(1, 11)` Create a range from 1 to 10
- `range(1, 11, 2)` Create a range from 1 to 10 with a step of 2
- `range(10, 0, -1)` Create a range from 10 to 1 (inclusive of 10, exclusive of 0)
  
# Lists
- `list = [1, 2, 3]` Create a list
- `list.append(4)` Add an element to the end of the list
- `list.insert(0, 0)` Insert an element at the beginning of the list
- `list.remove(2)` Remove the first occurrence of an element from the list
- `list.pop()` Remove and return the last element of the list
- `list.pop(0)` Remove and return the first element of the list
- `list.sort()` Sort the list in ascending order
- `list.reverse()` Reverse the order of the list
- `list.index(3)` Get the index of the first occurrence of an element in the list
- `list.count(3)` Count the number of occurrences of an element in the list
- `list[0]` Access the first element of the list
- `list[-1]` Access the last element of the list
- `list[1:3]` Access a slice of the list from index 1 to 2 (inclusive of 1, exclusive of 3)
- `list[1:]` Access a slice of the list from index 1 to the end
- `list[:3]` Access a slice of the list from the beginning to index 2 (inclusive of 0, exclusive of 3)
- `list[::2]` Access every second element of the list
- `list[::-1]` Access the list in reverse order
- `list1 + list2` Concatenate two lists
- `list1 * 2` Repeat the list twice
- `len(list)` Get the length of the list
- `list1 == list2` Check if two lists are equal
- `list1 != list2` Check if two lists are not equal
- `list1 in list2` Check if an element is in the list
- `list1 not in list2` Check if an element is not in the list
- `list(range(10))` Convert a range to a list
- `list(range(1, 11))` Convert a range from 1 to 10 to a list

# Operator shorthands
- `i = 0`  Initialize i to 0
- `i = i + 1`  Increment i by 1
- `i += 1`  Increment i by 1 (shorthand)
- `i = i - 1`  Decrement i by 1
- `i -= 1`  Decrement i by 1 (shorthand)
- `i = i * 2`  Multiply i by 2
- `i *= 2`  Multiply i by 2 (shorthand)
- `i = i / 2`  Divide i by 2
- `i /= 2`  Divide i by 2 (shorthand)
- `i = i ** 2`  Square i
- `i **= 2`  Square i (shorthand)
- `i = i % 2`  Modulo i by 2
- `i %= 2`  Modulo i by 2 (shorthand)

# Loops
- `for i in range(10):` Loop from 0 to 9
- `for i in range(1, 11):` Loop from 1 to 10
- `for i in range(1, 11, 2):` Loop from 1 to 10 with step 2
- `for i in range(10, 0, -1):` Loop from 10 to 1
- `for _ in range(10):` Loop 10 times without using the loop variable
- `for item in [1,2,3]:` Loop through each item in the list

while loops:
- `while x < 10:` Loop while x is less than 10

# Dict
- `dict = {'a': 1, 'b': 2, 'c': 3}` Create a dictionary
- `dict['d'] = 4` Add a key-value pair to the dictionary
- `dict['a']` Access the value associated with the key 'a'
- `dict.get('a')` Access the value associated with the key 'a' (returns None if key does not exist)
- `dict.keys()` Get a list of keys in the dictionary
- `dict.values()` Get a list of values in the dictionary
- `dict.items()` Get a list of key-value pairs in the dictionary
- `dict.pop('a')` Remove and return the value associated with the key 'a'
- `dict.popitem()` Remove and return the last key-value pair in the dictionary
- `dict.update({'d': 4})` Update the dictionary with a new key-value pair
- `dict.clear()` Remove all key-value pairs from the dictionary
- `dict1 == dict2` Check if two dictionaries are equal
- `dict1 != dict2` Check if two dictionaries are not equal 

# Exceptions
- `try:` Start a try block
- `except Exception as e:` Catch an exception and assign it to the variable `e`
- `finally:` Execute code in the finally block regardless of whether an exception was raised or not
- `raise Exception("Error message")` Raise an exception with a custom error message
- `assert condition, "Error message"` Assert that a condition is true, raise an exception with a custom error message if it is not