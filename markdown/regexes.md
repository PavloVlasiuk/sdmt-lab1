This is a short text about **regular expressions** in `JavaScript`.

A **regular expression** _(also “regexp”, or just “reg”)_ consists of a pattern and optional flags.

There are `two syntaxes` that can be used to create a regular expression object.

The _“long”_ syntax:
```
regexp = new RegExp("pattern", "flags");
And the “short” one, using slashes "/":
```
```
regexp = /pattern/;
```

Slashes /.../ tell `JavaScript` that we are creating a **regular expression**. They play the same role as quotes for strings.

In both cases regexp becomes an instance of the built-in **RegExp class**.

In the end I want to add a few interesting cases of marking: snake_case, word with two st**ars or `_`. Enough