import { GeoIP } from './geo';

export class AccessLog {

  id: string;
  ip: string;
  recieveTime: string;
  recieveTimeStamp: Date;
  method: string;
  request: string;
  path: string;
  firstLine: string;
  userAgent: string;
  status: string;
  host: string;
  protocol: string;
  whois: string;
  parsedWhois: string;
  parsedJSON: string;
  parsedKeyValues: string
  parsedXML: string;
  geoIP: GeoIP;
}