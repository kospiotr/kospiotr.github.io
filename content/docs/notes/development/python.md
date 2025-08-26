+++
title = 'Python'
BookCollapseSection = true
+++

```python
if __name__ == "__main__":
    print("Hello, World!")
```

# Methods
## String

- `str(123)` -> `'123'` Convert to string
- `'   a b c  '.strip()` -> `'a b c'` Remove leading and trailing whitespace
- `'abc'.capitalize()` -> `'Abc'` Capitalize the first character of the string
- `'ab bc cd'.title()` -> `'Ab Bc Cd'` Capitalize the first character of each word
- `'a b c'.split('')` -> `['a','b','c']` Split the string into a list of substrings
- `'abc'.startswith('a')` -> `True` Check if the string starts with a specific substring
- `'abc'.endswith('c')` -> `True` Check if the string ends with a specific substring
- `'abc'.find('b')` -> `1` Find the index of the first occurrence of a substring
- `'abc'.rfind('b')` -> `1` Find the index of the last occurrence of a substring
- `'abc'.count('a')` -> `1` Count the number of occurrences of a substring
- `'abc'.replace('a', 'x')` -> `'xbc'` Replace a substring with another substring
- `'abc'.upper()` -> `'ABC'` Convert the string to uppercase
- `'abc'.lower()` -> `'abc'` Convert the string to lowercase
- `'abc'.swapcase()` -> `'ABC'` Swap the case of each character in the string
- `'abc'.isalpha()` -> `True` Check if the string contains only alphabetic characters
- `'abc123'.isalnum()` -> `True` Check if the string contains only alphanumeric characters
- `'abc'.isdigit()` -> `False` Check if the string contains only digits
- `'abc'.isupper()` -> `False` Check if the string is in uppercase
- `'abc'.islower()` -> `True` Check if the string is in lowercase
- `'abc'.isspace()` -> `False` Check if the string contains only whitespace characters
- `'abc'.isnumeric()` -> `False` Check if the string contains only numeric characters

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
- `list1 + list2` Concatenate two lists
- `list1 * 2` Repeat the list twice
- `len(list)` Get the length of the list
- `list1 == list2` Check if two lists are equal
- `list1 != list2` Check if two lists are not equal
- `list1 in list2` Check if an element is in the list
- `list1 not in list2` Check if an element is not in the list
- `list(range(10))` Convert a range to a list
- `list(range(1, 11))` Convert a range from 1 to 10 to a list

# Slices
- `list[start:end]` Get a slice of the list from index `start` to `end` (exclusive)
- `list[start:end:step]` Get a slice of the list from index `start` to `end` (exclusive) with a step size of `step`
- `list[start:]` Get a slice of the list from index `start` to the end
- `list[:end]` Get a slice of the list from the beginning to index `end` (exclusive)
- `list[:]` Get a copy of the entire list
- `list[::-1]` Get a reversed copy of the list
- `list[::2]` Get every second element of the list
- `list[-1]` Access the last element of the list
- `list[-2]` Access the second-to-last element of the list
- `list[-3:]` Get the last three elements of the list
- `list[:-3]` Get all elements of the list except the last three
- `list[1:5]` Get a slice of the list from index 1 to 4 (inclusive of 1, exclusive of 5)
- `list[1:5:2]` Get a slice of the list from index 1 to 4 (inclusive of 1, exclusive of 5) with a step size of 2

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
```python
try:
    # code that may raise an exception
except Exception as e:
    # handle the exception
else:
    # code to execute if no exception was raised
finally:
    # code to execute regardless of whether an exception was raised or not
```
- `raise Exception("Error message")` Raise an exception with a custom error message
- `assert condition, "Error message"` Assert that a condition is true, raise an exception with a custom error message if it is not
- `pass` Do nothing (used as a placeholder)

# Importing
- `import random` Import the random module
- `import random as rnd` Import the random module with an alias
- `from random import choice` Import the choice function from the random module


# Core Libraries
- `import random` Import the random library
  - `random.randint(1, 10)` Generate a random integer between 1 and 10 (inclusive)
  - `random.random()` Generate a random float between 0.0 and 1.0
  - `random.uniform(1, 10)` Generate a random float between 1.0 and 10.0
  - `random.choice([1, 2, 3])` Randomly select an element from a list
  - `random.sample([1, 2, 3], 2)` Randomly select 2 unique elements from a list
  - `random.shuffle([1, 2, 3])` Shuffle a list in place
  - `random.seed(42)` Set the seed for random number generation for reproducibility
  - `random.gauss(0, 1)` Generate a random number from a Gaussian distribution with mean 0 and standard deviation 1
  - `random.expovariate(1)` Generate a random number from an exponential distribution with lambda 1
- `import statistics` Import the statistics library
  - `mean([100, 90])` Calculate the mean of a list of numbers
  - `median([100, 90])` Calculate the median of a list of numbers
  - `mode([100, 90])` Calculate the mode of a list of numbers
  - `stdev([100, 90])` Calculate the standard deviation of a list of numbers
  - `variance([100, 90])` Calculate the variance of a list of numbers
  - `pvariance([100, 90])` Calculate the population variance of a list of numbers
  - `pstdev([100, 90])` Calculate the population standard deviation of a list of numbers
  - `quantiles([100, 90], n=4)` Calculate the quartiles of a list of numbers
  - `harmonic_mean([100, 90])` Calculate the harmonic mean of a list of numbers
  - `geometric_mean([100, 90])` Calculate the geometric mean of a list of numbers
  - `median_low([100, 90])` Calculate the lower median of a list of numbers
- `import sys` Import the sys library
  - `sys.argv` Access command-line arguments as a list passed to the script
  - `sys.exit(0)` Exit the script with a status code (0 for success)
  - `sys.path` Access the list of directories Python searches for modules
  - `sys.version` Get the version of Python being used
  - `sys.platform` Get the platform Python is running on (e.g., 'linux', 'win32', 'darwin')
  - `sys.modules` Access the list of loaded modules
  - `sys.getsizeof(object)` Get the size of an object in bytes
- `import logging` Import the logging library (for logging messages)
  - `logging.basicConfig(level=logging.INFO)` Set up basic logging configuration
  - `logging.getLogger("my_logger")` Get a logger with a specific name
  - `logger.setLevel(logging.DEBUG)` Set the logging level for a specific logger
  - `logger.info("This is an info message")` Log an info message
  - `logger.warning("This is a warning message")` Log a warning message
  - `logger.error("This is an error message")` Log an error message
  - `logger.debug("This is a debug message")` Log a debug message
  - `logger.critical("This is a critical message")` Log a critical message
  - `logger.exception("This is an exception message")` Log an exception message with traceback
  - `logger.addHandler(logging.StreamHandler())` Add a handler to a logger to output logs to the console
  - `logger.addHandler(logging.FileHandler("logfile.log"))` Add a handler to a logger to output logs to a file
- `import math` Import the math library
  - `math.sqrt(16)` Calculate the square root of a number
  - `math.pow(2, 3)` Calculate 2 raised to the power of 3
  - `math.factorial(5)` Calculate the factorial of a number
  - `math.gcd(12, 15)` Calculate the greatest common divisor of two numbers
  - `math.lcm(12, 15)` Calculate the least common multiple of two numbers
  - `math.pi` Get the value of pi
  - `math.e` Get the value of Euler's number
  - `math.sin(math.pi / 2)` Calculate the sine of an angle in radians
  - `math.cos(math.pi)` Calculate the cosine of an angle in radians
  - `math.tan(math.pi / 4)` Calculate the tangent of an angle in radians
  - `math.log(100, 10)` Calculate the logarithm of a number with a specified base
  - `math.log10(100)` Calculate the base-10 logarithm of a number
  - `math.log2(8)` Calculate the base-2 logarithm of a number
  - `math.exp(1)` Calculate the exponential of a number (e^x)
  - `math.degrees(math.pi)` Convert radians to degrees
  - `math.radians(180)` Convert degrees to radians
- `import datetime` Import the datetime library
- `import os` Import the os library
- `import json` Import the json library
- `import re` Import the re library (regular expressions)

# Packages
- `pip install package_name` Install a package using pip
- `pip install package_name==version` Install a specific version of a package
- `pip install package_name>=version` Install a package with a minimum version
- `pip install package_name<=version` Install a package with a maximum version
- `pip install package_name[extra]` Install a package with optional extras
- `pip install -e .` Install a package in editable mode (for development)
- `pip install -r requirements.txt` Install packages from a requirements file
- `pip freeze > requirements.txt` List installed packages and their versions
- `pip list` List installed packages
- `pip show package_name` Show information about a specific package
- `pip uninstall package_name` Uninstall a package
- `pip search query` Search for packages
- `pip check` Check for broken dependencies
- `pip cache` Manage the pip cache
- `pip config` Manage pip configuration
- `pip wheel package_name` Build a wheel distribution of a package
- `pip download package_name` Download a package without installing it
- `pip install --upgrade package_name` Upgrade a package to the latest version
- `pip install --force-reinstall package_name` Force reinstall a package
- `pip install --no-deps package_name` Install a package without its dependencies
- `pip install --user package_name` Install a package for the current user only
- `pip install --system package_name` Install a package for the system (requires admin privileges)
- `pip install --target /path/to/dir package_name` Install a package to a specific directory
- `pip install --no-cache-dir package_name` Install a package without using the cache
- `pip install --pre package_name` Install a pre-release version of a package
- `pip install --trusted-host host package_name` Install a package from a trusted host

# Popular Libraries
- `requests` Import the requests library (for making HTTP requests)
  - `requests.get('https://api.example.com/data')` Make a GET request to an API
  - `requests.post('https://api.example.com/data', json={'key': 'value'})` Make a POST request to an API with JSON data
  - `requests.put('https://api.example.com/data/1', json={'key': 'new_value'})` Make a PUT request to update data
  - `requests.delete('https://api.example.com/data/1')` Make a DELETE request to remove data
  - `response.json()` Parse the JSON response from an API request
  - `response.status_code` Get the status code of the response
  - `response.headers` Get the headers of the response
  - `response.text` Get the raw text of the response
  - `response.content` Get the raw content of the response
  - `response.cookies` Get the cookies from the response
  - `response.raise_for_status()` Raise an exception for HTTP errors
  - `requests.Session()` Create a session for persistent connections
  - `session.get('https://api.example.com/data')` Make a GET request using a session
  - `session.post('https://api.example.com/data', json={'key': 'value'})` Make a POST request using a session
  - `session.put('https://api.example.com/data/1', json={'key': 'new_value'})` Make a PUT request using a session
  - `session.delete('https://api.example.com/data/1')` Make a DELETE request using a session
  - `session.headers` Set custom headers for a session
  - `session.cookies` Set custom cookies for a session
  - `session.auth` Set authentication for a session
  - `session.proxies` Set proxies for a session
  - `session.verify` Set SSL verification for a session
- `pandas as pd` Import the pandas library (for data manipulation and analysis)
- `numpy as np` Import the numpy library (for numerical operations)
- `matplotlib.pyplot as plt` Import the matplotlib library (for plotting)
- `seaborn as sns` Import the seaborn library (for statistical data visualization)
- `scikit-learn as sk` Import the scikit-learn library (for machine learning)
- `tensorflow as tf` Import the tensorflow library (for deep learning)
- `torch` Import the torch library (for deep learning with PyTorch)
- `cv2` Import the OpenCV library (for computer vision)
- `PIL` Import the PIL library (for image processing)
- `sqlite3` Import the sqlite3 library (for working with SQLite databases)
- `sqlalchemy` Import the sqlalchemy library (for working with databases)
- `unittest` Import the unittest library (for unit testing)
- `pytest` Import the pytest library (for testing)
- `flask` Import the flask library (for web development)
- `django` Import the django library (for web development)
- `fastapi` Import the fastapi library (for building APIs)
- `scrapy` Import the scrapy library (for web scraping)
- `beautifulsoup4 as bs4` Import the beautifulsoup4 library (for parsing HTML and XML documents)
- `lxml` Import the lxml library (for parsing XML and HTML documents)
- `xml.etree.ElementTree as ET` Import the xml.etree.ElementTree library (for parsing XML documents)
- `csv` Import the csv library (for working with CSV files)
- `json` Import the json library (for working with JSON data)
- `yaml` Import the yaml library (for working with YAML data)
- `configparser` Import the configparser library (for working with configuration files)
- `argparse` Import the argparse library (for parsing command-line arguments)
- `time` Import the time library (for working with time)
- `datetime` Import the datetime library (for working with dates and times)
- `calendar` Import the calendar library (for working with calendars)
- `itertools` Import the itertools library (for working with iterators)
- `functools` Import the functools library (for working with higher-order functions)
- `operator` Import the operator library (for working with operators)
- `collections` Import the collections library (for working with specialized container datatypes)
- `heapq` Import the heapq library (for working with heaps)
- `bisect` Import the bisect library (for working with sorted lists)
- `array` Import the array library (for working with arrays)
- `struct` Import the struct library (for working with C-style data structures)
- `ctypes` Import the ctypes library (for working with C libraries)
- `multiprocessing` Import the multiprocessing library (for parallel processing)
- `threading` Import the threading library (for working with threads)
- `queue` Import the queue library (for working with queues)
- `subprocess` Import the subprocess library (for running external commands)
- `shutil` Import the shutil library (for working with files and directories)
- `glob` Import the glob library (for working with file patterns)
- `fnmatch` Import the fnmatch library (for matching filenames)
- `tempfile` Import the tempfile library (for working with temporary files)
- `zipfile` Import the zipfile library (for working with ZIP files)
- `tarfile` Import the tarfile library (for working with TAR files)
- `gzip` Import the gzip library (for working with GZIP files)
- `bz2` Import the bz2 library (for working with BZ2 files)
- `lzma` Import the lzma library (for working with LZMA files)
- `base64` Import the base64 library (for encoding and decoding base64 data)
- `hashlib` Import the hashlib library (for working with hash functions)
- `hmac` Import the hmac library (for working with HMACs)