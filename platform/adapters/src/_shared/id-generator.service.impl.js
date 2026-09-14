/**
 * ID Generator Service Implementation — starter prefixes.
 */
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@clearbid/core';
import { ulid } from 'ulid';
export function generateIdWithPrefix(prefix) {
    if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
        throw new Error(`Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`);
    }
    const id = `${prefix}_${ulid().toLowerCase()}`;
    if (!isValidDomainId(id)) {
        throw new Error(`Generated ID "${id}" failed validation.`);
    }
    return id;
}
export class DefaultIdGeneratorService {
    tntId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
    }
    keyId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
    }
    idnId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
    }
    autId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
    }
    cmpId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.campaigns);
    }
    invId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.inventory);
    }
    bidId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.bidding);
    }
    cnvId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.conversions);
    }
    stlId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.settlement);
    }
    dspId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.disputes);
    }
    rptId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.reporting);
    }
    generateIdForDomain(domainCode) {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
    }
}
let idGeneratorService = null;
export function getIdGeneratorService() {
    if (!idGeneratorService) {
        idGeneratorService = new DefaultIdGeneratorService();
    }
    return idGeneratorService;
}
