<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Home from "./routes/Home.svelte";
	import Plan from "./routes/Plan.svelte";
	import Contact from "./routes/Contact.svelte";
    import AdminPanel from "./routes/AdminPanel.svelte";
    import Login from "./routes/Login.svelte";
    import AdminDashboard from "./components/AdminDashboard.svelte";

    import { adminUser } from "./utils/admin";

    function handleLogout() {
        $adminUser = null
    }
</script>

<Router basepath='/'>
    <header>
        {#if !$adminUser}
        <nav>
            <h1>Planu</h1>
            <Link to='/'>
                <span class='link-content'>Home</span>
            </Link>
            <Link to='/admin_login'>
                <span class='link-content'>Admin</span>
            </Link>
        </nav>
        {:else}
        <nav>
            <h1>Planu</h1>
            <button on:click={handleLogout} class='exit-button'>
                Sair
            </button>
        </nav>
        {/if}
    </header>
    <Route path='/'>
        <Home />
    </Route>
    <Route path='/admin_login'>
        <Login />
    </Route>
    <Route path='/plans/:id' let:params>
        <Plan {params} />
    </Route>
    <Route path='/contact/*contactInfo' let:params>
        <Contact {params} />
    </Route>
    <AdminPanel path='/admin/*adminInfo' let:params>
        <AdminDashboard {params} />
    </AdminPanel>
</Router>

<style>
    nav {
        width: 100%;
        border-bottom: 1px solid var(--light-gray);
        padding: 10px;
        margin-bottom: 15px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    nav h1 {
        margin-right: 15px;
    }

    nav .link-content {
        color: var(--title-color);
        text-decoration: none;
        margin: 0 10px;
    }

    nav .link-content:hover {
        color: var(--title-color);
        text-decoration: underline;
        text-decoration-thickness: 2px;
        text-decoration-color: var(--primary-color);
    }

    nav .exit-button {
        background: var(--primary-color);
        color: white;
        font-weight: bold;
        padding: 5px;
        border: none;
        border-radius: 5px;
        margin: 0 10px;
    }

    nav .exit-button:hover {
        cursor: pointer;
    }
</style>
