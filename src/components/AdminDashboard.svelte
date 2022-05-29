<script>
import Pusher from 'pusher-js'
import { onMount } from "svelte";
import axios from "axios";

export let params;

let info = params.adminInfo.split('/');
let planId = info[0];
let installerId = info[1];

let requests = [];

onMount(async () => {
    let res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/installer_requests/${planId}/${installerId}`)
    requests = [...requests, ...res.data];
})

Pusher.logToConsole = true;

let pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_ID, {
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
});

let channel = pusher.subscribe(`channel_${planId}`)
channel.bind(`event_${installerId}`, (data) => {
    requests = [...requests, data];
});
</script>

<svelte:head>
    <title>Admin</title>
</svelte:head>

<div class='wrapper'>
    {#if requests.length == 0}
        <p class='ops'>Ops! Você não possui nenhuma requisição de instalação</p>
    {:else}
        <section>
            <h1>Requisições feitas para você</h1>
            {#each requests as {email, name, state, city}} 
                <div class='item'>
                    <p><b>De</b>: {email}</p>
                    <p><b>Nome:</b> {name}</p>
                    <p><b>De:</b> {city}, {state}</p>
                </div>
            {/each}
        </section>
    {/if}
</div>

<style>
.wrapper {
    width: 100%;
    height: 90vh;

    display: flex;
    align-items: flex-start;
    justify-content: center;
}

.wrapper section {
    width: 80%;
            
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.wrapper section h1 {
    margin: 40px 0;
}

.item {
    width: 50%;
    padding: 10px;
    margin: 15px 0;
    border: 2px solid var(--light-gray);
    border-radius: 5px;

    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    align-self: center;
}

.item p {
    margin: 2px 0;
}
</style>
