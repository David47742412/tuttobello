import * as UAParser from 'ua-parser-js';
import { Request } from 'express';

export const getIpAndWks = (data: any, req: Request) => {
  const uaParser = new UAParser(req.headers['user']).getResult();
  data.ipReq = req.ip;
  data.wks =
    !uaParser.device.vendor && !uaParser.device.model && !uaParser.device.type
      ? `${uaParser.os.name} ${uaParser.os.version}`
      : `${uaParser.device.vendor}_${uaParser.device.model}_${uaParser.device.type}`;
};
