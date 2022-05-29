<script>
import { adminUser } from "../utils/admin";
import { useNavigate } from "svelte-navigator";

let installerId;
let planId;
let password = '';

const navigate = useNavigate();

function handleSubmit() {
    if(!installerId || !planId || !password) return;
    if(password != 'admin') { 
        alert('Senha errada');
        return
    }
    $adminUser = { installerId, planId, password };
    navigate(`/admin/${planId}/${installerId}`, { replace: true });
}
</script>

<svelte:head>
    <title>Entrar</title>
</svelte:head>

<div class='wrapper'>
    <form on:submit|preventDefault={handleSubmit}>
        <h2>Entre como Instalador</h2>
        <input bind:value={planId} type='number' placeholder='Id do plano' />
        <input bind:value={installerId} type='number' placeholder='Id do instalador' />
        <input bind:value={password} type='password' placeholder='Senha' />
        <button type='submit'>Entrar</button>
    </form>
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
    height: 65%;
    width: 30%;

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

@media (max-width: 680px) {
    .wrapper form {
        width: 80%;
    }
}
</style>
