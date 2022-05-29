<script>
import { adminUser } from "../utils/admin";
import { useNavigate, useLocation } from "svelte-navigator";

const navigate = useNavigate();
const location = useLocation();

$: if (!$adminUser) {
    navigate("/admin_login", {
      state: { from: $location.pathname },
      replace: true,
    });
}
</script>

{#if $adminUser}
    <slot />
{/if}
