import V64Text from './index.vue';
import { V64_PALETTE } from '../../styles/theme';

export default {
  title: 'Text',
  component: V64Text,
};

export const Simple = () => ({
  components: { V64Text },
  template: '<V64Text>Ready.</V64Text>',
});

export const Coloured = () => ({
  components: { V64Text },
  data: () => ({ green: V64_PALETTE.green }),
  template: "<V64Text :color='green'>Load \"*\",8,1</V64Text>",
});
