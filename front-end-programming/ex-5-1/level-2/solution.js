import { loadStudentsData } from './data-loader.js';
import { renderTableRows } from './table-renderer.js';

document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('#studentTable tbody');
    const browserInfoDiv = document.getElementById('browserInfo');

    try {
        const students = await loadStudentsData();
        renderTableRows(students, tableBody);
    } catch (error) {
        console.error('Error loading student data:', error);
    }

    document.getElementById('addStudent').addEventListener('click', () => {
        const newRow = document.createElement('tr');
        newRow.classList.add('highlight');
        newRow.innerHTML = `
            <td>3</td>
            <td>New Student</td>
            <td>20</td>
            <td>B</td>
        `;
        tableBody.appendChild(newRow);
    });


    document.getElementById('changeFont').addEventListener('click', () => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        document.getElementById('studentTable').style.fontFamily = 'Roboto, sans-serif';
    });

    const updateBrowserInfo = () => {
        browserInfoDiv.innerHTML = `
            <p><strong>Browser Name:</strong> ${navigator.appName}</p>
            <p><strong>Browser Version:</strong> ${navigator.appVersion}</p>
            <p><strong>Window Dimensions:</strong> ${window.innerWidth} x ${window.innerHeight}</p>
            <p><strong>User Agent:</strong> ${navigator.userAgent}</p>
        `;
    };

    updateBrowserInfo();
    window.addEventListener('resize', updateBrowserInfo);
});