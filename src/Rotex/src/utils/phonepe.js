import crypto from 'crypto';

export const createXVerify = (payload, path, saltKey, saltIndex, isStatus = false) => {
  const rawData = isStatus ? `${payload}${saltKey}` : `${payload}${path}${saltKey}`;
  const hash = crypto.createHash('sha256').update(rawData).digest('hex');
  return `${hash}###${saltIndex}`;
};
