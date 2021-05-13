# Course-Work-OP
Course Work for OP, 2nd semester of year 1 at KPI

## Topic

Analogue of a student diary with scheduler and system of data pick

## General work scheme

A function calls reading of .json is added to the scheduler. For this work .json file must be formatted the following way:
```
“date”: {”time”: {“contacts”: “data”}}
```
The function will be called  several times after same interval.

The data inside the file will be transformed into an object, a part of which information will be selected by certain attributes (must be formatted right in this case) and transferred from the original object to a new data structure. The newly picked data will form a new file of .json format (.txt format if I have enough time).
