import V64Textarea from './index.vue';

export default { title: 'Textarea', component: V64Textarea };

export const Simple = () => ({
  components: { V64Textarea },
  data: () => ({ listing: '10 PRINT "HELLO"\n20 GOTO 10' }),
  template: "<V64Textarea v-model='listing' label='Listing' :rows='6' block />",
});

export const WithCounter = () => ({
  components: { V64Textarea },
  data: () => ({ note: 'HELLO' }),
  template: "<V64Textarea v-model='note' label='Note' :maxlength='40' block />",
});

export const WithError = () => ({
  components: { V64Textarea },
  template: "<V64Textarea label='Listing' value='?' error='Syntax error' block />",
});
