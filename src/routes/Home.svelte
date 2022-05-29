<script>
import { onMount } from 'svelte';
import { getPlans } from '../utils/api'

import { Link } from 'svelte-navigator'

let plans;
let internet_type = {
    'sat': 'Satélite',
    'wire': 'Fio',
    'radio': 'Radio',
    'cable': 'Cabo',
}

onMount(async () => {
    plans = await getPlans()
})
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<div class='wrapper'>
    {#if plans}
        <section>
            {#each plans as plan}
                <div class='item'> 
                    <h1>{plan.isp}</h1>
                    <p><b>Descrição do plano:</b> {plan.description}</p>
                    <p><b>Tipo:</b> {internet_type[plan.type_of_internet]}</p>
                    <p><b>Velocidade de Upload (Mbps):</b> {plan.upload_speed}</p>
                    <p><b>Velocidade de Download (Mbps):</b> {plan.download_speed}</p>
                    {#if plan.data_capacity}
                        <p><b>Capacidade de dados (GB):</b> {plan.data_capacity}</p>
                    {/if}
                    <h3>Valor a pagar por mês: <span>R$ {plan.price_per_month}</span></h3>
                    <Link to='/plans/{plan.id}'>
                        <button class='info-button'>Mais informações</button>
                    </Link>
                </div>
            {/each}
        </section>
    {/if}
</div>

<style>
.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin: 40px 0;
}

.item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    padding: 15px;
    margin: 15px 0;
    border: 2px solid var(--light-gray);
    border-radius: 10px;
}

.item h1 {
    margin: 2px 1px;
}

.item h3 {
    margin: 10px 0;
}

.item h3 span {
    color: green;
    font-weight: bold;
}

.item p {
    margin: 2px 1px;
}

.item .info-button {
    margin: 10px 0 5px 0;
    padding: 7px;
    background: var(--primary-color);
    color: white;
    border: none;
    font-weight: bold;
    border-radius: 5px;
}

.item .info-button:hover {
    cursor: pointer;
}
</style>

