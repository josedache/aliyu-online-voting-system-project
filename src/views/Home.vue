<template>
  <v-container>
    <v-layout column align-center>
      <v-flex>
        <!-- <div> -->
        <h3 class="display-3 my-3">ABSTRACT</h3>
        <p class="headline font-weight-light">
          Cette étude a été menée sur l'impact de la formation et le développement de la productivité des employés
          Les techniques d'échantillonnage aléatoire simples ont été utilisées pour sélectionner au hasard quatre-vingt (80) répondants de différentes organisations
          le gouvernement et le secteur privé, composé à la fois de cadres supérieurs et subalternes de l'organisation. Questionnaire a été utilisé comme instrument pour la collecte de données tandis que la table de fréquence a été utilisée pour traduire les chiffres en pourcentage pour analyser les données collectées
          Mismanagement of funds and staff potentials, based on the results of the training process.Sur la base du résultat de la fréquence formulée, il a été conclu que la formation et le développement ont permis d'améliorer l'efficacité de la production et ont également contribué à réduire la mauvaise gestion des fonds et des potentiels du personnel
          Au cours de l'étude, le chercheur a fait les constatations suivantes: si l'organisation pratique la formation et le développement du personnel / des travailleurs, cela permet de stimuler les deux objectifs organisationnels
          Le chercheur a également fait une recommandation digne d'améliorer l'efficacité opérationnelle et l'efficacité de la croissance économique et le développement au Nigeria. Des ateliers et des séminaires communs sont également recommandés, des formations et des conférences devraient être créées pour les employés et les gestionnaires des organisations
        </p>
        <!-- </div> -->
      </v-flex>
      <v-flex>
        <v-btn
          :to="{name: 'signup', query: {role: userRoles.VOTER}}"
          round
          outline
          large
          class="my-5"
          style="min-width: 200px"
          color="primary"
        >Sign Up</v-btn>
        <v-btn
          :to="{name: 'login'}"
          round
          outline
          large
          class="my-5"
          style="min-width: 200px"
          color="primary"
        >Login</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userRoles"])
  }
};
</script>
