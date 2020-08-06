<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Form',
  props: {
    errors: {
      default: () => {
      },
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      findError: 'error/find',
    }),
  },
  watch: {
    errors: {
      handler() {
        this.validate();
      },
      deep: true,
    },
  },
  data() {
    return {
      valid: false,
    };
  },
  methods: {
    ...mapMutations({
      removeError: 'error/remove',
    }),
    validate() {
      this.$refs.form.validate();
    },
    clear() {
      this.$refs.form.reset();
    },
    /* Should only be used for Vuetify rules */
    serverError(key) {
      const error = this.findError(key);

      if (error) {
        this.removeServerError(key);

        return error;
      }

      return true;
    },
    removeServerError(key) {
      this.removeError(key);
    },
  },
};
</script>
