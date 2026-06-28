---
title: Publishing my first app on Play Store!
description: My experience on developing and publishing my first app on Play Store.
category: blog
tags: [first-app, play-store]
time: 2023-11-29T14:10:08.701Z
keywords: []
---

# Firstly, thank you all!

I'm happy to announce that [Symphony has been published in Play Store 🎉](https://play.google.com/store/apps/details?id=io.github.zyrouge.symphony)! I thank every donator and contributor who has constantly contributed in the hopes of making it better for everyone.

# How did it start?

The only thing that made me do this project was a very simple feature, sorting by filename. And surprisingly, no good music player had it. As a person who was just starting to move towards local music, I did not know about M3U playlists, and I really need that.

So, I decided to take matter into my own hands. But, I was not very fond of Flutter's way of handling Android-specific things. "Maybe, what if I just learnt Android development?". Yet again, I was not interested in traditional XML way of making user interface. I decided to take the risk and learn Jetpack Compose. Even though, it was not production ready, I went ahead with it.

# How do I feel about Jetpack Compose?

Jetpack Compose takes an approach of "everything is a component in a render tree" and it works very well (until it doesn't work). The way it rendered was way more performant and smoother than Flutter. But the reactivity, Flutter still excels at it. Compose tries to do it the hard way and faces the issues of that approach. Comparing stateful data to decide reactivity might be performant but comes at the cost of not being able to force any changes. For example, reactivity with list was painful to work with. It would 100% crash if you updated a large `MutableStateList` every second. Also, you cannot use immutable `List`s directly with components. But, I do have to agree that these issues partially resolved over multiple releases of Compose Runtime. Even then, I had to migrate over to `StateFlow`s, which was very scary.

# Did open-source really work?

I can confidently say "if money is your motive, you cannot pull this off as an individual". How much richer did I get? 0%. Was it worth it? Hell yes! I loved how people came forward with their feedback, thoughts and ideas. 90% of the cool features were recommended by individuals. That aside, some people did come forward by making pull requests (notable PRs were [#240](https://github.com/zyrouge/symphony/pull/240), [#58](https://github.com/zyrouge/symphony/pull/58) and [#212](https://github.com/zyrouge/symphony/pull/212)). I thank [@Atrafon](https://github.com/Atrafon), [@kuragehimekurara1](https://github.com/kuragehimekurara1), [@Icarus-Xu](https://github.com/Icarus-Xu), [@ghostnear](https://github.com/ghostnear) and [@Krintni](https://github.com/Krintni) for the continuous contributions of translations. I also thank the F-Droid team/contributors for helping me out to get Symphony on F-Droid (F-droid is awesome btw).

# Conclusion

I wanted this to happen. And it did. And it was worth it all the way along.
