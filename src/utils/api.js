import axios from "axios"

export async function getPlans() {
    const res = await axios.get('/plans')
    return res.data
}

export async function getPlanById(id) {
    const res = await axios.get(`/plans/${id}`)
    return res.data
}

export async function getInstallersByPlanId(id) {
    const res = await axios.get(`/installers?plan=${id}`)
    return res.data
}
