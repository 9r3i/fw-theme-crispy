
[![Author](https://img.shields.io/badge/author-9r3i-lightgrey.svg)](https://github.com/9r3i)
[![License](https://img.shields.io/github/license/9r3i/fw-theme-crispy.svg)](https://github.com/9r3i/fw-theme-crispy/blob/master/LICENSE)
[![Forks](https://img.shields.io/github/forks/9r3i/fw-theme-crispy.svg)](https://github.com/9r3i/fw-theme-crispy/network)
[![Stars](https://img.shields.io/github/stars/9r3i/fw-theme-crispy.svg)](https://github.com/9r3i/fw-theme-crispy/stargazers)
[![Issues](https://img.shields.io/github/issues/9r3i/fw-theme-crispy.svg)](https://github.com/9r3i/fw-theme-crispy/issues)
[![Release](https://img.shields.io/github/release/9r3i/fw-theme-crispy.svg)](https://github.com/9r3i/fw-theme-crispy/releases)
[![Donate](https://img.shields.io/badge/donate-paypal-orange.svg)](https://paypal.me/9r3i)


# fw-theme-crispy
A theme for ForceWebsite named Crispy, including crispies plugin

# Requirements
This theme requires a client plugin ```crispies``` and a server plugin ```crispy```.

For server plugin, put file ```crispy.force.php``` in force server directory ```FORCE_CLI_DIR``` with path ```force/plugins``` and data ```crispy.json``` file in path ```force/data/<database_name>/data```.

I know this is a lil' bit hard for beginner, but it's worth it.

And for client plugin, just add config array to website config file in array of plugins' section like this.

```json
{
  "plugins": [
    ["crispies",false,
      "https://9r3i.github.io/fw-theme-crispy"
    ]
  ]
}
```

# Config theme
For theme config simply put this in theme section
```json
{
  "theme": {
    "namespace": "crispy",
    "host": "https://9r3i.github.io/fw-theme-crispy"
  }
}
```

# Closing
That's all there is to it. Alhamdulillaah...



