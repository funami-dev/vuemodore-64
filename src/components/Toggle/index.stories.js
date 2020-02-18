import Toggle from "./index.vue";

export default {
  title: "Toggle",
  component: Toggle,
};

export const SimpleToggle = () => ({
  components: { Toggle },
  template: "<Toggle />",
});

export const SimpleToggleWithLabel = () => ({
  components: { Toggle },
  template: "<Toggle label='ok' />",
});
