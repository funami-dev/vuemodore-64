import V64Link from './index.vue';

export default { title: 'Link', component: V64Link };

export const Simple = () => ({
  components: { V64Link },
  template: "<V64Link href='#'>Read the manual</V64Link>",
});

export const External = () => ({
  components: { V64Link },
  template: "<V64Link href='https://example.com' target='_blank'>Commodore</V64Link>",
});

export const Disabled = () => ({
  components: { V64Link },
  template: "<V64Link href='#' disabled>Not available</V64Link>",
});
