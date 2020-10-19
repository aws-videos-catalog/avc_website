<template>
  <button
    class="theme-toggle__container"
    aria-label="Toggle dark mode"
    @click="onToggle"
  >
    <span class="theme-toggle__icon">
      🌓
    </span>
  </button>
</template>

<script>
const themeClasses = {
  LIGHT: 'theme--light',
  DARK: 'theme--dark'
}

const themeLocalStorageKey = 'application_theme'

export default {
  name: 'ThemeToggle',

  beforeMount () {
    this.setInitialTheme()
  },

  methods: {
    isPreferredDarkTheme () {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    },

    getPreferredTheme () {
      return this.isPreferredDarkTheme() ? themeClasses.DARK : themeClasses.LIGHT
    },

    checkIfThemeApplied (theme) {
      return document.body.classList.contains(theme)
    },

    setInitialTheme () {
      const theme = localStorage.getItem(themeLocalStorageKey) || this.getPreferredTheme()

      return document.body.classList.toggle(theme)
    },

    saveTheme (theme) {
      localStorage.setItem(themeLocalStorageKey, theme)
    },

    onToggle () {
      const isDarkPreferred = this.isPreferredDarkTheme()
      const isDarkApplied = this.checkIfThemeApplied(themeClasses.DARK)
      const isLightApplied = this.checkIfThemeApplied(themeClasses.LIGHT)

      const isDarkNext = (isDarkPreferred && !isDarkApplied) || (!isDarkPreferred && isLightApplied)

      if (isDarkNext) {
        document.body.classList.add(themeClasses.DARK)
        document.body.classList.remove(themeClasses.LIGHT)
        this.saveTheme(themeClasses.DARK)
      } else {
        document.body.classList.add(themeClasses.LIGHT)
        document.body.classList.remove(themeClasses.DARK)
        this.saveTheme(themeClasses.LIGHT)
      }
    }
  }
}
</script>

<style lang="scss">
.theme-toggle {
  &__container {
    border: none;
    margin: 0;
    padding: 0;
    box-shadow: 0;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }

  &__icon {
    background-color: var(--color-bg-reverse);
    width: 28px;
    height: 28px;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    line-height: 1;
    transition: background-color 0.3s ease-in-out;
  }
}
</style>
