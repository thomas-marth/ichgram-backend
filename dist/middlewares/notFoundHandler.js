const notFoundHandler = (req, res) => {
    const { method, url } = req;
    res.status(404).json({
        message: `${method} ${url} not found`,
    });
};
export default notFoundHandler;
//# sourceMappingURL=notFoundHandler.js.map