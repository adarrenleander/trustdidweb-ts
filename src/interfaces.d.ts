export interface DIDDoc {
  id?: string;
  controller?: string | string[];
  alsoKnownAs?: string[];
  authentication?: string[];
  assertionMethod?: string[];
  keyAgreement?: string[];
  capabilityInvocation?: string[];
  capabilityDelegation?: string[];
  verificationMethod?: VerificationMethod[];
  service?: ServiceEndpoint[];
}

export interface DIDOperation {
  op: string;
  path: string;
  value: any;
}

export type DIDLogEntry = [
  logEntryHash: string,
  versionId: number,
  timestamp: string,
  params: {
    method?: string,
    scid?: string,
    updateKeys?: string[],
    prerotate?: boolean,
    nextKeyHashes?: string[]
  },
  data: {value: any} | {patch: DIDOperation[]},
  proof?: any
];
export type DIDLog = DIDLogEntry[];

export interface ServiceEndpoint {
  id?: string;
  type: string | string[];
  serviceEndpoint?: string | string[] | any;
}

export interface VerificationMethod {
  id?: string;
  type: 'authentication' | 'assertionMethod' | 'keyAgreement' | 'capabilityInvocation' | 'capabilityDelegation';
  controller?: string;
  publicKeyJWK?: any;
  publicKeyMultibase?: string;
  secretKeyMultibase?: string;
  use?: string;
}

export interface CreateDIDInterface {
  domain: string;
  updateKeys: string[];
  signer: (doc: any, challenge: string) => Promise<{proof: any}>;
  controller?: string;
  context?: string | string[];
  verificationMethods?: VerificationMethod[];
  created?: Date;
  prerotate?: boolean;
  nextKeyHashes?: string[];
}

export interface SignDIDDocInterface {
  document: any;
  proof: any;
  verificationMethod: VerificationMethod
}

export interface UpdateDIDInterface {
  log: DIDLog;
  signer: (doc: any, challenge: string) => Promise<{proof: any}>;
  updateKeys?: string[];
  context?: string[];
  controller?: string[];
  verificationMethods?: VerificationMethod[];
  services?: ServiceEndpoint[];
  alsoKnownAs?: string[];
  domain?: string;
  updated?: Date;
  deactivated?: boolean;
  prerotate?: boolean;
  nextKeyHashes?: string[];
}

export interface DeactivateDIDInterface {
  log: DIDLog;
  signer: (doc: any, challenge: string) => Promise<{proof: any}>;
}
