/**
 * Token Service — JWT for optional FI operator sessions (stub identity).
 */
import jwt from 'jsonwebtoken';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';
function getJwtSecret() {
    return (process.env.JWT_SECRET ||
        'clearbid-sandbox-dev-secret');
}
export function generateAccessToken(claims) {
    return jwt.sign({
        tenantId: claims.tenantId,
        clientId: claims.clientId,
        userId: claims.userId,
        email: claims.email,
        role: claims.role,
        scopes: claims.scopes,
        type: 'access',
    }, getJwtSecret(), {
        expiresIn: ACCESS_TOKEN_EXPIRY,
        issuer: 'clearbid-api',
        audience: 'clearbid-client',
    });
}
export function generateRefreshToken(claims) {
    return jwt.sign({
        tenantId: claims.tenantId,
        clientId: claims.clientId,
        userId: claims.userId,
        email: claims.email,
        role: claims.role,
        scopes: claims.scopes,
        type: 'refresh',
    }, getJwtSecret(), {
        expiresIn: REFRESH_TOKEN_EXPIRY,
        issuer: 'clearbid-api',
        audience: 'clearbid-client',
    });
}
