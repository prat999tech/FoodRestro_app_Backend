const asyncHandler = (requestHandler) => {
    // It returns a new function that Express can use as a route handler
    return (req, res, next) => {
        // Promise.resolve() is used to ensure that the requestHandler's result
        // is treated as a Promise, even if it's not explicitly async or doesn't return a Promise.
        // If the Promise resolves successfully, nothing more happens here.
        // If the Promise rejects (an error occurs), the .catch() block is executed.
        Promise.resolve(requestHandler(req, res, next)).catch((err) =>
            // The error is passed to the next() function, which will trigger
            // Express's error handling middleware (if you have one defined).
            next(err)
        )
    }
}

// Export the asyncHandler function so it can be imported and used in other files.
// This is the ONLY export statement for asyncHandler in this file.
export { asyncHandler }