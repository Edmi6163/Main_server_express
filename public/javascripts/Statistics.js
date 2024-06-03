async function fetchStatistics() {
    const team = document.getElementById('team').value;
    const response = await fetch(`/api/statistics?team=${team}`);
    const data = await response.json();
    const netTransferRecord = data.map(item => item.net_transfer_record).join(', ');
    document.getElementById('result').innerText = `Net Transfer Record for ${team}: ${netTransferRecord}`;
}


