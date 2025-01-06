import { connect } from 'cloudflare:sockets';

var ID=0

export default {
  fetch : async (event) => {
    // const html = await(await fetch('https://www.baidu.com/')).text()
    return new Response("pay "+(++ID));
  }
};
