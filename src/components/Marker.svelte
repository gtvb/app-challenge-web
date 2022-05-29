<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getContext } from 'svelte';

export let lat;
export let lng;

let marker;
let mapLayer = getContext('mapLayer')();

function createMarker(element) {
    let icon = L.divIcon({ 
        html: element, 
        className: 'map-marker',
        iconSize: L.point(24, 24)
    });

    marker = L.marker([lat, lng], { icon }).addTo(mapLayer);
    
    return {
        destroy() {
            if(marker) {
                marker.remove();
                marker = undefined;
            }
        }
    }
}
</script>

<div use:createMarker>
    {#if marker}
        <slot /> 
    {/if}
</div>
