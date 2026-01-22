/* endpoint: /.netlify/functions/fruits */
export const handler = async (event, context) => {
    console.log('endpoint /.netlify/functions/fruits called', event, context)

    if (event.httpMethod == 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify([
                { id: 1, name: 'Apple', healthy: true },
                { id: 2, name: 'Banana', healthy: true },
                { id: 3, name: 'Cherry', healthy: true },
                { id: 4, name: 'Date', healthy: false },
                { id: 5, name: 'Elderberry', healthy: true },
            ]),
        }
    }

    if (event.httpMethod == 'POST') {
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Fruit created successfully' }),
        }
    }
}