<template>
  <v-container>
    <!-- <v-expansion-panel>
      <v-expansion-panel-content>
        <template v-slot:header>
          <h3 >CREATE ADMIN</h3>
        </template>
        <user-form/>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <template v-slot:header>
          <h3>ADD PARTY CHIARMAN</h3>
        </template>
        <v-card>
          <v-card-title></v-card-title>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <template v-slot:header>
          <h3>CREATE PARTY</h3>
        </template>
        <v-card>
          <v-card-title></v-card-title>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <template v-slot:header>
          <h3>REMOVE PARTY</h3>
        </template>
        <v-card>
          <v-card-title></v-card-title>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>-->
    <router-view/>
  </v-container>
</template>

<script>
import UserForm from "../components/UserForm.vue";
export default {
  components: {
    UserForm
  }
};
</script>
