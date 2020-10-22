<template>
  <v-container>
    <v-form ref="form" v-model="valid" class="mt-5">
      <k-field-group language-prefix="user.fields">
        <v-col cols="12" lg="6" md="8" offset-lg="3" offset-md="2" offset-sm="1" sm="10">
          <v-subheader class="pa-0">Gebruiker</v-subheader>
          <v-card>
            <v-card-text>
              <KTextField v-model="values.name" field="name" required/>
              <KTextField v-model="values.email" field="email" required/>
            </v-card-text>
          </v-card>
        </v-col>
      </k-field-group>
    </v-form>
  </v-container>
</template>

<script lang="js">
import KFieldGroup from '@/components/crud/fields/KFieldGroup.vue';
import KTextField from '@/components/crud/fields/KTextField.vue';
import Form from '@/components/VuetifyResourceBaseForm.vue';
import User from '../../application/models/user.js';

export default {
  name: 'UserForm',
  components: {
    KTextField,
    KFieldGroup,
  },
  extends: Form,
  data: () => ({
    values: new User(),
  }),
};
</script>
