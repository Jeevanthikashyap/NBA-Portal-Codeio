const express = require('express');
const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({
            error: 'Authorization token required!'
        })
        
    }
    
    const token = authorization.split(' ')[1]
    

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decodedToken.id
        req.email = decodedToken.email
        next()
    } catch(err) {
        return res.status(401).json({error: 'Request is not authorized'})
    }

};

module.exports = checkAuth