<script>
import { getInstallersByPlanId, getPlanById } from '../utils/api';
import { onMount } from 'svelte';
import { Link } from 'svelte-navigator'
import { distanceBetween, readLocation } from '../utils/location';

import Leaflet from '../components/Leaflet.svelte'
import Marker from '../components/Marker.svelte'

export let params = undefined;

let map;
let lat;
let lng;
let plan;
let installers;

onMount(async () => {
    const { geolocation } = await readLocation()
    lat = geolocation.latitude;
    lng = geolocation.longitude;
})

onMount(async () => {
    plan = await getPlanById(params.id)
    installers = await getInstallersByPlanId(plan.id)
})
</script>

<div class='wrapper'>
    {#if installers}
        <div class='installers-wrapper'>
            {#each installers as installer}
                <div class='installer'>
                    <h2>{installer.name}</h2>
                    <p><b>Nota do instalador:</b> {installer.rating}/10</p>
                    <p><b>Preço por distancia percorrida até você:</b> R${installer.price_per_km} por quilômetro</p>
                    <p><b>Distância aproximada até você:</b> {Math.floor(distanceBetween(lat, lng, installer.lat, installer.lng))}km de distância</p>
                    <p><b>Preço total:</b> <span>R$ {Math.floor(distanceBetween(lat, lng, installer.lat, installer.lng)) * installer.price_per_km}</span> + <span>R$ {plan.price_per_month}</span> por mês</p>
                    <Link to='/contact/{plan.id}/{installer.id}'>
                        <button class='info-button'>Requisitar instalação</button>
                    </Link>
                </div>
            {/each}
        </div>
    {/if}

    {#if lat && lng && installers}
        <Leaflet {lat} {lng} bind:map>
                {#each installers as { lat, lng }} 
                    <Marker {lat} {lng}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="blue">
                                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                            </svg>
                    </Marker>
                {/each}
                <Marker {lat} {lng}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="red">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                </Marker>
        </Leaflet>
    {/if}
</div>

<style>
.wrapper {
    margin: 40px 0;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
}

.installers-wrapper {
    max-width: 680px;
    height: 80vh;
    overflow-y: scroll;
    scrollbar-color: var(--light-gray);
}

.installer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    padding: 15px;
    margin: 15px 0;
    border: 2px solid var(--light-gray);
    border-radius: 10px;
}

.installer p {
    margin: 2px 1px;
}

.installer p span {
    color: green;
    font-weight: bold;
}

.installer .info-button {
    margin: 10px 0 5px 0;
    padding: 7px;
    background: var(--primary-color);
    color: white;
    border: none;
    font-weight: bold;
    border-radius: 5px;
}

.installer .info-button:hover {
    cursor: pointer;
}
</style>
