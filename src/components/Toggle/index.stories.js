import Toggle from "./index.vue";

export default {
  title: "Toggle",
  component: Toggle,
};

export const Text = () => ({
  components: { Toggle },
  template: "<Toggle />",
});
