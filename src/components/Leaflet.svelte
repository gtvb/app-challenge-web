<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { setContext } from 'svelte';

export let map = undefined;
export let lat;
export let lng;

let getMap = () => map;
setContext('mapLayer', getMap)

function createMap(element) {
    map = L.map(element).setView([lat, lng], 3);

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
          &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
        subdomains: 'abcd',
        maxZoom: 14,
      }
    ).addTo(map);

    return {
        destroy() {
            map.remove();
            map = undefined;
        }
    }
}
</script>

<div use:createMap class='map'>
    {#if map}
        <slot {map} />
    {/if}
</div>

<style>
.map {
    width: 500px;
    height: 500px;
    border: 2px solid var(--light-gray);
    border-radius: 5px;
}
</style>
