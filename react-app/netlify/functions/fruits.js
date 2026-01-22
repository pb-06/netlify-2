import { neon } from '@netlify/neon';

/* endpoint: /.netlify/functions/fruits */
export const handler = async (event, context) => {
    //console.log('endpoint /.netlify/functions/fruits called', event, context)
    const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL

    if (event.httpMethod == 'GET') {
        const fruits = await sql`SELECT * FROM fruits LIMIT 50;`;
        console.log('Fetched fruits from database:', fruits);
        return {
            statusCode: 200,
            body: JSON.stringify([fruits]),
        }
    }

    if (event.httpMethod == 'POST') {
        console.log('Received POST data:', event.body)
        const newFruit = JSON.parse(event.body)
        console.log('Creating new fruit:', newFruit)

        const result = await sql(`
            INSERT INTO fruits (name, healthy)
            VALUES (${newFruit.name}, ${newFruit.healthy}) RETURNING *;
        `);
        console.log('Inserted new fruit into database:', result)

        return {
            statusCode: 201,
            body: JSON.stringify(result),
        }
    }
}