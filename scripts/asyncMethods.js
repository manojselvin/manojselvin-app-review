let API_URL = "https://dummy.restapiexample.com/api/v1/employees";

// Using Async/Await
async function fetchPostsAsyncAwait() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// Using Promises
function fetchPostsPromises() {
    return new Promise((resolve, reject) => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Using Callbacks
// Using Callbacks
function fetchPostsCallbacks(callback) {
    fetch(API_URL)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            callback(data); // Send data to the callback function
        })
        .catch(error => {
            callback(null, error); // Send error to the callback function
        });
}


module.exports = {
    fetchPostsAsyncAwait,
    fetchPostsPromises,
    fetchPostsCallbacks
}