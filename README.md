# muradjs
An npm package to convert Bangla text into transliterated English text


## How to use

```

const transliterate = require("muradjs");

console.log(
  transliterate(
    `দুটো মানচিত্র একে দুটো দেশের মাঝে, বিধে আছে অনূভুতিগুলোর ব্যাবচ্ছেদ`
  )
);

// log will return -- duto manchitro eke duto desher majhe, bidhe ache onuvutigulor byabochched


```