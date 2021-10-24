const cheerio = require('cheerio');
const axios = require('axios');

module.exports = getPrice = async (el) => {
  const response = await axios.get(
    `https://finance.yahoo.com/quote/${el}?p=${el}&.tsrc=fin-srch`
  );
  const $ = cheerio.load(response.data);
  const companySpan = $(
    '#quote-header-info > div.Mt\\(15px\\) > div.D\\(ib\\).Mt\\(-5px\\).Mend\\(20px\\).Maw\\(56\\%\\)--tab768.Maw\\(52\\%\\).Ov\\(h\\).smartphone_Maw\\(85\\%\\).smartphone_Mend\\(0px\\) > div.D\\(ib\\) > h1'
  );

  const priceSpan = $(
    '#quote-header-info > div.My\\(6px\\).Pos\\(r\\).smartphone_Mt\\(6px\\).W\\(100\\%\\) > div.D\\(ib\\).Va\\(m\\).Maw\\(65\\%\\).Ov\\(h\\) > div > span.Trsdu\\(0\\.3s\\).Fw\\(b\\).Fz\\(36px\\).Mb\\(-4px\\).D\\(ib\\)'
  );

  const company = companySpan.text();
  const price = priceSpan.text();
  return new Promise((resolve, reject) => {
    resolve({
      company,
      price,
    });
  });
};
