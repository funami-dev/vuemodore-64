import V64Key from './index.vue';

export default { title: 'Key', component: V64Key };

export const Single = () => ({ components: { V64Key }, template: "<V64Key label='F1' />" });

export const Wide = () => ({
  components: { V64Key },
  template: "<V64Key label='Return' wide />",
});

export const Combination = () => ({
  components: { V64Key },
  template: `
    <div>
      <V64Key label="Run" wide /> + <V64Key label="Stop" wide />
    </div>
  `,
});
