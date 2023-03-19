export async function deleteFlight(e) {
    e.preventDefault();
    let flightId = e.target.id;
    console.log(flightId);
    let fres = await fetch(`/api/flights?id=${flightId}`, {
        method: 'DELETE',
    })
    let jres = await fres.json();
    console.log(jres);
    window.location.reload();
}