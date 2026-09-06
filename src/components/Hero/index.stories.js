import V64Hero from './index.vue';
import V64Button from '../Button/index.vue';

export default {
  title: 'Hero',
  component: V64Hero,
};

export const Simple = () => ({
  components: { V64Hero },
  template: "<V64Hero title='Vuemodore 64' subtitle='A Commodore 64 design system for Vue' />",
});

export const WithActions = () => ({
  components: { V64Hero, V64Button },
  template: `
    <V64Hero title='Vuemodore 64' subtitle='64K RAM system, 38911 basic bytes free'>
      <V64Button>Load "*",8,1</V64Button>
      <V64Button variant='secondary'>List</V64Button>
    </V64Hero>
  `,
});

export const LeftAlignedWithoutStripes = () => ({
  components: { V64Hero },
  template: "<V64Hero align='left' :stripes='false' title='Ready.' subtitle='Type a command' />",
});
