<template>
  <div class="dialog">
    <div class="dialog__header">
      <h1 class="title p title--upp title--alt dialog__title">Renommer le prototype</h1>
      <button @click="closeDialog()" class="dialog__close btn btn--icon">
        <svg-icon :name="'close'"></svg-icon>
      </button>
    </div>
    <div class="dialog__content">
      <input
        type="text"
        v-model="newName"
        placeholder="Nouveau Nom"
        @keyup.esc="closeDialog()"
        @keyup.enter="renamePrototype()"
      >
    </div>
    <div class="dialog__footer">
      <div class="dialog__action">
        <div class="dialog__action-elem dialog__action-elem--primary">
          <button class="btn btn--outline" @click="closeDialog()">Annuler</button>
          <button class="btn btn--plain" @click="renamePrototype()">Renommer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// COMPONENTS
import svgIcon from "@/components/svgIcon.vue";

// VUEX
import { mapState } from "vuex";

export default {
  components: {
    svgIcon
  },
  data() {
    return {
      newName: ""
    };
  },

  methods: {
    // Close Dialog Window
    closeDialog() {
      this.newName = "";
      this.$emit("closeDialog");
    },

    // Call The action to rename the Prototype
    renamePrototype() {
      this.$store.dispatch("prototypesStore/renamePrototype", {
        id: this.prototype.id,
        newName: this.newName
      });
      this.closeDialog();
    }
  },

  computed: mapState({
    prototype: state => state.dialogStore.dialog.data
  })
};
</script>