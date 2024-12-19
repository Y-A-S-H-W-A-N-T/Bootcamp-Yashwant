export async function loadStudentsData() {
    const response = await fetch('students.json');
    if (!response.ok) {
        throw new Error('Failed to load student data');
    }
    return response.json();
}