---
id: handling_exceptions
title: Handling Exceptions
---

You can provide good information when bad things happen.

```ts
class InvalidDateFormatError extends RangeError {}
class DateIsInFutureError extends RangeError {}

/**
 * // optional docblock
 * @throws {InvalidDateFormatError} The user entered date incorrectly
 * @throws {DateIsInFutureError} The user entered date in future
 *
 */
function parse(date: string) {
  if (!isValid(date))
    throw new InvalidDateFormatError("not a valid date format");
  if (isInFuture(date)) throw new DateIsInFutureError("date is in the future");
  // ...
}

try {
  // call parse(date) somewhere
} catch (e) {
  if (e instanceof InvalidDateFormatError) {
    console.error("invalid date format", e);
  } else if (e instanceof DateIsInFutureError) {
    console.warn("date is in future", e);
  } else {
    throw e;
  }
}
```

[View in TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BJAOwDcVrgATAERRhIAYtBACAolBxQ4SAB6CW3RghQsA5kknS4AbwC+VWgzj9BTOqyEBXGNaLboshUiUq1mxzIMUKmaywYwBAscMB0AGqcPAAU3AJIAFxwdDBQwBoAlHoUcHBEdlCh8YJwAPxwadZIcMmYnHRIANwUhpTk-oEwwaHhVrb2SHEJyanpWTnkeWghqXAlSAByEADucAC8cCxIa2ZDmS1TcDMsc2j2RCwwextbO6YJw4KZuXCvBfah51Ku1wkAdJoYAAVUD7OAAPnmCWWK0BSBBYJiB1avnIAHoAFSY3KYuDo9FwCBgbohTjzCBoABG1EpAGtcXAAAIwAAWOBWjF0rA4XD4CREUDEMC8+jgwNZNWsjRkvyQRG40NKGRmPww1AAnoyWezVly9hZ+oUtFJoGKJVKZbIrvKkIqFmFQv5jbjcei-AEgiE4GAUFBGk8kik0hl1NldK9gJg4DEAIThKJ8wOZF5HPJsjl3NY86L8wSC4VeGIAIhYEHgKDgvJ4SpqmFEAmLKKOUZjfRYNmNyeyGdWWYe5ksHYGDlNUBLDvCjsqkrgzsGTcOeQJcH+a9R7TSGsmy8JaE41B9foDC2ydFwO0lRFaxwEaFZMaQ4cj0ZiNQyqTUaCQEGjOb5ewFhIY7PmmxyzBA1BIP88rSCWGTVvaCRzg2MDFgANLIzZ5GKSDUI0YSvu+pwwF+P7RgaQ6doMXigXk0wQVB-wrH6LATshU4ZHOI5IBhWFLnAuH4TUEZgb2azNK8bT6EAA)

Simply throwing an exception is fine, however it would be nice to make TypeScript remind the consumer of your code to handle your exception. We can do that just by returning instead of throwing:

```ts
function parse(
  date: string
): Date | InvalidDateFormatError | DateIsInFutureError {
  if (!isValid(date))
    return new InvalidDateFormatError("not a valid date format");
  if (isInFuture(date)) return new DateIsInFutureError("date is in the future");
  // ...
}

// now consumer *has* to handle the errors
let result = parse("mydate");
if (result instanceof InvalidDateFormatError) {
  console.error("invalid date format", result.message);
} else if (result instanceof DateIsInFutureError) {
  console.warn("date is in future", result.message);
} else {
  /// use result safely
}

// alternately you can just handle all errors
if (result instanceof Error) {
  console.error("error", result);
} else {
  /// use result safely
}
```

You can also describe exceptions with special-purpose data types (don't say monads...) like the `Try`, `Option` (or `Maybe`), and `Either` data types:

```ts
interface Option<T> {
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Option<U>): FormikOption<U>;
  getOrElse(value: T): T;
}
class Some<T> implements Option<T> {
  constructor(private value: T) {}
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Some<U>): Some<U>;
  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value);
  }
  getOrElse(): T {
    return this.value;
  }
}
class None implements Option<never> {
  flatMap<U>(): None {
    return this;
  }
  getOrElse<U>(value: U): U {
    return value;
  }
}

// now you can use it like:
let result = Option(6) // Some<number>
  .flatMap((n) => Option(n * 3)) // Some<number>
  .flatMap((n = new None())) // None
  .getOrElse(7);

// or:
let result = ask() // Option<string>
  .flatMap(parse) // Option<Date>
  .flatMap((d) => new Some(d.toISOString())) // Option<string>
  .getOrElse("error parsing string");
```
