<template>
  <div>
    <V64Text>Vier Ausgaben im Jahr, gedruckt und getackert.</V64Text>

    <Fields>
      <V64Input v-model="email" label="E-Mail" type="email" :error="error" block />
      <V64NumberInput v-model="count" label="Ausgaben" :min="1" :max="12" />
      <V64RadioGroup v-model="shipping" label="Versand" :options="options" inline />
    </Fields>

    <V64Checkbox v-model="terms" label="Ich weiß, dass es dieses Heft nicht gibt" />

    <Actions>
      <V64Button :disabled="!terms" @click="order">Bestellen</V64Button>
    </Actions>
  </div>
</template>
<script>
import styled from 'vue-styled-components';
import {
  V64Text, V64Input, V64NumberInput, V64RadioGroup, V64Checkbox, V64Button,
} from '../../components';

const SHIPPING = ['Standard', 'Express'];

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 1em 0;
`;

const Actions = styled.div`
  margin-top: 1em;
`;

export default {
  name: 'ExampleOrder',
  components: {
    Fields,
    Actions,
    V64Text,
    V64Input,
    V64NumberInput,
    V64RadioGroup,
    V64Checkbox,
    V64Button,
  },
  data() {
    return {
      email: '',
      count: 4,
      options: SHIPPING,
      shipping: SHIPPING[0],
      terms: false,
      error: '',
    };
  },
  methods: {
    order() {
      if (!this.email.includes('@')) {
        this.error = 'Bitte eine gültige E-Mail angeben';
        return;
      }
      this.error = '';
      this.$emit('ordered', this.count);
    },
  },
};
</script>
