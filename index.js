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

let generateStateOptions = (function() {

  let options = '';
  STORE.stateCodes.forEach( state => options +=`<option value="${state}">${state}</option>`);
  return {
    options};
}());

let displayDropDown = function() {
  console.log(generateStateOptions.options);
  $('select').html(generateStateOptions.options);
};


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function getParks(query, maxResults=10) {
  const params = {
    stateCode: query,
    api_key: STORE.apiKey,
    maxResults
  };

  const queryString = formatQueryParams(params);
  const url = STORE.searchURL + '?' + queryString;
  console.log(url);

}

function selectedState() {
  $('form').on('change', e => {
    e.preventDefault();
    const stateAbbreviation = $('select').val();
    getParks(stateAbbreviation, STORE.maxResults);
  });

}

// The user must be able to search for parks in one or more states.
// The user must be able to set the max number of results, with a default of 10.
// The search must trigger a call to NPS's API.
// The parks in the given state must be displayed on the page. Include at least:
//     Full name
//     Description
//     Website URL
// The user must be able to make multiple searches and see only the results for the current search.
// As a stretch goal, try adding the park's address to the results.

function main() {
  displayDropDown();
  selectedState();
}

$(main);