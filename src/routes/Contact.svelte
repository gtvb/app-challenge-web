<script>
import axios from "axios";
import { onMount } from "svelte";

export let params;

let data = params.contactInfo.split('/');
let planId = data[0];
let installerId = data[1];

let states = [];
let cities = [];

let name = '';
let email = '';
let state = '';
let city = '';
let submitted = false;

onMount(async () => {
    let res = await axios.get(`${import.meta.env.VITE_IBGE_URL}/localidades/estados?orderBy=nome`);
    let data = res.data;

    data.forEach(s => { 
        let newState = {
            id: s.id,
            name: s.nome,
            tag: s.sigla,
        }
        states = [...states, newState];
    })
})

async function getCities() {
    if(!state) return
    let res = await axios.get(`${import.meta.env.VITE_IBGE_URL}/localidades/estados/${state}/municipios`);
    let data = res.data;
    data.forEach(s => { 
        let newCity = {
            id: s.id,
            name: s.nome,
        }
        cities = [...cities, newCity];
    })
}

$: state, getCities();

async function handleSubmit() {
    if (!name || !email || !state || !city) {
        alert('Um ou mais campos precisam ser preenchidos')
        return
    }
    let body = {
        name,
        email,
        state,
        city,
        "plan_id": planId,
        "installer_id": installerId,
    }
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/request_installer`, JSON.stringify(body));
    name = '';
    email = '';
    state = '';
    city = '';
    submitted = true;
}
</script>

<div class='wrapper'>
    {#if !submitted}
        <form on:submit|preventDefault={handleSubmit}>
            <h2>Requisitar Instalador</h2>
            <input bind:value={name} type='email' placeholder='Email' />
            <input bind:value={email} type='text' placeholder='Nome Completo' />
            <select bind:value={state}>
                {#each states as state} 
                    <option value={state.tag}>{state.tag}</option>
                {/each}
            </select>

            {#if state}
            <select bind:value={city}>
                {#each cities as city} 
                    <option value={city.name}>{city.name}</option>
                {/each}
            </select>
            {/if}

            <button type='submit'>Enviar</button>
        </form>
    {:else}
        <p>Tudo Certo! Agora é só aguardar esse instalador entrar em contato com o seu email para mais informações.<p>
    {/if}
</div>

<style>
.wrapper {
    width: 100%;
    height: 90vh;

    display: flex;
    align-items: center;
    justify-content: center;
}

.wrapper form {
    height: 70%;
    width: 35%;

    padding: 15px 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 2px solid var(--light-gray);
    border-radius: 8px;
}

.wrapper form h2 {
    margin: 10px 0;
    font-weight: bold;
}

.wrapper form input,select {
    width: 80%;
    height: 50px;
    padding: 4px;
    margin: 10px 0;
    border: 2px solid var(--light-gray);
    border-radius: 8px;
}

.wrapper form button {
    width: 80%;
    height: 50px;
    padding: 4px;
    margin: 10px 0;
    border: none;
    border-radius: 8px;
    background: var(--primary-color);
    color: white;
    font-weight: bold;
}

.wrapper form button:hover {
    cursor: pointer;
}
</style>
