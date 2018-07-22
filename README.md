# namehog

Minimal command-line tool to check if a username is available for an account to claim on Twitter.

## Usage

Namehog is designed as a command-line tool. Invoke it with `npx`:

```sh
$ npx namehog myDreamUsername
Available!

$ npx namehog myTakenUsername
Username has already been taken
```

Namehog can also return results in a boolean form, for easier scripting:

```sh
$ npx namehog myDreamUsername
1 # available

$ npx namehog myTakenUsername
0 # unavailable
```

Namehog also provides a `validate` function when used within another package. Use it by importing the `validate` function from the package:

```js
import { validate } from 'namehog';

const {
    valid, // true/false
    message, // string message / reason for unavailability if unavailable from Twitter API
} = await validate('myDreamUsername');
```

## License

This project is licensed entirely under the permissive MIT License.
