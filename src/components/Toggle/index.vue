<template>
  <div class="c64-switch">
    <input id="c64toggle" type="checkbox" />
    <label for="c64toggle"></label><span v-if="label">{{ label }}</span>
  </div>
</template>
<script>
export default {
  name: "V64Toggle",
  props: {
    label: {
      type: String,
    },
  },
};
</script>
<style lang="scss" scoped>
.c64-switch {
  font-family: "C64 PRO MONO", "C64 PRO", "Courier New", "Lucida Console", Courier, MENLO, MONACO,
    monospace;
  background: $secondary;
  color: $primary;
  display: inline-flex;
  input {
    display: none;
    &,
    &:after,
    &:before,
    & *,
    & *:after,
    & *:before,
    & + label {
      box-sizing: border-box;
      &::selection {
        background: none;
      }
    }
    + label {
      outline: 0;
      display: block;
      width: 2em;
      height: 1em;
      position: relative;
      cursor: pointer;
      user-select: none;
      &:after,
      &:before {
        position: relative;
        display: block;
        content: "";
        width: 50%;
        height: 100%;
      }
      &:after {
        left: 0;
      }
      &:before {
        display: none;
      }
    }
    &:checked {
      + label {
        &:after {
          left: 50%;
        }
      }
    }
  }

  input {
    + label {
      background: $primary;
      border-radius: 0em;
      padding: 1px;
      transition: all 0.4s ease;
      &:after {
        border-radius: 0%;
        background: $grey;
        transition: all 0.2s ease;
      }
    }
    &:checked {
      + label {
        &:after {
          background: $secondary;
        }
      }
    }
  }
}
</style>
