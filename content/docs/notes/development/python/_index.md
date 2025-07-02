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


# Libraries
- `import random` Import the random library
- `import statistics` Import the statistics library
  - `mean([100, 90])` Calculate the mean of a list of numbers
- `import sys` Import the sys library
  - `sys.argv` Access command-line arguments as a list passed to the script
  - `sys.exit(0)` Exit the script with a status code (0 for success)
- `import logging` Import the logging library (for logging messages)
- `import math` Import the math library
- `import datetime` Import the datetime library
- `import os` Import the os library
- `import json` Import the json library
- `import re` Import the re library (regular expressions)
- `import requests` Import the requests library (for making HTTP requests)
- `import pandas as pd` Import the pandas library (for data manipulation and analysis)
- `import numpy as np` Import the numpy library (for numerical operations)
- `import matplotlib.pyplot as plt` Import the matplotlib library (for plotting)
- `import seaborn as sns` Import the seaborn library (for statistical data visualization)
- `import scikit-learn as sk` Import the scikit-learn library (for machine learning)
- `import tensorflow as tf` Import the tensorflow library (for deep learning)
- `import torch` Import the torch library (for deep learning with PyTorch)
- `import cv2` Import the OpenCV library (for computer vision)
- `import PIL` Import the PIL library (for image processing)
- `import sqlite3` Import the sqlite3 library (for working with SQLite databases)
- `import sqlalchemy` Import the sqlalchemy library (for working with databases)
- `import logging` Import the logging library (for logging messages)
- `import unittest` Import the unittest library (for unit testing)
- `import pytest` Import the pytest library (for testing)
- `import flask` Import the flask library (for web development)
- `import django` Import the django library (for web development)
- `import fastapi` Import the fastapi library (for building APIs)
- `import scrapy` Import the scrapy library (for web scraping)
- `import beautifulsoup4 as bs4` Import the beautifulsoup4 library (for parsing HTML and XML documents)
- `import lxml` Import the lxml library (for parsing XML and HTML documents)
- `import xml.etree.ElementTree as ET` Import the xml.etree.ElementTree library (for parsing XML documents)
- `import csv` Import the csv library (for working with CSV files)
- `import json` Import the json library (for working with JSON data)
- `import yaml` Import the yaml library (for working with YAML data)
- `import configparser` Import the configparser library (for working with configuration files)
- `import argparse` Import the argparse library (for parsing command-line arguments)
- `import time` Import the time library (for working with time)
- `import datetime` Import the datetime library (for working with dates and times)
- `import calendar` Import the calendar library (for working with calendars)
- `import itertools` Import the itertools library (for working with iterators)
- `import functools` Import the functools library (for working with higher-order functions)
- `import operator` Import the operator library (for working with operators)
- `import collections` Import the collections library (for working with specialized container datatypes)
- `import heapq` Import the heapq library (for working with heaps)
- `import bisect` Import the bisect library (for working with sorted lists)
- `import array` Import the array library (for working with arrays)
- `import struct` Import the struct library (for working with C-style data structures)
- `import ctypes` Import the ctypes library (for working with C libraries)
- `import multiprocessing` Import the multiprocessing library (for parallel processing)
- `import threading` Import the threading library (for working with threads)
- `import queue` Import the queue library (for working with queues)
- `import subprocess` Import the subprocess library (for running external commands)
- `import shutil` Import the shutil library (for working with files and directories)
- `import glob` Import the glob library (for working with file patterns)
- `import fnmatch` Import the fnmatch library (for matching filenames)
- `import tempfile` Import the tempfile library (for working with temporary files)
- `import zipfile` Import the zipfile library (for working with ZIP files)
- `import tarfile` Import the tarfile library (for working with TAR files)
- `import gzip` Import the gzip library (for working with GZIP files)
- `import bz2` Import the bz2 library (for working with BZ2 files)
- `import lzma` Import the lzma library (for working with LZMA files)
- `import base64` Import the base64 library (for encoding and decoding base64 data)
- `import hashlib` Import the hashlib library (for working with hash functions)
- `import hmac` Import the hmac library (for working with HMACs)
- 
