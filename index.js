'use strict';

const STORE = {
  stateCodes: [
    'AK',
    'AL',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
  ],
  apiKey: 'JNPervKIi7fbQ2EeasBOwE1u8JX6qvhmmBGedtfZ',
  searchURL: 'https://developer.nps.gov/api/v1/parks',
  maxResults: 10
};

// generate all options for statecodes
let generateStateOptions = (function() {
  let options = '';
  STORE.stateCodes.forEach( state => options +=`<option value="${state}">${state}</option>`);
  return {
    options};
}());

// send all options to DOM
let displayDropDown = function() {
  console.log(generateStateOptions.options);
  $('select').html(generateStateOptions.options);
};

// format the query string
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

// fetch function
function getParks(query, maxResults=10) {
  const params = {
    stateCode: query,
    api_key: STORE.apiKey,
    limit: maxResults,
    fields: "addresses"
  };

  const queryString = formatQueryParams(params);
  const url = STORE.searchURL + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });  
}

// form drop down event listener - calls getParks when option is selected
function selectedState() {
  $('form').on('change', e => {
    e.preventDefault();
    const stateAbbreviation = $('select').val();
    STORE.maxResults = $('.js-num-select').val();
    getParks(stateAbbreviation, STORE.maxResults);
  });

}

// display results as list items
function displayResults(results){
  $('.search-results').empty();
  for(let i= 0; i <= 10 && i <= results.data.length; i++){
    
    let address = results.data[i].addresses.find( address => address.type === 'Physical');
    console.log(address);

    $('.search-results').append(
      `<li><h3><a href='${results.data[i].url}'> ${results.data[i].fullName}</a></h3>
      <p>${results.data[i].description}</p>
      <p>${address.line1}</p>
      <p>${address.city}, ${address.stateCode}, ${address.postalCode}</p>
      </li>`
    );
  }
}

function main() {
  displayDropDown();
  selectedState();
}

$(main);