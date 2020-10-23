<script lang="js">
import Menu from './Menu.vue';

export default {
  name: 'TheMainMenu',
  extends: Menu,
  computed: {
    items: () => [
      {
        icon: 'fa-users',
        title: 'Gebruikers',
        route: { name: 'users' },
      },
    ],
  },
};
</script>
