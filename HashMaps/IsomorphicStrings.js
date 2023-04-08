// Given two strings, check whether two strings are isomorphic to each other or not.

// Two strings are isomorphic if a fixed mapping exists from the characters of one string to the characters of the other string.

// For example, if there are two instances of the character "a"  in the first string, both these instances should be converted to
// another character (which could also remain the same character if "a" is mapped to itself) in the second string.

// This converted character should remain the same in both positions of the second string since there is a fixed mapping from the
// character "a" in the first string to the converted character in the second string.

// Note: Two different characters cannot map to the same character.

// Furthermore, all the instances of a character must be replaced with another character while protecting the order of characters.

// Constraints:
// Both the strings consist of valid ASCII characters.
// The length of the string is 0 ≤ length ≤ 5×10^4.
// The length of both strings is the same.

// T: O(n)
// S: O(1) since limited by unique characters, and ASCII is a fixed length
export function isIsomorphic(string1, string2) {
  const mapString1To2 = {};
  const mapString2To1 = {};

  return (
    hasUniqueMapping(mapString1To2, string1, string2)
    && hasUniqueMapping(mapString2To1, string2, string1)
  );
}

function hasUniqueMapping(map, keyString, valueString) {
  for (let i = 0; i < keyString.length; i++) {
    const char = keyString[i];
    if (!map[char]) {
      map[char] = valueString[i];
    } else if (map[char] !== valueString[i]) {
      return false;
    }
  }
  return true;
}