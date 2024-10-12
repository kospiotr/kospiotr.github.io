---
title: IDE
---
# Installation
```
sudo tar -xvf idea* -C /opt/
Run idea.sh from the bin subdirectory.
```

# Shortcuts

## General

* `ctrl + alt + s` - settings
* `ctrl + shift + a` - action

## Navigating

* `2 x shift` - search everywhere
* `ctrl + n` - find class
* `ctrl + shift + n` - find file
* `ctrl + shift + t` - navigate between test and implementation
* `ctrl + shift + i` - object definition popup
* `shift + ESC` - close last non center panel
* `ctrl + F12` - file structure
* `alt + F12` - terminal

## Editing

## Execution

* `shift + F10` - run current configuration
* `shift + F10` - execute current test class / tests for the current class

## Notes from workshops:

* `alt + number`
* `ctrl + e` - last visited places
* `ctrl + shift + e` - last edited places
* `shift + escape` - closes last tool window
* `ctrl + shift + f12` - close all tool windows
* `ctrl + shift + arrow` - in tool window resize tool window, doesnt work in terminal (must remove capturing)
* `ctrl + shift + a` - run action
* `ctrl + n` - find file by class name
* `ctrl + shift + n` - find file by file name
* `ctrl + shift + alt + n` - find by symbol
* `shift + shift` - find all above
* `alt + shift + F9` - debug
* `ctrl + w` - expand selection
* `ctrl + shift + w` - reduce selection
* `ctrl + spac`e - code completion
* `ctrl + shift + space` - smart code completion

## When changing method

* `tab` - replaces current method
* `enter` - appends current method
* `ctrl + shift + enter` - encloses sentence in brackets
* `ctrl + .` - closes sentence and adds dot on the end
* `ctrl + shift + arrow (up / down)` - move properly class members
* `shift + enter` - add enter after current line and goes to that line
* `ctrl + enter` - add enter after current line but stays on that line
* `ctrl + d` - duplicates line or selected line
* `ctrl + y` - deletes current line
* `alt + insert` - generate
* `ctrl + ~` - quick list

## Debugger

* `shift + F7` - smart step into
* `ctrl + alt + 9` - force run to cursor
* `alt + F8` - evaluate expression

## Bookmarks

* `F11` - toogle bookmarks
* `shift + F11` - browse bookmarks

## Scratches

* `ctrl + shift + alt` - create scratches
* `ctrl + shift + i` - inspection

# File and Code Templates

## JUnit4 Test Class

```java
import org.mockito.*;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;
import static org.assertj.core.api.Assertions.assertThat;;

@RunWith(MockitoJUnitRunner.class)
public class ${NAME}{

  @InjectMocks
  private ${CLAS_NAME} instance;
  
  ${BODY}
}
```

## JUnit4 Test Method

```java
@org.junit.Test
public void should${NAME}() throws Exception {
  ${BODY}
}
```

# Clean up on save (reformat code, organize imports):

1. `Code -> Reformat Code`
2. `Edit -> Macros -> Start Macro Recording`
3. `Code -> Reformat Code`
3. `Code -> Optimize imports`
4. `File -> Save all`
5. `Edit -> Macros -> Stop Macro Recording`
6. `Name the macro (something like "formatted save")
7. `File -> Settings -> Keymap -> right click on the macro ->dd Keyboard Shortcut ->et the keyboard shortcut to `ctrl + s`. 
