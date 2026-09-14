/**
 * IdGeneratorService Port — starter prefixes (extend in consumer repos).
 */

import type { DomainCode } from '@clearbid/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  cmpId(): string;
  invId(): string;
  bidId(): string;
  cnvId(): string;
  stlId(): string;
  dspId(): string;
  rptId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
