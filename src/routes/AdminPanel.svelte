<script>
import { Route } from 'svelte-navigator'
import AdminPanelGuard from '../components/AdminPanelGuard.svelte'

export let path;
</script>

<Route {path} let:params let:location let:navigate>
    <AdminPanelGuard>
        <slot {params} {location} {navigate} />
    </AdminPanelGuard>
</Route>
