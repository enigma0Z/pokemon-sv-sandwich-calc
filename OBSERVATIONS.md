# Bugs

## Calculations

### Single ingredient big ingredient sandwiches

It seems that if you put six (max) of one of the big ingredients, if it's enough to elevate power #1 to level 2, it'll elevate the second as well no matter what it is.

Example: Rice x6 + Curry powder under normal rules is the following

* Humungo Normal 2 (180 type + 126 power)
* Egg 1 (180 type + 97 power)
* Encounter Fighting 1 (180 type + 72 power)

BUT in game the result is 2-2-1 (egg 2).  This seems to be true for any of the other big ingredients that can get 180 type power on their own.  They're listed below ...

* Noodles
* Rice
* Potato Salad

### Some sandwich typings dobule the first and defy normal rules

http://localhost:3000/?ingredients=Hamburger,Hamburger,Hamburger,Hamburger,Hamburger,Hamburger&seasonings=Mayonnaise

Expected [0, 2, 1] types:

* Encounter Power: Steel, Lv. 1
* Exp. Power: Fighting, Lv. 1
* Catching Power: Normal, Lv. 1

Actual [0, 0, 1] types:

* Encounter Power: Steel, Lv. 1
* Exp. Power: Steel, Lv. 1
* Catching Power: Normal, Lv. 1