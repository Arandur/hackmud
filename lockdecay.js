function(ctx, args) {
  var target = args.t, call_args = {}, response = target.call({});

  while (!response.includes("LOCK_UNLOCKED")) {
    if (response.includes("EZ_21")) {
      var passwords = ["open", "release", "unlock"];

      for (var i = 0; i < passwords.length; ++i) {
        call_args.EZ_21 = passwords[i];
        response = target.call(call_args);

        if (!response.includes("not the correct unlock command")) {
          break;
        }
      }
    } else if (response.includes("EZ_40")) {
      var passwords = ["open", "release", "unlock"];

      for (var i = 0; i < passwords.length; ++i) {
        call_args.EZ_40 = passwords[i];
        response = target.call(call_args);

        if (response.includes("ez_prime")) {
          break;
        }
      }

      primes = [ 2,  3,  5,  7, 11,
                13, 17, 19, 23, 29,
                31, 37, 41, 43, 47,
                53, 59, 61, 67, 71,
                73, 79, 83, 89, 97];

      for (var i = 0; i < primes.length; ++i) {
        call_args.ez_prime = primes[i];
        response = target.call(call_args);

        if (!response.includes("not the correct prime")) {
          break;
        }
      }
    }
  }

  return response;
}
